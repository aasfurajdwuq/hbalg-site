import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaWater, FaTint, FaCloudRain, FaSeedling, FaTimes, FaChartLine, FaLongArrowAltRight } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// Water Droplet Animation
const WaterDroplets = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-3 rounded-full bg-blue-400 opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          animate={{
            y: [0, window.innerHeight + 50],
            x: [0, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            ease: "easeIn",
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
};

// Animated Water Flow Diagram
const WaterFlowDiagram = ({ isInView }) => {
  return (
    <div className="relative h-[400px] w-full">
      {/* Left-to-right flow line */}
      <motion.div 
        className="absolute top-1/2 left-0 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      {/* Drip lines */}
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} className="absolute" style={{ left: `${index * 20 + 10}%`, top: "50%" }}>
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2 + (index * 0.2) }}
          >
            {/* Vertical line */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-blue-500"
              initial={{ height: 0 }}
              animate={isInView ? { height: 100 } : { height: 0 }}
              transition={{ 
                delay: 2.2 + (index * 0.2), 
                duration: 0.5 
              }}
            />
            
            {/* Water droplet */}
            <motion.div
              className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-3 h-4 rounded-b-full bg-blue-400"
              initial={{ opacity: 0, y: 0 }}
              animate={isInView ? { 
                opacity: [0, 1, 0],
                y: [0, 40]
              } : { opacity: 0, y: 0 }}
              transition={{ 
                delay: 2.7 + (index * 0.2),
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
            
            {/* Plant */}
            <motion.div
              className="absolute top-[140px] left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ 
                delay: 3 + (index * 0.2),
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
            >
              <FaSeedling className="text-green-500 text-4xl" />
            </motion.div>
          </motion.div>
        </div>
      ))}
      
      {/* Explanation labels */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-between px-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
      >
        <div className="text-center max-w-[150px]">
          <div className="text-blue-600 font-bold">Water Source</div>
          <div className="text-sm text-gray-600 mt-1">Reservoir collection</div>
        </div>
        
        <div className="text-center max-w-[150px]">
          <div className="text-blue-600 font-bold">Distribution</div>
          <div className="text-sm text-gray-600 mt-1">Pressurized system</div>
        </div>
        
        <div className="text-center max-w-[150px]">
          <div className="text-blue-600 font-bold">Precision Delivery</div>
          <div className="text-sm text-gray-600 mt-1">Direct to root zone</div>
        </div>
      </motion.div>
    </div>
  );
};

