import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SimilarProducts from '../components/SimilarProducts';
import Footer from '../components/Footer';
import { useLoader } from "../components/LoaderContext.js";
import ImageModal from '../components/ImageModal.js'; // Import the ImageModal component

function ProdPage() {
  const navigate = useNavigate();
  const { setLoading } = useLoader();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const BackendURL = process.env.REACT_APP_BACKEND_URL;
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedcolor, setSelectedColor] = useState('');
  
  // Image modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Handle image click to open modal
  const handleImageClick = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    console.log(id);
    fetch(`${BackendURL}/carts/add/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedSize,
        selectedcolor
      })
    }).then(res => {
      if (res.ok) {
        alert('Item added to cart');
      }
    });
    setLoading(false);
  };

  const handleBuyNow = async () => {
    const selectedProduct = {
      ...product,
      siz: JSON.stringify(selectedSize),
      col: JSON.stringify(selectedcolor)
    };
    navigate(`/order/${id}`, { state: { selectedprod: selectedProduct } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${BackendURL}/items/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(err => console.error("Error fetching product:", err));
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [id, BackendURL]);

  return (
    <div>
      <Navbar />
      {product ? (
        <div className="max-w-4xl mx-auto p-4">
          {/* Image Carousel - Modified to be clickable */}
          {product.images && product.images.length > 0 ? (
            <Carousel
              showThumbs={true}
              showStatus={false}
              className="rounded mb-6"
              onClickItem={handleImageClick}
            >
              {product.images.map((imagePath, index) => (
                <div key={index} className="cursor-pointer">
                  <img
                    src={`${BackendURL}${imagePath}`}
                    alt={`${product.productName} - Image ${index + 1}`}
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="h-64 bg-gray-200 flex items-center justify-center rounded mb-6">
              <p className="text-gray-500">No images available</p>
            </div>
          )}

          <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
          <div className="mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {product.productCategory}
            </span>
          </div>
          <div className='m-7'>
            <h3 className='font-bold'>Sizes:</h3>
            <span className=''>
              <br />
              {product.productSize.map((size, i) => (
                <button key={i} className={`m-3 sels p-3 ${selectedSize === size ? 'inset-shadow-sm/70' : ''}`} value={size} onClick={() => setSelectedSize(size)}>{size}</button>
              ))}
            </span>
          </div>
          <div className='m-7'>
            <h3 className='font-bold'>Colors:</h3>
            <span>
              {product.productColors.map((color, i) => (
                <button className={`m-3 p-3 sels ${selectedcolor === color ? 'inset-shadow-sm/70 ' : ''}`} key={i} value={color} onClick={() => setSelectedColor(color)}>{color}</button>
              ))}
            </span>
          </div>

          <div className="mb-4">
            <h2 className='text-xl'>About Product:</h2>
            <p className=' m-7 text-md'>{product.productDescription}</p>
          </div>

          <h2 className="text-xl font-bold text-left mb-6">₹{product.productPrice}</h2>
          <div className="flex space-x-4">
            <button onClick={handleBuyNow} className="inline-block bg-green-300 hover:bg-green-400 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 transition-colors">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="inline-block bg-yellow-300 hover:bg-yellow-400 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          <div>
            <SimilarProducts cats={product.productCategory} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <h1 className="text-xl text-gray-500">Loading product...</h1>
        </div>
      )}

      {/* Image Zoom Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={product?.images || []}
        currentIndex={modalImageIndex}
        BackendURL={BackendURL}
      />

      <Footer />
    </div>
  );
}

export default ProdPage;