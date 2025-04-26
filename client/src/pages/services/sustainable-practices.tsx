import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaLeaf, FaRecycle, FaTint, FaSeedling, FaSun, FaBug, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// Animated Practice Card
const PracticeCard = ({ icon, title, description, index, isInView }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4"
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Animated Impact Bar
const ImpactBar = ({ label, value, color, index, isInView }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium" style={{ color }}>{value}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full" 
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 + (index * 0.15) }}
        />
      </div>
    </div>
  );
};

// Animated Leaf Floating
const FloatingLeaf = ({ x, y, size, rotation, delay }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        color: "#27AE60",
        fontSize: size,
        opacity: 0.7,
        transformOrigin: "center"
      }}
      animate={{
        y: [0, -20, 0, 20, 0],
        x: [0, 10, 0, -10, 0],
        rotate: [rotation, rotation + 20, rotation, rotation - 20, rotation],
        opacity: [0.7, 0.9, 0.7, 0.5, 0.7]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <FaLeaf />
    </motion.div>
  );
};

// Background Animation
const LeafBackground = () => {
  const leafPositions = [
    { x: 10, y: 20, size: "1.5rem", rotation: 45, delay: 0 },
    { x: 25, y: 60, size: "2rem", rotation: 120, delay: 1 },
    { x: 40, y: 30, size: "1rem", rotation: 30, delay: 2 },
    { x: 70, y: 40, size: "1.5rem", rotation: 60, delay: 0.5 },
    { x: 85, y: 70, size: "1.2rem", rotation: 10, delay: 1.5 },
    { x: 60, y: 80, size: "1.8rem", rotation: 80, delay: 2.5 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {leafPositions.map((leaf, i) => (
        <FloatingLeaf
          key={i}
          x={leaf.x}
          y={leaf.y}
          size={leaf.size}
          rotation={leaf.rotation}
          delay={leaf.delay}
        />
      ))}
    </div>
  );
};

// Main Component
const SustainablePractices = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const heroRef = useRef(null);
  const practicesRef = useRef(null);
  const impactRef = useRef(null);
  const certificationsRef = useRef(null);
  
  // Check if elements are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isPracticesInView = useInView(practicesRef, { once: true, amount: 0.2 });
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.3 });
  const isCertificationsInView = useInView(certificationsRef, { once: true, amount: 0.3 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  // Sustainable practices data
  const practices = [
    {
      icon: <FaRecycle className="text-2xl" />,
      title: "Regenerative Farming",
      description: "We employ farming methods that rehabilitate and enhance the entire ecosystem, focusing on soil health and biodiversity."
    },
    {
      icon: <FaTint className="text-2xl" />,
      title: "Water Conservation",
      description: "Our precision irrigation systems and water recycling technologies reduce water usage by up to 65% compared to conventional methods."
    },
    {
      icon: <FaSeedling className="text-2xl" />,
      title: "Natural Fertilizers",
      description: "We utilize organic compost and natural soil amendments derived from local materials to maintain soil fertility."
    },
    {
      icon: <FaSun className="text-2xl" />,
      title: "Solar-Powered Operations",
      description: "Our facilities and irrigation systems are powered by solar energy, reducing our carbon footprint and operational costs."
    },
    {
      icon: <FaBug className="text-2xl" />,
      title: "Integrated Pest Management",
      description: "We use natural predators and resistant crop varieties to minimize the need for chemical pesticides."
    },
    {
      icon: <FaLeaf className="text-2xl" />,
      title: "Biodiversity Protection",
      description: "Our farms incorporate native plant species and habitat corridors to support local wildlife and pollinators."
    }
  ];
  
  // Environmental impact data
  const impactMetrics = [
    { label: "Water Conservation", value: 65, color: "#3498DB" },
    { label: "Carbon Footprint Reduction", value: 75, color: "#27AE60" },
    { label: "Soil Health Improvement", value: 80, color: "#8E44AD" },
    { label: "Biodiversity Increase", value: 50, color: "#F1C40F" },
    { label: "Chemical Input Reduction", value: 90, color: "#E74C3C" }
  ];
  
  // Certification logos
  const certifications = [
    {
      name: "Organic Certification",
      icon: "🌱",
      description: "Our farms meet the strictest standards for organic agricultural practices, free from synthetic chemicals."
    },
    {
      name: "Water Stewardship",
      icon: "💧",
      description: "Recognized for exceptional water management and conservation in agricultural operations."
    },
    {
      name: "Carbon Neutral",
      icon: "🌍",
      description: "Our operations achieve net-zero carbon emissions through renewable energy and carbon offset programs."
    },
    {
      name: "Biodiversity Commitment",
      icon: "🦋",
      description: "Certified for our efforts to protect and enhance local biodiversity and ecosystem health."
    }
  ];

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
              <title>Sustainable Practices | Harvest Brothers</title>
              <meta name="description" content="Discover our environmentally conscious farming methods that preserve soil health, conserve water, and minimize environmental impact." />
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
              <LeafBackground />
              
              <div 
                className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/80 flex items-center justify-center"
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
                    Sustainable Practices
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl text-white/90 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Environmentally conscious farming methods for long-term agricultural success
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
                  At Harvest Brothers, all our diverse crops are grown using sustainable practices that preserve soil health, conserve water, and minimize environmental impact. We believe that responsible stewardship of the land ensures not only the health of our current crops but also the viability of agriculture for generations to come.
                </motion.p>
              </div>
              
              {/* Sustainable Practices Grid */}
              <div ref={practicesRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPracticesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Sustainable Approaches
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {practices.map((practice, index) => (
                    <PracticeCard 
                      key={index}
                      icon={practice.icon}
                      title={practice.title}
                      description={practice.description}
                      index={index}
                      isInView={isPracticesInView}
                    />
                  ))}
                </div>
              </div>
              
              {/* Environmental Impact */}
              <div ref={impactRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Environmental Impact
                </motion.h2>
                
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                  {impactMetrics.map((metric, index) => (
                    <ImpactBar 
                      key={index}
                      label={metric.label}
                      value={metric.value}
                      color={metric.color}
                      index={index}
                      isInView={isImpactInView}
                    />
                  ))}
                </div>
              </div>
              
              {/* Certifications */}
              <div ref={certificationsRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCertificationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Certifications
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isCertificationsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 0.2 * index }}
                    >
                      <div className="text-4xl mr-4">{cert.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                        <p className="text-gray-600">{cert.description}</p>
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
                    <a className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Partner With Us for Sustainable Agriculture
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

export default SustainablePractices;