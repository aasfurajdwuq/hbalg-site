import { useEffect, useState } from 'react';

interface TypewriterMultipleProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export const TypewriterMultiple = ({
  phrases = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = ''
}: TypewriterMultipleProps) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    if (phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex];
    
    // Create the typing effect
    const timeout = setTimeout(() => {
      // Handle typing or deleting
      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
      }

      // Handle state transitions
      if (!isDeleting && text === currentPhrase) {
        // After full typing, wait then delete
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === '') {
        // After deletion, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        
        // Track full loop count
        if (phraseIndex === phrases.length - 1) {
          setLoopNum(loopNum + 1);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime, loopNum]);

  return <span className={className}>{text}</span>;
};

export default TypewriterMultiple;