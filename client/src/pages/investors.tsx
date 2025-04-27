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

// 3D Card Component for investment options
const InvestmentCard = ({ icon, title, description, color, accentColor, delay, inView }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay: delay * 0.2, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full rounded-xl overflow-hidden shadow-lg transform transition-all duration-500"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
        transformOrigin: "center center"
      }}
    >
      <div 
        className="p-8 relative h-full flex flex-col"
        style={{ 
          backgroundColor: color,
          background: `linear-gradient(135deg, ${color} 0%, ${accentColor} 100%)`,
        }}
      >
        <div 
          className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mb-6"
          style={{
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            backdropFilter: "blur(4px)"
          }}
        >
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-white/90 mb-6">{description}</p>
        
        <motion.div 
          className="mt-auto"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="px-6 py-3 bg-white/20 text-white rounded-lg w-full font-medium hover:bg-white/30 transition-colors backdrop-blur-sm">
            Learn More
          </button>
        </motion.div>
      </div>
    </motion.div>
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
  
  // Check if elements are in view
  const isWheatFieldInView = useInView(wheatFieldRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const isInvestmentOptionsInView = useInView(investmentOptionsRef, { once: true, amount: 0.1 });
  const isCalculatorInView = useInView(calculatorRef, { once: true, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  
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
              <InvestmentCard
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
      
      {/* Investment Benefits Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
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
      
      {/* ROI Calculator Section */}
      <section id="investment-calculator" ref={calculatorRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Calculate Your Investment Growth</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our interactive calculator to see how your investment can grow over time
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
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
              href="#investment-options"
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