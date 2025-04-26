import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { bestInAlgeriaBadge } from '@/assets/image-imports';

// Animated Value Component to handle counting animations
const AnimatedValue = ({ value, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = null;
    let animationFrame = null;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);
  
  return <>{count}{suffix}</>;
};

// Apple-style Animated Counter component
const AnimatedCounter = ({ targetValue, suffix = "", duration = 2.5, inView }) => {
  const nodeRef = useRef(null);
  
  return (
    <motion.span
      ref={nodeRef}
      className="tabular-nums text-4xl font-bold text-amber-600"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {inView && <AnimatedValue value={targetValue} duration={duration} suffix={suffix} />}
      </motion.span>
    </motion.span>
  );
};

// Apple-style Skewed Line Animation
const SkewedLineAnimation = ({ inView }) => {
  return (
    <svg 
      className="absolute right-0 top-0 bottom-0 h-full w-24 md:w-48 overflow-visible"
      viewBox="0 0 100 400" 
      preserveAspectRatio="none"
    >
      <motion.path
        d="M100,0 L65,400 L100,400 L100,0 Z"
        fill="#F59E0B"
        fillOpacity="0.07"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? {
          pathLength: 1,
          opacity: 1
        } : {
          pathLength: 0,
          opacity: 0
        }}
        transition={{ 
          pathLength: { duration: 1.5, ease: "easeInOut" },
          opacity: { duration: 0.5 }
        }}
      />
    </svg>
  );
};

const InvestorTeaser = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Scroll-based parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  
  // Investment stats
  const stats = [
    { value: 7, suffix: "%", label: t("home.investors.stats.return") },
    { value: 3200, suffix: "", label: t("home.investors.stats.hectares") },
    { value: 10, suffix: "M", label: t("home.investors.stats.investment") }
  ];

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-br from-amber-50 to-gray-50 overflow-hidden">
      <SkewedLineAnimation inView={isInView} />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left Content - Text and Stats */}
          <div className="lg:col-span-3">
            {/* Apple-inspired badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 inline-block"
            >
              <img 
                src={bestInAlgeriaBadge} 
                alt="Best in Algeria" 
                className="h-16 w-auto" 
              />
            </motion.div>
            
            {/* Apple-style heading animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                {t("home.investors.title")}
              </h2>
            </motion.div>
            
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xl text-gray-700 mb-10 max-w-2xl">
                {t("home.investors.description")}
              </p>
            </motion.div>
            
            {/* Apple-style stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4 + (i * 0.1),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-center"
                >
                  <AnimatedCounter 
                    targetValue={stat.value} 
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/investors">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-8 rounded-full inline-flex items-center transition-colors duration-300"
                >
                  <span className="font-medium">{t("home.investors.cta")}</span>
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          {/* Right Content - Decorative Elements */}
          <div className="lg:col-span-2 relative h-96">
            {/* Apple-style overlapping elements with parallax */}
            <motion.div 
              className="absolute right-10 bottom-10 w-48 h-64 rounded-2xl bg-white shadow-xl overflow-hidden"
              style={{ y: y1, rotate }}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Chart visualization */}
              <div className="p-4 h-full flex flex-col">
                <div className="text-lg font-bold text-gray-800 mb-1">Annual Returns</div>
                <div className="text-sm text-gray-500 mb-4">Year over year growth</div>
                
                <div className="flex-1 flex items-end justify-between px-2">
                  {[75, 90, 105, 125].map((height, i) => (
                    <motion.div 
                      key={i}
                      className="relative w-6 bg-amber-500 rounded-t-sm"
                      initial={{ height: 0 }}
                      animate={isInView ? { height } : { height: 0 }}
                      transition={{ 
                        duration: 1,
                        delay: 0.8 + (i * 0.2),
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                        {2020 + i}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute left-5 top-10 w-56 h-48 rounded-2xl bg-amber-50 shadow-lg overflow-hidden"
              style={{ y: y2 }}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Success metrics */}
              <div className="p-5 h-full flex flex-col">
                <div className="text-lg font-bold text-amber-800 mb-1">Investment Growth</div>
                <div className="text-sm text-amber-700 mb-4">Premium projections</div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "85%" } : { width: 0 }}
                  transition={{ 
                    duration: 1,
                    delay: 1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="h-3 bg-amber-400 rounded-full mb-2 relative"
                >
                  <span className="absolute -right-6 -top-1 text-xs font-medium">85%</span>
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "65%" } : { width: 0 }}
                  transition={{ 
                    duration: 1,
                    delay: 1.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="h-3 bg-amber-300 rounded-full mb-2 relative"
                >
                  <span className="absolute -right-6 -top-1 text-xs font-medium">65%</span>
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "92%" } : { width: 0 }}
                  transition={{ 
                    duration: 1,
                    delay: 1.4,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="h-3 bg-amber-200 rounded-full relative"
                >
                  <span className="absolute -right-6 -top-1 text-xs font-medium">92%</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorTeaser;