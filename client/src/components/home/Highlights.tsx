import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { FaSeedling, FaLeaf, FaGlobeAfrica, FaCarrot, FaAppleAlt, FaWater } from "react-icons/fa";

// Apple-inspired highlight items showcasing diverse agricultural expertise
const highlights = [
  {
    icon: FaSeedling,
    color: "#D6B85A", // Gold
    name: "Premium Crops",
    title: "Premium Saharan Crops",
    subtitle: "Our signature harvests with exceptional yield",
    details: "Cultivated using innovative techniques that maximize growth in arid conditions, our crop varieties have been specially selected for the Saharan region.",
    delay: 0
  },
  {
    icon: FaCarrot,
    color: "#E67E22", // Orange
    name: "Research",
    title: "Agricultural Research",
    subtitle: "Developing high-yield cultivation methods",
    details: "Our research teams develop crops that thrive in the mineral-rich soil of our farms, producing exceptional harvests with superior quality and nutrition profiles.",
    delay: 0.1
  },
  {
    icon: FaWater,
    color: "#1ABC9C", // Teal
    name: "Water Management",
    title: "Advanced Irrigation Systems",
    subtitle: "Desert-optimized water management",
    details: "Our crops benefit from innovative irrigation technologies, developing exceptional growth while utilizing our water-efficient cultivation techniques.",
    delay: 0.2
  },
  {
    icon: FaAppleAlt,
    color: "#C0392B", // Red
    name: "Diversity",
    title: "Diverse Agricultural Portfolio",
    subtitle: "Desert-adapted cultivation varieties",
    details: "We're pioneering the cultivation of specialized crop varieties adapted to thrive in desert conditions with minimal water requirements.",
    delay: 0.3
  },
  {
    icon: FaLeaf,
    color: "#27AE60", // Green
    name: "Sustainable",
    title: "Sustainable Practices",
    subtitle: "Environmentally conscious farming",
    details: "All our diverse crops are grown using sustainable practices that preserve soil health, conserve water, and minimize environmental impact.",
    delay: 0.4
  },
  {
    icon: FaGlobeAfrica,
    color: "#7D5A50", // Earth tone
    name: "Global",
    title: "Global Distribution",
    subtitle: "Reaching markets worldwide",
    details: "Our diverse agricultural products meet international standards and are exported to markets across Africa, Europe, and the Middle East.",
    delay: 0.5
  }
];

const Highlights = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Apple-style container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Apple-inspired heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Diverse Agricultural Cultivation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Growing premium crops through innovation, sustainability, and world-class farming techniques optimized for desert conditions.</p>
        </motion.div>
        
        {/* Apple-style highlight items with more advanced grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.8, 
                delay: highlight.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "rgba(255, 255, 255, 1)",
                scale: 1.02
              }}
              className="rounded-2xl bg-gray-50 p-8 transition-all duration-500"
              style={{ 
                transformStyle: "preserve-3d", 
                perspective: "1000px" 
              }}
            >
              {/* Icon with animated circular background */}
              <motion.div 
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full flex items-center justify-center" 
                  style={{ background: `linear-gradient(135deg, ${highlight.color}aa, ${highlight.color})` }}
                  whileHover={{ 
                    boxShadow: `0 0 20px ${highlight.color}80`,
                    background: `linear-gradient(135deg, ${highlight.color}, ${highlight.color}aa)`
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 0 0px ${highlight.color}00`, 
                      `0 0 10px ${highlight.color}30`, 
                      `0 0 0px ${highlight.color}00`
                    ]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <highlight.icon className="text-2xl text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Title and subtitle */}
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">{highlight.title}</h3>
              <p className="text-gray-500 mb-4">{highlight.subtitle}</p>
              
              {/* Details with enhanced animations */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm text-gray-600"
              >
                <p>{highlight.details}</p>
              </motion.div>
              
              {/* Apple-style learn more arrow with enhanced animation */}
              <motion.div 
                className="mt-6 flex items-center text-sm font-medium cursor-pointer"
                style={{ color: highlight.color }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span>Learn more</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: [0, 5, 0], transition: { repeat: Infinity, duration: 1 } }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
