import {useNavigate} from 'react-router-dom'
function VerifyOTP(){
    const navigate= useNavigate();
    // const handleSubmit = async (e) =>{
    //         e.preventDefault();
    //         const formData = new FormData(e.target)
    //         console.log(formData);
    //         fetch('http://localhost:8013/auth/verifyotp',{
    //             credentials:'include',
    //             body:formData,
    //             method:"POST"
    //         }).then(res=>{
    //             if(res.ok){
    //                 navigate('http://localhost:3000/resetpassword');
    //                 console.log('Sab Changa Si');
    //             }
    // //         })
    // } 
    return(
        <div className="m-3 p-3">
            <form action='http://localhost:8013/auth/verifyotp' method='POST'>
            <label className="m-1">Enter OTP:</label>
            <input className="m-1" type="text" name="otp" />
            <input className="m-1"  type="submit" name="Verify"/>
            </form>
        </div>
    )
}


export default VerifyOTP;