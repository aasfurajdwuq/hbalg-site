import { ReactNode, useState, useEffect } from "react";

type TypewriterProps = {
  children: ReactNode;
  typingSpeed?: number;
  delay?: number;
  className?: string;
};

const Typewriter = ({
  children,
  typingSpeed = 50,
  delay = 0,
  className = ""
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const text = children?.toString() || "";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let currentIndex = 0;

    // Delay before starting the typing effect
    const startTimer = setTimeout(() => {
      // Start typing effect
      timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(timer);
        }
      }, typingSpeed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, [text, typingSpeed, delay]);

  return (
    <h1 className={`typewriter ${className}`}>
      {displayText}
    </h1>
  );
};

export default Typewriter;
