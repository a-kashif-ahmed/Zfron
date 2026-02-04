
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
      <div className="flex flex-wrap justify-center gap-8 w-full bg-[#fafafa] py-10">
  {prods.length === 0 ? (
    <p className="text-center text-gray-500 text-lg">No products found</p>
  ) : (
    currentProducts
      .filter(product => product.isStock === true)
      .map(product => (
        <Link
          to={`/products/${product._id}`}
          key={product._id}
          className="group"
        >
          <div className="w-64 rounded-2xl bg-white border border-gray-100 overflow-hidden
                          shadow-sm hover:shadow-2xl transition-all duration-300
                          hover:-translate-y-1">
            
            {/* Image */}
            <div className="relative">
              <img
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                src={product.images[0]}
                alt={product.productName || "Product"}
              />

              {/* Price badge */}
              <span className="absolute top-3 right-3 bg-[#1f2937] text-white text-sm font-semibold px-3 py-1 rounded-full">
                ₹{product.productPrice}
              </span>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
              <h3 className="font-semibold text-gray-900 text-lg truncate">
                {product.productName}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {product.productCategory}
              </p>

              {/* Button */}
              <button
                className="mt-4 w-full rounded-full py-2.5 font-medium
                           bg-yellow-400/70 text-white
                           hover:bg-[#374151]
                           transition-colors duration-300"
              >
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