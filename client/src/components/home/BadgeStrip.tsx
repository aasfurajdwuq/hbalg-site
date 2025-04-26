import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from "@/lib/i18n";
import { 
  growTogetherBadge, 
  certifiedOrganicBadge, 
  bestInAlgeriaBadge 
} from '@/assets/image-imports';

// Flip Card Component 
const FlipCard = ({ frontContent, backContent, index, isInView }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      className="h-48 w-48 perspective cursor-pointer"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.3 + (index * 0.2),
        ease: [0.16, 1, 0.3, 1] 
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front side */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center backface-hidden">
          {frontContent}
          
          <motion.div
            className="absolute bottom-3 text-xs text-gray-400"
            animate={{ y: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
            }}
          >
            Tap to flip
          </motion.div>
        </div>
        
        {/* Back side */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180">
          {backContent}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Badge data with detailed descriptions
const badges = [
  {
    image: bestInAlgeriaBadge,
    title: "Best in Algeria",
    description: "Recognized as the premier agricultural enterprise in Algeria, setting the highest standards for premium wheat production and sustainable farming practices.",
    index: 0
  },
  {
    image: certifiedOrganicBadge,
    title: "Certified Organic",
    description: "Our wheat meets the strictest international organic standards, grown without synthetic chemicals and using regenerative farming methods that improve soil health.",
    index: 1
  },
  {
    image: growTogetherBadge,
    title: "Top Investment Returns",
    description: "Consistently delivering 18% average annual returns to our investors, outperforming traditional agricultural investments while creating sustainable value.",
    index: 2
  }
];

const BadgeStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Insert CSS for 3D transforms
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      .perspective { perspective: 1000px; }
      .transform-style-3d { transform-style: preserve-3d; }
      .backface-hidden { backface-visibility: hidden; }
      .rotate-y-180 { transform: rotateY(180deg); }
    `;
    document.head.appendChild(style);
  }

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
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-2">Excellence & Recognition</h2>
        <p className="text-gray-600 max-w-lg mx-auto">Setting the standard for premium agricultural investment with awards and certifications that showcase our commitment to quality.</p>
      </motion.div>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* 3D Flip Cards */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {badges.map((badge) => (
            <FlipCard
              key={badge.index}
              index={badge.index}
              isInView={isInView}
              frontContent={
                <div className="flex flex-col items-center">
                  <img 
                    src={badge.image} 
                    alt={badge.title} 
                    className="w-24 h-24 object-contain mb-2" 
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {badge.title}
                  </span>
                </div>
              }
              backContent={
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2 text-amber-700">{badge.title}</h3>
                  <p className="text-sm text-gray-700">{badge.description}</p>
                </div>
              }
            />
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
