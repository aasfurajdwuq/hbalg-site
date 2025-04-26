import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaAppleAlt, FaSeedling, FaWater, FaLeaf, FaMountain, FaTimes, FaSun } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// Animated Card Component
const InfoCard = ({ icon, title, description, delay, color }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className={`h-2`} style={{ backgroundColor: color }} />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}30` }}>
            {icon}
          </div>
          <h3 className="ml-3 text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Animated Crop Variants
const CropVariant = ({ name, suitability, waterNeeds, characteristics, color, index, isInView }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
    >
      <div className="flex items-center mb-2">
        <motion.div 
          className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
          style={{ backgroundColor: color }}
          animate={{ 
            boxShadow: [
              `0 0 0px ${color}00`,
              `0 0 8px ${color}aa`,
              `0 0 0px ${color}00`
            ]
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <div className="ml-7 space-y-2">
        <div className="flex items-center">
          <span className="text-sm font-medium w-28 text-gray-500">Suitability:</span>
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full" 
              style={{ backgroundColor: color, width: `${suitability}%` }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${suitability}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.4 + (index * 0.1) }}
            />
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium w-28 text-gray-500">Water Needs:</span>
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${waterNeeds}%` }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${waterNeeds}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{characteristics}</p>
      </div>
    </motion.div>
  );
};

// Animated Circle
const AnimatedCircle = ({ delay, duration, size, color, x, y }) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      style={{ 
        width: size, 
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: `${y}%`
      }}
      animate={{
        y: [0, -20, 0, 20, 0],
        x: [0, 15, 0, -15, 0],
        scale: [1, 1.1, 1, 0.9, 1]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop"
      }}
    />
  );
};

// Background Decoration
const BackgroundDecoration = () => {
  const circles = [
    { size: 100, color: "#C0392B", x: 10, y: 20, delay: 0, duration: 15 },
    { size: 140, color: "#C0392B", x: 70, y: 50, delay: 2, duration: 18 },
    { size: 80, color: "#C0392B", x: 40, y: 80, delay: 1, duration: 12 },
    { size: 120, color: "#C0392B", x: 85, y: 15, delay: 3, duration: 20 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {circles.map((circle, i) => (
        <AnimatedCircle 
          key={i}
          delay={circle.delay}
          duration={circle.duration}
          size={circle.size}
          color={circle.color}
          x={circle.x}
          y={circle.y}
        />
      ))}
    </div>
  );
};

// Main Component
const DiversePortfolio = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const heroRef = useRef(null);
  const variantsRef = useRef(null);
  const benefitsRef = useRef(null);
  
  // Check if elements are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isVariantsInView = useInView(variantsRef, { once: true, amount: 0.2 });
  const isBenefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 });
  
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
              <title>Diverse Agricultural Portfolio | Harvest Brothers</title>
              <meta name="description" content="Discover our diverse range of desert-adapted crop varieties, cultivated with innovative techniques for optimal growth in arid conditions." />
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
              <BackgroundDecoration />
              
              <div 
                className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-red-700/80 flex items-center justify-center"
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
                    Diverse Agricultural Portfolio
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl text-white/90 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Desert-adapted cultivation varieties with exceptional resilience and yield
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
                  At Harvest Brothers, we're pioneering the cultivation of specialized crop varieties adapted to thrive in desert conditions with minimal water requirements. Our diverse agricultural portfolio represents years of research and development to create resilient, high-yield crops specifically designed for arid environments.
                </motion.p>
              </div>
              
              {/* Crop Variants Section */}
              <div ref={variantsRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-red-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVariantsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Desert-Adapted Varieties
                </motion.h2>
                
                <div className="space-y-10">
                  <CropVariant 
                    name="Drought-Resistant Grains"
                    suitability={95}
                    waterNeeds={30}
                    characteristics="Specialized grain varieties with deep root systems and water-retention capabilities, perfect for arid regions."
                    color="#C0392B"
                    index={0}
                    isInView={isVariantsInView}
                  />
                  
                  <CropVariant 
                    name="Desert-Adapted Legumes"
                    suitability={90}
                    waterNeeds={40}
                    characteristics="Nitrogen-fixing desert legumes that improve soil quality while requiring minimal irrigation."
                    color="#C0392B"
                    index={1}
                    isInView={isVariantsInView}
                  />
                  
                  <CropVariant 
                    name="Arid-Tolerant Oil Crops"
                    suitability={85}
                    waterNeeds={35}
                    characteristics="High oil-content crops developed specifically for sandy soils and high-temperature environments."
                    color="#C0392B"
                    index={2}
                    isInView={isVariantsInView}
                  />
                  
                  <CropVariant 
                    name="Heat-Resilient Produce"
                    suitability={88}
                    waterNeeds={45}
                    characteristics="Vegetable varieties with enhanced heat tolerance and modified leaf structures to minimize water loss."
                    color="#C0392B"
                    index={3}
                    isInView={isVariantsInView}
                  />
                </div>
              </div>
              
              {/* Benefits Section */}
              <div ref={benefitsRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-red-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Portfolio Benefits
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCard 
                    icon={<FaWater className="text-blue-500" />}
                    title="Water Efficiency"
                    description="Our diverse crop varieties require 50-70% less water than conventional agriculture, making them ideal for water-scarce regions."
                    delay={0.2}
                    color="#3498DB"
                  />
                  
                  <InfoCard 
                    icon={<FaSun className="text-yellow-500" />}
                    title="Heat Tolerance"
                    description="Specially developed to withstand temperatures up to 50°C without compromising on yield or nutritional quality."
                    delay={0.3}
                    color="#F1C40F"
                  />
                  
                  <InfoCard 
                    icon={<FaMountain className="text-gray-500" />}
                    title="Soil Adaptability"
                    description="Thrives in sandy, low-nutrient soils typical of desert regions, with some varieties actively improving soil quality."
                    delay={0.4}
                    color="#7F8C8D"
                  />
                  
                  <InfoCard 
                    icon={<FaLeaf className="text-green-500" />}
                    title="Nutritional Density"
                    description="Despite challenging growing conditions, our varieties maintain exceptional nutritional profiles, often exceeding conventional equivalents."
                    delay={0.5}
                    color="#2ECC71"
                  />
                </div>
              </div>
              
              {/* Stats Section */}
              <div className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-red-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Portfolio Performance
                </motion.h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { value: "15+", label: "Crop Varieties", color: "from-red-400 to-red-600" },
                    { value: "60%", label: "Water Reduction", color: "from-blue-400 to-blue-600" },
                    { value: "90%", label: "Survival Rate", color: "from-green-400 to-green-600" },
                    { value: "3x", label: "ROI vs. Standard", color: "from-purple-400 to-purple-600" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
                    >
                      <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
                      <div className="p-6 text-center">
                        <motion.div 
                          className="text-4xl font-bold mb-2"
                          initial={{ scale: 0 }}
                          animate={isBenefitsInView ? { scale: 1 } : { scale: 0 }}
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
                  <Link href="/investors">
                    <a className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Invest in Our Agricultural Portfolio
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

export default DiversePortfolio;