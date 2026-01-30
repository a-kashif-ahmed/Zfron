function Tabs() {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="flex flex-wrap justify-center gap-5 max-w-6xl">
        {/* Card 1 */}
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

        {/* Card 2 */}
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
  );
}

export default Tabs;
