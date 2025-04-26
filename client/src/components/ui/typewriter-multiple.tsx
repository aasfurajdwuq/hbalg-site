import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterMultipleProps {
  phrases: string[];
  typingSpeed?: number;
  pauseTime?: number;
  className?: string;
  subtitles?: string[];
}

export const TypewriterMultiple = ({
  phrases,
  typingSpeed = 50,
  pauseTime = 2000,
  className = '',
  subtitles = []
}: TypewriterMultipleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubtitleChanging, setIsSubtitleChanging] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      // Deleting text
      if (displayedText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, typingSpeed / 2); // Faster deletion
        return () => clearTimeout(timer);
      } else {
        // Done deleting, change to next phrase
        setIsDeleting(false);
        
        // Start subtitle transition
        setIsSubtitleChanging(true);
        
        const nextIndex = (currentPhraseIndex + 1) % phrases.length;
        setCurrentPhraseIndex(nextIndex);
        
        // After a slight delay, change the subtitle
        const timer = setTimeout(() => {
          setCurrentSubtitleIndex(nextIndex);
          setIsSubtitleChanging(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      // Adding text
      if (displayedText.length < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => currentPhrase.slice(0, prev.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Done typing, pause before deleting
        const timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
        return () => clearTimeout(timer);
      }
    }
  }, [displayedText, currentPhraseIndex, isDeleting, phrases, typingSpeed, pauseTime]);

  return (
    <div className={`${className}`}>
      {/* Main typewriter text */}
      <motion.h1 
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white tracking-tight transform-gpu min-h-[1.5em]"
        style={{ perspective: "1000px" }}
        whileInView={{ 
          rotateX: [0, 0.5, 0, -0.5, 0], 
          rotateY: [0, 0.5, 0, -0.5, 0],
          z: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "loop",
          ease: "easeInOut" 
        }}
      >
        <span>{displayedText}</span>
        <motion.span 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block ml-1 -mb-1 w-[2px] md:w-[3px] h-8 md:h-12 lg:h-14 bg-white"
        >
          &nbsp;
        </motion.span>
      </motion.h1>
      
      {/* Subtitle with smooth transitions */}
      <div className="h-24 relative">
        {subtitles.map((subtitle, index) => (
          <motion.p
            key={index}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light absolute left-0 right-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: currentSubtitleIndex === index ? 1 : 0,
              y: currentSubtitleIndex === index ? 0 : 20
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {subtitle}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default TypewriterMultiple;