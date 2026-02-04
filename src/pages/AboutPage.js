import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tabs from "../components/Tabs";

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

        <Tabs/>    
        <div className="min-h-[60vh] flex items-center justify-center px-4">
  <div
  className="group relative rounded-2xl p-8
             bg-white/70 backdrop-blur-md
             border border-black/10
             shadow-sm
             transition-all duration-300
             hover:-translate-y-2 hover:shadow-xl"
>
  {/* LEFT glow */}
  <div className="absolute inset-0 rounded-2xl opacity-0
                  group-hover:opacity-100 transition
                  bg-gradient-to-r from-yellow-200/30 to-transparent" />

  {/* RIGHT glow */}
  <div className="absolute inset-0 rounded-2xl opacity-0
                  group-hover:opacity-100 transition
                  bg-gradient-to-l from-yellow-200/30 to-transparent" />
    
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
        </div>
    )
}

export default AboutPage;