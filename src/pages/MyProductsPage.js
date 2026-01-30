import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddInventory from "../components/AddInventory";
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderContext.js";
import { Link } from 'react-router-dom';

function MyProductsPage() {
  const { setLoading } = useLoader();
  const [showForm, setShowForm] = useState(false);
  const BackendURL = process.env.REACT_APP_BACKEND_URL;
  const [myprods, setMyProds] = useState([]);
  const [error, setError] = useState(null);
  const [isAp, setIsAp] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const apval = localStorage.getItem('enc');
    setIsAp(apval === 'true' ? true : false);

    // Debug: Log the exact URL being called
    const fetchURL = `${BackendURL}/items/myproducts`;
    console.log("Fetching from URL:", fetchURL);

    fetch(fetchURL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response URL:", response.url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setMyProds(data);
        } else if (data && Array.isArray(data.products)) {
          setMyProds(data.products);
        } else {
          console.warn("Unexpected data format:", data);
          setMyProds([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setMyProds([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setLoading(true);
    try {
      const deleteURL = `${BackendURL}/items/delete/${id}`;
      console.log("Deleting from URL:", deleteURL);

      const res = await fetch(deleteURL, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Delete response status:", res.status);

      if (res.ok) {
        alert("Deleted successfully");
        // Refresh the products list after deletion
        setMyProds(prevProds => prevProds.filter(product => product._id !== id));
      } else {
        const errorData = await res.text();
        console.error("Delete failed:", errorData);
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting product: " + err.message);
    }
    setLoading(false);
  };

  const markOutOfStock = async (id) => {
    setLoading(true);
    try {
      const stockURL = `${BackendURL}/items/outofstock/${id}`;
      console.log("Updating stock at URL:", stockURL);

      const res = await fetch(stockURL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isStock: false }),
      });

      console.log("Stock update response status:", res.status);

      if (res.ok) {
        alert(`Updated Stock status `);
        // Update the local state to reflect the change
        setMyProds(prevProds =>
          prevProds.map(product =>
            product._id === id ? { ...product, isStock: false } : product
          )
        );
      } else {
        const errorData = await res.text();
        console.error("Stock update failed:", errorData);
        alert("Failed to update stock");
      }
    } catch (err) {
      console.error("Stock update error:", err);
      alert("Error updating stock: " + err.message);
    }
    setLoading(false);
  };

  const handleClick = () => {
    setShowForm(true);
  };

  const handleProductAdded = (newProduct) => {
    // Add the new product to the list
    setMyProds(prevProds => [...prevProds, newProduct]);
    setShowForm(false);
  };



  return (
    <div>
      <Navbar />


      {isAp ? (
        <div>
          <button className="addI m-7" onClick={handleClick}>
            + Add Product
          </button>

          <div id="add">
            {showForm && <AddInventory onProductAdded={handleProductAdded} />}
          </div>
        </div>
      ) : (
        < p className="m-7 text-red-800">You need to be approved to add items</p>
      )}
      {error && (
        <div className="text-red-600 text-center p-4">
          <p>Error loading products: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}

      <h1 className="text-center text-3xl text-blue-400">Manage Listed Products:</h1>

      <div className="flex flex-wrap">
        {myprods.length === 0 ? (
          <p className="text-center w-full mt-4 text-gray-600">
            {error ? "Failed to load products" : "Please Add Products"}
          </p>
        ) : (
          myprods.map((product) => (

            <div key={product._id} className="m-7 w-60 border border-gray-400 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Link to={`/products/${product._id}`}>
                <img
                  className="w-full h-80 object-cover"
                  src={`${BackendURL}${product.images[0]}`}
                  alt={product.productName || "Product"}
                  onError={(e) => {
                    console.error("Image load error:", e.target.src);
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <div className="px-4 py-3">
                  <div className="font-bold text-lg truncate mb-1">
                    {product.productName}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.productCategory}
                  </p>

                  {!product.isStock && (
                    <p className="text-red-700 text-sm mb-2">Marked as out of stock</p>
                  )}

                  <div className="mb-5">
                    <span className="text-white font-bold text-base bg-blue-400 rounded-lg p-1">
                      ₹{product.productPrice}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="flex px-4 py-2 gap-3 border-t border-gray-200">
                <button
                  onClick={() => markOutOfStock(product._id)}
                  className="text-yellow-600 underline text-sm"
                >
                  {product.isStock ? 'Mark Out of Stock' : 'In Stock'}
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 text-sm" 
                >
                  Delete
                </button>
              </div>
            </div>

          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MyProductsPage;