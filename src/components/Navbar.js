import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartpng from '../assets/cart.png';
import avayar from '../assets/ayavarbg.png'
import searchpng from '../public/search.png';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Required CSS
import { Carousel } from 'react-responsive-carousel';
import bg from '../assets/res (7).jpg'
import bg2 from '../assets/res (6).jpg'
import bg3 from '../assets/res (5).jpg'

function Navbar() {
   const navigate = useNavigate();
   const [logser, setLogser] = useState('');
   const [roo, setRoo] = useState('');
   const [searchstate, setSearchstate] = useState(false);
   const [searchtext, setSearchtext] = useState('');
   const BackendURL = process.env.REACT_APP_BACKEND_URL

   const handleSearch = () => {
      console.log(searchtext);
      if (searchtext.trim()) {
         navigate(`/products?s=${searchtext.trim()}`);
      }
   }

   const handleLogout = () => {
      fetch(`${BackendURL}/auth/logout`, {
         credentials: 'include'
      }).then(res => {
         if (res.ok) {
            localStorage.removeItem('ency');
            localStorage.removeItem('enc')
            console.log('he');
            alert('Logged Out');
            navigate('/')
         }
      })
   }

   useEffect(() => {


      fetch(`${BackendURL}/auth/user`, {
         credentials: 'include'
      })
         .then(res => res.json())
         .then(data => {
            console.log(data.data);
            if (data?.data?.fullname) {
               localStorage.setItem('ency', data.data.role)
               localStorage.setItem('enc', data.data.isApproved ? "true" : "false");
               setRoo(data.data.role);
               setLogser(data.data.fullname);
            }

         })
         .catch(err => console.log("Auth check error:", err));
   }, []); // Only run when route changes

   return (
      <div className="relative w-full overflow-hidden">
         {/* Decorative Background Shapes */}
         <div className="absolute z-20 pointer-events-none">
            {/* Circles */}



            {/* Triangles */}

         </div>

         {/* Foreground Content */}
         {/*<div className="relative z-10 flex justify-center items-center py-12 px-4">
            <Carousel
               className="m-2 car"
               autoPlay
               infiniteLoop
               showThumbs={false}
               showStatus={false}
            >
               {[bg, bg2, bg3].map((imgSrc, index) => (
                  <div key={index} className="relative w-full h-[100px] sm:h-[100px] md:h-[180px] lg:h-[220px] xl:h-[300px] rounded-xl overflow-hidden">
                     <img
                        src={imgSrc}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center ">
                        <h2 className="cartext slideimgtext mix-blend-screen bg-white tracking-wide  text-9xl p-5 pb-0 font-bold">
                           ZOCOSTO
                        </h2>
                     </div>
                  </div>
               ))}
            </Carousel>
         </div> */}
         <nav class=" fixed w-full bg-transparent backdrop-blur-sm  px-4 py-2 mx-auto  shadow-md rounded-md lg:px-8 lg:py-3 m-10 mt-0 ">
            <div class="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
               <a href="/" class=" hover:text-black hover:scale-120 mr-4 text-black font-bold block cursor-pointer py-1.5 text-base text-slate-800 ">
                  Zocosto
               </a>

               <div class=" lg:block">
                  <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
                     <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white ">

                        <a href="/" class="flex items-center text-black hover:text-black hover:scale-120">
                           Home
                        </a>
                     </li>
                     <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white">


                        <a href="/about" class="flex items-center text-black hover:text-black hover:scale-120">
                           About Us
                        </a>
                     </li>
                     <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white">


                        <a href="/products" class="flex items-center text-black hover:text-black hover:scale-120 ">
                           Products
                        </a>
                     </li>

                     {roo === 'vendor' ? (
                        <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white ">


                           <a href="/products/myproducts" class="flex items-center text-black hover:text-black hover:scale-120">
                              My Products
                           </a>
                        </li>
                     ) : (<li hidden></li>)}
                     {roo === 'vendor' ? (
                        <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white ">


                           <a href="/vendor" class="flex items-center text-black hover:text-black hover:scale-120">
                              Vendor Panel
                           </a>
                        </li>
                     ) : (<li hidden></li>)}
                     {roo === 'user' ? (
                        <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white ">


                           <a href="/order/myorders" class="flex items-center text-black hover:text-black hover:scale-120">
                              My Orders
                           </a>
                        </li>
                     ) : (<li hidden></li>)}
                     {roo === 'admin' ? (
                        <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white ">


                           <a href="/admin" class="flex items-center text-black hover:text-black hover:scale-120">
                              Admin Panel
                           </a>
                        </li>
                     ) : (<li hidden></li>)}
                     <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white ">


                        <a href="/category" class="flex items-center text-black hover:text-black hover:scale-120">
                           Category
                        </a>
                     </li>
                     {searchstate && (
                        <li>
                           <form
                              onSubmit={(e) => {
                                 e.preventDefault();
                                 handleSearch();
                              }}
                           >
                              <input
                                 type="text"
                                 className="searchbar text-black px-2 py-1 rounded border border-white bg-transparent focus:outline-none"
                                 placeholder="Search products..."
                                 value={searchtext}
                                 onChange={(e) => setSearchtext(e.target.value)}
                                 autoFocus
                              />
                           </form>

                        </li>
                     )}

                     <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600  hover:border-b-2 border-white">
                        <img
                           className="searchlogo"
                           src={searchpng}
                           alt="search"
                           style={{ height: '23px', width: '23px', cursor: 'pointer' }}
                           onClick={() => {
                              if (searchstate && searchtext.trim()) {
                                 handleSearch();
                              } else {
                                 setSearchstate(true);
                              }
                           }}
                        />
                     </li>


                     {!logser ? (
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600 hover:border-b-2 border-white">
                           <select
                              className="text-black bg-transparent"
                              defaultValue=""
                              onChange={(e) => {
                                 const val = e.target.value;
                                 if (val) window.location.href = val;
                              }}
                           >
                              <option value="" disabled>Login/Signup</option>
                              <option value="/login">User Login</option>
                              <option value="/av/login">Vendor Login</option>
                           </select>
                        </li>
                     ) : (
                        <li
                           class="flex  dropdown max-w-32 items-center p-1 text-sm gap-x-2 text-slate-600">

                           <a href="/profile" alt="profile" class="flex items-center text-black hover:text-black hover:scale-120">{logser} &nbsp; <img src={avayar} width="22%" height="22%" style={{ borderRadius: '2%' }} />

                           </a>
                        </li>

                     )}
                     {!logser ? (
                        <li
                           class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        </li>) : (
                        <ul>
                           <li
                              class="flex items-center p-1 text-sm gap-x-2 text-slate-600 max-w-10">

                              <a href="/cart/all" class="flex items-center text-black"><img src={cartpng} width='100%' height='10%' alt="cart"></img>
                              </a>
                           </li>

                        </ul>

                     )}
                     {!logser ? (<li></li>) : (<li class="flex items-center p-1 text-sm gap-x-2 text-slate-600 max-w-10">
                        <a href='' class="flex items-center text-black" onClick={handleLogout}>Logout</a>
                     </li>)}
                  </ul>
               </div>

            </div>
         </nav>
      </div>


   )
}

export default Navbar;
