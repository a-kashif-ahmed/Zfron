function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md">
      <div className="relative w-20 h-20">
        
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-black/10" />

        {/* Animated ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent
                        border-t-yellow-400 animate-spin" />

        {/* Inner pulse */}
        <div className="absolute inset-3 rounded-full bg-yellow-300/30 animate-pulse" />

      </div>
    </div>
  );
}

export default Loader;
