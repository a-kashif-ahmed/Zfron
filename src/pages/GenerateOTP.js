import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../components/LoaderContext.js";

function GenerateOTP() {
  
const {setLoading} =useLoader();
  const [veri, setVeri] = useState(false);
  const navigate = useNavigate();
  const BackendURL = process.env.REACT_APP_BACKEND_URL

  const handleOTPGen = async (e) => {
    setLoading(true);
    e.preventDefault(); // Important to stop default form behavior
    const formData = new FormData(e.target);
    const email = formData.get("email");

    const res = await fetch(`${BackendURL}/auth/generateotp`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      setVeri(true);
    }
     setLoading(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const otp = formData.get("otp");
    const email = formData.get("email"); // optional, if needed

    const res = await fetch(`${BackendURL}/auth/verifyotp`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, otp }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      console.log("Sab Changa Si");
      navigate("/resetpassword"); // Correct relative path
    }
     setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center">Enter Email to Reset Password:</h1>
      <div  className="logform ">
      <form onSubmit={handleOTPGen}>
        <td><input type="email" name="email" required /></td>
        <br/>
        <td><input type="submit" value="Generate OTP" /></td>
      </form>
      </div>

      {veri && (
        <div className="m-3 p-3">
          <div  className="logform ">
          <form onSubmit={handleSubmit}>
            <label className="m-1">Enter OTP:</label>
            <input className="m-1" type="text" name="otp" required />
            <input className="m-1" type="submit" value="Verify" />
          </form>
        </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default GenerateOTP;
