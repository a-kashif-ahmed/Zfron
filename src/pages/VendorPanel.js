import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { useLoader } from "../components/LoaderContext.js";
import { Link } from "react-router-dom";

function VendorPanel() {
    const BackendURL = process.env.REACT_APP_BACKEND_URL;
    const { setLoading } = useLoader();

    const statusOptionsMap = {
        pending: ['paid', 'shipped', 'delivered','cancelled'],
        paid: ['shipped', 'delivered', 'cancelled'],
        shipped: ['delivered'],
        delivered: [],
        cancelled: [],
    };

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${BackendURL}/ordr/allorders`, {
                credentials: 'include',
            });
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus, id, orderid) => {
        try {
            setLoading(true);
            const res = await fetch(`${BackendURL}/ordr/statuschange/${id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stats: newStatus }),
            });
            if (res.ok) {
                alert(`Status updated to ${newStatus} for Order ${orderid}`);
                fetchOrders(); // Refresh the order list
            }
        } catch (err) {
            console.error("Error updating status:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="m-7">
                <h1 className="text-center text-blue-400 text-3xl  mb-5">Vendor Panel:</h1>
                <div className="flex flex-wrap gap-6 justify-start">
                    {orders.length === 0 ? (
                        <div>No Orders</div>
                    ) : (
                        orders.filter(order => order.orderApprove === true).map((order, ix) => (
                            <div
                                key={ix}
                                className="shadow-md p-4 w-80 flex-shrink-0 mb-6 bg-blue-100 rounded-xl border border-blue-300"
                            >
                                <h5 className="font-bold mb-2">
                                    Order ID: {order.orderid}
                                    {!order.orderApprove && (
                                        <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-gray-700 bg-gray-300 rounded">
                                            Pending
                                        </span>
                                    )}
                                </h5>

                                <div className="space-y-1 text-sm text-gray-700">
                                    <p><strong>Customer:</strong> {order.customerid.fullname}</p>
                                    <p><strong>Phone:</strong> {order.customerid.mobilenumber}</p>
                                    <p><strong>Email:</strong> {order.customerid.email}</p>
                                    <p><strong>Address:</strong> {order.Address}</p>
                                </div>

                                <h4 className="mt-4 font-semibold">Products:</h4>
                                {order.products.map(item => (
                                    <div key={item._id} className="my-3 bg-white p-2 rounded shadow-sm">
                                        <Link to={`/products/${item.productId?._id}`}>
                                            <img
                                                src={`${BackendURL}${item.productId?.images[0]}`}
                                                alt={item.productId?.productName}
                                                className="w-full h-28 object-cover rounded"
                                            />
                                            <p className="font-semibold">{item.productId?.productName}</p>
                                            <p>Size: {item.productsize} | Color: {item.productcolor}</p>
                                        </Link>
                                    </div>
                                ))}

                                <div className="mt-4 space-y-1 text-sm">
                                    <p><strong>Paid:</strong> ₹{order.totalamountPaid}</p>
                                    <p><strong>Total:</strong> ₹{order.totalordercost}</p>
                                    <p><strong>Balance:</strong> ₹{order.totalordercost - order.totalamountPaid}</p>
                                </div>

                                <div className="mt-4">
                                    <p className="text-red-400"><strong>Status: {order.status}</strong></p>
                                    {statusOptionsMap[order.status]?.length > 0 && (
                                        <select
                                            onChange={(e) => handleStatusChange(e.target.value, order._id, order.orderid)}
                                            className="mt-2 w-full bg-white border border-gray-400 text-sm p-2 rounded"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Change Status</option>
                                            {statusOptionsMap[order.status].map((stat, idx) => (
                                                <option key={idx} value={stat}>{stat}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default VendorPanel;
