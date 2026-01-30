import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from 'react';
import { useLoader } from "../components/LoaderContext.js";

function SignUp() {
  const { setLoading } = useLoader();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [userType,setUserType] = useState('');
  const BackendURL = process.env.REACT_APP_BACKEND_URL
  const passwordsMatch = password && confirm && password === confirm;
  const isEmailValid = email.endsWith("@gmail.com");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="origin-center">
      <Navbar />
      <div className="logform">
        <form action={`${BackendURL}/auth/signup`} method="post">
          <table>
            <tbody>
              <tr>
                <td>Full name:</td>
                <td><input name="fullname" type="text" required /></td>
              </tr>

              <tr>
                <td>Email:</td>
                <td>
                  <input
                    name="email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>

              {!isEmailValid && email && (
                <tr>
                  <td colSpan="2">
                    <p style={{ color: "red" }}>Must be an Google account</p>
                  </td>
                </tr>
              )}
              <tr>
                  <td>Phone Number:</td>
                  <td><input type="tel" name="phone number" required/></td>
                </tr>
              <tr>
                <td>I am:</td>
                <td>
                  <select name="userType" onChange={(e)=> setUserType(e.target.value)}>
                    <option value="user" >User</option>
                    <option value="vendor" >Vendor</option>
                    
                  </select>
                </td>
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
              {userType =='vendor' ? (
                <p>
                <tr>
                  <td>GST Licence Number:</td>
                  <td><input type="text" name="gstno" required/></td>
                </tr>
                <tr>
                  <td>GST Licence Image:</td>
                  <td><input type="file" name="gstimage" required accept="image/png,image/jpg,image/jpeg"/></td>
                </tr>
                <tr>
                  <td>Store Image :</td>
                  <td><input type="file" name="storeimage" required accept="image/png,image/jpg,image/jpeg"/></td>
                </tr>
                <tr>
                  <td> Store Address:</td>
                  <td><textarea placeholder="address" rows={7} cols={30}></textarea></td>
                </tr>
                <tr>
                  <td>Pan Card Number</td>
                  <td><input type="password" name="pancard" required/></td>
                </tr>
                <tr>
                  <td>Pan Card:</td>
                  <td><input type="file" name="panimage" required accept="image/png,image/jpg,image/jpeg"/></td>
                </tr>
                
                </p>
              ):(<tr>

              </tr>)}
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
      <Footer />
    </div>
  );
}

export default SignUp;
