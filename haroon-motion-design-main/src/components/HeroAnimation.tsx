
import { useState } from "react";
import { motion } from "framer-motion";

// Simple fallback component that doesn't use Three.js at all
export default function HeroAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="w-full h-[400px] md:h-[500px] bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-violet-500/20 rounded-xl flex items-center justify-center relative overflow-hidden"
    >
      {/* Static decorative elements instead of 3D */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/30"
            style={{
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
              scale: [1, Math.random() * 0.4 + 0.8],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 3 + 2,
            }}
          />
        ))}
      </div>
      
      {/* Main sphere replacement */}
      <motion.div 
        className="relative z-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full w-48 h-48 md:w-64 md:h-64 shadow-lg"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-white/20"
          style={{ 
            borderRadius: "100%",
            background: "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)" 
          }}
        />
      </motion.div>
      
      {/* Particles replacement */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white w-2 h-2"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}
