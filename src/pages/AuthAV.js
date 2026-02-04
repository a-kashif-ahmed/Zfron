import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VenAdLogin from "../components/VenAdLogin";
import VenAdSignUp from "../components/VenAdSignup";

function AuthAv(){
    const [pap,setPap] = useState('signup');

    return(
        <div className="">
            <Navbar/>
            <div className="loguserab">
            <div className="loguser " >
                <button onClick={()=>setPap('login')} className={pap === "login" ? "active" : ""}>Login</button>
                <button onClick={()=>setPap('signup')}className={pap === "signup" ? "active" : ""}>Signup</button>
                
            </div>
            
            {pap === 'login' ? <VenAdLogin/>:<VenAdSignUp/>}
            </div>
            <Footer/>
        </div>
    )
}


export default AuthAv;





