import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";

// Apple-style service cards with high-quality images
const services = [
  {
    image: "https://images.unsplash.com/photo-1629721671030-a83fcce3043b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=90",
    title: "services.cultivation.title",
    description: "services.cultivation.description",
    color: "#5B8C5A",
    delay: 0.1
  },
  {
    image: "https://images.unsplash.com/photo-1600594008661-b8db92837a64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=90",
    title: "services.leasing.title",
    description: "services.leasing.description",
    color: "#A4BE7B",
    delay: 0.2
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=90",
    title: "services.consultancy.title",
    description: "services.consultancy.description",
    color: "#2D3E40",
    delay: 0.3
  }
];

const ServicesTeaser = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Apple-style heading animation
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  return (
    <section 
      ref={ref} 
      className="py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Apple-style heading with horizontal line */}
        <div className="text-center mb-16 relative">
          <motion.div
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight inline-block relative">
              {t("services.title")}
              <motion.div 
                className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gray-900"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </h2>
          </motion.div>
        </div>
        
        {/* Apple-style service cards with 3D hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.8, 
                delay: service.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
            >
              {/* Image with overlay gradient */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={t(service.title)}
                  className="w-full h-full object-cover object-center"
                />
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${service.color}CC 100%)` 
                  }}
                />
              </div>
              
              {/* Content with Apple-style typography */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 tracking-tight">{t(service.title)}</h3>
                <p className="text-gray-600 mb-4 text-sm">{t(service.description)}</p>
                
                {/* Apple-style learn more link */}
                <Link href="/services">
                  <div 
                    className="inline-flex items-center font-medium text-sm group"
                    style={{ color: service.color }}
                  >
                    {t("services.learnMore")}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Apple-style view all button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            delay: 0.6, 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <Link href="/services">
            <div className="inline-flex items-center bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition-colors duration-300 cursor-pointer group">
              <span className="mr-2">{t("services.viewAll")}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesTeaser;
