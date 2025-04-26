import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { iconLogo } from "@/assets/image-imports";

const HeroSection = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  // Apple-inspired text animation variants
  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Apple-like cubic bezier
      }
    }
  };

  const subheadVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Premium full-screen background with overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
      
      {/* High quality wheat field background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1588667458832-058afb28e341?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=85" 
          alt="Premium Saharan wheat" 
          className="w-full h-full object-cover opacity-90" 
        />
      </div>
      
      {/* Content with Apple-like animations */}
      <div className="container mx-auto px-4 z-20 max-w-5xl">
        <div className="text-center">
          {/* Logo animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex justify-center"
          >
            <img src={iconLogo} alt="Harvest Brothers" className="h-24 w-auto" />
          </motion.div>
          
          {/* Headline with Apple-style animation */}
          <motion.h1 
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white tracking-tight"
          >
            Premium Saharan Wheat Investment
          </motion.h1>
          
          {/* Subheading with Apple-style animation */}
          <motion.p 
            variants={subheadVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 max-w-3xl mx-auto font-light"
          >
            Join our high-growth agricultural enterprise with exceptional investor returns
          </motion.p>
          
          {/* CTA buttons with Apple-style animation */}
          <motion.div 
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link href="/contact">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg text-white font-medium py-4 px-8 rounded-full hover:bg-opacity-30 transition-all duration-300 cursor-pointer border border-white/25">
                Get in Touch
              </div>
            </Link>
            <Link href="/investors">
              <div className="bg-white text-black font-medium py-4 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 cursor-pointer">
                Investment Opportunities
              </div>
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

export default HeroSection;
