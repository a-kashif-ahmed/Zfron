import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useLoader } from "../components/LoaderContext.js";

function CartPage(){
    const {setLoading} = useLoader(); 
    const [cartItems,setCartItems] = useState([])
    const BackendURL = process.env.REACT_APP_BACKEND_URL
  
  // No need for separate idi state since we can pass the id directly
  const calculateCartTotal = () => {
  return cartItems.reduce(
    (total, item) => total + (item.coun * parseFloat(item.productPrice)),
    0
  );
};
  const handleRemove = async (productId) => {
    setLoading(true);
    console.log("Removing product ID:", productId);
    
    try {
      const response = await fetch(`${BackendURL}/carts/remove/${productId}`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        alert('Item removed');
        // Refresh the cart items after successful removal
        
      } else {
        alert('Failed to remove item');
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert('Error removing item');
    }
  };
  
  


    useEffect(()=>{
      setLoading(true);
           fetch(`${BackendURL}/carts/all`, {
          credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        console.log(data);
      })
      setLoading(false);
},[])

    return(
        <div>
            <Navbar/>
            <h1 className="text-center font-bold text-xl">Cart:</h1>
<div className="flex flex-wrap">
   {cartItems.length === 0 ? (
        <p className="text-center">No products found..</p>
      ) : (
        cartItems.map((product) => (
        
            <div className="p-4 m-3   ">
              <div key={product.idm || product.productName} className="w-auto h-160 rounded overflow-hidden shadow-lg">
                <Link to={`/products/${product._id}`} key={product._id} className="block">
                <img className="w-70 h-75" src={`${BackendURL}${product.images[0]}`} alt={product.productName || "Product"} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl w-20  h-20 overflow-hidden">{product.productName}</div>
                  <p className="text-gray-700 text-base">{product.productCategory}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <p>₹{product.productPrice} X {product.coun} </p>
                  </span>
                  <p>Size:{product.size}</p>
                  <br/>
                  <p>Color: {product.color}</p>
                </div>
                </Link>
                <div><button className="inline-block bg-red-300 hover:bg-red-400 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 transition-colors" onClick={()=>{handleRemove(product._id)}}>Remove </button></div>
              </div>
              
            </div>
            
    )
)
      )
    
}
</div>
<br/>


<div className=" shadow-xl static text-center sticky inset-shadow-sm/70 ">
<p>Total Cart Value : <b>₹{calculateCartTotal()}</b></p>
<br/><a className="" href="/order"><button className="font-bold text-lg "><h1>Checkout</h1></button></a></div>
<Footer/>
</div>
    )
}


export default CartPage;