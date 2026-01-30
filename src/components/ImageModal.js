import React, { useState, useEffect, useRef } from 'react';
import plusimg from '../public/plus.png'
import minusimg from '../public/minus.png'
import resetimg from '../public/reset.png'

const ImageModal = ({ isOpen, onClose, images, currentIndex, BackendURL }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Reset zoom when modal opens or image changes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setCurrentImageIndex(currentIndex);
    }
  }, [isOpen, currentIndex]);

  // Handle wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(5, scale + delta));
    setScale(newScale);
  };

  // Handle touch zoom (pinch)
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      setDragStart({ x: touch1.clientX, y: touch1.clientY, distance });
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 2 && dragStart.distance) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      const scaleChange = distance / dragStart.distance;
      const newScale = Math.max(0.5, Math.min(5, scale * scaleChange));
      setScale(newScale);
      setDragStart({ ...dragStart, distance });
    } else if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  };

  // Handle mouse drag
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Navigate images
  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case '+':
        case '=':
          setScale(prev => Math.min(5, prev + 0.2));
          break;
        case '-':
          setScale(prev => Math.max(0.5, prev - 0.2));
          break;
        case '0':
          setScale(1);
          setPosition({ x: 0, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentImageIndex, images.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
      >
        ×
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white text-sm z-10">
        {currentImageIndex + 1} / {images.length}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
        <button style={{maxWidth:'40px'}}
          onClick={() => setScale(prev => Math.min(5, prev + 0.2))}
          className="bg-white bg-opacity-20 text-white px-3 py-1 rounded hover:bg-opacity-30 "
        >
          <img src={plusimg} width='100%' height='100%'/>
        </button>
        <button style={{maxWidth:'40px'}}
          onClick={() => setScale(prev => Math.max(0.5, prev - 0.2))}
          className="bg-white bg-opacity-20 text-white px-3 py-1 rounded hover:bg-opacity-30"
        >
          <img src={minusimg} width='100%' height='100%'/>
        </button>
        <button style={{maxWidth:'40px'}}
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
          className="bg-white bg-opacity-20 text-white px-2 py-1 rounded hover:bg-opacity-30 text-xs"
        >
          <img src={resetimg} width='100%' height='100%'/>
        </button>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
            disabled={currentImageIndex === 0}
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
            disabled={currentImageIndex === images.length - 1}
          >
            ›
          </button>
        </>
      )}

      {/* Image container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <img
          ref={imageRef}
          src={`${BackendURL}${images[currentImageIndex]}`}
          alt={`Product image ${currentImageIndex + 1}`}
          className="max-w-full max-h-full object-contain select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
          draggable={false}
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 text-white text-xs opacity-70">
        <div>Scroll/Pinch to zoom</div>
        <div>Drag to pan • ESC to close</div>
        <div>Arrow keys to navigate</div>
      </div>
    </div>
  );
};

export default ImageModal;