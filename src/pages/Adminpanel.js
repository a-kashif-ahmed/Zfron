import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderContext.js";


function AdminPanel() {
  const { setLoading } = useLoader();
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [trans, setTrans] = useState([]);
  const [allAmount, setAllAmount] = useState(0);
  const BackendURL = process.env.REACT_APP_BACKEND_URL

  const fetchAllVendors = async () => {
    try {
      const res = await fetch(`${BackendURL}/auth/vendors`);
      const data = await res.json();
      setVendors(data || []);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setVendors([]);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(`${BackendURL}/auth/alluser`);
      const data = await res.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const fetchAllTrans = async () => {
    try {
      const res = await fetch(`${BackendURL}/ordr/c/alltransactions`);
      const data = await res.json();
      console.log(data);
      setTrans(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTrans([]);
    }
  };

  const handleOrderApprove = (id) => {
    fetch(`${BackendURL}/ordr/approve/${id}`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        alert('User Approved');
        fetchAllVendors();
        fetchAllTrans();
      }
    }).catch(error => {
      console.error('Error approving order:', error);
    });
  };
  
  const handleVendorReject = (id) => {
    console.log("reject");
    fetch(`${BackendURL}/auth/reject/${id}`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        alert('User Rejected');
        fetchAllVendors();
        fetchAllTrans();
      }
    }).catch(error => {
      console.error('Error rejecting vendor:', error);
    });
  };
  
  const handleVendorApprove = (id) => {
    fetch(`${BackendURL}/auth/approve/${id}`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        alert('User Approved');
        fetchAllVendors();
        fetchAllTrans();
      }
    }).catch(error => {
      console.error('Error approving vendor:', error);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchAllVendors(),
          fetchAllUsers(),
          fetchAllTrans()
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const total = users.reduce((acc, user) => acc + (user.spent || 0), 0);
    setAllAmount(total);
  }, [users]);

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="font-bold text-center mt-10 text-xl">Admin Panel :</h1>
        <div className="text-center mt-4 admindiv">
          <div className="inset-shadow-sm/70 m-5">
            <h2 className="text-lg font-semibold p-3">Amount Spent on Platform by Users:</h2>
            <h3 className="text-xl font-bold p-3">₹{allAmount}</h3>
          </div>

          {/* Vendors */}
          <div className="mt-10 admindiv">
            <h2 className="text-lg font-semibold p-3">Un-approved Vendors:</h2>
            <div className="shadow-md m-5">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">No.</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Store Address</th>
                    <th className="border border-gray-300 p-2">GST Number</th>
                    <th className="border border-gray-300 p-2">Mobile Number</th>
                    <th className="border border-gray-300 p-2">Pan Card Number</th>
                    <th className="border border-gray-300 p-2">Images</th>
                    <th className="border border-gray-300 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors
                    .filter(vendor => vendor.isApproved === false)
                    .map((vendor, index) => (
                      <tr key={vendor._id}>
                        <td className="border border-gray-300 p-2">{index + 1}</td>
                        <td className="border border-gray-300 p-2">{vendor.fullname || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.email || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.storeaddress || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.gstnumber || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.mobilenumber || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.pancardnumber || 'N/A'}</td>
                        <td className="border border-gray-300 p-2 flex flex-wrap">
                          {vendor.allimages && vendor.allimages.length > 0 ? (
                            vendor.allimages.map((im, index) => (
                              <img
                                key={index}
                                src={`${BackendURL}${im}`}
                                alt={im}
                                width="100"
                                height="100"
                                className="object-cover cursor-pointer hover:opacity-80 m-2  "
                                onClick={() => window.open(`${BackendURL}${im}`, '_blank')}
                              />
                            ))
                          ) : (
                            <span>No image</span>
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => handleVendorApprove(vendor._id)}
                          >
                            Approve
                          </button>
                          &nbsp;
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => handleVendorReject(vendor._id)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transactions */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold p-3">UnApproved Transactions:</h2>
            <div className="shadow-md m-5 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">No.</th>
                    <th className="border border-gray-300 p-2">Transaction ID</th>
                    <th className="border border-gray-300 p-2">UTR</th>
                    <th className="border border-gray-300 p-2">Amount</th>
                    <th className="border border-gray-300 p-2">Payment Proof</th>
                    <th className="border border-gray-300 p-2">View Location</th>
                    <th className="border border-gray-300 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trans
                    .filter(tran => tran.isApproved === false)
                    .map((tran, index) => {
                      // Safe access to orderid and orderedLoc with comprehensive null checks
                      const locationString = tran?.orderid?.orderedLoc || "";

                      let lat = "", lon = "", mapsLink = "";

                      if (locationString && typeof locationString === 'string' && locationString.includes("+")) {
                        const parts = locationString.split("+");
                        if (parts.length >= 2) {
                          [lat, lon] = parts;
                          // Validate that lat and lon are valid numbers
                          if (!isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon))) {
                            mapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
                          }
                        }
                      }

                      return (
                        <tr key={tran._id}>
                          <td className="border border-gray-300 p-2">{index + 1}</td>
                          <td className="border border-gray-300 p-2">{tran.transId || 'N/A'}</td>
                          <td className="border border-gray-300 p-2">{tran.UTR || 'N/A'}</td>
                          <td className="border border-gray-300 p-2">₹{tran.amountPaid || 0}</td>
                          <td className="border border-gray-300 p-2">
                            {tran.image ? (
                              <img
                                src={`${BackendURL}${tran.image}`}
                                alt="Payment proof"
                                width="100"
                                height="100"
                                className="object-cover cursor-pointer hover:opacity-80"
                                onClick={() => window.open(`${BackendURL}${tran.image}`, '_blank')}
                              />
                            ) : (
                              <span>No image</span>
                            )}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {mapsLink ? (
                              <a
                                href={mapsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                View Location
                              </a>
                            ) : (
                              "No Location"
                            )}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded"
                              onClick={() => handleOrderApprove(tran._id)}
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 admindiv">
            <h2 className="text-lg font-semibold p-3">Approved Vendors:</h2>
            <div className="shadow-md m-5">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">No.</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Store Address</th>
                    <th className="border border-gray-300 p-2">GST Number</th>
                    <th className="border border-gray-300 p-2">Mobile Number</th>
                    <th className="border border-gray-300 p-2">Pan Card Number</th>
                    <th className="border border-gray-300 p-2">Images</th>

                  </tr>
                </thead>
                <tbody>
                  {vendors
                    .filter(vendor => vendor.isApproved === true)
                    .map((vendor, index) => (
                      <tr key={vendor._id}>
                        <td className="border border-gray-300 p-2">{index + 1}</td>
                        <td className="border border-gray-300 p-2">{vendor.fullname || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.email || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.storeaddress || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.gstnumber || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.mobilenumber || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">{vendor.pancardnumber || 'N/A'}</td>
                        <td className="border border-gray-300 p-2 flex flex-wrap">
                          {vendor.allimages && vendor.allimages.length > 0 ? (
                            vendor.allimages.map((im, index) => (
                              <img
                                key={index}
                                src={`${BackendURL}${im}`}
                                alt={im}
                                width="100"
                                height="100"
                                className="object-cover cursor-pointer hover:opacity-80 m-2  "
                                onClick={() => window.open(`${BackendURL}${im}`, '_blank')}
                              />
                            ))
                          ) : (
                            <span>No image</span>
                          )}
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPanel;