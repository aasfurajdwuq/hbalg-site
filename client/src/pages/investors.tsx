import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaChartLine, FaMoneyBillWave, FaHandshake, FaSeedling, FaCalculator, FaLeaf, FaTractor } from "react-icons/fa";
import EmailJSForm from "@/components/forms/EmailJSForm";
import ROICalculator from "@/components/investors/ROICalculator";

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
            style={{
              backgroundImage: "radial-gradient(ellipse at center, #E9C46A 0%, transparent 70%)"
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: stalk.delay + 0.5 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// 3D Rotating Card Component
const RotatingInvestmentCard = ({ icon, title, description, color, accentColor, delay, inView }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Get unique benefits for each investment option based on title
  const getBenefitsByTitle = () => {
    if (title === "Premium ROI") {
      return [
        "Industry-leading 5-10% annual ROI",
        "Quarterly dividend distributions",
        "Capital appreciation through land value growth"
      ];
    } else if (title === "Strategic Partnerships") {
      return [
        "Flexible investment structures and entry points",
        "Shared risk model with experienced partners",
        "Strategic voting rights on farming decisions"
      ];
    } else if (title === "Sustainable Growth") {
      return [
        "Carbon offset credits and eco-bonuses",
        "Eco-certified regenerative farming practices",
        "Long-term resource preservation increasing value"
      ];
    } else {
      return [
        "Premium returns with exceptional annual yield",
        "Sustainable agricultural projects with long-term growth",
        "Diversified portfolio with agricultural stability"
      ];
    }
  };
  
  // Get the specific benefits for this card
  const benefits = getBenefitsByTitle();
  
  return (
    <motion.div
      className="relative w-full h-[400px] perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay: delay * 0.2, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl shadow-xl preserve-3d cursor-pointer"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.02 : 1,
          boxShadow: isFlipped 
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={handleCardClick}
      >
        {/* Front of Card */}
        <div 
          className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden"
          style={{ 
            backgroundColor: color,
            background: `linear-gradient(135deg, ${color} 0%, ${accentColor} 100%)`
          }}
        >
          <div className="w-20 h-20 bg-white/15 rounded-full flex items-center justify-center mb-6"
            style={{
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              backdropFilter: "blur(4px)"
            }}
          >
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white text-center">{title}</h3>
          <p className="text-white/80 text-center">{description}</p>
          
          <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm">
            Click to learn more
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
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 mr-2 flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto text-center text-white/70 text-sm">
            Click to flip back
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Growth Animation Component
const GrowthAnimation = ({ inView }) => {
  const growthBars = [
    { roi: 8, color: "#4CAF50", value: "2022" },
    { roi: 10, color: "#66BB6A", value: "2023" },
    { roi: 12, color: "#81C784", value: "2024" },
    { roi: 15, color: "#A5D6A7", value: "2025" }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white rounded-2xl p-8 shadow-md">
      <h3 className="text-xl font-bold mb-6 text-center">Investment Growth</h3>
      
      <div className="border-t border-gray-200 mb-6 pt-4">
        <div className="grid grid-cols-4 gap-4">
          {growthBars.map((bar, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.2 + (i * 0.1),
                }}
              >
                <div className="w-16 h-[120px] relative flex flex-col items-center justify-end mb-2">
                  <motion.div
                    className="w-full rounded-t-md bg-green-100 flex items-center justify-center"
                    style={{ 
                      backgroundColor: bar.color,
                      height: `${(bar.roi / 15) * 100}%`
                    }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${(bar.roi / 15) * 100}%` } : { height: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.4 + (i * 0.1),
                    }}
                  />
                </div>
                <motion.div
                  className="text-xl font-bold text-green-700"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
                >
                  {bar.roi}% ROI
                </motion.div>
                <div className="text-gray-500 font-medium mt-1">{bar.value}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animated feature card with hover effect
const FeatureCard = ({ title, description, icon, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.7,
        delay: 0.15 * index,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
        >
          {icon}
        </motion.div>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default function Investors() {
  const headerRef = useRef(null);
  const calculatorRef = useRef(null);
  const wheatFieldRef = useRef(null);
  const featuresRef = useRef(null);
  const investmentOptionsRef = useRef(null);
  const formRef = useRef(null);
  const growthRef = useRef(null);
  
  // Check if elements are in view
  const isWheatFieldInView = useInView(wheatFieldRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const isInvestmentOptionsInView = useInView(investmentOptionsRef, { once: true, amount: 0.1 });
  const isCalculatorInView = useInView(calculatorRef, { once: true, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isGrowthInView = useInView(growthRef, { once: true, amount: 0.2 });
  
  // Parallax effect for header
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Investment options
  const investmentOptions = [
    {
      id: "premium",
      icon: <FaChartLine className="text-4xl text-white" />,
      title: "Premium ROI",
      description: "Achieve exceptional returns of 5-10% annually through our strategic agricultural investments in premium Saharan crops.",
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

  // Investment benefits
  const investmentBenefits = [
    {
      icon: <FaMoneyBillWave className="text-4xl text-green-600" />,
      title: "Premium Returns",
      description: "Enjoy 7% average annual returns from our diversified agricultural portfolio, with carefully managed risk profiles."
    },
    {
      icon: <FaTractor className="text-4xl text-amber-600" />,
      title: "Advanced Operations",
      description: "Our state-of-the-art farming techniques and equipment maximize efficiency and yield for optimal investor returns."
    },
    {
      icon: <FaLeaf className="text-4xl text-green-600" />,
      title: "Sustainable Practices",
      description: "Environmentally responsible farming that supports local communities while building long-term value and ecological health."
    },
    {
      icon: <FaCalculator className="text-4xl text-amber-600" />,
      title: "Transparent Reporting",
      description: "Receive detailed quarterly reports and annual performance reviews with complete visibility into operations."
    }
  ];
  
  // EmailJS configuration for investor form
  const serviceId = "service_7rtmy0o";
  const templateId = "template_jkkcq1l";
  const publicKey = "rjdn_Wt8FhMSIEIvQ";
  const toEmail = "support@hbalg.com";
  
  return (
    <>
      <Helmet>
        <title>Investment Opportunities | Harvest Brothers</title>
        <meta name="description" content="Explore attractive investment opportunities with Harvest Brothers. Calculate your potential returns and join our community of investors supporting sustainable agriculture in Algeria." />
      </Helmet>
      
      {/* Hero header with parallax effect */}
      <header 
        ref={headerRef} 
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-green-900 to-amber-800 z-0"
          style={{ y: headerY }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-black/50 z-10"
          style={{ opacity: headerOpacity }}
        />
        
        <div className="container relative z-20 px-4 mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Investment Opportunities
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-10"
          >
            Join our mission to transform agriculture while securing premium returns on your investment
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="#investment-options">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold shadow-lg hover:bg-green-700 transition-colors"
              >
                Explore Options
              </motion.button>
            </Link>
            <Link href="#investment-calculator">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-amber-600 text-white rounded-lg font-bold shadow-lg hover:bg-amber-700 transition-colors"
              >
                Calculate Returns
              </motion.button>
            </Link>
          </motion.div>
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
      </header>
      
      {/* Wheat field animation */}
      <section ref={wheatFieldRef} className="py-8 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
        <WheatField inView={isWheatFieldInView} />
      </section>
      
      {/* Investment Options Section */}
      <section id="investment-options" ref={investmentOptionsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInvestmentOptionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Investment Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diverse agricultural investment opportunities with exceptional returns and tangible impact
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentOptions.map((option, i) => (
              <RotatingInvestmentCard
                key={option.id}
                icon={option.icon}
                title={option.title}
                description={option.description}
                color={option.color}
                accentColor={option.accentColor}
                delay={i}
                inView={isInvestmentOptionsInView}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Exceptional Returns Section */}
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
                Our premium Saharan agricultural operations consistently deliver market-beating returns while maintaining sustainable farming practices and supporting local communities.
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
      
      {/* Investment Benefits Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Invest With Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harvest Brothers offers premium investment opportunities with consistent returns and transparent management
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {investmentBenefits.map((benefit, i) => (
              <FeatureCard
                key={i}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                index={i}
                inView={isFeaturesInView}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Market Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Algerian Agricultural Market Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A strategic analysis of the growing agricultural sector in Algeria and its investment potential
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="rounded-lg overflow-hidden shadow-lg bg-stone-light p-6">
                <h3 className="text-2xl font-bold mb-4 text-earth-dark">Market Growth Indicators</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Agricultural GDP Growth</span>
                    <span className="font-bold text-leaf-dark">+12.8% (Year over Year)</span>
                  </div>
                  <div className="w-full bg-stone-dark/10 h-2 rounded-full">
                    <div className="bg-gradient-to-r from-green-600 to-amber-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Export Volume Increase</span>
                    <span className="font-bold text-leaf-dark">+18.5% (Last 2 Years)</span>
                  </div>
                  <div className="w-full bg-stone-dark/10 h-2 rounded-full">
                    <div className="bg-gradient-to-r from-green-600 to-amber-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Land Development</span>
                    <span className="font-bold text-leaf-dark">+7.2% (Annual)</span>
                  </div>
                  <div className="w-full bg-stone-dark/10 h-2 rounded-full">
                    <div className="bg-gradient-to-r from-green-600 to-amber-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Water Infrastructure</span>
                    <span className="font-bold text-leaf-dark">+21.3% (Investment)</span>
                  </div>
                  <div className="w-full bg-stone-dark/10 h-2 rounded-full">
                    <div className="bg-gradient-to-r from-green-600 to-amber-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-4 text-earth-dark">Strategic Advantages</h3>
              <p className="text-gray-700">
                Algeria's agricultural sector is experiencing unprecedented growth driven by strategic government investments, modernized irrigation systems, and expanding global export markets.
              </p>
              <ul className="space-y-4">
                {[
                  "Government incentives including 5-10 year tax exemptions for agricultural ventures",
                  "Fertile land available at competitive rates compared to European markets",
                  "Expanding international trade agreements with EU, MENA, and African regions",
                  "Growing domestic consumption creating stable local demand",
                  "Strategic location providing access to European, Mediterranean, and African markets"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* ROI Calculator Section */}
      <section id="investment-calculator" ref={calculatorRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Calculate Your Investment Growth</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our interactive calculator to see how your investment can grow over time with Harvest Brothers
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="mb-6 bg-amber-50 p-4 border-l-4 border-amber-500 rounded">
              <h4 className="font-bold text-amber-800 mb-1">Premium Investment Benefits</h4>
              <p className="text-amber-700">Our agricultural investments consistently deliver 5-10% annual returns while maintaining low risk profiles and supporting sustainable farming practices.</p>
            </div>
            <ROICalculator />
          </motion.div>
        </div>
      </section>
      
      {/* Investment Form Section */}
      <section id="investment-form" ref={formRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Investment Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our investment team will contact you to discuss tailored opportunities
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <EmailJSForm 
                serviceId={serviceId}
                templateId={templateId}
                publicKey={publicKey}
                toEmail={toEmail}
                formType="investor"
                title="Investor Information"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-amber-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to Grow Your Wealth with Us?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Join our community of investors supporting sustainable agricultural innovation in Algeria
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#investment-options-section"
              className="px-8 py-4 rounded-lg bg-white text-green-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Options
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#investment-form"
              className="px-8 py-4 rounded-lg bg-green-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}