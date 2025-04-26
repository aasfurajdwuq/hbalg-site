import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

// SVG Components for wheat breakdown animation
const WheatStalk = ({ isVisible }) => (
  <motion.svg 
    width="120" 
    height="300" 
    viewBox="0 0 120 300" 
    initial={{ opacity: 0, pathLength: 0 }}
    animate={{ 
      opacity: isVisible ? 1 : 0, 
      pathLength: isVisible ? 1 : 0 
    }}
    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    fill="none" 
    stroke="#D4A276" 
    strokeWidth="3"
  >
    <motion.path 
      d="M60 10 L60 290" 
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isVisible ? 1 : 0 }}
      transition={{ duration: 2 }}
    />
    {/* Wheat leaves */}
    {[30, 80, 130, 180, 230].map((y, i) => (
      <motion.g 
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
      >
        <motion.path 
          d={`M60 ${y} L30 ${y-20}`} 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
        />
        <motion.path 
          d={`M60 ${y} L90 ${y-20}`} 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
        />
      </motion.g>
    ))}
    {/* Wheat head */}
    <motion.g
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <motion.ellipse cx="60" cy="15" rx="15" ry="25" fill="#E9C46A" stroke="none" />
    </motion.g>
  </motion.svg>
);

// Wheat Particles Animation 
const WheatParticles = ({ count = 50, isVisible }) => {
  const particles = Array.from({ length: count });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 20 + 10;
        const x = Math.random() * 100;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200"
            style={{ 
              width: size, 
              height: size,
              left: `${x}%`,
              top: '-5%',
            }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ 
              opacity: isVisible ? [0, 0.7, 0] : 0,
              y: isVisible ? ['0%', '105%'] : '0%',
              rotate: isVisible ? [0, 360] : 0
            }}
            transition={{ 
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
};

// Main Component
const About = () => {
  const { t } = useLanguage();
  const [selectedValue, setSelectedValue] = useState("vision");
  const breakdownRef = useRef(null);
  const isBreakdownVisible = useInView(breakdownRef, { once: true, amount: 0.3 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const tabItems = [
    { id: "vision", label: "Our Vision" },
    { id: "innovation", label: "Innovation" },
    { id: "sustainability", label: "Sustainability" },
    { id: "community", label: "Community" }
  ];

  return (
    <>
      <Helmet>
        <title>About Harvest Brothers | Premium Saharan Wheat</title>
        <meta name="description" content="Discover how Harvest Brothers is revolutionizing agriculture in Algeria with sustainable practices and premium wheat production." />
      </Helmet>
      
      {/* Hero Banner with Parallax */}
      <motion.section
        ref={containerRef}
        className="relative h-[70vh] overflow-hidden flex items-center justify-center bg-black"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y, scale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1574943320219-5630bb4c7a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=90" 
            alt="Premium wheat fields" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-20 text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Agricultural Innovation
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl md:text-2xl font-light">
              Reimagining Saharan wheat cultivation through cutting-edge technologies and sustainable practices.
            </p>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div 
              initial={{ y: 0 }}
              animate={{ y: 10 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.section>
      
      {/* Wheat Breakdown Animation Section */}
      <section ref={breakdownRef} className="py-24 bg-white relative overflow-hidden">
        <WheatParticles isVisible={isBreakdownVisible} count={30} />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Interactive Wheat Visualization */}
            <motion.div 
              className="md:w-1/3 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isBreakdownVisible ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-96 w-full flex items-center justify-center">
                <WheatStalk isVisible={isBreakdownVisible} />
                
                {/* Nutrient labels that appear */}
                {['Protein', 'Fiber', 'Antioxidants', 'Minerals'].map((nutrient, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ 
                      top: `${25 + i * 15}%`, 
                      left: i % 2 === 0 ? '25%' : '65%' 
                    }}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ 
                      opacity: isBreakdownVisible ? 1 : 0, 
                      x: isBreakdownVisible ? 0 : (i % 2 === 0 ? -20 : 20)
                    }}
                    transition={{ delay: 1.5 + i * 0.2, duration: 0.6 }}
                  >
                    <div className="bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium">
                      {nutrient}
                    </div>
                    <motion.div 
                      className="w-10 h-px bg-gray-400" 
                      style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: i % 2 === 0 ? '100%' : 'auto',
                        right: i % 2 === 0 ? 'auto' : '100%',
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isBreakdownVisible ? 1 : 0 }}
                      transition={{ delay: 1.7 + i * 0.2, duration: 0.4 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Text content with animations */}
            <div className="md:w-2/3">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isBreakdownVisible ? 1 : 0, y: isBreakdownVisible ? 0 : 30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-bold mb-6 tracking-tight"
              >
                The Science of Premium Wheat
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isBreakdownVisible ? 1 : 0, y: isBreakdownVisible ? 0 : 20 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl text-gray-700 mb-6"
              >
                Our Saharan wheat is cultivated in the unique microclimate of Timimoun, where extreme temperature variations and minimal rainfall create the perfect environment for developing wheat with exceptional protein content and flavor profile.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isBreakdownVisible ? 1 : 0, y: isBreakdownVisible ? 0 : 20 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-amber-50 p-6 rounded-2xl">
                    <div className="text-amber-800 font-bold text-3xl mb-2">10-15%</div>
                    <div className="text-amber-700">Higher protein content than standard wheat varieties</div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-2xl">
                    <div className="text-green-800 font-bold text-3xl mb-2">60%</div>
                    <div className="text-green-700">Less water usage through our proprietary irrigation system</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isBreakdownVisible ? 1 : 0, y: isBreakdownVisible ? 0 : 20 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center"
              >
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="font-medium text-xl">Certified organic and sustainable farming methods ensure ecological responsibility while delivering exceptional quality.</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Tabs with Apple-style Design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-bold mb-12 text-center tracking-tight"
          >
            Our Core Principles
          </motion.h2>
          
          {/* Apple-inspired tab navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-12"
          >
            <nav className="flex space-x-2 rounded-full bg-white p-1 shadow-sm">
              {tabItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedValue(item.id)}
                  className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedValue === item.id 
                    ? "bg-black text-white shadow-lg" 
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
          
          {/* Tab content with animations */}
          <div className="relative bg-white rounded-3xl p-12 shadow-sm overflow-hidden min-h-[400px]">
            {/* Background particle effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50/20 to-transparent rotate-12 transform -translate-y-1/2 opacity-70 blur-3xl" />
            </div>
            
            {/* Content transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedValue}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                {selectedValue === "vision" && (
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2">
                      <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                      <p className="text-xl text-gray-700 mb-6">
                        At Harvest Brothers, we envision a future where desert agriculture becomes a model of sustainable food production, transforming arid lands into thriving ecosystems while feeding communities around the world.
                      </p>
                      <p className="text-xl text-gray-700">
                        By 2030, we aim to triple our production capacity while reducing our carbon footprint by 50%, showcasing the immense potential of regenerative agriculture in challenging environments.
                      </p>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center">
                      <div className="p-1 bg-gradient-to-r from-amber-300 to-amber-500 rounded-2xl shadow-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1574943320219-5630bb4c7a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80" 
                          alt="Wheat harvest" 
                          className="rounded-xl w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedValue === "innovation" && (
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2">
                      <h3 className="text-3xl font-bold mb-6">Innovation</h3>
                      <p className="text-xl text-gray-700 mb-6">
                        Our proprietary drip irrigation systems have revolutionized desert agriculture, reducing water usage by 60% while increasing yields by 25% compared to traditional methods.
                      </p>
                      <p className="text-xl text-gray-700">
                        We've developed custom wheat varieties specifically adapted to the Saharan climate, combining drought resistance with exceptional nutritional profiles and baking characteristics.
                      </p>
                    </div>
                    <div className="md:w-1/2">
                      <div className="bg-amber-50 p-8 rounded-2xl">
                        <h4 className="text-xl font-bold mb-4">Innovation Timeline</h4>
                        <div className="space-y-4">
                          <div className="flex">
                            <div className="w-24 font-bold">2022</div>
                            <div>Company founded with first proprietary irrigation system implemented</div>
                          </div>
                          <div className="flex">
                            <div className="w-24 font-bold">2022</div>
                            <div>Saharan-adapted wheat strain developed</div>
                          </div>
                          <div className="flex">
                            <div className="w-24 font-bold">2023</div>
                            <div>Solar-powered operations achieve carbon neutrality</div>
                          </div>
                          <div className="flex">
                            <div className="w-24 font-bold">2024</div>
                            <div>Smart irrigation optimization system launched</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedValue === "sustainability" && (
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2">
                      <h3 className="text-3xl font-bold mb-6">Sustainability</h3>
                      <p className="text-xl text-gray-700 mb-6">
                        Our operations are 100% powered by renewable energy, with our solar farm on a portion of our 1200+ acres generating surplus electricity that supports local communities.
                      </p>
                      <p className="text-xl text-gray-700">
                        We've pioneered a closed-loop water recycling system that captures, purifies, and reuses irrigation water, minimizing waste while preserving local aquifers.
                      </p>
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-4">
                      <div className="flex items-center p-4 bg-green-50 rounded-xl">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold">Renewable Energy</h4>
                          <p>100% solar-powered operations</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold">Water Conservation</h4>
                          <p>Closed-loop water recycling system</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-amber-50 rounded-xl">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold">Packaging</h4>
                          <p>100% compostable materials</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedValue === "community" && (
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2">
                      <h3 className="text-3xl font-bold mb-6">Community Impact</h3>
                      <p className="text-xl text-gray-700 mb-6">
                        We've created over 100+ jobs in rural Algerian communities, providing competitive wages, comprehensive healthcare, and educational opportunities for employees and their families.
                      </p>
                      <p className="text-xl text-gray-700">
                        Through our community outreach initiatives, we support local infrastructure development and provide educational resources that help build stronger, more resilient communities throughout the region.
                      </p>
                    </div>
                    <div className="md:w-1/2 h-64 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-amber-700 mb-2">100+</div>
                        <div className="text-xl text-amber-800">Local jobs created</div>
                        <div className="h-px bg-amber-200 w-32 mx-auto my-4" />
                        <div className="text-5xl font-bold text-amber-700 mb-2">1200+</div>
                        <div className="text-xl text-amber-800">Acres under sustainable management</div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Team Section with Parallax */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Our Leadership</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Combining generations of agricultural expertise with innovative technology and sustainable vision.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Mohammed Khalil",
                title: "Founder & CEO",
                bio: "Pioneer in sustainable desert agriculture with 25+ years experience transforming arid lands into productive farmland."
              },
              {
                name: "Amina Benali",
                title: "Head of Agricultural Innovation",
                bio: "Agricultural scientist specializing in drought-resistant crops and water-efficient farming techniques."
              },
              {
                name: "Youcef Bouaziz",
                title: "Sustainability Director",
                bio: "Environmental engineer focused on renewable energy integration and carbon-neutral agricultural operations."
              }
            ].map((person, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 h-full">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-6 flex items-center justify-center">
                    <span className="text-3xl font-bold">{person.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                  <div className="text-amber-400 mb-4">{person.title}</div>
                  <p className="text-gray-300">{person.bio}</p>
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center rotate-12 opacity-30 blur-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
