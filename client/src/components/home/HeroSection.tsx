import { useEffect, useState } from "react";
import { Link } from "wouter";
import Typewriter from "@/components/ui/typewriter";
import { useLanguage } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen text-white flex items-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal-dark bg-opacity-50 z-10"></div>
      
      {/* Background image - showing Algerian wheat fields */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1568650816442-8f695aa2fe5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" 
          alt="Premium Algerian wheat fields" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline with typewriter effect */}
          <Typewriter className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            {t("home.hero.headline")}
          </Typewriter>
          
          {/* Subheading with fade-in animation */}
          <p className={`text-xl md:text-2xl mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
            {t("home.hero.subheadline")}
          </p>
          
          {/* Badge highlight with fade-in animation */}
          <div className={`inline-block bg-wheat text-charcoal-dark font-bold px-4 py-2 rounded-md mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
            <span>🌾 Premium Saharan Wheat Specialists 🌾</span>
          </div>
          
          {/* CTA buttons with fade-in animation */}
          <div className={`flex flex-col sm:flex-row justify-center gap-4 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
            <Link href="/contact">
              <div className="bg-wheat text-charcoal-dark font-bold py-3 px-8 rounded-lg hover:bg-wheat-dark transition shadow-md cursor-pointer">
                {t("home.hero.contactCTA")}
              </div>
            </Link>
            <Link href="/investors">
              <div className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-charcoal-dark transition shadow-md cursor-pointer">
                {t("home.hero.investorCTA")}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
