import { useRef } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";

// Apple-style parallax animation component
const ParallaxText = ({ children, delay = 0, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1]  // Apple-style easing
      }}
    >
      {children}
    </motion.div>
  );
};

// Animated grain pattern component
const AnimatedGrain = () => {
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{ 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat"
      }}
      animate={{ 
        opacity: [0.2, 0.25, 0.2],
        backgroundPosition: ["0% 0%", "100% 100%"]
      }}
      transition={{ 
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror"
      }}
    />
  );
};

// Green wheat stalk icon component
const WheatStalks = ({ count = 3, spacing = 10, height = 50, delay = 0, inView }) => {
  return (
    <div className="flex">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div 
          key={i}
          className="relative flex-shrink-0"
          style={{ marginRight: i < count - 1 ? spacing : 0 }}
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { 
            height, 
            opacity: 1,
            rotateZ: [
              -2, 
              2, 
              -2
            ] 
          } : { height: 0, opacity: 0 }}
          transition={{ 
            height: { 
              duration: 0.8, 
              delay: delay + (i * 0.1),
              ease: [0.16, 1, 0.3, 1]
            },
            opacity: { 
              duration: 0.3, 
              delay: delay + (i * 0.1) + 0.2 
            },
            rotateZ: { 
              repeat: Infinity, 
              duration: 2 + i * 0.5, 
              ease: "easeInOut",
              delay: delay + (i * 0.1) + 0.5
            }
          }}
        >
          <div className="absolute bottom-0 w-1 origin-bottom bg-green-600" style={{ height: '100%' }} />
          
          {/* Wheat head */}
          <motion.div
            className="absolute -left-3 -top-6 text-amber-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: delay + (i * 0.1) + 0.8, duration: 0.5 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.19795 7.4721L3.3999 8.52786L7.59987 12.7279L6.59795 18.5279L12 15.8721L17.4021 18.5279L16.4001 12.7279L20.6001 8.52786L14.8021 7.4721L12 2Z" />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const AboutTeaser = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <AnimatedGrain />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -bottom-12 -left-12 w-24 h-24 opacity-10">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, repeatType: "reverse" }
                }}
                className="w-full h-full rounded-full bg-amber-500"
              />
            </div>
            
            <div className="relative z-10">
              <ParallaxText delay={0} inView={isInView}>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                  Pioneering Desert Agriculture
                </h2>
              </ParallaxText>
              
              <ParallaxText delay={0.2} inView={isInView}>
                <p className="text-xl text-gray-600 mb-6">
                  Founded in 2022, Harvest Brothers is a leading Algerian agricultural company specializing in sustainable desert farming with innovative water conservation techniques and region-specific crop selection.
                </p>
              </ParallaxText>
              
              <div className="mb-8">
                <ParallaxText delay={0.4} inView={isInView}>
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Eco-friendly farming practices with minimal environmental impact</span>
                  </div>
                </ParallaxText>
                
                <ParallaxText delay={0.5} inView={isInView}>
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Advanced irrigation technology maximizing water efficiency</span>
                  </div>
                </ParallaxText>
                
                <ParallaxText delay={0.6} inView={isInView}>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Creating over 100 sustainable jobs for local communities</span>
                  </div>
                </ParallaxText>
              </div>
              
              <ParallaxText delay={0.8} inView={isInView}>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center text-green-700 font-medium hover:text-green-800 transition-colors duration-300"
                  >
                    <span>Learn More About Our Story</span>
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </Link>
              </ParallaxText>
            </div>
          </div>
          
          {/* Right Content - Decorative imagery */}
          <div className="lg:w-1/2 relative h-80 lg:h-auto">
            {/* Background decorative elements */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ 
                background: "linear-gradient(135deg, rgba(167,243,208,0.2) 0%, rgba(245,245,220,0.4) 100%)",
                overflow: "hidden"
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Abstract decoration */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-gradient-to-br from-green-200/30 to-amber-100/30 blur-xl" />
              <div className="absolute top-12 right-12 w-24 h-24 rounded-full bg-gradient-to-br from-green-100/40 to-green-200/40 blur-lg" />
            </motion.div>
            
            {/* Wheat stalks decoration */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <WheatStalks count={7} spacing={14} height={120} delay={0.5} inView={isInView} />
            </div>
            
            {/* 3D Floating Stats Boxes */}
            <div className="absolute top-12 right-12">
              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: -10, rotateX: 10 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  rotateY: [-5, 5, -5],
                  rotateX: [5, -5, 5],
                  z: [0, 10, 0]
                } : { opacity: 0, y: 20 }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.7 },
                  y: { duration: 0.8, delay: 0.7 },
                  rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  z: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="bg-white rounded-xl shadow-xl p-5 transform-gpu"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="font-bold text-3xl text-amber-600">3,200</div>
                <div className="text-sm font-medium text-gray-700">Hectares Cultivated</div>
              </motion.div>
            </div>
            
            <div className="absolute bottom-12 left-12">
              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: 10, rotateX: -5 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  rotateY: [5, -5, 5],
                  rotateX: [-5, 5, -5],
                  z: [0, 10, 0]
                } : { opacity: 0, y: 20 }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 1 },
                  y: { duration: 0.8, delay: 1 },
                  rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  z: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }}
                className="bg-white rounded-xl shadow-xl p-5 transform-gpu"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="font-bold text-3xl text-green-700">{t("home.about.stats.jobs")}</div>
                <div className="text-sm font-medium text-gray-700">{t("home.about.stats.jobsLabel")}</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
