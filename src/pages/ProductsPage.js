
import Navbar from "../components/Navbar";
import TodaysDeal from "../components/TodaysDeal";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderContext.js";
import leftarrow from "../public/arrow-left.png"
import rightarrow from "../public/arrow-right.png"
import { useLocation } from 'react-router-dom';
import { getProducts } from "../services/productsServices.js";

function ProductsPage() {
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get('s')?.toLowerCase() || '';
  const { setLoading } = useLoader();
  const [prods, setProds] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50;
  const BackendURL = process.env.REACT_APP_BACKEND_URL
    const handleAddToCart = async (id,selectedSize,selectedcolor) => {
    setLoading(true);
    console.log(id);
    fetch(`${BackendURL}/carts/add/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedSize ,
        selectedcolor
      })
    }).then(res => {
      if (res.ok) {
        alert('Item added to cart');
      }
    });
    setLoading(false);
  };
  useEffect(() => {
    getProducts().then((data) => setProds(data));
    console.log(prods);
  }, []);
//   useEffect(() => {

//     setLoading(true);
//     fetch(`${BackendURL}/items/pros`)
//       .then((response) => response.json())
//       .then((data) => {
//  const filtered = data.filter(product =>
//           product.productName.toLowerCase().includes(searchTerm)
//                  );
//         setProds(filtered);
//         console.log(data);
//       })
//       .catch((err) => console.error("Fetch error:", err));

//     setLoading(false);
//   }, [searchTerm,BackendURL])
  const totalPages = Math.ceil(prods.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const currentProducts = prods.slice(startIdx, startIdx + productsPerPage);

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="  " >
      <Navbar />
      {/* <nav>
        <li>
          <a href="/products/myproducts">My products</a>
        </li>
      </nav> */}
      {/* {!searchTerm ? <TodaysDeal /> : <></>} */}
      <div>
        <h1 className="text-center  text-3xl text-black m-20">Products</h1>
      </div>
      <div className="flex flex-wrap justify-center" style={{ width: '100%' }}>
        {prods.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          currentProducts.filter(product => product.isStock=== true).map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className="block">
               <div className=" m-7 w-60 border border-gray-400 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    className="w-full h-80 object-cover"
                    src={`${product.images[0]}`}
                    alt={product.productName || "Product"}
                  />
                  <div className="px-4 py-3">
                    <div className="font-bold text-lg truncate mb-1">
                      {product.productName}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {product.productCategory}
                    </p>
                     <div className=" mb-5">
                      <span className="text-white font-bold text-base bg-blue-400 rounded-lg p-1">₹{product.productPrice}</span>
                    </div>
                    <button className=" cursor-pointer w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 rounded-full transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
            </Link>
          ))
        )}

      </div>
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded arrow"
        >
          <img src={leftarrow} />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded arrow"
        >
          <img src={rightarrow} />
        </button>
      </div>
      <Footer />
    </div>

  )
}

export default ProductsPage;