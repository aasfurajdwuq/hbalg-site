import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { FaSeedling, FaLeaf, FaGlobeAfrica } from "react-icons/fa";

// Apple-inspired highlight items
const highlights = [
  {
    icon: FaSeedling,
    color: "#3E7C17", // Green shade
    title: "highlights.landClimate.title",
    subtitle: "highlights.landClimate.subtitle",
    details: "highlights.landClimate.details",
    delay: 0
  },
  {
    icon: FaLeaf,
    color: "#73AB84", // Another green shade
    title: "highlights.sustainable.title",
    subtitle: "highlights.sustainable.subtitle",
    details: "highlights.sustainable.details",
    delay: 0.1
  },
  {
    icon: FaGlobeAfrica,
    color: "#7D5A50", // Earth tone 
    title: "highlights.globalReach.title",
    subtitle: "highlights.globalReach.subtitle",
    details: "highlights.globalReach.details",
    delay: 0.2
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Premium Saharan Wheat</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Cultivating excellence through innovation, sustainability, and global standards.</p>
        </motion.div>
        
        {/* Apple-style highlight items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
              className="rounded-2xl bg-gray-50 p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Icon with circular background */}
              <div className="mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center" 
                  style={{ background: `linear-gradient(135deg, ${highlight.color}aa, ${highlight.color})` }}
                >
                  <highlight.icon className="text-2xl text-white" />
                </div>
              </div>
              
              {/* Title and subtitle */}
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">{t(highlight.title)}</h3>
              <p className="text-gray-500 mb-4">{t(highlight.subtitle)}</p>
              
              {/* Details with subtle fade-in */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm text-gray-600"
              >
                <p>{t(highlight.details)}</p>
              </motion.div>
              
              {/* Apple-style learn more arrow */}
              <div className="mt-6 flex items-center text-sm font-medium" style={{ color: highlight.color }}>
                <span>Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
