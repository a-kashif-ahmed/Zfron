
import ImageSlider from "../components/ImageSlide";
import Navbar from "../components/Navbar";
import TodaysDeal from "../components/TodaysDeal";
import SimilarProducts from "../components/SimilarProducts";
import Footer from "../components/Footer";
import { useLoader } from "../components/LoaderContext.js";
import { useEffect } from "react";
import Tabs from "../components/Tabs.js";
function LandingPage(){
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
    <div className="justify-items-center mt-3">
        
        <ImageSlider/>
        {/* <TodaysDeal/> */}
        <SimilarProducts cats='women'/>
        <h1 className="text-3xl mt-10"> Our Vision:</h1>
        <Tabs/>
        
        
    </div>
    <Footer/>
</div>
)
}
export default LandingPage;
