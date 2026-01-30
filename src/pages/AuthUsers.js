import SignUp from "../components/SignupComponent";
import Login from "../components/LoginComponent";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AuthUsers(){
    const [pap,setPap] = useState('signup');

    return(
        <div>
            <Navbar/>
            <div className="loguserab">
            <div className="loguser" >
                <button onClick={()=>setPap('login')} className={pap === "login" ? "active" : ""}>Login</button>
                <button onClick={()=>setPap('signup')}className={pap === "signup" ? "active" : ""}>Signup</button>
                
            </div>
            
            {pap === 'login' ? <Login/>:<SignUp/>}
            </div>
            <Footer/>
        </div>
    )
}


export default AuthUsers;





