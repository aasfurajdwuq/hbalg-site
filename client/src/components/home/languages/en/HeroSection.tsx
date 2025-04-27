import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { iconLogo } from "@/assets/image-imports";
import { TypewriterMultiple } from "@/components/ui/typewriter-multiple";

const EnglishHeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Define the typewriter phrases
  const headingPhrases = [
    "Harvest Brothers",
    "Seeds of Algeria",
    "From Algerian Fields, for the World",
    "Best in Algeria",
    "Turning Sahara into Fields of Opportunity"
  ];

  // Load the video after component mount
  useEffect(() => {
    // Animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Clean up
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-green-900">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/images/fields-poster.jpg"
        >
          <source src="/videos/wheat-field.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <div className="text-center">
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <img src={iconLogo} alt="Harvest Brothers Logo" className="w-20 h-20" />
          </motion.div>
          
          {/* Main headline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-4"
          >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
              <TypewriterMultiple
                phrases={headingPhrases}
                typingSpeed={100}
                deletingSpeed={80}
                pauseTime={2000}
                className="bg-gradient-to-r from-amber-300 to-green-100 bg-clip-text text-transparent"
              />
            </h1>
            <p className="text-xl md:text-2xl text-stone-100 mt-4 max-w-2xl mx-auto">
              From Algerian Fields, to the World.
            </p>
          </motion.div>
          
          {/* Subheadline with delay */}
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-stone-200 mb-8 max-w-3xl mx-auto"
          >
            Premium sustainable desert agriculture.
          </motion.p>
          
          {/* CTA Buttons with staggered animation */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <Link href="/contact">
              <motion.div
                className="bg-wheat text-charcoal font-medium px-8 py-3 rounded-lg shadow-xl hover:bg-wheat-dark transition-all duration-300 cursor-pointer will-change-transform"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: [1, 0.8, 1], y: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  Contact Us
                </motion.span>
              </motion.div>
            </Link>
            
            <Link href="/investors">
              <motion.div
                className="border-2 border-wheat-light text-white font-medium px-8 py-3 rounded-lg shadow-xl hover:bg-wheat-light/20 transition-all duration-300 cursor-pointer will-change-transform"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: [1, 0.8, 1], y: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  Investment Opportunities
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Scroll indicator - Apple style */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
              <motion.div 
                initial={{ y: 0 }}
                animate={{ y: 10 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="w-1 h-2 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnglishHeroSection;