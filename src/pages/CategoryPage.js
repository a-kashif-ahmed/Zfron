import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLoader } from "../components/LoaderContext.js";
import { subcategoryMap } from "../components/SubCategoryMap.js";

function CategoryPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("c");
  const { setLoading } = useLoader();
  const [prods, setProds] = useState([]);
  const [filteredProds, setFilteredProds] = useState([]);
  const [selSubCat, setSelSubCat] = useState(""); // default: no subcat filter
  const BackendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BackendURL}/items/pros`);
        const data = await response.json();
        setProds(data);

        let filtered = data;

        if (selectedCategory && selectedCategory !== "All") {
          filtered = filtered.filter(
            (prod) =>
              prod.productCategory?.toLowerCase() === selectedCategory.toLowerCase()
          );
        }

        if (selSubCat && selSubCat !== "All") {
          filtered = filtered.filter(
            (prod) =>
              prod.productSubCategory?.toLowerCase() === selSubCat.toLowerCase()
          );
        }

        setFilteredProds(filtered);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, selSubCat, BackendURL, setLoading]); // <- make sure selSubCat is included

  return (
    <div>
      <Navbar />
      <h1 className="m-3 text-center text-5xl">{selectedCategory || "All"} Collections</h1>

      {subcategoryMap[selectedCategory] && (
        <ul className="flex gap-2 justify-center flex-wrap my-5">
          <li
            onClick={() => setSelSubCat("")}
            className={`cursor-pointer px-3 py-1 border rounded-full ${
              selSubCat === "" ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            All
          </li>
          {subcategoryMap[selectedCategory].map((itm) => (
            <li
              key={itm}
              onClick={() => setSelSubCat(itm)}
              className={`cursor-pointer px-3 py-1 border rounded-full ${
                selSubCat === itm ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {itm}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap justify-center">
        {filteredProds.length === 0 ? (
          <p className="text-center m-10 text-xl">
            No products found in {selSubCat ? `${selSubCat}` : ""} {` in `}
               {selectedCategory} category
          </p>
        ) : (
          filteredProds.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className="block">
              <div className="m-7 w-60 border border-gray-400 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-80 object-cover"
                  src={`${BackendURL}${product.images?.[0]}`}
                  alt={product.productName || "Product"}
                />
                <div className="px-4 py-3">
                  <div className="font-bold text-lg truncate mb-1">{product.productName}</div>
                  <p className="text-gray-600 text-sm mb-2">{product.productCategory}</p>
                  <div className="mb-5">
                    <span className="text-white font-bold text-base bg-blue-400 rounded-lg p-1">
                      ₹{product.productPrice}
                    </span>
                  </div>
                  <button className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 rounded-full transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CategoryPage;
