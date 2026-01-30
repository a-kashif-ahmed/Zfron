
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProdImageSlide = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      className="slider"
    >
      {images.map((imagePath, index) => (
        <div key={index}>
          
            <img
              src={imagePath}
              alt={`Product ${index + 1}`}
              style={{
                maxHeight: '500px',
                objectFit: 'contain',
                margin: 'auto',
                cursor: 'zoom-in'
              }}
            />
          
        </div>
      ))}
    </Carousel>
  );
};

export default ProdImageSlide;
