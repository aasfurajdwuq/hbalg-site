import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaChartLine, FaMoneyBillWave, FaHandshake, FaSeedling, FaCalculator } from "react-icons/fa";
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

// Path animation component
const AnimatedPath = ({ inView }) => {
  return (
    <motion.div 
      className="hidden md:block absolute left-0 h-full w-1 ml-6"
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="h-full w-full bg-gradient-to-b from-green-500 to-amber-500" />
    </motion.div>
  );
};

export default function Investors() {
  const headerRef = useRef(null);
  const calculatorRef = useRef(null);
  const wheatFieldRef = useRef(null);
  const featuresRef = useRef(null);
  const formRef = useRef(null);
  
  // Check if elements are in view
  const isWheatFieldInView = useInView(wheatFieldRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const isCalculatorInView = useInView(calculatorRef, { once: true, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  
  // Parallax effect for header
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Investment benefits
  const investmentBenefits = [
    {
      icon: <FaMoneyBillWave className="text-4xl text-green-600" />,
      title: "Premium Returns",
      description: "Enjoy 7% average annual returns from our diversified agricultural portfolio, with carefully managed risk profiles."
    },
    {
      icon: <FaHandshake className="text-4xl text-amber-600" />,
      title: "Tailored Investment Options",
      description: "Flexible investment options starting from $25,000 with various commitment periods and payment schedules."
    },
    {
      icon: <FaSeedling className="text-4xl text-green-600" />,
      title: "Sustainable Growth",
      description: "Invest in environmentally responsible farming that supports local communities while building long-term value."
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
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
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
            Calculate your potential returns and invest in sustainable agriculture with Harvest Brothers
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="#investment-calculator">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold shadow-lg hover:bg-green-700 transition-colors"
              >
                Calculate Your Returns
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </header>
      
      {/* Wheat field animation */}
      <div ref={wheatFieldRef} className="w-full overflow-hidden my-8">
        <WheatField inView={isWheatFieldInView} />
      </div>
      
      {/* Investment Benefits Section */}
      <section ref={featuresRef} className="py-20">
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
      <section id="investment-form" ref={formRef} className="py-20 bg-white">
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
      <section className="py-16 bg-gradient-to-r from-green-700 to-amber-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold mb-2"
              >
                Ready to grow with us?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/80"
              >
                Join our community of investors supporting sustainable agriculture in Algeria
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#investment-calculator"
                className="px-6 py-3 bg-white text-green-700 font-bold rounded-lg shadow-lg text-center"
              >
                Calculate Returns
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#investment-form"
                className="px-6 py-3 bg-green-900 text-white font-bold rounded-lg shadow-lg text-center"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}