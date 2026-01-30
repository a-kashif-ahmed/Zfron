import Navbar from "../components/Navbar";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderContext.js";


function Login() {
  const {setLoading} =useLoader();
  const navigate = useNavigate();
  const [msg,serMsg] = useState('');
  const [visitor, setVisitor] = useState("user");
  const BackendURL = process.env.REACT_APP_BACKEND_URL
const handleSubmit = async (e) => {
  
setLoading(true);
  e.preventDefault();

  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  const res = await fetch(`${BackendURL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      role: visitor,
    }),
  });


    const data = await res.json();

    if (res.ok && data?.role) {
      localStorage.setItem("ency", JSON.stringify({ role: data.role }));
      navigate('/home')
    } 
    if(res.status === 404){
       alert("User not found. Please check your email.");
    }
    
  
    
 setLoading(false);
  };

  return (
    <div className="origin-center">
      

      <div className="logform">
       

        {/* Intercept this form onSubmit */}
        <form onSubmit={handleSubmit}>
          <table>
            <tr>
              <td>Email or Mobile:</td>
              <td><input type="text" name="email" required /></td>
            </tr>
            <tr>
              <td>Password:</td>
              <td><input type="password" name="password" required /></td>
            </tr>
            <tr>
              <td colSpan="2">
                <input
                  className="border-1 border-black rounded"
                  type="submit"
                  value="Login"
                />
              </td>
            </tr>
            <input hidden name="role" value={visitor} />
          </table>
        </form>

        <div className="flex">
          <a className="text-center m-2 p-1" href="/signup">
            <p>Create an account</p>
          </a>
          <br />
          <a className="text-center m-2 p-1" href="/generateotp">
            <p>Reset Password</p>
          </a>
        </div>
        {msg && <div>
          <p>{msg}</p>
          </div>}
      </div>
      
    </div>
  );
}

export default Login;
  