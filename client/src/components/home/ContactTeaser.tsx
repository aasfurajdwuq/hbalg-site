import { useRef } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { africaIcon } from '@/assets/image-imports';

// Apple-style floating particle animation
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ 
              width: size, 
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
              opacity: 0.2
            }}
            animate={{ 
              x: [
                0,
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
                0
              ],
              y: [
                0,
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
                0
              ],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
};

// Animated Location Pin
const AnimatedLocationPin = ({ inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      {/* Africa outline */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.2 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <img src={africaIcon} alt="Africa map" className="w-36 h-36" />
      </motion.div>
      
      {/* Pin location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          className="w-6 h-6 bg-red-500 rounded-full relative z-20"
          animate={{ 
            scale: [1, 1.2, 1],
            backgroundColor: ["#ef4444", "#b91c1c", "#ef4444"]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        
        {/* Ripple effect */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-red-500 z-10"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 3 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              repeatDelay: 0.2,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Label */}
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md z-30 whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <span className="text-sm font-medium">Timimoun, Algeria</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ContactTeaser = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <section 
      ref={ref} 
      className="relative py-24 bg-gradient-to-br from-green-800 to-amber-700 text-white overflow-hidden"
    >
      <FloatingParticles />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {t("home.contact.title")}
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xl font-light mb-8">
                {t("home.contact.description")}
              </p>
            </motion.div>
            
            {/* Contact Info with Apple-style animations */}
            <div className="space-y-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>kwph123@aol.com</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span>+213 662 67 52 91 (Algeria)</span>
                  <span>+1 347 446 2141 (USA)</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>Timimoun, Algeria</span>
              </motion.div>
            </div>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-800 py-3 px-8 rounded-full inline-flex items-center transition-colors duration-300"
                >
                  <span className="font-medium">{t("home.contact.cta")}</span>
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          {/* Right Content - Map Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative bg-white/10 backdrop-blur-sm rounded-2xl h-96 overflow-hidden"
          >
            <AnimatedLocationPin inView={isInView} />
          </motion.div>
        </div>
      </div>
      
      {/* Apple-style bottom blur gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent"
      />
    </section>
  );
};

export default ContactTeaser;
