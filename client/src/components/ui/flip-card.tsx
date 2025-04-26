import { ReactNode } from "react";

type FlipCardProps = {
  frontContent: ReactNode;
  backContent: ReactNode;
  frontClassName?: string;
  backClassName?: string;
  height?: string;
};

const FlipCard = ({
  frontContent,
  backContent,
  frontClassName = "",
  backClassName = "",
  height = "h-52"
}: FlipCardProps) => {
  return (
    <div className={`perspective-1000 ${height}`}>
      <div className="relative w-full h-full transition-transform duration-600 transform-style-3d hover:rotate-y-180">
        <div className={`absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-4 rounded-lg ${frontClassName}`}>
          {frontContent}
        </div>
        <div className={`absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-4 rounded-lg rotate-y-180 ${backClassName}`}>
          {backContent}
        </div>
      </div>
    </div>
  );
};

// Add global styles
if (typeof document !== "undefined") {
  // Only run in browser, not during SSR
  const style = document.createElement("style");
  style.textContent = `
    .perspective-1000 {
      perspective: 1000px;
    }
    .transform-style-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
    .rotate-y-180 {
      transform: rotateY(180deg);
    }
    .hover\\:rotate-y-180:hover {
      transform: rotateY(180deg);
    }
  `;
  document.head.appendChild(style);
}

export default FlipCard;
