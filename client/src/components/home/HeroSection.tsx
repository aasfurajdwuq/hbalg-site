import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { iconLogo } from "@/assets/image-imports";
import { TypewriterMultiple } from "@/components/ui/typewriter-multiple";

const HeroSection = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Define the typewriter phrases and subtitles
  const headingPhrases = [
    "Premium Algerian Agriculture Investments",
    "Sustainable Desert Farming Technology",
    "High-Yield Agricultural Opportunities",
    "Advanced Irrigation Solutions",
    "Eco-Friendly Farming Innovation"
  ];
  
  const subtitlePhrases = [
    "Innovative farming with advanced agricultural techniques",
    "Transforming arid lands into productive ecosystems",
    "Secure investments with 5-10% annual returns",
    "Join our mission for sustainable food production",
    "Supporting communities while growing your wealth"
  ];

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
      
      {/* Dynamic farm fields background with animation */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=85" 
          alt="Diverse agricultural fields" 
          className="w-full h-full object-cover opacity-90" 
        />
      </motion.div>
      
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
          
          {/* TypewriterMultiple component with changing phrases */}
          <motion.div
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <TypewriterMultiple 
              phrases={headingPhrases}
              subtitles={subtitlePhrases}
              typingSpeed={40}
              pauseTime={3000}
              className="max-w-3xl mx-auto"
            />
          </motion.div>
          
          {/* CTA buttons with advanced animation effects */}
          <motion.div 
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link href="/contact">
              <motion.div 
                className="bg-white bg-opacity-20 backdrop-blur-lg text-white font-medium py-4 px-8 rounded-full border border-white/25 cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: [1, 0.8, 1], y: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  Get in Touch
                </motion.span>
              </motion.div>
            </Link>
            <Link href="/investors">
              <motion.div 
                className="bg-white text-black font-medium py-4 px-8 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#f8f8f8",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

export default HeroSection;
