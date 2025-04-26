import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaSeedling, FaWater, FaSun, FaLeaf, FaTemperatureHigh, FaMountain, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// Floating 3D Card Component
const AnimatedCard = ({ icon, title, description, delay, color }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      className="relative perspective-1000 w-full sm:w-[300px] h-[250px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden bg-white shadow-xl preserve-3d"
        animate={{
          rotateX: hovering ? 10 : 0,
          rotateY: hovering ? -10 : 0,
          scale: hovering ? 1.05 : 1,
          z: hovering ? 20 : 0,
        }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 rounded-t-2xl h-20"
          style={{ backgroundColor: color }}
        />
        
        <div className="p-6 pt-16 flex flex-col items-center text-center h-full">
          <motion.div
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 relative -mt-14 z-10"
            animate={{
              y: hovering ? -5 : 0,
              boxShadow: hovering ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ duration: 0.4 }}
          >
            {icon}
          </motion.div>
          
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        
        {/* Dynamic reflection effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovering ? 0.5 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            transform: "translateZ(10px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Desert Particle Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-amber-100"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 500 - 250],
            x: [0, Math.random() * 500 - 250],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// 3D Rotating Wheat Model Animation
const WheatAnimation = ({ isInView }) => {
  const stalks = Array.from({ length: 12 }).map((_, i) => ({
    delay: i * 0.1,
    rotate: i % 2 === 0 ? 10 : -10,
    height: 80 + Math.random() * 40,
  }));

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {stalks.map((stalk, i) => (
        <motion.div
          key={i}
          className="absolute origin-bottom"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? {
            scaleY: 1,
            opacity: 1,
            rotateZ: [0, stalk.rotate, 0],
          } : { scaleY: 0, opacity: 0 }}
          transition={{
            duration: 3,
            delay: stalk.delay,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
          }}
          style={{
            height: `${stalk.height}%`,
            width: "4px",
            transform: `rotate(${(i * 30) - 180}deg) translateX(40px)`,
          }}
        >
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-amber-600 to-amber-300 rounded-full" style={{ height: "100%" }} />
          <motion.div
            className="absolute -top-2 -left-2.5 w-6 h-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: stalk.delay + 0.5, duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full text-amber-400" fill="currentColor">
              <path d="M12 2L9.19795 7.4721L3.3999 8.52786L7.59987 12.7279L6.59795 18.5279L12 15.8721L17.4021 18.5279L16.4001 12.7279L20.6001 8.52786L14.8021 7.4721L12 2Z" />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Interactive Growth Timeline
const GrowthTimeline = ({ isInView }) => {
  const growthStages = [
    { 
      title: "Cultivation Begins", 
      description: "Seeds are planted in our custom-formulated sand-soil mix enriched with natural nutrients", 
      icon: <FaSeedling className="text-green-500 text-2xl" />,
      day: "Day 1" 
    },
    { 
      title: "Irrigation Phase", 
      description: "Advanced drip irrigation systems deliver precise water amounts directly to root zones", 
      icon: <FaWater className="text-blue-500 text-2xl" />,
      day: "Day 7-14" 
    },
    { 
      title: "Light Optimization", 
      description: "Crops benefit from the intense Saharan sunlight with 14+ hours of daily exposure", 
      icon: <FaSun className="text-amber-500 text-2xl" />,
      day: "Day 15-30" 
    },
    { 
      title: "Growth Acceleration", 
      description: "Our varieties demonstrate 40% faster growth than conventional crops during this phase", 
      icon: <FaLeaf className="text-emerald-500 text-2xl" />,
      day: "Day 31-60" 
    },
    { 
      title: "Heat Adaptation", 
      description: "Plants fully adapt to temperature extremes, developing enhanced resilience", 
      icon: <FaTemperatureHigh className="text-red-500 text-2xl" />,
      day: "Day 61-90" 
    },
    { 
      title: "Harvest Maturity", 
      description: "Crops reach optimal maturity with exceptional nutrient density and flavor profiles", 
      icon: <FaMountain className="text-amber-700 text-2xl" />,
      day: "Day 91-120" 
    },
  ];

  return (
    <div className="relative">
      {/* Vertical line */}
      <motion.div 
        className="absolute left-[22px] top-10 bottom-10 w-1 bg-amber-200"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />
      
      <div className="space-y-12 relative">
        {growthStages.map((stage, index) => (
          <motion.div 
            key={index}
            className="relative flex items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
          >
            <motion.div 
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-md border-2 border-amber-300 flex items-center justify-center z-10"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8 + (index * 0.2),
                type: "spring",
                stiffness: 300,
                damping: 15
              }}
            >
              {stage.icon}
            </motion.div>
            
            <div className="ml-6 pt-1">
              <div className="text-amber-500 text-sm font-semibold">{stage.day}</div>
              <h4 className="text-xl font-bold mt-1">{stage.title}</h4>
              <p className="text-gray-600 mt-2">{stage.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Drifting Sun Animation
const DriftingSun = () => {
  return (
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 blur-3xl opacity-20 z-0"
      animate={{
        x: [50, 150, 20, 100],
        y: [20, 80, 40, 10],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    />
  );
};

// Main Component
const SaharanCropsDetail = () => {
  const { t } = useLanguage();
  
  // Section refs for animations
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const benefitsRef = useRef(null);
  const statsRef = useRef(null);
  
  // Check if sections are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.1 });
  const isBenefitsInView = useInView(benefitsRef, { once: true, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Modal state for close button
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-5xl mt-16 mb-16 bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <Helmet>
              <title>Premium Saharan Crops | Harvest Brothers</title>
              <meta name="description" content="Discover our premium desert-adapted crops grown with innovative techniques in the Saharan region of Algeria." />
            </Helmet>
            
            {/* Close button */}
            <Link href="/services">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close and return to services"
              >
                <FaTimes className="text-lg" />
              </button>
            </Link>
            
            {/* Hero section */}
            <div ref={heroRef} className="relative h-[40vh] overflow-hidden">
              <ParticleBackground />
              <DriftingSun />
              
              <div 
                className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-700/80 flex items-center justify-center"
              >
                <motion.div 
                  className="text-center px-4"
                  style={{ opacity, scale }}
                >
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Premium Saharan Crops
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl text-white/90 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Our signature harvests with exceptional yield cultivated using innovative techniques optimized for desert conditions
                  </motion.p>
                </motion.div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="px-6 md:px-12 py-12">
              {/* Introduction */}
              <div className="max-w-3xl mx-auto mb-20">
                <motion.p 
                  className="text-lg text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  At Harvest Brothers, we've pioneered revolutionary cultivation methods that transform Saharan terrain into thriving agricultural landscapes. Our premium desert crops represent the perfect fusion of ancient farming wisdom and cutting-edge agricultural science, resulting in exceptional yields despite challenging conditions.
                </motion.p>
              </div>
              
              {/* Wheat Animation Section */}
              <div className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  Desert-Optimized Growth
                </motion.h2>
                
                <WheatAnimation isInView={isHeroInView} />
              </div>
              
              {/* Growth Timeline */}
              <div ref={timelineRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Growth Cycle
                </motion.h2>
                
                <GrowthTimeline isInView={isTimelineInView} />
              </div>
              
              {/* Benefits Cards */}
              <div ref={benefitsRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Unique Advantages
                </motion.h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatedCard 
                    icon={<FaSun className="text-amber-500 text-2xl" />}
                    title="Superior Sun Exposure"
                    description="350+ days of sunlight annually create optimal photosynthesis conditions for exceptional crop development"
                    delay={0.2}
                    color="#FCD34D"
                  />
                  
                  <AnimatedCard 
                    icon={<FaWater className="text-blue-500 text-2xl" />}
                    title="Water Efficiency"
                    description="Our crops require 60% less water than conventional varieties through specialized root systems"
                    delay={0.4}
                    color="#60A5FA"
                  />
                  
                  <AnimatedCard 
                    icon={<FaLeaf className="text-green-500 text-2xl" />}
                    title="Nutrient Density"
                    description="Desert-adapted varieties produce 35% higher protein content and enhanced mineral composition"
                    delay={0.6}
                    color="#4ADE80"
                  />
                </div>
              </div>
              
              {/* Stats & Results */}
              <div ref={statsRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Proven Results
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { value: "40%", label: "Higher Yield vs Standard", color: "from-amber-400 to-amber-600" },
                    { value: "60%", label: "Water Conservation", color: "from-blue-400 to-blue-600" },
                    { value: "35%", label: "Enhanced Nutrient Profile", color: "from-green-400 to-green-600" },
                    { value: "90%", label: "Pest Resistance Rate", color: "from-purple-400 to-purple-600" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
                    >
                      <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
                      <div className="p-6 text-center">
                        <motion.div 
                          className="text-4xl font-bold mb-2"
                          initial={{ scale: 0 }}
                          animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 0.6 + (i * 0.1),
                            type: "spring", 
                            stiffness: 200 
                          }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-gray-600">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* CTA */}
              <div className="text-center pt-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link href="/contact">
                    <a className="inline-block bg-gradient-to-r from-amber-600 to-amber-800 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Invest in Our Premium Crops
                    </a>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaharanCropsDetail;