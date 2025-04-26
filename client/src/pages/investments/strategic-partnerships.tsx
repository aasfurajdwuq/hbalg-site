import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaHandshake, FaUsers, FaGlobe, FaChartLine, FaBuilding, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// Partnership Model Card
const PartnershipModelCard = ({ title, description, benefits, icon, index, isInView }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <motion.div 
            className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {icon}
          </motion.div>
          <h3 className="ml-4 text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
        <ul className="space-y-1">
          {benefits.map((benefit, i) => (
            <motion.li 
              key={i} 
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 0.3 * index + 0.1 * i }}
            >
              <span className="text-amber-500 mr-2 mt-1">•</span>
              <span className="text-gray-600">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Partner Showcase
const PartnerShowcase = ({ partner, index, isInView }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <div className="h-40 bg-gradient-to-r from-amber-50 to-amber-100 flex items-center justify-center">
        <motion.div
          className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 * index }}
        >
          {partner.icon}
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{partner.location}</p>
        <p className="text-gray-600">{partner.description}</p>
      </div>
    </motion.div>
  );
};

// Animated Connection Lines
const ConnectionLines = ({ isInView }) => {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
      <motion.path
        d="M100,100 C200,50 300,250 400,200 S550,50 650,100 T800,150"
        stroke="#F0B429"
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2 }}
      />
      <motion.path
        d="M50,200 C150,250 250,150 350,250 S450,200 550,250 T700,200"
        stroke="#F0B429"
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.path
        d="M150,300 C250,350 350,300 450,350 S550,300 650,350"
        stroke="#F0B429"
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </svg>
  );
};

// Background Decoration
const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: 50 + Math.random() * 100,
            height: 50 + Math.random() * 100,
            backgroundColor: "#F59E0B",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-(i * 2), (i * 2), -(i * 2)],
            x: [-(i * 2), (i * 2), -(i * 2)],
            scale: [1, 1.05, 1, 0.95, 1],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};

