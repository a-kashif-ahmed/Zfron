import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import mensfashion from "../public/menfashion.jpg";
import womensfashion from "../public/womenfashion.jpg";
import kidsfashion from "../public/kidsfashion.jpg";
import watches from "../public/watches.jpg";
import collage from "../public/collage.png"

function CategoryPagePreview() {
    const navigate = useNavigate();

    const handleCardClick = (i) => {
        navigate(`/category/selected?c=${i}`);
    };

    return (
        <div>
            <Navbar />
            <h1 className=" m-3 text-center  text-6xl">Categories</h1>
            <div className="flex flex-wrap justify-center mt-10">
                 <div
                    onClick={()=>handleCardClick("All")}
                    className=" m-7 relative cursor-pointer max-w-sm bg-white border-1 border-black rounded-lg shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <img
                        className="w-full h-64 object-cover rounded-lg"
                        src={collage}
                        alt="Mens Fashion"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 flex">
                        <h2 className="text-black text-lg font-bold text-center">
                            All Collections
                        </h2>

                    </div>
                </div>
                <div
                    onClick={()=>handleCardClick("Men")}
                    className=" m-7 relative cursor-pointer max-w-sm bg-white border-1 border-black rounded-lg shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <img
                        className="w-full h-64 object-cover rounded-lg"
                        src={mensfashion}
                        alt="Mens Fashion"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 flex">
                        <h2 className="text-black text-lg font-bold text-center">
                            Men's Collection
                        </h2>

                    </div>
                </div>
                 <div 
                    onClick={()=>handleCardClick("Women")}
                    className=" m-7 relative cursor-pointer max-w-sm bg-white border-1 border-black rounded-lg shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <img
                        className="w-full h-64 object-cover rounded-lg"
                        src={womensfashion}
                        alt="Mens Fashion"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 flex">
                        <h2 className="text-black text-lg font-bold text-center">
                            Women's Collection
                        </h2>

                    </div>
                </div>
                 <div
                    onClick={()=>handleCardClick("Kids")}
                    className=" m-7 relative cursor-pointer max-w-sm bg-white border-1 border-black rounded-lg shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <img
                        className="w-full h-64 object-cover rounded-lg"
                        src={kidsfashion}
                        alt="Mens Fashion"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 flex">
                        <h2 className="text-black text-lg font-bold text-center">
                            Kid's Collection
                        </h2>

                    </div>
                </div>
                 <div 
                    onClick={()=>handleCardClick("Watches")}
                    className=" m-7 relative cursor-pointer max-w-sm bg-white border-1 border-black rounded-lg shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <img
                        className="w-50 h-50 object-cover rounded-lg"
                        src={watches}
                        alt="Mens Fashion"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-4 flex">
                        <h2 className="text-black text-lg font-bold text-center">
                            Watches Collection
                        </h2>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default CategoryPagePreview;
