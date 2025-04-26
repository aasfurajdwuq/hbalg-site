import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { FaLeaf, FaSeedling, FaSolarPanel, FaWater, FaHandsHelping, FaTimes, FaRecycle, FaTree } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n";

// Impact Stat Card
const ImpactStatCard = ({ icon, value, label, description, index, isInView }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <motion.div 
            className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {icon}
          </motion.div>
          <div className="ml-4">
            <motion.div 
              className="text-3xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 * index, type: "spring" }}
            >
              {value}
            </motion.div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Sustainability Principle Card
const PrincipleCard = ({ icon, title, description, index, isInView }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <div className="p-6">
        <motion.div
          className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-center mb-3">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </motion.div>
  );
};

// SDG Goal Card
const SDGGoalCard = ({ number, title, description, color, index, isInView }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <div className={`h-2`} style={{ backgroundColor: color }} />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <motion.div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: color }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.3 * index, type: "spring" }}
          >
            {number}
          </motion.div>
          <h3 className="ml-3 text-lg font-bold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Animated Leaf
const AnimatedLeaf = ({ x, y, rotation, delay, size }) => {
  return (
    <motion.div
      className="absolute text-green-600 opacity-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: size,
        transformOrigin: "center",
      }}
      animate={{
        y: [0, -30, 0, 30, 0],
        x: [0, 20, 0, -20, 0],
        rotate: [rotation, rotation + 10, rotation, rotation - 10, rotation],
        opacity: [0.2, 0.3, 0.2, 0.1, 0.2]
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      <FaLeaf />
    </motion.div>
  );
};

// Background Decoration
const LeafBackground = () => {
  const leaves = [
    { x: 10, y: 20, rotation: 30, delay: 0, size: "3rem" },
    { x: 80, y: 15, rotation: 45, delay: 1, size: "4rem" },
    { x: 30, y: 60, rotation: 60, delay: 2, size: "2.5rem" },
    { x: 70, y: 70, rotation: 20, delay: 0.5, size: "3.5rem" },
    { x: 20, y: 40, rotation: 10, delay: 1.5, size: "3rem" },
    { x: 60, y: 30, rotation: 70, delay: 2.5, size: "2.8rem" },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {leaves.map((leaf, i) => (
        <AnimatedLeaf
          key={i}
          x={leaf.x}
          y={leaf.y}
          rotation={leaf.rotation}
          delay={leaf.delay}
          size={leaf.size}
        />
      ))}
    </div>
  );
};

