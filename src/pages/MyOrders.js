import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import OrderProgress from '../components/OrderProgressBar.js';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js';
import { useLoader } from "../components/LoaderContext.js";

function MyOrders() {
  const { setLoading } = useLoader();
  const BackendURL = process.env.REACT_APP_BACKEND_URL
  const [orders, setOrders] = useState([]);
  const handelCancel = (orderid) => {
    setLoading(true);
    fetch(`${BackendURL}/ordr/cancel/${orderid}`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        alert('Order Cancelled');

      } else {
        alert('failed to cancel order');
      }
    })

    setLoading(false);
  }
  useEffect(() => {

    setLoading(true);
    fetch(`${BackendURL}/ordr/myorders`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data || []);
      });

    setLoading(false);
  }, []);

  return (
    <div className=''>
      <Navbar />
      <h1 className="text-center text-xl">My Orders</h1>
      <div className='flex flex-wrap justify-center'>
        {orders.length === 0 ? (
          <div>No orders Found</div>
        ) : (
          <div>

            {orders.map((order) => (
              <Link to={`/order/placed/${order._id}`} key={order._id} className="block">
                <div className='m-3 p-3 f shadow-md w-100 h-auto' >
                  <div><p className='text-green-300'>{order.orderid}</p>

       
<br/>
                    <label>Address : {order.Address}</label>
                    <br />

                    <br />
                    <label>{order.order}</label>
                    
                    <label>{order.paymentMethod}</label>
                    
                    <OrderProgress status={order.status} />
                    <br/>
                    <label className='m-3'>
                      Order on : {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </label><br/>
                    <label>Total Amount : ₹{order.totalamountPaid}</label>


                  </div>

                  {order.status === 'cancelled' ? (
                    <div></div>

                  ) : (
                    <div>
                      <button onClick={() => handelCancel(order._id)}>Cancel</button>
                    </div>
                  )}

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyOrders;