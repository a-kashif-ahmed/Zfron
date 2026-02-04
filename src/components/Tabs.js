function Tabs() {
  return (
    <div className="relative w-full flex justify-center mt-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl">

        {/* Card */}
        {[
          {
            title: "We Offer",
            desc: "Carefully curated picks — no endless scrolling, only what truly matters."
          },
          {
            title: "Commitment",
            desc: "Transparent pricing, thoughtful quality, and a customer-first promise."
          },
          {
            title: "Why Zocosto?",
            desc: "Fast delivery, reliable service, and support that actually cares."
          }
        ].map((item, i) => (
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

  <h2 className="relative text-2xl font-semibold text-gray-900 mb-4">
    {item.title}
  </h2>

  <p className="relative text-gray-700 leading-relaxed">
    {item.desc}
  </p>
</div>

        ))}

      </div>
    </div>
  );
}

export default Tabs;
