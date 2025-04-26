import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { bestInAlgeriaBadge } from '@/assets/image-imports';
import { FaChartLine, FaLeaf, FaHandshake, FaUsers } from "react-icons/fa";

// Animated Chart Component
const AnimatedChart = ({ inView }) => {
  const yieldData = [
    { year: "2023", value: 6.0, color: "#4CAF50" },
    { year: "2024", value: 7.5, color: "#66BB6A" },
    { year: "2025", value: 8.5, color: "#81C784" },
    { year: "2026", value: 9.5, color: "#A5D6A7", projected: true }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
      <h3 className="text-2xl font-bold mb-8 text-center">Yield Performance</h3>
      
      <div className="w-full flex flex-col">
        {/* Chart */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {yieldData.map((item, i) => (
            <motion.div 
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6,
                delay: 0.2 + (i * 0.1),
              }}
            >
              <div className="w-full h-[180px] flex items-end justify-center mb-4">
                <motion.div
                  className="w-20 rounded-t-lg relative flex items-center justify-center"
                  style={{ 
                    backgroundColor: item.color,
                    height: `${(item.value / 10) * 100}%`
                  }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${(item.value / 10) * 100}%` } : { height: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.4 + (i * 0.1),
                  }}
                >
                  <motion.div
                    className="absolute -top-10 text-center"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                  >
                    <div className="text-2xl font-bold text-gray-800">{item.value}%</div>
                  </motion.div>
                </motion.div>
              </div>
              <div className="text-center">
                <div className="font-medium text-lg">{item.year}</div>
                {item.projected && (
                  <div className="text-sm text-gray-500 mt-1">(Projected)</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Horizontal line */}
        <div className="w-full h-px bg-gray-200 mb-4"></div>
        
        {/* Caption */}
        <div className="text-center text-gray-500">
          <p>Annual yield performance from 2023 to 2026 (projected)</p>
        </div>
      </div>
    </div>
  );
};

// Animated Number Counter
const CountUp = ({ end, suffix = "", duration = 2, inView }) => {
  const [count, setCount] = useState(0);
  
  const nodeRef = useRef(null);
  
  // Animate the count when in view
  useState(() => {
    if (!inView) return;
    
    let startTime;
    let requestId;
    
    const countUp = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestId = requestAnimationFrame(countUp);
      }
    };
    
    requestId = requestAnimationFrame(countUp);
    
    return () => cancelAnimationFrame(requestId);
  }, [inView, end, duration]);
  
  return (
    <motion.span
      ref={nodeRef}
      className="text-5xl font-bold text-amber-600"
    >
      {count}{suffix}
    </motion.span>
  );
};

// ROI Calculator Component
const ROICalculator = ({ inView }) => {
  const [investment, setInvestment] = useState(100000);
  const [years, setYears] = useState(5);
  
  const calculateROI = () => {
    // Projected annual return: 5-10%
    const annualReturn = 0.07; // Using 7% average
    return Math.round(investment * Math.pow(1 + annualReturn, years));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h3 className="text-2xl font-bold mb-6">Investment Calculator</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Investment Amount ($)</label>
          <motion.input 
            type="range" 
            min="10000" 
            max="1000000" 
            step="10000" 
            value={investment}
            onChange={(e) => setInvestment(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            whileTap={{ scale: 1.1 }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>$10,000</span>
            <span className="font-medium text-amber-600">${investment.toLocaleString()}</span>
            <span>$1,000,000</span>
          </div>
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Investment Period (Years)</label>
          <motion.input 
            type="range" 
            min="1" 
            max="10" 
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            whileTap={{ scale: 1.1 }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>1 year</span>
            <span className="font-medium text-amber-600">{years} years</span>
            <span>10 years</span>
          </div>
        </div>
        
        <motion.div 
          className="bg-gradient-to-r from-amber-50 to-green-50 p-6 rounded-xl text-center"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-lg mb-2">Projected Return</div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={`${investment}-${years}`} // Trigger animation on value change
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-green-700"
          >
            ${calculateROI().toLocaleString()}
          </motion.div>
          <div className="text-sm text-gray-600 mt-2">Based on 5-10% projected annual yield</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Investor Testimonial Card Component
const TestimonialCard = ({ quote, author, company, delay, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="bg-white p-6 rounded-2xl shadow-md"
  >
    <div className="mb-4 text-amber-400">
      {Array(5).fill(0).map((_, i) => (
        <span key={i} className="mr-1">★</span>
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{quote}"</p>
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl">
        {author.charAt(0)}
      </div>
      <div className="ml-3">
        <div className="font-medium">{author}</div>
        <div className="text-sm text-gray-500">{company}</div>
      </div>
    </div>
  </motion.div>
);

// Main Component
const Investors = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const chartRef = useRef(null);
  const benefitsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  
  // Check if elements are in view
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isChartInView = useInView(chartRef, { once: true, amount: 0.3 });
  const isBenefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const isContactInView = useInView(contactRef, { once: true, amount: 0.3 });
  
  // Parallax for header
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  return (
    <>
      <Helmet>
        <title>Investment Opportunities | Harvest Brothers</title>
        <meta name="description" content="Discover premium investment opportunities in sustainable Algerian agriculture with industry-leading returns and ecological benefits." />
      </Helmet>
      
      {/* Parallax Header */}
      <motion.section
        ref={headerRef}
        className="relative h-[80vh] overflow-hidden flex items-center justify-center bg-black"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            y: headerY,
            scale: headerScale,
            opacity: headerOpacity
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1620213391001-df610d89c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=90" 
            alt="Agricultural investment" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-20 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.img 
              src={bestInAlgeriaBadge}
              alt="Best in Algeria"
              className="w-24 h-24 mx-auto mb-6"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              Premium Agricultural Investments
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl font-light mb-8"
            >
              Join our growing community of investors who are transforming agriculture while earning exceptional returns
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className="bg-white text-green-800 py-4 px-8 rounded-full font-medium shadow-lg hover:bg-opacity-90 transition-all duration-300">
                Get Investment Proposal
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Subtle scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Statistics Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { value: 7, suffix: "%", label: "Average Annual Return", icon: <FaChartLine className="text-amber-500 text-5xl mb-4" /> },
              { value: 500, suffix: "+", label: "Hectares Under Management", icon: <FaLeaf className="text-green-500 text-5xl mb-4" /> },
              { value: 10, suffix: "M", label: "Total Investment Managed", icon: <FaHandshake className="text-blue-500 text-5xl mb-4" /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  delay: i * 0.2,
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100"
              >
                {stat.icon}
                <div className="h-16 flex items-center justify-center">
                  {isStatsInView && <CountUp end={stat.value} suffix={stat.suffix} inView={isStatsInView} />}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Chart Section */}
      <section ref={chartRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isChartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Performance Analytics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tracking our consistent growth and exceptional yield performance
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <AnimatedChart inView={isChartInView} />
            </div>
            <div className="md:w-1/2">
              <ROICalculator inView={isChartInView} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Investment Benefits */}
      <section ref={benefitsRef} className="py-20 bg-gradient-to-r from-amber-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Investment Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just financial returns—sustainable impact with tangible benefits
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8">
            {[
              {
                title: "Strong Financial Returns",
                description: "5-10% average annual return, significantly outperforming traditional agricultural investments.",
                icon: <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
              },
              {
                title: "Diversification Benefits",
                description: "Agricultural investments have shown low correlation with traditional asset classes, providing portfolio diversification.",
                icon: <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </motion.div>
              },
              {
                title: "Inflation Protection",
                description: "Agricultural commodities typically appreciate during inflationary periods, providing a natural hedge.",
                icon: <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </motion.div>
              },
              {
                title: "Environmental Impact",
                description: "Our sustainable practices sequester carbon, protect biodiversity, and preserve water resources.",
                icon: <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isBenefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  delay: 0.2 + (i * 0.1),
                  duration: 0.6, 
                }}
                className="flex"
              >
                <div className="mr-6">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Investor Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community of investors who have experienced the benefits firsthand
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="My investment in Harvest Brothers has consistently outperformed my traditional portfolio. Their transparent reporting and sustainable practices give me confidence in both the financial and ecological returns."
              author="Mohammed Al-Fasi"
              company="Private Investor"
              delay={0}
              inView={isTestimonialsInView}
            />
            <TestimonialCard 
              quote="As someone deeply concerned about climate change, I was looking for investments that aligned with my values. Harvest Brothers delivers exceptional returns while regenerating the land—exactly what I was searching for."
              author="Amina Khalidi"
              company="Green Capital Partners"
              delay={0.2}
              inView={isTestimonialsInView}
            />
            <TestimonialCard 
              quote="The team's agricultural expertise is impressive. They've transformed desert lands into productive farmland and my investment has grown substantially. Their regular updates and farm visits make me feel connected to the project."
              author="Ahmed Benali"
              company="Sustainable Growth Fund"
              delay={0.4}
              inView={isTestimonialsInView}
            />
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section ref={contactRef} className="py-20 bg-gradient-to-r from-green-800 to-amber-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Become an Investor</h2>
              <p className="text-xl font-light">
                Complete the form below to receive our detailed investment prospectus and schedule a consultation
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-medium">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Investment Interest</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  <option value="" disabled selected>Select your investment range</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Message (Optional)</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-32"
                  placeholder="Any specific questions or interests?"
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                Request Investment Information
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Investors;
