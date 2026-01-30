import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import payQR from '../assets/payQR.jpg';
import { useLoader } from "../components/LoaderContext.js";

function CheckoutPage() {
  const { setLoading } = useLoader();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [img, setImg] = useState(null);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transId, setTransId] = useState('');
  const [utr, setUTR] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [paymentMeth, setPaymentMeth] = useState('');

  const BackendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BackendURL}/carts/all`, {
          credentials: 'include'
        });
        const data = await res.json();
        const initialSelection = {};
        data.forEach(item => {
          initialSelection[item._id] = true;
        });
        setCartItems(data);
        setSelectedItems(initialSelection);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  const handleShowQR = () => {
    setShowQR(prev => !prev);
    setPaymentMeth('UPI');
  };

  const handleCheckboxChange = (item) => {
    setSelectedItems(prev => {
      const newSelection = { ...prev };
      if (newSelection[item._id]) {
        delete newSelection[item._id];
      } else {
        newSelection[item._id] = true;
      }
      return newSelection;
    });
  };

  const getLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude}+${longitude}`);
        },
        () => resolve('unknown')
      );
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) =>
      selectedItems[item._id] ? total + (item.coun * parseFloat(item.productPrice)) : total
    , 0); // ← important to give initial value 0
  };

  const isAmountNotValid = Number(amount) > calculateTotal();

  const validateSameCategoryAndQuantity = () => {
    const selected = cartItems.filter(item => selectedItems[item._id]);
    if (selected.length === 0) {
      alert("Please select at least one product");
      return false;
    }

    const baseCategory = selected[0].productCategory;
    const allSameCategory = selected.every(item => item.productCategory === baseCategory);
    if (!allSameCategory) {
      alert("You can only order items from the same category.");
      return false;
    }

    const totalQuantity = selected.reduce((sum, item) => sum + item.coun, 0);
    if (totalQuantity > 5) {
      alert("You can only order up to 5 items in total.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please provide address.");
      return;
    }

    if (!validateSameCategoryAndQuantity()) return;

    setLoading(true);

    const pros = cartItems
      .filter(item => selectedItems[item._id])
      .map(item => ({
        productId: item._id,
        count: item.coun,
        priceAtPurchase: parseFloat(item.productPrice)
      }));

    const location = await getLocation();

    const formData = new FormData();
    formData.append('pros', JSON.stringify(pros));
    formData.append('paymentMethod', paymentMeth);
    formData.append('address', address);
    formData.append('totalorderamount', calculateTotal());
    formData.append('totalamountPaid', amount);
    formData.append('transId', transId);
    formData.append('utr', utr);
    formData.append('location', location);

    if (img) {
      formData.append('transImage', img);
    }

    try {
      const res = await fetch(`${BackendURL}/ordr/checkout`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (res.ok) {
        alert('Order placed successfully!');
      } else {
        const err = await res.json();
        throw new Error(err.message || 'Failed to place order');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <h1 className='text-center m-3 text-xl'>Checkout Cart Items</h1>
      <div className='m-4  bg-gray-100' style={{width:'30%'}}>
        {cartItems.map((item, index) => (
          <div key={item._id} className='m-7 flex items-center'>
            <input
              type="checkbox"
              checked={!!selectedItems[item._id]}
              onChange={() => handleCheckboxChange(item)}
            />
            <img
              src={`${BackendURL}${item.images[0]}`}
              width="80px"
              height="80px"
              alt={item.productName}
            />
            <div>
              <p>{item.productName}</p>
              <p>₹{item.productPrice}</p>
              <input
                type="number"
                min={1}
                value={item.coun}
                onChange={(e) => {
                  const updatedCart = [...cartItems];
                  updatedCart[index].coun = Number(e.target.value);
                  setCartItems(updatedCart);
                }}
                style={{ width: "60px" }}
              />
            </div>
          </div>
        ))}

        <h3 className='font-semibold mt-5'>Payment Method</h3>
        <div className='space-y-2'>
          <button className='m-2 bg-blue-100 px-4 py-1 rounded' onClick={handleShowQR}>Show QR for UPI Payment</button>
          {showQR && <img src={payQR} alt='paymentQR' width='300px' className='m-2' />}
          
          <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-800">
            <input
              type="radio"
              name="payment"
              value="COD"
              onClick={() => setPaymentMeth('COD')}
              className="form-radio text-yellow-500 focus:ring-yellow-400"
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <h3 className='font-semibold mt-5'>Delivery Address</h3>
        <textarea
          className='m-2 w-full max-w-xl p-2 border border-gray-300 rounded'
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Enter your address"
          rows={4}
        />

        <h3 className='text-center font-semibold mt-5'>Order Summary</h3>
        <p className='m-3'>Total: ₹{calculateTotal()}</p>

        {/* Show extra fields if not COD */}
        {paymentMeth !== 'COD' && (
          <div className='space-y-3'>
            <div>
              <label className='m-3'>Enter Amount</label>
              <input
                type='number'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter Amount"
              />
            </div>

            <div>
              <label className='m-3'>Transaction ID</label>
              <input
                type='text'
                value={transId}
                onChange={e => setTransId(e.target.value)}
                placeholder="Transaction ID"
              />
            </div>

            <div>
              <label className='m-3'>UTR</label>
              <input
                type='text'
                value={utr}
                onChange={e => setUTR(e.target.value)}
                placeholder="Enter UTR"
              />
            </div>

            <div>
              <label className='m-3'>Upload Payment Proof</label>
              <input
                className='m-3'
                type='file'
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        )}

        {isAmountNotValid && (
          <label className="text-red-500 block m-2">
            Amount can't be greater than Total Order
          </label>
        )}

        <button
          className='m-3 border-2 border-black px-4 py-1 rounded hover:bg-black hover:text-white transition'
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutPage;
