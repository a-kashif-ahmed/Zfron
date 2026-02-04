import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutPage() {
    return (
        <div>
            <Navbar />
            <div className=" m-7 mt-10 flex justify-center text-2xl  ">
                <h1 className="abouthead">Welcome to  <span>Zocosto</span></h1>
            </div>
            <div>
           <div className="max-w-4xl mx-auto px-6 py-16">
  <p className="aboutpara text-lg leading-relaxed text-gray-700 mb-8">
    Welcome to <span className="font-semibold text-black">Zocosto</span> —
    where every click leads to discovery and every delivery carries intent.
    Built on a love for exploration and a commitment to quality, Zocosto lives
    at the intersection of innovation and everyday living. We’re more than a
    marketplace — we’re a curator of meaningful finds, a guide to modern style,
    and a partner in elevating life’s small moments.
  </p>

  <p className="aboutpara text-lg leading-relaxed text-gray-700 mb-8">
    Our purpose is simple: to connect you with products that inspire joy,
    encourage creativity, and solve real-world needs. By supporting responsible
    sourcing, uplifting emerging creators, and embracing sustainable practices,
    we strive to build a platform that values purpose as much as progress.
    Every choice we make is guided by care — for our customers and for the
    world we share.
  </p>

  <p className="aboutpara text-lg leading-relaxed text-gray-700">
    What began as a simple idea — thoughtfully curated goods for everyday life —
    has grown into a community of curious minds and modern tastemakers. From
    handcrafted pieces to innovative essentials, each product is chosen to
    surprise, inspire, and add genuine value. At Zocosto, shopping isn’t just
    a transaction — it’s the feeling of unwrapping something special, every
    single time.
  </p>
</div>

            <div className="mb-30 w-full flex justify-center mt-10 z-auto">
                <div className="flex flex-wrap justify-center gap-5 max-w-6xl">
                    {/* Card 1*/} 
                    <div className="relative w-[270px] border border-black p-7 bg-white hover:shadow-lg overflow-hidden rounded-lg">
                        {/* Decorative Triangles */} 
                        <div className="absolute bottom-0 left-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-1" />
                        <div className="absolute top-0 right-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-180" />
                        <h1 className="text-black text-2xl">We Offer</h1>
                        <br />
                        <p className="text-black">
                            Handpick the best, no endless scrolling through mediocre options.
                        </p>
                    </div>

                    {/* Card 2*/} 
                    <div className="relative w-[270px] border border-black p-7 bg-white hover:shadow-lg overflow-hidden rounded-lg">
                        <div className="absolute bottom-0 left-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-1" />
                        <div className="absolute top-0 right-[-10%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-180" />
                        <h1 className="text-black text-2xl">Commitment</h1>
                        <br />
                        <p className="text-black">Fair pricing for products, You First Policy</p>
                    </div>

                    {/* Card 3 */} 
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
            </div> 
            </div>

            <div className="min-h-[60vh] flex items-center justify-center px-4">
  <div className="max-w-sm w-full rounded-2xl border border-black/10 bg-white/60 backdrop-blur-md shadow-sm p-8 text-center overflow-hidden">
  <div className="absolute bottom-0 left-[-7%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-1 " />
                        <div className="absolute top-0 right-[-7%] w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-yellow-400 opacity-40 rotate-180" />
    
    <h1 className="text-3xl tracking-tight mb-4">
      Contact Us
    </h1>

    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
      Currently, we’re available only via email.
    </p>

    <p className="text-base">
      Email us at <br />
      <a
        href="mailto:zocostocom@gmail.com"
        className="inline-block mt-2 text-black font-medium underline underline-offset-4 hover:opacity-70 transition"
      >
        zocostocom@gmail.com
      </a>
    </p>

  </div>
</div>

            <Footer />
        </div>
    )
}

export default AboutPage;