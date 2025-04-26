import BadgeComponent from './BadgeComponent';
import { useScrollAnimation } from '@/lib/animations';

const BadgeStrip = () => {
  const { elementRef, className } = useScrollAnimation("animate-fade-in");

  return (
    <section ref={elementRef} className={`py-10 bg-stone-lightest ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <BadgeComponent 
            type="bestInAlgeria" 
            size="md" 
            className="transform hover:scale-110 transition-transform duration-300" 
          />
          <BadgeComponent 
            type="certifiedOrganic" 
            size="md" 
            className="transform hover:scale-110 transition-transform duration-300" 
          />
          <BadgeComponent 
            type="growTogether" 
            size="md" 
            className="transform hover:scale-110 transition-transform duration-300" 
          />
        </div>
      </div>
    </section>
  );
};

export default BadgeStrip;