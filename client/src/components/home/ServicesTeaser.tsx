import { useRef } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { motion, useInView } from "framer-motion";
import { FaChartLine, FaHandshake, FaLeaf } from "react-icons/fa";

// Apple-style Service Card Component
const ServiceCard = ({ title, description, icon, index, inView }) => {
  const cardColors = [
    { bg: "from-green-50 to-green-200", text: "text-green-700", iconBg: "bg-green-100" },
    { bg: "from-amber-50 to-amber-200", text: "text-amber-700", iconBg: "bg-amber-100" },
    { bg: "from-blue-50 to-blue-200", text: "text-blue-700", iconBg: "bg-blue-100" },
  ];
  
  const color = cardColors[index % cardColors.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.2 + index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      className={`rounded-2xl p-6 bg-gradient-to-br ${color.bg} hover:shadow-lg transition-all duration-300`}
    >
      <div className={`w-12 h-12 rounded-full ${color.iconBg} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-2 ${color.text}`}>{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Background Particle Animation
const ParticleAnimation = () => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200 opacity-30"
            style={{ 
              width: size, 
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`
            }}
            animate={{ 
              x: [
                0,
                Math.random() * 30 - 15,
                Math.random() * 30 - 15,
                0
              ],
              y: [
                0,
                Math.random() * 30 - 15,
                Math.random() * 30 - 15,
                0
              ],
            }}
            transition={{ 
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
};

const ServicesTeaser = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Investment opportunity data
  const investmentOpportunities = [
    {
      icon: <FaChartLine className="text-xl text-green-700" />,
      title: "Premium Returns",
      description: "Consistently delivering 5-10% average annual returns (7% average) to our investors, outperforming traditional agricultural investments while creating sustainable value.",
      url: "/investments/premium-returns"
    },
    {
      icon: <FaHandshake className="text-xl text-amber-700" />,
      title: "Strategic Partnerships",
      description: "Flexible investment structures available, from equity partnerships to revenue-sharing agreements tailored to your goals.",
      url: "/investments/strategic-partnerships"
    },
    {
      icon: <FaLeaf className="text-xl text-blue-700" />,
      title: "Sustainable Growth",
      description: "Our eco-friendly practices ensure long-term growth while positively impacting the environment and local communities.",
      url: "/investments/sustainable-growth"
    }
  ];

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background with Apple-style gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
      <ParticleAnimation />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Apple-inspired section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: "3rem" } : { width: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-1 bg-green-500 mx-auto mb-6"
            />
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Investment Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exceptional returns with sustainable impact through premium agricultural investments.
            </p>
          </motion.div>
          
          {/* Apple-inspired investment opportunity cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentOpportunities.map((opportunity, index) => (
              <div key={index}>
                <ServiceCard 
                  title={opportunity.title}
                  description={opportunity.description}
                  icon={opportunity.icon}
                  index={index}
                  inView={isInView}
                />
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-16"
          >
            <Link href="/investors">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-8 rounded-full inline-flex items-center transition-colors duration-300"
              >
                <span className="font-medium">Explore Investment Options</span>
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;
