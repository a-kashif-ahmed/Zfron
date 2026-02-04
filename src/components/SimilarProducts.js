import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productsServices.js";

function SimilarProducts({ cats }) {
  const [prods, setProds] = useState([]);
  const BackendURL = process.env.REACT_APP_BACKEND_URL;

  


useEffect(() => {
  getProducts().then((data) => setProds(data));
  console.log(prods);
}, []);

  return (
    <div className="mt-10 max-w-[1200px] mx-auto px-4">
      <h1 className="text-center text-3xl  mb-6">Recommended:</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {prods.length === 0 ? (
          <p className="text-center w-full">No products found</p>
        ) : (
          prods
            // .filter((product) => product.productCategory === cats)
            .map((product) => (
              <Link to={`/products/${product._id}`} key={product._id}>
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
    </div>
  );
}

export default SimilarProducts;
