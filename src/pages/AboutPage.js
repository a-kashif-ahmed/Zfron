import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutPage() {
    return (
        <div>
            <Navbar />
            <div className=" m-7 flex justify-center text-2xl">
                <h1 className="abouthead">Welcome to  <span>Zocosto</span></h1>
            </div>
            <div>
            <p className="m-7 p-7 aboutpara">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Zocosto, where every click sparks discovery and every parcel carries possibility. Born from a love of exploration and a passion for quality, Zocosto stands at the intersection of innovation and everyday delight. We’re more than just a marketplace—we’re your personal curator, your style confidant, and your partner in making life’s little moments shine.We exist to connect you with products that spark joy, fuel creativity, and solve real-life challenges. By championing responsible sourcing, championing emerging makers, and harnessing sustainable practices, we’re committed to building a marketplace that embraces purpose as much as profit. Your well-being and our planet’s health guide every decision we make.</p>
            <p className="m-7 p-7 aboutpara">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What started as a simple idea—to bring thoughtfully curated goods into people’s homes—has blossomed into a thriving community of dreamers, doers, and tastemakers. From handcrafted artisan creations to cutting-edge gadgets, we seek out treasures that surprise, inspire, and add value to your world. Because at Zocosto, we believe shopping should feel like unwrapping a gift, every single time.</p>
            {/* <div className="mb-30 w-full flex justify-center mt-10 z-auto">
                <div className="flex flex-wrap justify-center gap-5 max-w-6xl">
                    {/* Card 1
                    <div className="relative w-[270px] border border-black p-7 bg-white hover:shadow-lg overflow-hidden rounded-lg">
                        {/* Decorative Triangles 
                        <div className="absolute bottom-0 left-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-1" />
                        <div className="absolute top-0 right-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-180" />
                        <h1 className="text-black text-2xl">We Offer</h1>
                        <br />
                        <p className="text-black">
                            Handpick the best, no endless scrolling through mediocre options.
                        </p>
                    </div>

                    {/* Card 2
                    <div className="relative w-[270px] border border-black p-7 bg-white hover:shadow-lg overflow-hidden rounded-lg">
                        <div className="absolute bottom-0 left-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-1" />
                        <div className="absolute top-0 right-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-180" />
                        <h1 className="text-black text-2xl">Commitment</h1>
                        <br />
                        <p className="text-black">Fair pricing for products, You First Policy</p>
                    </div>

                    {/* Card 3 
                    <div className="relative w-[270px] border border-black p-7 bg-white hover:shadow-lg overflow-hidden rounded-lg">
                        <div className="absolute bottom-0 left-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-1" />
                        <div className="absolute top-0 right-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-180" />
                        <h1 className="text-black text-2xl">Why Us?</h1>
                        <br />
                        <p className="text-black">
                            Fast, reliable delivery and friendly customer support who treat you like family.
                        </p>
                    </div>
                </div>
            </div> */} 
            </div>

            <div className="border-1 border-black m-7 rounded-lg w-auto h-auto ">
                <h1 className="m-7 p-6 flex justify-center text-3xl ">Contact Us :</h1>
                <h4 className="m-7 p-6 flex justify-center text-xl">Currently, <br /> We are only available through Email</h4>
                <p className="m-3 p-6 flex justify-center text-lg">Email us at  <a className='mt-20' href="mailto:zocostocom@gmail.com">Zocostocom@gmail.com</a></p>
            </div>
            <Footer />
        </div>
    )
}

export default AboutPage;