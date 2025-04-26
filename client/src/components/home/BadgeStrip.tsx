import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from "@/lib/i18n";
import { 
  growTogetherBadge, 
  certifiedOrganicBadge, 
  bestInAlgeriaBadge 
} from '@/assets/image-imports';

// Apple-inspired badge content
const badges = [
  {
    image: bestInAlgeriaBadge,
    label: 'badge.algeria',
    delay: 0
  },
  {
    image: certifiedOrganicBadge,
    label: 'Certified Organic',
    delay: 0.1
  },
  {
    image: growTogetherBadge,
    label: 'badge.growTogether',
    delay: 0.2
  }
];

const BadgeStrip = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref} 
      className="py-20 bg-gray-50 overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)' 
      }}
    >
      {/* Apple-style title animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl font-medium text-gray-600">Recognition & Standards</h2>
      </motion.div>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Apple-style badge container */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                duration: 0.8, 
                delay: badge.delay,
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
              className="p-4 bg-white rounded-2xl shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <img 
                  src={badge.image} 
                  alt={typeof badge.label === 'string' ? badge.label : t(badge.label)} 
                  className="w-24 h-24 object-contain mb-2" 
                />
                <span className="text-sm font-medium text-gray-700">
                  {typeof badge.label === 'string' ? badge.label : t(badge.label)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Apple-style subtle animation line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-16 max-w-xl mx-auto"
        />
      </div>
    </section>
  );
};

export default BadgeStrip;
