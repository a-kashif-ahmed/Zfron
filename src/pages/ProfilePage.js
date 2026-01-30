import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ayavar from '../assets/ayavarbg.png'
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderContext.js";

function ProfilePage() {
    const { setLoading } = useLoader();
    const [user, setUser] = useState();
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedMobile, setUpdatedMobile] = useState('');
    const [updatedAddress, setUpdatedAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [emailotp, setEmailOtp] = useState('');
    const [emailotpverified, setEmailOtpverified] = useState(false);
    const [clickBtn, setClickBtn] = useState(false);

    const BackendURL = process.env.REACT_APP_BACKEND_URL;

    const genEmailOtp = async () => {
        const res = await fetch(`${BackendURL}/auth/generateotp`, {
            method: "POST",
            body: JSON.stringify({ updatedEmail }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.ok) {
            setEmailOtp(true);
        }

    }
    const handleEmailOtp = async () => {
        const ress = await fetch(`${BackendURL}/auth/verifyotp`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ updatedEmail, emailotp }),
            method: 'POST'
        });
        if (ress.ok) {
            setEmailOtpverified(true);

        }
    }


    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('updatedName', updatedName);
        formData.append('updatedEmail', updatedEmail);
        formData.append('updatedMobile', updatedMobile);
        formData.append('updatedAddress', updatedAddress);
        formData.append('profileimage',profileImage);


        try {
            const response = await fetch(`${BackendURL}/auth/user`, {
                method: "POST",
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                alert("Product added successfully!");
                console.log("Success:", data);
            } else {
                const err = await response.json();
                alert("Failed to add product.");
                console.error("Error:", err);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Something went wrong.");
        }
    }

    useEffect(() => {
        setLoading(true);
        fetch(`${BackendURL}/auth/profile`, {
            credentials: 'include'
        }).then(res => res.json()).then(data => {
            setUser(data);
        })

        setLoading(false);
    }, [])
    return (
        <div className="text-center">
            <Navbar />
            <h1 className="text-center text-3xl">Profile</h1>

            {user ? (<div>
                <div className="flex justify-center"><img alt="profile image" src={`${BackendURL}${user.profile}`} width='10%' height='10%' /></div>
                <label>Name : {user.fullname}</label>
                <br />
                <br />
                <label>Email : {user.email}</label>
                <br />
                <br />
                <label>{user.role === 'user' ? "Amount Spent So Far : " : "Earned So Far : "}{user.spent}</label>
                <br />   <br />

                <button className="bg-black text-white p-2 rounded-lg" onClick={() => setClickBtn(!clickBtn)}>Edit profile</button>
                <br />
                {clickBtn ? (<div>
                    <h3 className="m-7">Note : The Details of the existing orders will be changed </h3>
                    <form onSubmit={handleProfileUpdate} className=" logform rounded border-1 border-gray-300  ">
                        <table>
                            <tr>
                                <td>Enter new name</td>
                                <td><input type="text" onChange={(e) => setUpdatedName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Enter new email</td>
                                <td><input type="text " onChange={(e) => setUpdatedEmail(e.target.value)} /></td>
                                <div className="m-7"><button type="button" className="border-1 border-black p-1" onClick={() => genEmailOtp()

                                }>{emailotpverified ? "✔️" : "Verify"}</button></div>
                            </tr>
                            {updatedEmail && (<tr className="emot">
                                <td>Enter Email OTP</td>
                                <td><input type="text" className="emailotp" onChange={(e) => setEmailOtp(e.target.value)} /></td>
                                <div className="m-7"><button type="button" onClick={() => handleEmailOtp()}>{emailotpverified ? "✔️" : "Verify"}</button></div>
                            </tr>)}
                            <tr>
                                <td>Enter new mobile</td>
                                <td><input type="number" onChange={(e) => setUpdatedMobile(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Enter new address</td>
                                <td><input type="text " onChange={(e) => setUpdatedAddress(e.target.value)} /></td>

                            </tr>


                            <tr>
                                <td>Select Profile</td>
                                <td><input type="file" accept="image/*" name="profileimage" onChange={(e) => setProfileImage(e.target.files[0])} />
                                </td>
                            </tr>
                            {emailotpverified && <tr>
                                <td colSpan='2'><input type="submit" value="Submit" name="Submit" /></td>
                            </tr>}
                        </table>
                    </form>
                    <div>

                    </div>
                </div>) : (<div>

                </div>)}
            </div>) : (<div> No User Found Login </div>)}
            <Footer />
        </div>
    )
}



export default ProfilePage;