// Main Component
const StrategicPartnerships = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const heroRef = useRef(null);
  const modelsRef = useRef(null);
  const partnersRef = useRef(null);
  const processRef = useRef(null);
  
  // Check if elements are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isModelsInView = useInView(modelsRef, { once: true, amount: 0.2 });
  const isPartnersInView = useInView(partnersRef, { once: true, amount: 0.3 });
  const isProcessInView = useInView(processRef, { once: true, amount: 0.3 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  // Partnership models data
  const partnershipModels = [
    {
      icon: <FaBuilding className="text-2xl" />,
      title: "Equity Partnerships",
      description: "Become a direct co-owner in our agricultural operations with equity stakes starting from 10%.",
      benefits: [
        "Direct ownership in premium agricultural assets",
        "Proportional share of all profits and growth",
        "Strategic input in expansion decisions",
        "Annual dividend distributions"
      ]
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Revenue Sharing",
      description: "A flexible model where investors receive a percentage of revenue without operational responsibilities.",
      benefits: [
        "Fixed percentage of gross revenue",
        "No operational management required",
        "Quarterly distribution schedule",
        "Lower entry threshold than equity partnerships"
      ]
    },
    {
      icon: <FaGlobe className="text-2xl" />,
      title: "Joint Ventures",
      description: "Strategic collaborations on specific projects or market expansions with defined cost and profit sharing.",
      benefits: [
        "Project-specific investments",
        "Defined timeline and exit strategy",
        "Combined expertise and resources",
        "Targeted market expansion opportunities"
      ]
    }
  ];
  
  // Example partners data (representing types of partners, not actual partners)
  const partnerShowcases = [
    {
      icon: <FaBuilding className="text-3xl text-amber-600" />,
      name: "Investment Firms",
      location: "Global",
      description: "Financial institutions seeking sustainable, long-term returns through agricultural investments with proven track records."
    },
    {
      icon: <FaUsers className="text-3xl text-amber-600" />,
      name: "Family Offices",
      location: "Middle East & Europe",
      description: "Multi-generational wealth managers looking for stable returns and tangible asset investments with environmental benefits."
    },
    {
      icon: <FaGlobe className="text-3xl text-amber-600" />,
      name: "Agricultural Corporations",
      location: "Africa & Mediterranean",
      description: "Established agricultural businesses seeking strategic expansions into desert agriculture and water-efficient farming methods."
    }
  ];
  
  // Partnership process steps
  const partnershipProcess = [
    {
      number: 1,
      title: "Initial Consultation",
      description: "We begin with an in-depth discussion about your investment goals, timeline, and preferred level of involvement."
    },
    {
      number: 2,
      title: "Partnership Model Selection",
      description: "Based on your objectives, we'll recommend the most suitable partnership structure from our flexible options."
    },
    {
      number: 3,
      title: "Due Diligence",
      description: "We provide comprehensive documentation and facilitate site visits to our agricultural operations."
    },
    {
      number: 4,
      title: "Agreement Finalization",
      description: "Our legal team works with yours to create a customized partnership agreement that protects both parties' interests."
    },
    {
      number: 5,
      title: "Implementation & Reporting",
      description: "Once formalized, we establish regular reporting schedules and communication channels for ongoing partnership management."
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
              <title>Strategic Partnerships | Harvest Brothers</title>
              <meta name="description" content="Explore our flexible partnership models, from equity partnerships to revenue-sharing agreements, tailored to your investment goals." />
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
                className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-700/80 flex items-center justify-center"
              >
              </div>
            </div>
            
            {/* Hero heading - similar to Advanced Irrigation Systems */}
            <div className="pt-12 pb-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
                Strategic Partnerships
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Flexible investment structures tailored to your goals and vision
              </p>
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
                  At Harvest Brothers, we understand that different investors have different goals, risk tolerances, and levels of desired involvement. That's why we've developed flexible partnership structures that can be tailored to your specific investment objectives, whether you're seeking passive income, active participation, or something in between.
                </motion.p>
              </div>
              
              {/* Partnership Models */}
              <div ref={modelsRef} className="mb-20 relative">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isModelsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Partnership Models
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {partnershipModels.map((model, index) => (
                    <PartnershipModelCard 
                      key={index}
                      icon={model.icon}
                      title={model.title}
                      description={model.description}
                      benefits={model.benefits}
                      index={index}
                      isInView={isModelsInView}
                    />
                  ))}
                </div>
              </div>
              
              {/* Who We Partner With */}
              <div ref={partnersRef} className="mb-20 relative">
                <ConnectionLines isInView={isPartnersInView} />
                
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPartnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Who We Partner With
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {partnerShowcases.map((partner, index) => (
                    <PartnerShowcase 
                      key={index}
                      partner={partner}
                      index={index}
                      isInView={isPartnersInView}
                    />
                  ))}
                </div>
              </div>
              
              {/* Partnership Process */}
              <div ref={processRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-amber-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Partnership Process
                </motion.h2>
                
                <div className="space-y-12">
                  {partnershipProcess.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.2 * index }}
                    >
                      <div className="mr-6 flex-shrink-0">
                        <motion.div 
                          className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center text-xl font-bold"
                          initial={{ scale: 0 }}
                          animate={isProcessInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 10,
                            delay: 0.2 * index + 0.2
                          }}
                        >
                          {step.number}
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="text-center mb-10">
                <motion.div 
                  className="bg-amber-50 rounded-xl p-8 relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={isProcessInView ? { opacity: 1 } : { opacity: 0 }}
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
                  
                  <h3 className="text-2xl font-bold mb-4">Ready to Explore a Partnership?</h3>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                    Our team is ready to discuss how our flexible partnership models can meet your investment objectives while contributing to sustainable agricultural development.
                  </p>
                  
                  <Link href="/contact">
                    <a className="inline-block px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-medium">
                      Schedule a Consultation
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

export default StrategicPartnerships;