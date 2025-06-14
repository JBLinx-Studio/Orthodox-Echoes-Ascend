
import { motion } from "framer-motion";

export function CathedralHeader() {
  return (
    <motion.div 
      className="text-center mb-16 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 pointer-events-none z-0">
        {/* Glowing Orthodox cross icon */}
        <span className="text-gold/60 text-8xl md:text-9xl glow-shadow drop-shadow-glow select-none animate-pulse">☦</span>
      </div>
      <h1 className="byzantine-title">Contact Us</h1>
      <div className="w-28 h-1 bg-gradient-to-r from-gold/30 via-gold/80 to-gold/30 mx-auto mt-0 mb-4 animate-shimmer rounded-xl pointer-events-none" />
      <p className="text-xl text-white/90 max-w-3xl mx-auto font-body relative z-10 drop-shadow mb-2">
        We welcome your questions, prayer requests, and spiritual inquiries.<br />
        <span className="text-gold/90 font-semibold">Reach out and walk together in the Orthodox faith.</span>
      </p>
    </motion.div>
  );
}
