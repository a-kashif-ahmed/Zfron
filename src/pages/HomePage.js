import ImageSlider from "../components/ImageSlide";
import Navbar from "../components/Navbar";
import TodaysDeal from "../components/TodaysDeal";
import SimilarProducts from '../components/SimilarProducts'
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderContext.js";
import { useEffect } from "react";

function HomePage(){
const {setLoading} =useLoader();
    useEffect(()=>{
        window.scrollTo(0, 0);
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },2000)
    },[])
return(
<div>
    <Navbar/>
    <div className="justify-items-center mt-10">
        
        <TodaysDeal/>
        <SimilarProducts cats='kidswear'/>
        
    </div>
    <Footer/>
</div>
)
}
export default HomePage;
