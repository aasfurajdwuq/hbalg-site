import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { FaWheatAwn } from "react-icons/fa6";
import { FaLandmark, FaChartLine, FaWater, FaSeedling, FaLeaf } from "react-icons/fa";

// WheatField Animation Component
const WheatField = ({ inView }) => {
  // Create array of wheat stalks with varied properties
  const wheatStalks = Array.from({ length: 40 }, (_, i) => ({
    height: Math.random() * 60 + 40, // Random height between 40-100
    position: Math.random() * 100,    // Random horizontal position
    delay: Math.random() * 0.5,       // Random animation delay
    swayAmount: Math.random() * 10 + 5 // Random sway amount
  }));

  return (
    <div className="relative w-full h-40 overflow-hidden">
      {wheatStalks.map((stalk, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 origin-bottom"
          style={{ 
            left: `${stalk.position}%`,
            height: `${stalk.height}%`,
            width: '2px',
            backgroundColor: '#E9C46A'
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { 
            scaleY: 1,
            rotateZ: [
              -stalk.swayAmount/2, 
              stalk.swayAmount/2, 
              -stalk.swayAmount/2
            ]
          } : { scaleY: 0 }}
          transition={{
            scaleY: { duration: 0.5, delay: stalk.delay },
            rotateZ: { 
              repeat: Infinity, 
              duration: 2 + stalk.delay, 
              ease: "easeInOut" 
            }
          }}
        >
          {/* Wheat head */}
          <motion.div
            className="absolute -left-3 -top-6 w-8 h-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: stalk.delay + 0.5, duration: 0.3 }}
          >
            <FaWheatAwn className="text-amber-400 w-full h-full" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// 3D Rotating Card Component
const RotatingServiceCard = ({ icon, title, description, color, accentColor, index, inView }) => {
  return (
    <motion.div
      className="relative w-full h-[400px] perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl shadow-xl preserve-3d cursor-pointer"
        whileHover={{ 
          rotateY: 180,
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front of Card */}
        <div 
          className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden"
          style={{ backgroundColor: color }}
        >
          <div className={`w-24 h-24 rounded-full mb-6 flex items-center justify-center`} style={{ backgroundColor: accentColor }}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white text-center">{title}</h3>
          <p className="text-white/80 text-center">{description}</p>
          
          <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm">
            Hover to learn more
          </div>
        </div>
        
        {/* Back of Card */}
        <div 
          className="absolute inset-0 rounded-2xl p-8 flex flex-col rotateY-180 backface-hidden"
          style={{ backgroundColor: accentColor }}
        >
          <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-white/90 mb-4">Detailed Service Description:</p>
          <ul className="text-white/80 space-y-2 mb-6">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 mr-2 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Premium service with expert implementation</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 mr-2 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Customized to your specific agricultural needs</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 mr-2 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Sustainable practices that enhance productivity</span>
            </li>
          </ul>
          
          <motion.button
            className="mt-auto py-3 px-6 bg-white text-gray-900 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Service
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Irrigation Animation
const IrrigationAnimation = ({ inView }) => {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100
  }));

  return (
    <div className="relative h-60 w-full overflow-hidden bg-blue-50 rounded-2xl">
      {/* Soil line */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-amber-900/20" />
      
      {/* Plant */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-1 bg-green-700"
        initial={{ height: 0 }}
        animate={inView ? { height: 100 } : { height: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {/* Leaves */}
        <motion.div 
          className="absolute top-1/4 -left-4 w-4 h-2 bg-green-600"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
        <motion.div 
          className="absolute top-2/4 left-1 w-4 h-2 bg-green-600"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
        <motion.div 
          className="absolute top-3/4 -left-3 w-3 h-2 bg-green-600"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        />
        
        {/* Plant top */}
        <motion.div
          className="absolute -top-6 -left-3 text-green-600"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <FaSeedling className="w-8 h-8" />
        </motion.div>
      </motion.div>
      
      {/* Water droplets */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500 opacity-70"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.left}%`,
            top: '-10px'
          }}
          initial={{ y: -20 }}
          animate={inView ? {
            y: ['0%', '500%'],
            opacity: [0.7, 0]
          } : { y: -20 }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeIn"
          }}
        />
      ))}
      
      {/* Sprinkler */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={inView ? {
            rotateZ: [0, 180, 360],
          } : { rotateZ: 0 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <FaWater className="text-blue-600 w-8 h-8" />
        </motion.div>
      </div>
    </div>
  );
};

// Main Component
const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);
  
  // References for scroll animations
  const headerRef = useRef(null);
  const servicesRef = useRef(null);
  const irrigationRef = useRef(null);
  const wheatFieldRef = useRef(null);
  const advancedServicesRef = useRef(null);
  
  // Check if elements are in view
  const isHeaderInView = useInView(headerRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });
  const isIrrigationInView = useInView(irrigationRef, { once: true });
  const isWheatFieldInView = useInView(wheatFieldRef, { once: true });
  const isAdvancedServicesInView = useInView(advancedServicesRef, { once: true, amount: 0.3 });

  // Services data with enhanced visuals
  const services = [
    {
      id: "cultivation",
      icon: <FaWheatAwn className="text-4xl text-white" />,
      title: "Premium Wheat Cultivation",
      description: "Sustainable Saharan wheat production with our proprietary growing methods and cutting-edge irrigation technology.",
      color: "#3E7C17", // Dark green
      accentColor: "#2E5A0C" // Darker green
    },
    {
      id: "leasing",
      icon: <FaLandmark className="text-4xl text-white" />,
      title: "Agricultural Land Leasing",
      description: "Strategic farmland opportunities in Algeria's prime growing regions with established infrastructure and support.",
      color: "#7D5A50", // Earth tone
      accentColor: "#5D4037" // Darker earth tone
    },
    {
      id: "consultancy",
      icon: <FaChartLine className="text-4xl text-white" />,
      title: "Agricultural Consultancy",
      description: "Expert advice on desert agriculture, water management, and crop optimization from our team of specialists.",
      color: "#73AB84", // Sage green
      accentColor: "#558B6E" // Darker sage
    }
  ];

  // Advanced technologies
  const technologies = [
    {
      icon: <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}><FaWater className="text-4xl text-blue-500" /></motion.div>,
      title: "Precision Irrigation",
      description: "Our micro-irrigation systems deliver water and nutrients directly to plant roots, reducing water usage by up to 60% compared to traditional methods."
    },
    {
      icon: <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.5 }}><FaSeedling className="text-4xl text-green-500" /></motion.div>,
      title: "Optimized Seed Selection",
      description: "We've developed drought-resistant wheat varieties specifically adapted to thrive in the challenging Saharan environment."
    },
    {
      icon: <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.5 }}><FaLeaf className="text-4xl text-emerald-500" /></motion.div>,
      title: "Sustainable Farming",
      description: "Our regenerative farming practices restore soil health while maximizing yields and ensuring long-term productivity."
    }
  ];

  // Parallax effect for header
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <Helmet>
        <title>Agricultural Services | Harvest Brothers</title>
        <meta name="description" content="Explore our premium agricultural services including sustainable wheat cultivation, land leasing, and expert consultancy." />
      </Helmet>
      
      {/* Interactive Parallax Header */}
      <motion.section 
        ref={headerRef}
        className="relative h-[50vh] overflow-hidden flex items-center justify-center bg-black"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            y: headerY,
            opacity: headerOpacity
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1629723448738-f58cb81805f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=90" 
            alt="Wheat field" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-20 text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Agricultural Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-light max-w-3xl mx-auto"
          >
            Premium services for modern desert agriculture
          </motion.p>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div 
              animate={{ 
                y: [4, 12, 4]
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Wheat field animation */}
      <section ref={wheatFieldRef} className="py-8 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
        <WheatField inView={isWheatFieldInView} />
      </section>
      
      {/* 3D Service Cards */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive agricultural solutions backed by years of expertise in desert farming
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <RotatingServiceCard 
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
                accentColor={service.accentColor}
                index={index}
                inView={isServicesInView}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Irrigation Animation Section */}
      <section ref={irrigationRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isIrrigationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-bold mb-6 tracking-tight"
              >
                Revolutionary Water Management
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isIrrigationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-gray-600 mb-6"
              >
                Our proprietary irrigation systems have transformed desert agriculture, enabling sustainable farming in one of the world's most challenging environments.
              </motion.p>
              
              <motion.ul
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={isIrrigationInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {[
                  "60% reduction in water usage compared to traditional methods",
                  "AI-powered sensors that optimize water delivery in real-time",
                  "Solar-powered pumps that eliminate the need for fossil fuels",
                  "Closed-loop filtration system that recycles and purifies water"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isIrrigationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.6 + (i * 0.1), duration: 0.6 }}
                    className="flex items-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <div className="md:w-1/2">
              <IrrigationAnimation inView={isIrrigationInView} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Advanced Technologies Section */}
      <section ref={advancedServicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAdvancedServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Advanced Agricultural Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge solutions that define the future of desert farming
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isAdvancedServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white rounded-2xl p-8 shadow-md transition-all duration-300"
              >
                <div className="mb-6">
                  {tech.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{tech.title}</h3>
                <p className="text-gray-600">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-bold mb-6 tracking-tight"
          >
            Ready to Transform Your Agricultural Operations?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl font-light max-w-3xl mx-auto mb-10"
          >
            Our team of experts is ready to help you implement cutting-edge agricultural solutions tailored to your specific needs.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-800 py-4 px-10 rounded-full font-bold text-lg shadow-lg"
          >
            Schedule a Consultation
          </motion.button>
        </div>
      </section>
    </>
  );
};

// Add these styles to your CSS
const styles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotateY-180 {
    transform: rotateY(180deg);
  }
`;

// Insert style element
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default Services;
