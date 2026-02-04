import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartpng from '../assets/cart.png';
import avayar from '../assets/ayavarbg.png'
import searchpng from '../public/search.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
  const BackendURL = process.env.REACT_APP_BACKEND_URL;

  const handleSearch = () => {
    if (searchtext.trim()) {
      navigate(`/products?s=${searchtext.trim()}`);
    }
  };

  const handleLogout = () => {
    fetch(`${BackendURL}/auth/logout`, { credentials: 'include' })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('ency');
          localStorage.removeItem('enc');
          navigate('/');
        }
      });
  };

  useEffect(() => {
    fetch(`${BackendURL}/auth/user`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data?.data?.fullname) {
          localStorage.setItem('ency', data.data.role);
          localStorage.setItem('enc', data.data.isApproved ? "true" : "false");
          setRoo(data.data.role);
          setLogser(data.data.fullname);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden max-h-">
      <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm shadow-md z-50 px-3 sm:px-4 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-slate-800">

          {/* Logo */}
          <a href="/" className="text-black font-bold text-base sm:text-lg">
            Zocosto
          </a>

          {/* Nav Links */}
          <ul className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-sm">

            <li><a href="/" className="text-black hover:underline">Home</a></li>
            <li><a href="/about" className="text-black hover:underline">About Us</a></li>
            <li><a href="/products" className="text-black hover:underline">Products</a></li>

            {roo === 'vendor' && (
              <>
                <li><a href="/products/myproducts" className="text-black hover:underline">My Products</a></li>
                <li><a href="/vendor" className="text-black hover:underline">Vendor Panel</a></li>
              </>
            )}

            {roo === 'user' && (
              <li><a href="/order/myorders" className="text-black hover:underline">My Orders</a></li>
            )}

            {roo === 'admin' && (
              <li><a href="/admin" className="text-black hover:underline">Admin Panel</a></li>
            )}

            <li><a href="/category" className="text-black hover:underline">Category</a></li>

            {/* Search */}
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
                    className="text-black  rounded border border-black bg-transparent w-12 sm:w-40"
                    placeholder="Search..."
                    value={searchtext}
                    onChange={(e) => setSearchtext(e.target.value)}
                    autoFocus
                  />
                </form>
              </li>
            )}

            <li>
              <img
                src={searchpng}
                alt="search"
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  if (searchstate && searchtext.trim()) handleSearch();
                  else setSearchstate(!searchstate);
                }}
              />
            </li>

            {/* Auth */}
            {!logser ? (
              <li>
                <select
                  className="text-black bg-transparent text-sm"
                  defaultValue=""
                  onChange={(e) => e.target.value && (window.location.href = e.target.value)}
                >
                  <option value="" disabled>Login</option>
                  <option value="/login">User</option>
                  <option value="/av/login">Vendor</option>
                </select>
              </li>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <a href="/profile" className="flex items-center gap-2 text-black">
                    {logser}
                    <img src={avayar} className="w-6 h-6 rounded-sm" />
                  </a>
                </li>

                <li>
                  <a href="/cart/all">
                    <img src={cartpng} className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <button onClick={handleLogout} className="text-black text-sm">
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
