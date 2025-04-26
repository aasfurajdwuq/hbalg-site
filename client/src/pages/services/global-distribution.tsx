import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaGlobeAfrica, FaShip, FaPlane, FaRoute, FaCheck, FaHandshake, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// Map Marker Component
const MapMarker = ({ x, y, size, delay, pulsate = true }) => {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="relative"
        animate={pulsate ? {
          scale: [1, 1.2, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div 
          className="w-4 h-4 rounded-full bg-amber-600" 
          style={{ width: size, height: size }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-amber-500 opacity-70"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.8, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// World Map Component
const WorldMap = ({ isInView }) => {
  // Distribution centers and main markets
  const locations = [
    { x: 47, y: 30, size: 12, delay: 0.2, pulsate: true }, // Algeria (HQ)
    { x: 48, y: 18, size: 8, delay: 0.3 }, // Europe
    { x: 54, y: 36, size: 8, delay: 0.4 }, // Middle East
    { x: 35, y: 36, size: 8, delay: 0.5 }, // North Africa
    { x: 45, y: 45, size: 8, delay: 0.6 }, // Sub-Saharan Africa
    { x: 20, y: 32, size: 8, delay: 0.7 }, // Americas
    { x: 75, y: 30, size: 8, delay: 0.8 }, // Asia
  ];

  return (
    <div className="relative mx-auto max-w-3xl h-[300px] md:h-[400px] bg-gray-100 rounded-xl overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gray-200 opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28,95 Q247,20 450,89 T790,76' fill='none' stroke='%23ccc' stroke-width='1'/%3E%3Cpath d='M28,175 Q247,100 450,169 T790,156' fill='none' stroke='%23ccc' stroke-width='1'/%3E%3Cpath d='M28,255 Q247,180 450,249 T790,236' fill='none' stroke='%23ccc' stroke-width='1'/%3E%3Cpath d='M28,335 Q247,260 450,329 T790,316' fill='none' stroke='%23ccc' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
      />
      
      {/* Continental outlines - simplified abstract representation */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Europe */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <motion.path 
            d="M45,15 Q50,18 55,17 T60,20 Q63,22 58,25 T54,30 Q51,28 47,29 T44,25 Q42,22 45,20 Z" 
            fill="#e0e0e0" 
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.2 }}
          />
          
          {/* Africa */}
          <motion.path 
            d="M45,30 Q50,32 54,30 T60,35 Q65,45 60,55 T55,65 Q50,70 45,65 T40,55 Q38,45 42,35 Z" 
            fill="#d0d0d0" 
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.4 }}
          />
          
          {/* Asia */}
          <motion.path 
            d="M60,20 Q70,15 80,20 T90,30 Q85,50 80,60 T70,65 Q65,60 60,55 T65,45 Q70,35 65,30 T60,20" 
            fill="#e0e0e0" 
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.6 }}
          />
          
          {/* Americas (simplified) */}
          <motion.path 
            d="M10,20 Q15,30 20,45 T25,65 Q15,50 10,35 Z" 
            fill="#e0e0e0" 
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>
      </motion.div>
      
      {/* Distribution locations */}
      {locations.map((loc, i) => (
        <MapMarker 
          key={i} 
          x={loc.x} 
          y={loc.y} 
          size={loc.size} 
          delay={loc.delay}
          pulsate={loc.pulsate}
        />
      ))}
      
      {/* Connection lines */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {locations.slice(1).map((loc, i) => (
          <motion.path 
            key={i}
            d={`M47,30 L${loc.x},${loc.y}`}
            stroke="#e67e22"
            strokeWidth="0.5"
            strokeDasharray="1 1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.5, delay: loc.delay + 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
};

// Market Card Component
const MarketCard = ({ region, items, isInView, index }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-xl font-bold text-amber-800">{region}</h3>
      </div>
      <div className="px-6 py-4">
        <ul className="space-y-2">
          {items.map((item, i) => (
            <motion.li 
              key={i} 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4, delay: 0.3 * index + 0.1 * i }}
            >
              <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Process Step Component
const ProcessStep = ({ number, title, description, isInView, index }) => {
  return (
    <motion.div
      className="flex items-start"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <div className="mr-4 flex-shrink-0">
        <motion.div 
          className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-xl font-bold"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 10,
            delay: 0.2 * index + 0.2
          }}
        >
          {number}
        </motion.div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Main Component
const GlobalDistribution = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const heroRef = useRef(null);
  const mapRef = useRef(null);
  const marketsRef = useRef(null);
  const processRef = useRef(null);
  
  // Check if elements are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isMapInView = useInView(mapRef, { once: true, amount: 0.5 });
  const isMarketsInView = useInView(marketsRef, { once: true, amount: 0.3 });
  const isProcessInView = useInView(processRef, { once: true, amount: 0.3 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  // Market data
  const marketData = [
    {
      region: "Europe",
      items: [
        "Premium organic produce",
        "Specialty desert grains",
        "High-value oil seed varieties",
        "Culinary aromatics"
      ]
    },
    {
      region: "Middle East",
      items: [
        "Heat-tolerant grain varieties",
        "Premium dates",
        "Organic produce",
        "Agricultural technology licensing"
      ]
    },
    {
      region: "Africa",
      items: [
        "Drought-resistant seed varieties",
        "Agricultural consulting services",
        "Sustainable farming systems",
        "Irrigation technology"
      ]
    },
    {
      region: "Asia & Pacific",
      items: [
        "Premium export-quality produce",
        "Specialized desert crop varieties",
        "Farming technology licensing",
        "Agricultural research partnerships"
      ]
    }
  ];
  
  // Distribution process steps
  const processSteps = [
    {
      number: 1,
      title: "Quality Control",
      description: "Rigorous multi-stage quality inspection process ensuring all products meet international standards and certification requirements."
    },
    {
      number: 2,
      title: "Sustainable Packaging",
      description: "Eco-friendly packaging solutions designed to maintain product freshness while minimizing environmental impact."
    },
    {
      number: 3,
      title: "Cold Chain Management",
      description: "Advanced temperature-controlled logistics ensuring perfect freshness from our farms to global markets."
    },
    {
      number: 4,
      title: "Market-Specific Compliance",
      description: "Dedicated compliance teams ensuring all exports meet destination-specific regulations and certification standards."
    },
    {
      number: 5,
      title: "Partner Relationships",
      description: "Strong network of distribution partners in key markets providing localized expertise and market access."
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
              <title>Global Distribution | Harvest Brothers</title>
              <meta name="description" content="Learn about our global distribution network delivering premium desert-grown agricultural products to markets across Africa, Europe, and the Middle East." />
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
              <div className="absolute inset-0 bg-amber-100">
                {/* Decorative elements */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full opacity-20"
                    style={{
                      width: 30 + Math.random() * 80,
                      height: 30 + Math.random() * 80,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      backgroundColor: "#7D5A50",
                    }}
                    animate={{
                      y: [-(i * 2), (i * 2), -(i * 2)],
                      x: [-(i * 2), (i * 2), -(i * 2)],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 8 + i,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                ))}
              </div>
              
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
                    Global Distribution
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl text-white/90 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Reaching markets worldwide with premium desert-grown agricultural products
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
                  Our diverse agricultural products meet international standards and are exported to markets across Africa, Europe, and the Middle East. Through strategic partnerships and advanced logistics, we deliver premium desert-grown crops to consumers worldwide while maintaining their exceptional quality and freshness.
                </motion.p>
              </div>
              
              {/* Distribution Map */}
              <div ref={mapRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Global Reach
                </motion.h2>
                
                <WorldMap isInView={isMapInView} />
                
                <motion.div 
                  className="flex justify-center items-center mt-8 text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={isMapInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  <div className="flex items-center mr-8">
                    <div className="w-3 h-3 bg-amber-600 rounded-full mr-2"></div>
                    <span>Distribution Hubs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 opacity-70 rounded-full mr-2"></div>
                    <span>Market Presence</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Key Markets */}
              <div ref={marketsRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isMarketsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Key Markets & Products
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marketData.map((market, index) => (
                    <MarketCard 
                      key={index}
                      region={market.region}
                      items={market.items}
                      isInView={isMarketsInView}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              
              {/* Distribution Process */}
              <div ref={processRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Distribution Process
                </motion.h2>
                
                <div className="space-y-10">
                  {processSteps.map((step, index) => (
                    <ProcessStep 
                      key={index}
                      number={step.number}
                      title={step.title}
                      description={step.description}
                      isInView={isProcessInView}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              
              {/* Distribution Partners */}
              <div className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Partner With Us
                </motion.h2>
                
                <motion.div 
                  className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <motion.div
                    className="mx-auto w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isProcessInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
                  >
                    <FaHandshake className="text-4xl text-amber-600" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4">Become a Distribution Partner</h3>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                    Join our network of global distribution partners. We're always looking for reliable distributors to help bring our premium desert-grown agricultural products to new markets.
                  </p>
                  
                  <Link href="/contact">
                    <a className="inline-block px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-medium">
                      Contact Our Distribution Team
                    </a>
                  </Link>
                </motion.div>
              </div>
              
              {/* CTA */}
              <div className="text-center pt-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link href="/investors">
                    <a className="inline-block bg-gradient-to-r from-amber-600 to-amber-800 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Invest in Our Global Operations
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

export default GlobalDistribution;