import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, useLocation } from 'react-router-dom';
import payQR from '../assets/payQR.jpg';
import { useLoader } from "../components/LoaderContext.js";

function CheckOutProdPage() {
  const { state } = useLocation();
  const { setLoading } = useLoader();
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [itemCount, setItemCount] = useState(1);
  const [address, setAddress] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [transId, setTransId] = useState('');
  const [utr, setUTR] = useState('');
  const [img, setImg] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // NEW

  const BackendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    const seleprod = state?.selectedprod;
    setProd(seleprod);
    setLoading(false);
  }, [id]);

  const getLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve(`${latitude}+${longitude}`);
        },
        error => {
          console.error('Error getting location:', error);
          resolve('unknown');
        }
      );
    });
  };

  const calculateTotal = () => {
    return prod ? (parseFloat(prod.productPrice) * itemCount) : 0;
  };

  const isAmountNotValid = Number(amountPaid) > calculateTotal();

  const handlePlaceOrder = async () => {
    setLoading(true);
    if (!address || (paymentMethod === "UPI" && (!amountPaid || !transId || !utr))) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }

    const pros = [{
      productId: prod._id,
      count: parseInt(itemCount),
      priceAtPurchase: parseFloat(prod.productPrice),
      productsize: prod.siz,
      productcolor: prod.col
    }];

    const location = await getLocation();

    const formData = new FormData();
    formData.append('pros', JSON.stringify(pros));
    formData.append('paymentMethod', paymentMethod); // COD or UPI
    formData.append('address', address);
    formData.append('totalorderamount', calculateTotal());

    if (paymentMethod === 'UPI') {
      formData.append('totalamountPaid', parseFloat(amountPaid));
      formData.append('transId', transId);
      formData.append('utr', utr);
      if (img) {
        formData.append('transImage', img);
      }
    }

    formData.append('location', location);

    fetch(`${BackendURL}/ordr/checkout`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
      .then(res => {
        if (res.ok) {
          alert("Order placed successfully!");
        } else {
          return res.json().then(data => {
            throw new Error(data.message || 'Order placement failed');
          });
        }
      })
      .catch(err => alert(`Error: ${err.message}`));

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className='m-4'>
        <h2 className='text-center text-xl'>Checkout</h2>
        {prod ? (
          <div className=' m-4 bg-gray-100 p-4'>
            <h3>Product:</h3>
            <div className='m-7'>
              <img src={`${BackendURL}${prod.images[0]}`} width="100" alt={prod.productName} />
              <span className='ml-4'>
                {prod.productName} <br /> Size: {prod.siz}<br /> Color: {prod.col}
              </span>
              <span className='ml-4'><br />₹{prod.productPrice}</span>
              <div className='mt-2'>
                <label>Quantity: </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={itemCount}
                  onChange={(e) => setItemCount(Number(e.target.value))}
                  style={{ width: "60px", marginLeft: "5px" }}
                />
              </div>
            </div>

            <h3>Payment Method</h3>
            <div className='flex flex-col gap-2 m-2'>
              <label>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='UPI'
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                /> UPI
              </label>
              <label>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='COD'
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                /> Cash on Delivery
              </label>
            </div>

            {paymentMethod === 'UPI' && (
              <>
                <button className='m-2 border-2 p-1' onClick={() => setShowQR(!showQR)}>
                  Show QR for Payment
                </button>
                {showQR && (
                  <div className='mt-2'>
                    <img className='w-50 h-[100px] sm:h-[100px] md:h-[180px] lg:h-[220px] xl:h-[300px]' src={payQR} width='70%' alt="QR" />
                  </div>
                )}
                <div className='mb-3 mt-4'>
                  <label className='m-3'>Enter Amount:</label>
                  <input
                    type="number"
                    placeholder="Amount Paid"
                    value={amountPaid}
                    onChange={e => setAmountPaid(e.target.value)}
                  />
                  {isAmountNotValid && (
                    <p className="text-red-500">Amount can't be greater than Total Order</p>
                  )}
                </div>
                <div className='mb-3'>
                  <label className='m-3'>Transaction ID:</label>
                  <input
                    type="text"
                    value={transId}
                    onChange={e => setTransId(e.target.value)}
                    placeholder="Transaction ID"
                  />
                </div>
                <div className='mb-3'>
                  <label className='m-3'>UTR:</label>
                  <input
                    type="text"
                    value={utr}
                    onChange={e => setUTR(e.target.value)}
                    placeholder="UTR"
                  />
                </div>
                <div className='mb-3'>
                  <label className='m-3'>Submit Payment Proof:</label>
                  <input
                    className='m-3'
                    type='file'
                    accept='image/*'
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
              </>
            )}

            <h3>Delivery Address</h3>
            <textarea
              className='m-2'
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Enter your address"
              rows={4}
              style={{ width: '50%' }}
            />

            <h3 className='text-center'>Total Summary</h3>
            <p className='m-3'>Total: ₹{calculateTotal()}</p>

            <button className='m-3 border-2 p-2 bg-blue-500 text-white' onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        ) : (
          <p>Loading product...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CheckOutProdPage;