// Sustainable Growth Bar Graph
const SustainableGrowthGraph = ({ isInView }) => {
  const years = ["2022", "2023", "2024", "2025", "2026"];
  const sustainabilityImpact = [35, 48, 65, 79, 92]; // percentage impact scores
  const financialReturns = [5.4, 6.2, 7.1, 7.8, 8.5]; // percentage returns
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Projected Growth & Impact</h3>
      <div className="relative h-64 mt-6">
        {/* Y-axis labels for sustainability */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
        
        {/* Y-axis labels for returns */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          <span>10%</span>
          <span>7.5%</span>
          <span>5%</span>
          <span>2.5%</span>
          <span>0%</span>
        </div>
        
        {/* Chart area */}
        <div className="absolute left-8 right-8 top-0 bottom-6">
          {/* Horizontal grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="absolute w-full h-px bg-gray-100" style={{ top: `${i * 25}%` }} />
          ))}
          
          {/* Bars and line */}
          <div className="absolute inset-0 flex justify-around items-end">
            {years.map((year, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Sustainability impact bar */}
                <motion.div 
                  className="w-8 bg-green-200 rounded-t-sm"
                  style={{ height: `${sustainabilityImpact[i]}%` }}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${sustainabilityImpact[i]}%` } : { height: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + (i * 0.1) }}
                >
                  <motion.div 
                    className="absolute -top-6 w-full text-center text-xs text-green-800"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                  >
                    {sustainabilityImpact[i]}%
                  </motion.div>
                </motion.div>
                
                {/* Return value point */}
                <motion.div 
                  className="absolute w-3 h-3 rounded-full bg-amber-500"
                  style={{ bottom: `${financialReturns[i] * 10}%`, left: "50%" }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                >
                  <motion.div 
                    className="absolute -top-6 -left-4 w-10 text-center text-xs text-amber-800"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 1 + (i * 0.1) }}
                  >
                    {financialReturns[i]}%
                  </motion.div>
                </motion.div>
                
                {/* Year label */}
                <div className="absolute -bottom-6 text-xs text-gray-500">{year}</div>
              </div>
            ))}
            
            {/* Connect return points with line */}
            <svg className="absolute inset-0 overflow-visible">
              <motion.path
                d={`M ${20} ${100 - financialReturns[0] * 10}% 
                     L ${(100 / years.length) + 20}% ${100 - financialReturns[1] * 10}% 
                     L ${(200 / years.length) + 20}% ${100 - financialReturns[2] * 10}% 
                     L ${(300 / years.length) + 20}% ${100 - financialReturns[3] * 10}% 
                     L ${(400 / years.length) + 20}% ${100 - financialReturns[4] * 10}%`}
                stroke="#F59E0B"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </svg>
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-8 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-200 mr-1"></div>
            <span>Sustainability Impact</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
            <span>Financial Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const SustainableGrowth = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const heroRef = useRef(null);
  const impactRef = useRef(null);
  const principlesRef = useRef(null);
  const growthRef = useRef(null);
  const sdgRef = useRef(null);
  
  // Check if elements are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.3 });
  const isPrinciplesInView = useInView(principlesRef, { once: true, amount: 0.3 });
  const isGrowthInView = useInView(growthRef, { once: true, amount: 0.3 });
  const isSdgInView = useInView(sdgRef, { once: true, amount: 0.3 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  // Impact stats data
  const impactStats = [
    {
      icon: <FaWater className="text-2xl" />,
      value: "65%",
      label: "Water Reduction",
      description: "Our sustainable farming methods reduce water usage by 65% compared to conventional techniques."
    },
    {
      icon: <FaRecycle className="text-2xl" />,
      value: "Zero",
      label: "Chemical Waste",
      description: "Our operations produce zero chemical waste through natural farming processes and recycling."
    },
    {
      icon: <FaTree className="text-2xl" />,
      value: "3,200",
      label: "Hectares Managed",
      description: "We sustainably manage 3,200 hectares of formerly unused desert land, creating productive landscapes."
    },
    {
      icon: <FaHandsHelping className="text-2xl" />,
      value: "400+",
      label: "Local Jobs Created",
      description: "Our operations have created over 400 sustainable agricultural jobs in local communities."
    }
  ];
  
  // Sustainability principles
  const sustainabilityPrinciples = [
    {
      icon: <FaWater className="text-3xl" />,
      title: "Water Conservation",
      description: "Advanced drip irrigation and water recycling systems minimize water usage while maximizing crop yields."
    },
    {
      icon: <FaSolarPanel className="text-3xl" />,
      title: "Renewable Energy",
      description: "Solar-powered operations reduce carbon footprint and provide reliable energy in remote agricultural locations."
    },
    {
      icon: <FaRecycle className="text-3xl" />,
      title: "Circular Economy",
      description: "All agricultural byproducts are recycled or repurposed, creating a zero-waste system across operations."
    }
  ];
  
  // SDG alignments
  const sdgAlignments = [
    {
      number: 2,
      title: "Zero Hunger",
      description: "Contributing to food security through sustainable desert agriculture in regions with limited arable land.",
      color: "#DDA63A"
    },
    {
      number: 6,
      title: "Clean Water",
      description: "Implementing water conservation and management systems that preserve this vital resource.",
      color: "#26BDE2"
    },
    {
      number: 8,
      title: "Decent Work",
      description: "Creating sustainable agricultural jobs and economic growth in rural communities.",
      color: "#A21942"
    },
    {
      number: 13,
      title: "Climate Action",
      description: "Reducing carbon footprint through sustainable practices and renewable energy integration.",
      color: "#3F7E44"
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
              <title>Sustainable Growth | Harvest Brothers</title>
              <meta name="description" content="Discover how our sustainable agricultural investments deliver long-term returns while preserving natural resources and supporting local communities." />
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
                className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-700/80 flex items-center justify-center"
              >
              </div>
            </div>
            
            {/* Hero heading - similar to Advanced Irrigation Systems */}
            <div className="pt-12 pb-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
                Sustainable Growth
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Long-term returns that preserve natural resources and benefit communities
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
                  At Harvest Brothers, we believe that true sustainability means environmental stewardship, social responsibility, and financial viability working in harmony. Our sustainable growth approach ensures that as your investment grows, so does our positive impact on the environment and local communities. This holistic approach creates resilient agricultural systems that deliver consistent returns while regenerating natural resources.
                </motion.p>
              </div>
              
              {/* Impact Stats */}
              <div ref={impactRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Impact
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {impactStats.map((stat, index) => (
                    <ImpactStatCard 
                      key={index}
                      icon={stat.icon}
                      value={stat.value}
                      label={stat.label}
                      description={stat.description}
                      index={index}
                      isInView={isImpactInView}
                    />
                  ))}
                </div>
              </div>
              
              {/* Growth Projection */}
              <div ref={growthRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isGrowthInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Sustainable Growth Projection
                </motion.h2>
                
                <SustainableGrowthGraph isInView={isGrowthInView} />
                
                <motion.p 
                  className="text-center text-gray-600 mt-6"
                  initial={{ opacity: 0 }}
                  animate={isGrowthInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  Our projections show that as sustainability impact increases, financial returns follow a steady growth pattern, demonstrating the strong correlation between sustainable practices and long-term financial performance.
                </motion.p>
              </div>
              
              {/* Sustainability Principles */}
              <div ref={principlesRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPrinciplesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Sustainability Principles
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sustainabilityPrinciples.map((principle, index) => (
                    <PrincipleCard 
                      key={index}
                      icon={principle.icon}
                      title={principle.title}
                      description={principle.description}
                      index={index}
                      isInView={isPrinciplesInView}
                    />
                  ))}
                </div>
              </div>
              
              {/* SDG Alignment */}
              <div ref={sdgRef} className="mb-20">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-12 text-green-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isSdgInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8 }}
                >
                  UN Sustainable Development Goals Alignment
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sdgAlignments.map((sdg, index) => (
                    <SDGGoalCard 
                      key={index}
                      number={sdg.number}
                      title={sdg.title}
                      description={sdg.description}
                      color={sdg.color}
                      index={index}
                      isInView={isSdgInView}
                    />
                  ))}
                </div>
              </div>
              
              {/* Quote/Testimonial */}
              <div className="mb-20">
                <motion.div 
                  className="bg-gray-50 rounded-xl p-8 relative"
                  initial={{ opacity: 0 }}
                  animate={isImpactInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="text-6xl text-green-200 absolute top-4 left-4">"</div>
                  <blockquote className="text-xl text-gray-700 italic relative z-10 pl-6">
                    Our investment model proves that environmental sustainability and financial returns are not mutually exclusive, but rather mutually reinforcing. By regenerating natural resources, we create long-term value that benefits investors, communities, and ecosystems alike.
                  </blockquote>
                  <div className="mt-6 pl-6">
                    <div className="font-bold">Fatima Bouazizi</div>
                    <div className="text-sm text-gray-500">Chief Sustainability Officer, Harvest Brothers</div>
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
                    <a className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Invest in Sustainable Agriculture
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

export default SustainableGrowth;