import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import { useRef } from 'react';

import OrderInvoice from "../components/OrderInvoice.js"; // The PDF component
import { PDFDownloadLink } from '@react-pdf/renderer';
import Footer from "../components/Footer.js";
import { useLoader } from "../components/LoaderContext.js";

function OrderDetailsPage() {
    const {setLoading} =useLoader();
    const [order, setOrder] = useState();
    const { id } = useParams();
    const targetRef = useRef();
    const BackendURL = process.env.REACT_APP_BACKEND_URL
    useEffect(() => {
        setLoading(true);
        fetch(`${BackendURL}/ordr/placed/${id}`, {
            credentials: 'include',

        }).then(res => res.json()).then(data => setOrder(data))
         setLoading(false);
    }, [id]);


    return (
        <div>
            <Navbar />
            <h1 className="text-center text-lg">Order Summary</h1>
            {order ? (<div  ref={targetRef} className=" m-10 flex justify-center">

                <p class="block   p-6 bg-white border border-gray-200 rounded-lg ">

                    <h5 class="mb-2 text-2xl font-bold tracking-tight ">{order.orderid}</h5>
                    <p class="font-normal">Ordered On : {new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                    {order.products.map((product, index) => (
                        <div className="m-2 p-3">
                            <Link to={`/products/${product.productId._id}`}>
                            <img src={`${BackendURL}${product.productId.images[0]}`} alt={product.productName} width="20%" height="20%"/>
                            <li key={index}>{product.productId?.productName || 'Product name not available'} </li>
                            <p className="m-3">Purchased At  : ₹{product.priceAtPurchase} X {product.count} Quantity </p>
                            <p className="m-3">Size: {product.productsize}</p>
                            <p className="m-3">Color: {product.productcolor}</p>

</Link>
                        </div>
                        
                    ))}
                    <p>Name : {order.customerid.fullname}</p>
                    <p>Address: {order.Address}</p>
                    <p>Amount paid : {order.totalamountPaid}</p>
                    <p>Order Status : {order.status}</p>

                    <p>Gross: ₹{order.products.reduce((acc, product) => acc + product.priceAtPurchase * product.count , 0)}</p>
                    <br/>
                  <PDFDownloadLink
            document={<OrderInvoice order={order} />}
            fileName="invoice.pdf"
          ><p className="border-2 text-center"> Download Invoice </p>  </PDFDownloadLink>
                </p>
                
            </div>) : (<div>No Details Available</div>)}
            <Footer/>
        </div>
    )

}


export default OrderDetailsPage