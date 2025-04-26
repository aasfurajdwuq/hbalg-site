import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaFlask, FaMicroscope, FaChartLine, FaLeaf, FaClipboardCheck, FaChevronRight, FaTimes, FaWater } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// Animated Research Graph
const ResearchGraph = ({ isInView }) => {
  const graphData = [
    { year: "2022", value: 25, color: "#10B981" },
    { year: "2023", value: 40, color: "#3B82F6" },
    { year: "2024", value: 65, color: "#8B5CF6" },
    { year: "2025", value: 80, color: "#EC4899" },
    { year: "2026", value: 95, color: "#F59E0B" },
  ];

  return (
    <div className="w-full h-[300px] flex items-end justify-between px-10 pt-10 pb-5 relative">
      {/* Y-axis line */}
      <motion.div 
        className="absolute left-0 bottom-0 w-1 bg-gray-200"
        initial={{ height: 0 }}
        animate={isInView ? { height: "95%" } : { height: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "bottom" }}
      />
      
      {/* X-axis line */}
      <motion.div 
        className="absolute left-0 bottom-0 h-1 bg-gray-200"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
      
      {/* Graph bars */}
      <div className="flex items-end justify-between w-full h-full relative z-10">
        {graphData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div 
              className="w-16 rounded-t-lg relative"
              style={{ backgroundColor: item.color }}
              initial={{ height: 0 }}
              animate={isInView ? { height: `${item.value}%` } : { height: 0 }}
              transition={{ 
                duration: 1,
                delay: 0.5 + (index * 0.1),
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-sm font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1 + (index * 0.1), duration: 0.5 }}
              >
                {item.value}%
              </motion.div>
            </motion.div>
            <div className="mt-2 text-gray-600">{item.year}</div>
          </div>
        ))}
      </div>
      
      {/* Labels */}
      <motion.div 
        className="absolute left-6 top-1/2 transform -translate-y-1/2 -rotate-90 text-gray-500 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        Yield Improvement (%)
      </motion.div>
    </div>
  );
};

