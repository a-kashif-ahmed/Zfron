import hero from '../assets/hero.jpg';

const ImageSlider = () => {
  return (
    <div className="z-0 mt-17 relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-3xl shadow-xl">
      
      {/* Background Image */}
      <img
        src={hero}
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center p-0">
       
       <h2 className="cartext slideimgtext tex-white bg-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl px-2 py-7 pb-0  rounded-md shadow-md">
  ZOCOSTO
</h2>

      </div>
    </div>
  );
};

export default ImageSlider;
