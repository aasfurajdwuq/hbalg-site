import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaChartLine, FaMoneyBillWave, FaChartBar, FaShieldAlt, FaTimes, FaHandHoldingUsd } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// ROI Comparison Card
const ROIComparisonCard = ({ title, roi, description, color, index, isInView }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <div className={`h-2`} style={{ backgroundColor: color }} />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center mb-4">
          <motion.div 
            className="text-3xl font-bold"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.3 * index, type: "spring" }}
          >
            {roi}%
          </motion.div>
          <div className="text-gray-500 ml-2">avg. annual return</div>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Feature Card
const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Performance Chart (Simplified visual representation)
const PerformanceChart = ({ isInView }) => {
  // Sample data points for our chart visualization
  const dataPoints = [5.2, 6.8, 7.4, 8.1, 7.6, 9.2, 8.4, 7.9];
  const maxValue = Math.max(...dataPoints);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Historical Performance</h3>
      <div className="relative h-60">
        <div className="absolute left-0 top-0 bottom-0 border-r border-gray-200 flex flex-col justify-between text-xs text-gray-500">
          <span>10%</span>
          <span>7.5%</span>
          <span>5%</span>
          <span>2.5%</span>
          <span>0%</span>
        </div>
        <div className="absolute left-6 right-0 bottom-0 h-px bg-gray-200"></div>
        <div className="absolute left-6 right-0 top-0 bottom-0 flex items-end justify-around">
          {dataPoints.map((point, i) => (
            <motion.div 
              key={i}
              className="w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm"
              style={{ height: `${(point / 10) * 100}%` }}
              initial={{ height: 0 }}
              animate={isInView ? { height: `${(point / 10) * 100}%` } : { height: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + (i * 0.1) }}
            >
              <motion.div 
                className="text-xs text-center text-green-800 font-medium relative -top-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
              >
                {point}%
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="absolute left-8 right-0 bottom-2 flex justify-around text-xs text-gray-500">
          {["2018", "2019", "2020", "2021", "2022", "2023", "2024", "Proj"].map((year, i) => (
            <div key={i} className="text-center">{year}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animated Dollar Sign
const AnimatedDollar = ({ x, y, size, delay }) => {
  return (
    <motion.div
      className="absolute text-green-500 opacity-20 font-bold"
      style={{ 
        fontSize: size,
        left: `${x}%`,
        top: `${y}%`
      }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 5, 0, -5, 0],
        opacity: [0.2, 0.3, 0.2, 0.1, 0.2]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      $
    </motion.div>
  );
};

// Background Decoration
const DollarBackground = () => {
  const dollars = [
    { x: 10, y: 20, size: "4rem", delay: 0 },
    { x: 80, y: 15, size: "5rem", delay: 1 },
    { x: 30, y: 60, size: "3rem", delay: 2 },
    { x: 70, y: 70, size: "4rem", delay: 0.5 },
    { x: 20, y: 40, size: "3.5rem", delay: 1.5 },
    { x: 60, y: 30, size: "4.5rem", delay: 2.5 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {dollars.map((dollar, i) => (
        <AnimatedDollar
          key={i}
          x={dollar.x}
          y={dollar.y}
          size={dollar.size}
          delay={dollar.delay}
        />
      ))}
    </div>
  );
};

// Main Component
const PremiumReturns = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const heroRef = useRef(null);
  const compareRef = useRef(null);
  const featuresRef = useRef(null);
  const performanceRef = useRef(null);
  
  // Check if elements are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isCompareInView = useInView(compareRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isPerformanceInView = useInView(performanceRef, { once: true, amount: 0.3 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  // ROI comparison data
  const roiComparisons = [
    {
      title: "Agricultural Investments",
      roi: 3.5,
      description: "Average return from traditional agricultural investments worldwide.",
      color: "#7F8C8D"
    },
    {
      title: "Harvest Brothers",
      roi: 7.0,
      description: "Our consistent average returns on desert agricultural investments.",
      color: "#27AE60"
    },
    {
      title: "Premium Investments",
      roi: 10.0,
      description: "Maximum returns achieved through our premium investment packages.",
      color: "#F1C40F"
    }
  ];
  
  // Investment features
  const features = [
    {
      icon: <FaHandHoldingUsd className="text-2xl" />,
      title: "Minimum Investment",
      description: "Low barrier to entry with minimum investments starting from $10,000 USD, allowing diverse portfolio building."
    },
    {
      icon: <FaMoneyBillWave className="text-2xl" />,
      title: "Quarterly Distributions",
      description: "Regular quarterly distributions of profits, with options for reinvestment to compound your returns."
    },
    {
      icon: <FaChartBar className="text-2xl" />,
      title: "Transparent Reporting",
      description: "Detailed quarterly reports on performance, crop yields, market conditions, and operational developments."
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Risk Mitigation",
      description: "Our diverse crop portfolio and innovative irrigation systems provide natural protection against weather and market volatility."
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
              <title>Premium Returns | Harvest Brothers</title>
              <meta name="description" content="Explore our premium investment opportunities with 5-10% average annual returns, outperforming traditional agricultural investments." />
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
              <DollarBackground />
              
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
                    Premium Returns
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl text-white/90 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Exceptional 5-10% average annual returns on agricultural investments
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
                  At Harvest Brothers, we're proud to consistently deliver returns of 5-10% annually to our investors, with an average of 7% over the past five years. Our innovative desert agriculture approaches and strategic market positioning allow us to outperform traditional agricultural investments while maintaining sustainable practices.
                </motion.p>
              </div>
              
              {/* ROI Comparison */}
              <div ref={compareRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCompareInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Investment Performance
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roiComparisons.map((comparison, index) => (
                    <ROIComparisonCard 
                      key={index}
                      title={comparison.title}
                      roi={comparison.roi}
                      description={comparison.description}
                      color={comparison.color}
                      index={index}
                      isInView={isCompareInView}
                    />
                  ))}
                </div>
              </div>
              
              {/* Performance Visualization */}
              <div ref={performanceRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPerformanceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Historical Performance
                </motion.h2>
                
                <PerformanceChart isInView={isPerformanceInView} />
              </div>
              
              {/* Investment Features */}
              <div ref={featuresRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Investment Features
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <FeatureCard 
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      delay={0.2 + (index * 0.1)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Testimonial/Quote */}
              <div className="mb-20">
                <motion.div 
                  className="bg-gray-50 rounded-xl p-8 relative"
                  initial={{ opacity: 0 }}
                  animate={isFeaturesInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="text-6xl text-green-200 absolute top-4 left-4">"</div>
                  <blockquote className="text-xl text-gray-700 italic relative z-10 pl-6">
                    Our investment strategy focuses on premium desert-adapted crops with high market value and low competition. This unique approach, combined with our water-efficient technologies, enables us to consistently deliver exceptional returns to our investors.
                  </blockquote>
                  <div className="mt-6 pl-6">
                    <div className="font-bold">Ahmed Bouazizi</div>
                    <div className="text-sm text-gray-500">Chief Investment Officer, Harvest Brothers</div>
                  </div>
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
                    <a className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Start Investing With Us
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

export default PremiumReturns;