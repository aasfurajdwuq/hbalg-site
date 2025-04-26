import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterMultipleProps {
  phrases: string[];
  typingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export const TypewriterMultiple = ({
  phrases,
  typingSpeed = 50,
  pauseTime = 2000,
  className = ''
}: TypewriterMultipleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
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
        
        const nextIndex = (currentPhraseIndex + 1) % phrases.length;
        setCurrentPhraseIndex(nextIndex);
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
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white tracking-tight transform-gpu min-h-[1.5em]"
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
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block ml-1 -mb-1 w-[3px] md:w-[4px] h-10 md:h-14 lg:h-16 bg-white"
        >
          &nbsp;
        </motion.span>
      </motion.h1>
      

    </div>
  );
};

export default TypewriterMultiple;