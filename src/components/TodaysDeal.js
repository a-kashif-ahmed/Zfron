
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TodaysDeal() {
  const [prods, setProds] = useState([])
  const BackendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${BackendURL}/items/pros`)
      .then((response) => response.json())
      .then((data) => {

        setProds(data);
        console.log(data);
      })
      .catch((err) => console.error("Fetch error:", err));

  }, [])

  return (
    <div className=" m-auto mt-10 offers  ">
      <div>
        <h1 className="text-center text-3xl mb-10 text-black-400 font-sans">Offers:</h1>
      </div>
      <div className=" ml-3 flex flex-wrap overflow-x-auto border-1 border-gray-700 rounded-xl overscroll-auto" style={{ width: '80vw' }}>
        {prods.length === 0 ? (
          <p className="text-center">No products found or loading...</p>
        ) : (
          prods.filter(product => product.isDeal).map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className="block">

             <div className=" m-7 w-60 border border-gray-400 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    className="w-full h-80 object-cover"
                    src={`${BackendURL}${product.images[0]}`}
                    alt={product.productName || "Product"}
                  />
                  <div className="px-4 py-3">
                    <div className="font-bold text-lg truncate mb-1">
                      {product.productName}
                    </div>
                    <p className="text-gray-600 text-sm mb-5">
                      {product.productCategory}
                    </p>
                    <div className=" mb-5">
                      <span className="text-white font-bold text-base bg-blue-400 rounded-lg p-1">₹{product.productPrice}</span>
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
    </div>
  )
}
export default TodaysDeal;