// Animated Research Bubble
const ResearchBubble = ({ icon, title, description, delay, index }) => {
  return (
    <motion.div
      className="flex items-start"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
      
      <div className="ml-5">
        <motion.h3 
          className="text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

// Animated Research Process Diagram
const ResearchProcess = ({ isInView }) => {
  const processes = [
    { 
      title: "Problem Identification", 
      description: "We analyze desert agriculture challenges through field studies and data collection",
      icon: <FaClipboardCheck className="text-2xl" />,
    },
    { 
      title: "Hypothesis Development", 
      description: "Our scientists formulate potential solutions based on extensive agricultural research",
      icon: <FaFlask className="text-2xl" />,
    },
    { 
      title: "Controlled Testing", 
      description: "Rigorous experiments in controlled environments to validate our approaches",
      icon: <FaMicroscope className="text-2xl" />,
    },
    { 
      title: "Field Implementation", 
      description: "Successful methods are deployed in actual desert conditions for real-world testing",
      icon: <FaLeaf className="text-2xl" />,
    },
    { 
      title: "Data Analysis", 
      description: "Advanced analytics reveal performance metrics and areas for improvement",
      icon: <FaChartLine className="text-2xl" />,
    },
  ];

  return (
    <div className="relative py-8">
      {/* Connecting line */}
      <motion.div 
        className="absolute left-7 top-0 bottom-0 w-1 bg-blue-100"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />
      
      <div className="space-y-12">
        {processes.map((process, index) => (
          <motion.div 
            key={index}
            className="relative flex items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 + (index * 0.15) }}
          >
            {/* Step number bubble */}
            <motion.div 
              className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ 
                delay: 0.6 + (index * 0.15),
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              {index + 1}
            </motion.div>
            
            {/* Content */}
            <div className="ml-6">
              <h4 className="text-xl font-bold">{process.title}</h4>
              <p className="text-gray-600 mt-2">{process.description}</p>
              
              {/* Icon */}
              <motion.div
                className="mt-3 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
                initial={{ scale: 0, rotate: -90 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
                transition={{ delay: 0.9 + (index * 0.15), duration: 0.5 }}
              >
                {process.icon}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Research Statistics Animation
const ResearchStats = ({ isInView }) => {
  const stats = [
    { value: "12", label: "Research Papers Published", icon: <FaClipboardCheck />, color: "from-blue-400 to-blue-600" },
    { value: "35", label: "Crop Varieties Tested", icon: <FaLeaf />, color: "from-green-400 to-green-600" },
    { value: "85%", label: "Success Rate in Trials", icon: <FaChartLine />, color: "from-purple-400 to-purple-600" },
    { value: "4", label: "International Collaborations", icon: <FaFlask />, color: "from-amber-400 to-amber-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
        >
          {/* Decorative gradient bar */}
          <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
          
          <div className="p-6">
            <motion.div
              className="w-12 h-12 mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
              initial={{ scale: 0, rotate: -30 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
              transition={{ 
                delay: 0.4 + (i * 0.1),
                type: "spring",
                stiffness: 200
              }}
            >
              {stat.icon}
            </motion.div>
            
            <motion.div 
              className="text-3xl font-bold mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
            >
              {stat.value}
            </motion.div>
            
            <div className="text-gray-600">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// 3D Floating Images
const FloatingImages = () => {
  const images = [
    "/assets/research-lab-01.jpg",
    "/assets/field-research-02.jpg",
    "/assets/microscope-analysis-03.jpg"
  ];

  return (
    <div className="relative h-[300px]">
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="absolute w-60 h-40 rounded-lg shadow-xl overflow-hidden"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${20 + (i * 10)}%`,
            zIndex: 10 - i,
          }}
          animate={{
            y: [-(i * 5), (i * 5), -(i * 5)],
            rotate: [-(i * 2), (i * 2), -(i * 2)],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          {/* Placeholder gradient instead of images */}
          <div 
            className={`w-full h-full ${
              i === 0 ? "bg-gradient-to-br from-blue-400 to-purple-500" : 
              i === 1 ? "bg-gradient-to-br from-green-400 to-emerald-600" : 
              "bg-gradient-to-br from-amber-400 to-red-500"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Main Component
const AgriculturalResearchDetail = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const graphRef = useRef(null);
  const statsRef = useRef(null);
  
  // Check if elements are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isProcessInView = useInView(processRef, { once: true, amount: 0.1 });
  const isGraphInView = useInView(graphRef, { once: true, amount: 0.3 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
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
              <title>Agricultural Research | Harvest Brothers</title>
              <meta name="description" content="Learn about our cutting-edge research in desert agriculture to develop high-yield crop varieties and sustainable farming methods." />
            </Helmet>
            
            {/* Close button */}
            <Link href="/">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close and return to home"
              >
                <FaTimes className="text-lg" />
              </button>
            </Link>
            
            {/* Hero section */}
            <div ref={heroRef} className="relative h-[40vh] overflow-hidden">
              {/* Animated geometric shapes */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full opacity-20"
                    style={{
                      width: 50 + Math.random() * 100,
                      height: 50 + Math.random() * 100,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      backgroundColor: 
                        i % 3 === 0 ? "#60A5FA" : 
                        i % 3 === 1 ? "#34D399" : "#A78BFA",
                    }}
                    animate={{
                      x: [0, Math.random() * 50 - 25],
                      y: [0, Math.random() * 50 - 25],
                      scale: [1, 1.1, 0.9, 1],
                      rotate: [0, Math.random() * 30 - 15],
                    }}
                    transition={{
                      duration: 8 + Math.random() * 10,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                ))}
              </div>
              
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 flex items-center justify-center"
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
                    Agricultural Research
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl text-white/90 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Developing high-yield cultivation methods through advanced scientific research and innovation
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
                  Our research teams develop crops that thrive in the mineral-rich soil of our farms, producing exceptional harvests with superior quality and nutrition profiles. Through continuous innovation and experimentation, we're pushing the boundaries of what's possible in desert agriculture.
                </motion.p>
              </div>
              
              {/* Research Process Section */}
              <div ref={processRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-purple-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Research Process
                </motion.h2>
                
                <ResearchProcess isInView={isProcessInView} />
              </div>
              
              {/* Results Graph */}
              <div ref={graphRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-purple-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isGraphInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Measurable Results
                </motion.h2>
                
                <ResearchGraph isInView={isGraphInView} />
                
                <motion.p
                  className="text-center text-gray-600 mt-8"
                  initial={{ opacity: 0 }}
                  animate={isGraphInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                >
                  Year-over-year improvement in crop yield through applied research
                </motion.p>
              </div>
              
              {/* Research Areas */}
              <div className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-purple-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Key Research Areas
                </motion.h2>
                
                <div className="space-y-10">
                  <ResearchBubble 
                    icon={<FaFlask className="text-2xl" />}
                    title="Drought-Resistant Varieties"
                    description="Developing specialized crop strains that require minimal water while maintaining exceptional nutritional profiles and yields."
                    delay={0.3}
                    index={0}
                  />
                  
                  <ResearchBubble 
                    icon={<FaWater className="text-2xl" />}
                    title="Precision Irrigation Systems"
                    description="Creating advanced watering technologies that deliver precise amounts of moisture directly to plant root zones to maximize efficiency."
                    delay={0.5}
                    index={1}
                  />
                  
                  <ResearchBubble 
                    icon={<FaMicroscope className="text-2xl" />}
                    title="Soil Enhancement Techniques"
                    description="Researching natural methods to improve desert soil composition, structure, and nutrient profiles for sustainable farming."
                    delay={0.7}
                    index={2}
                  />
                </div>
              </div>
              
              {/* Visual Section */}
              <div className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-purple-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Research in Action
                </motion.h2>
                
                <FloatingImages />
              </div>
              
              {/* Stats */}
              <div ref={statsRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-purple-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Research Impact
                </motion.h2>
                
                <ResearchStats isInView={isStatsInView} />
              </div>
              
              {/* CTA */}
              <div className="text-center pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link href="/contact">
                    <a className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <span>Partner with Our Research Team</span>
                      <FaChevronRight className="ml-2" />
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

export default AgriculturalResearchDetail;