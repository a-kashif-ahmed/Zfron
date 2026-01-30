import {useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../components/LoaderContext.js";


function EmailVerifyPage(){
    const {setLoading} =useLoader();
    const navigate = useNavigate();
      const [password, setPassword] = useState("");
      const [confirm, setConfirm] = useState("");
      const BackendURL = process.env.REACT_APP_BACKEND_URL
      const passwordsMatch = password && confirm && password === confirm;

      const handleSubmit = () =>{
        
setLoading(true);
        fetch(`${BackendURL}/auth/resetpassword`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newpass:confirm})
      }).then(res=>{
        if(res.ok){
            navigate('/login')
        }
      })
      setLoading(false);
      }
    return(
        <div>
<Navbar/>
<h1 className="m-2 text-center text-xl">Reset Password:</h1>
<div className="shadow-md logform">
    <form onSubmit={handleSubmit()}>
    <table>
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
              {passwordsMatch && (
                <tr>
                  <td colSpan="2">
                    <input type="submit" value="Change password" />
                  </td>
                </tr>
              )}
    </table>
    </form>
</div>
<Footer/>
        </div>
    )
}


export default ResetPassword;