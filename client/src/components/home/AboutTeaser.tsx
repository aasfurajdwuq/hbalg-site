import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";

const AboutTeaser = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      ref={ref} 
      className="py-24 bg-black text-white overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgb(25, 25, 25), rgb(15, 15, 15))'
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image with Apple-style parallax and reveal effect */}
          <motion.div 
            className="w-full md:w-1/2 order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl overflow-hidden">
              <motion.div
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative aspect-[4/3]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1606041011872-596597976b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=90" 
                  alt={t("about.imageAlt")} 
                  className="w-full h-full object-cover"
                />
                {/* Apple-style frosted glass caption */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/30 p-4"
                >
                  <p className="text-sm font-light text-white/90">Algerian Sahara wheat fields at sunset</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content with Apple-style staggered text reveal */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            >
              {t("about.title")}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-white/80 text-lg"
            >
              {t("about.paragraph1")}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-white/80 text-lg"
            >
              {t("about.paragraph2")}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 text-white/80 text-lg"
            >
              {t("about.paragraph3")}
            </motion.p>
            
            {/* Apple-style button with hover effect */}
            <Link href="/about">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  x: 5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="inline-flex items-center cursor-pointer group"
              >
                <span className="text-white font-medium mr-2">{t("about.learnMore")}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-white transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