// Water Efficiency Card
const EfficiencyCard = ({ title, value, icon, delay, color }) => {
  const [hovering, setHovering] = useState(false);
  
  return (
    <motion.div
      className="relative overflow-hidden bg-white rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
    >
      <div className={`h-2 ${color}`} />
      
      <div className="p-6 flex flex-col items-center text-center h-[220px]">
        <motion.div
          className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4"
          animate={hovering ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        <motion.div
          className="text-3xl font-bold text-blue-600 my-3"
          animate={hovering ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.div>
        
        <motion.div
          className="mt-2 w-0 h-1 bg-blue-500 rounded-full"
          animate={hovering ? { width: "40%" } : { width: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Animated Water Wave
const WaterWave = () => {
  return (
    <div className="relative h-24 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600" />
      
      {/* Wave 1 */}
      <motion.div
        className="absolute left-0 right-0 h-16 bg-white/20"
        style={{ 
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          bottom: -5,
        }}
        animate={{
          translateX: [-50, 0, -50],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      
      {/* Wave 2 */}
      <motion.div
        className="absolute left-0 right-0 h-12 bg-white/10"
        style={{ 
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          bottom: 0,
        }}
        animate={{
          translateX: [30, -30, 30],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </div>
  );
};

// 3D Water Conservation Stats
const WaterConservationStats = ({ isInView }) => {
  const stats = [
    { label: "Water Reduction", value: "60%", description: "Less water used vs. traditional methods" },
    { label: "Nutrient Efficiency", value: "85%", description: "Nutrients reaching plant roots" },
    { label: "Growth Rate", value: "+40%", description: "Faster crop development cycle" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-xl overflow-hidden shadow-lg transform perspective-1000"
          initial={{ opacity: 0, rotateX: 45, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            rotateX: 0, 
            y: 0 
          } : { 
            opacity: 0, 
            rotateX: 45, 
            y: 20 
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2 + (i * 0.15),
            type: "spring",
            damping: 15
          }}
          whileHover={{ 
            y: -10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          <WaterWave />
          
          <div className="p-6">
            <div className="text-lg text-blue-800 font-medium mb-2">{stat.label}</div>
            <div className="text-3xl font-bold mb-3">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Animated Raindrops
const RainEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-10 bg-gradient-to-b from-blue-300 to-transparent rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
            opacity: 0.6 + Math.random() * 0.4,
          }}
          animate={{
            y: [0, 500],
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Main Component
const IrrigationSystemsDetail = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const heroRef = useRef(null);
  const diagramRef = useRef(null);
  const statsRef = useRef(null);
  const technologiesRef = useRef(null);
  
  // Check if elements are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isDiagramInView = useInView(diagramRef, { once: true, amount: 0.3 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isTechnologiesInView = useInView(technologiesRef, { once: true, amount: 0.3 });
  
  // Modal state
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
              <title>Advanced Irrigation Systems | Harvest Brothers</title>
              <meta name="description" content="Explore our cutting-edge desert-optimized water management systems delivering precision irrigation for sustainable agriculture." />
            </Helmet>
            
            {/* Close button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
            
            {/* Hero section */}
            <div ref={heroRef} className="relative h-[40vh] overflow-hidden">
              <RainEffect />
              
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-800/90 flex items-center justify-center"
              >
                <motion.div 
                  className="text-center px-4"
                >
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Advanced Irrigation Systems
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl text-white/90 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Desert-optimized water management for maximum crop yield with minimal resource usage
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
                  Our crops benefit from innovative irrigation technologies, developing exceptional growth while utilizing our water-efficient cultivation techniques. Through precision application and smart monitoring systems, we've revolutionized how desert agriculture manages its most precious resource.
                </motion.p>
              </div>
              
              {/* Irrigation System Diagram */}
              <div ref={diagramRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-10 text-blue-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isDiagramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  How Our Systems Work
                </motion.h2>
                
                <WaterFlowDiagram isInView={isDiagramInView} />
              </div>
              
              {/* Water Conservation Statistics */}
              <div ref={statsRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-8 text-blue-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Water Conservation Impact
                </motion.h2>
                
                <motion.p
                  className="text-center text-gray-600 mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Our innovative systems have transformed desert agriculture by dramatically reducing water consumption while improving crop outcomes.
                </motion.p>
                
                <WaterConservationStats isInView={isStatsInView} />
              </div>
              
              {/* Irrigation Technologies */}
              <div ref={technologiesRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-blue-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTechnologiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Irrigation Technologies
                </motion.h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <EfficiencyCard 
                    title="Precision Drip Systems"
                    value="60% Water Savings"
                    icon={<FaTint className="text-blue-500 text-3xl" />}
                    delay={0.2}
                    color="bg-gradient-to-r from-blue-400 to-blue-600"
                  />
                  
                  <EfficiencyCard 
                    title="Soil Moisture Sensors"
                    value="24/7 Monitoring"
                    icon={<FaChartLine className="text-green-500 text-3xl" />}
                    delay={0.4}
                    color="bg-gradient-to-r from-green-400 to-green-600"
                  />
                  
                  <EfficiencyCard 
                    title="Weather-Responsive System"
                    value="Smart Adaptation"
                    icon={<FaCloudRain className="text-purple-500 text-3xl" />}
                    delay={0.6}
                    color="bg-gradient-to-r from-purple-400 to-purple-600"
                  />
                </div>
              </div>
              
              {/* Case Study */}
              <div className="mb-20 bg-blue-50 rounded-2xl p-8">
                <motion.h2 
                  className="text-3xl font-bold mb-6 text-blue-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Case Study: Water Conservation
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <motion.p
                      className="text-gray-700 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      In our Timimoun test field, we implemented our advanced drip irrigation system on a 50-hectare plot, comparing it to traditional flood irrigation methods.
                    </motion.p>
                    
                    <motion.ul
                      className="space-y-3 text-gray-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <li className="flex items-start">
                        <FaLongArrowAltRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>60% reduction in water consumption</span>
                      </li>
                      <li className="flex items-start">
                        <FaLongArrowAltRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>35% increase in crop yield</span>
                      </li>
                      <li className="flex items-start">
                        <FaLongArrowAltRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>42% improvement in nutrient efficiency</span>
                      </li>
                      <li className="flex items-start">
                        <FaLongArrowAltRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>ROI achieved within 18 months</span>
                      </li>
                    </motion.ul>
                  </div>
                  
                  <div className="relative h-[200px] md:h-auto overflow-hidden rounded-xl">
                    {/* Visual placeholder */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.6, 
                        type: "spring", 
                        stiffness: 100 
                      }}
                    >
                      <FaWater className="text-white text-8xl opacity-30" />
                    </motion.div>
                    
                    <WaterDroplets />
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="text-center pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link href="/contact">
                    <a className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Learn About Implementation
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

export default IrrigationSystemsDetail;