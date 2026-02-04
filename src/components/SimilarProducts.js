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
                <div className=" m-7 w-60 border border-gray-400 rounded-xl overflow-hidden hover:shadow-xl transition-shadow  duration-300">
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
                    <button className="cursor-pointer w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 rounded-full transition-colors">
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
