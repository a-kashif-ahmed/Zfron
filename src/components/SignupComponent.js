import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from 'react';
import { useLoader } from "../components/LoaderContext.js";

function SignUp() {
  const { setLoading } = useLoader();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState('');
  const [userType, setUserType] = useState('user');
  const [emailotp, setEmailOtp] = useState('');
  const [mobileotp, setMobileOtp] = useState('');
  const [otpemail, setOtpemail] = useState(false);
  const [otpmobile, setOtpmobile] = useState(false);
  const [emailverified,setEmailverified] = useState(false);
  const [mobileverified,setMobiledverified] = useState(false);
  const BackendURL = process.env.REACT_APP_BACKEND_URL
  const passwordsMatch = password && confirm && password === confirm && emailverified;
  const isEmailValid = email.endsWith("@gmail.com");
  



  const genEmailOtp = async () => {
    const res = await fetch(`${BackendURL}/auth/generateotp`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      setOtpemail(true);
    }

  }
  // const genMobileOtp = async () => {
  //   const ref = await fetch(`${BackendURL}/auth/mobileotp`, {
  //     credentials: "include",
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ mobilenumber })
  //   });
  //   if (ref.ok) {
  //     setOtpmobile(true);
  //   }
  // }

const handleEmailOtp = async()=>{
  const ress = await fetch(`${BackendURL}/auth/verifyotp`,{
    credentials:'include',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,emailotp}),
    method:'POST'
  });
  if(ress.ok){
    setEmailverified(true);

  }

}

// const handleMobileOtp = async()=>{
//     const reff = await fetch(`${BackendURL}/auth/verifymobileotp`,{
//     credentials:'include',
//     headers:{
//       "Content-Type":"application/json"
//     },
//     body:JSON.stringify({mobilenumber,mobileotp}),
//     method:'POST'
//   });
//   if(reff.ok){
//     setMobiledverified(true);
//   }
// }



  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);






  return (
    <div className="origin-center mt-30">

      <div className="logform back-shadow">
        <form action={`${BackendURL}/auth/signup`} method="post" encType="multipart/form-data">
          <table>
            <tbody>
              <tr>
                <td>Full name:</td>
                <td><input name="fullname" type="text" required /></td>
              </tr>

              <tr>
                <td>Email:</td>
                <td >
                  <input
                    name="email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>

                <div className="m-7"><button type="button" onClick={() => genEmailOtp()

                }>{emailverified ? "✔️": "Verify"}</button></div>
              </tr>

              {otpemail && (<tr className="emot">
                <td>Enter Email OTP</td>
                <td><input type="text" className="emailotp" onChange={(e) => setEmailOtp(e.target.value)} /></td>
                <div className="m-7"><button type="button" onClick={() => handleEmailOtp()}>{emailverified ? "✔️": "Verify"}</button></div>
              </tr>)}

              {!isEmailValid && email && (
                <tr>
                  <td colSpan="2">
                    <p style={{ color: "red" }}>Must be an Google account</p>
                  </td>
                </tr>
              )}

              <tr>
                <td>Phone Number:</td>
                <td><input type="tel" name="phonenumber" onChange={(e) => setMobileNumber(e.target.value)} required /></td>
              </tr>

             

              <tr>
                <td>Password:</td>
                <td>
                  <input
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Confirm Password:</td>
                <td>
                  <input
                    type="password"
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </td>
              </tr>

        

              {!passwordsMatch && confirm && (
                <tr>
                  <td colSpan="2">
                    <p style={{ color: "red" }}>Passwords do not match</p>
                  </td>
                </tr>
              )}

              {passwordsMatch && isEmailValid && (
                <tr>
                  <td colSpan="2">
                    <input className="border-1 border-black rounded" type="submit" value="Signup" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </form>
        <a className="text-center" href="/login"><p>Already have an account?</p></a>
      </div>

    </div>
  );
}

export default SignUp;
