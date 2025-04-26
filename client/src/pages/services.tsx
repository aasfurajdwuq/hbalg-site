import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { FaChartLine, FaMoneyBillWave, FaHandshake, FaSeedling } from "react-icons/fa";

// Wheat Field Animation Component
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full text-amber-400" fill="currentColor">
              <path d="M12 2L9.19795 7.4721L3.3999 8.52786L7.59987 12.7279L6.59795 18.5279L12 15.8721L17.4021 18.5279L16.4001 12.7279L20.6001 8.52786L14.8021 7.4721L12 2Z" />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// 3D Rotating Card Component
const RotatingServiceCard = ({ icon, title, description, color, accentColor, index, inView, detailUrl }) => {
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
          <p className="text-white/90 mb-4">Investment Benefits:</p>
          <ul className="text-white/80 space-y-2 mb-6">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 mr-2 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Premium returns with exceptional annual yield</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 mr-2 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Sustainable agricultural projects with long-term growth</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 mr-2 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Diversified portfolio with agricultural stability</span>
            </li>
          </ul>
          
          <Link href={detailUrl}>
            <motion.button
              className="mt-auto py-3 px-6 bg-white text-gray-900 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Growth Animation Component
const GrowthAnimation = ({ inView }) => {
  const growthBars = [
    { height: 40, color: "#4CAF50", value: "2022" },
    { height: 50, color: "#66BB6A", value: "2023" },
    { height: 60, color: "#81C784", value: "2024" },
    { height: 75, color: "#A5D6A7", value: "2025" }
  ];

  return (
    <div className="relative h-60 w-full overflow-hidden bg-gray-50 rounded-2xl p-4">
      <h3 className="font-bold mb-6 text-center">Investment Growth</h3>
      
      <div className="absolute bottom-12 left-0 right-0 h-px bg-gray-200" />
      
      <div className="flex items-end justify-around h-[60%] px-4">
        {growthBars.map((bar, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              className="w-8 rounded-t-md relative"
              style={{ backgroundColor: bar.color }}
              initial={{ height: 0 }}
              animate={inView ? { height: bar.height } : { height: 0 }}
              transition={{ 
                duration: 1,
                delay: 0.5 + (i * 0.2),
              }}
            >
              <motion.div
                className="absolute -top-8 text-sm font-medium text-gray-700 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 + (i * 0.2) }}
              >
                {Math.round(bar.height * 0.2)}% ROI
              </motion.div>
            </motion.div>
            <div className="mt-2 text-xs text-gray-500">{bar.value}</div>
          </div>
        ))}
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
  const growthRef = useRef(null);
  const wheatFieldRef = useRef(null);
  const advancedServicesRef = useRef(null);
  
  // Check if elements are in view
  const isHeaderInView = useInView(headerRef, { once: true });
  const isServicesInView = useInView(servicesRef, { once: true });
  const isGrowthInView = useInView(growthRef, { once: true });
  const isWheatFieldInView = useInView(wheatFieldRef, { once: true });
  const isAdvancedServicesInView = useInView(advancedServicesRef, { once: true, amount: 0.3 });

  // Parallax effect for header
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Investment opportunity services
  const investmentServices = [
    {
      id: "premium",
      icon: <FaChartLine className="text-4xl text-white" />,
      title: "Premium ROI",
      description: "Achieve exceptional returns of 5-10% annually through our strategic agricultural investments in premium Saharan wheat.",
      color: "#3E7C17", // Dark green
      accentColor: "#2E5A0C" // Darker green
    },
    {
      id: "partnership",
      icon: <FaHandshake className="text-4xl text-white" />,
      title: "Strategic Partnerships",
      description: "Join our exclusive network of investors with flexible options from equity partnerships to revenue-sharing agreements.",
      color: "#7D5A50", // Earth tone
      accentColor: "#5D4037" // Darker earth tone
    },
    {
      id: "sustainability",
      icon: <FaSeedling className="text-4xl text-white" />,
      title: "Sustainable Growth",
      description: "Invest in environmentally conscious agriculture that delivers long-term returns while preserving natural resources.",
      color: "#73AB84", // Sage green
      accentColor: "#558B6E" // Darker sage
    }
  ];

  // Advanced investment benefits
  const investmentBenefits = [
    {
      icon: <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}><FaMoneyBillWave className="text-4xl text-green-500" /></motion.div>,
      title: "Steady Cash Flow",
      description: "Our agricultural investments provide regular income distributions, creating reliable cash flow for our investment partners."
    },
    {
      icon: <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.5 }}><FaChartLine className="text-4xl text-blue-500" /></motion.div>,
      title: "Portfolio Diversification",
      description: "Agricultural assets have historically shown low correlation with traditional financial markets, offering true portfolio diversification."
    },
    {
      icon: <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.5 }}><FaHandshake className="text-4xl text-amber-500" /></motion.div>,
      title: "Strategic Investment Partnerships",
      description: "Join our established investment community focused on sustainable agricultural growth with transparent structures and clear returns."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Investment Opportunities | Harvest Brothers</title>
        <meta name="description" content="Explore premium investment opportunities in Saharan agriculture with exceptional ROI and sustainable long-term growth." />
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
          <div className="absolute inset-0 bg-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=90" 
            alt="Premium wheat investment" 
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
            Investment Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-light max-w-3xl mx-auto"
          >
            Exceptional returns through sustainable agricultural investments
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
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Investment Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diverse agricultural investment opportunities with exceptional returns and tangible impact
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {investmentServices.map((service, index) => {
              // Map service IDs to their respective detail page URLs
              const detailUrls = {
                premium: "/services/saharan-crops",
                partnership: "/services/agricultural-research", 
                sustainability: "/services/irrigation-systems"
              };
              
              return (
                <RotatingServiceCard 
                  key={service.id}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  color={service.color}
                  accentColor={service.accentColor}
                  index={index}
                  inView={isServicesInView}
                  detailUrl={detailUrls[service.id]}
                />
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Growth Animation Section */}
      <section ref={growthRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isGrowthInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-bold mb-6 tracking-tight"
              >
                Exceptional Returns on Investment
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isGrowthInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-gray-600 mb-6"
              >
                Our premium Saharan wheat operations consistently deliver market-beating returns while maintaining sustainable farming practices and supporting local communities.
              </motion.p>
              
              <motion.ul
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={isGrowthInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {[
                  "5-10% average annual returns since 2022",
                  "Steady consistent growth with expanding operations",
                  "Low volatility compared to traditional financial markets",
                  "Inflation-protected investment with tangible agricultural assets"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isGrowthInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.6 + (i * 0.1), duration: 0.6 }}
                    className="flex items-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <div className="md:w-1/2">
              <GrowthAnimation inView={isGrowthInView} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Advanced Investment Benefits Section */}
      <section ref={advancedServicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAdvancedServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Investment Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond exceptional returns, our investment opportunities offer unique advantages
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {investmentBenefits.map((benefit, index) => (
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
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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
            Ready to Grow Your Wealth with Us?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl font-light max-w-3xl mx-auto mb-10"
          >
            Join our community of investors who are experiencing exceptional returns while making a positive impact on sustainable agriculture.
          </motion.p>
          
          <Link href="/investors">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-800 py-4 px-10 rounded-full font-bold text-lg shadow-lg"
            >
              Schedule an Investment Consultation
            </motion.button>
          </Link>
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
