import { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

// Animated Section Header Component
const AnimatedSectionHeader = ({ title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      className="mb-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="text-2xl font-bold mb-3"
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.8, 
            delay: delay + 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-gray-600"
        >
          {description}
        </motion.p>
      )}
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: delay + 0.4,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600 mt-4"
      />
    </motion.div>
  );
};

// Terms Section Component with Animated List
const TermsSection = ({ title, items, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <div ref={ref} className="mb-12">
      <AnimatedSectionHeader title={title} delay={delay} />
      
      <motion.ul
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="space-y-4"
      >
        {items.map((item, i) => (
          <motion.li 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ 
              duration: 0.5, 
              delay: delay + 0.5 + (i * 0.1), 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="flex"
          >
            <div className="mr-4 flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-gray-700">{item}</div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

// Table of Contents Item Component
const TOCItem = ({ number, title, targetId, currentSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: number * 0.1, duration: 0.5 }}
      className="mb-3"
    >
      <a 
        href={`#${targetId}`}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`flex items-center group transition-colors duration-300 ${currentSection === targetId ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}
      >
        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-medium transition-colors duration-300 ${currentSection === targetId ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 group-hover:bg-amber-100 text-gray-600 group-hover:text-amber-600'}`}>
          {number}
        </div>
        <span>{title}</span>
      </a>
    </motion.div>
  );
};

// Main Component
const Terms = () => {
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState("overview");
  
  // References for scroll animations
  const containerRef = useRef(null);
  const overviewRef = useRef(null);
  const acceptanceRef = useRef(null);
  const usageRef = useRef(null);
  const privacyRef = useRef(null);
  const disclaimerRef = useRef(null);
  const intellectualPropertyRef = useRef(null);
  const modificationRef = useRef(null);
  const governingLawRef = useRef(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Track the current section in view
  useEffect(() => {
    const sections = [
      { id: "overview", ref: overviewRef },
      { id: "acceptance", ref: acceptanceRef },
      { id: "usage", ref: usageRef },
      { id: "privacy", ref: privacyRef },
      { id: "disclaimer", ref: disclaimerRef },
      { id: "intellectual", ref: intellectualPropertyRef },
      { id: "modification", ref: modificationRef },
      { id: "governing", ref: governingLawRef },
    ];
    
    const onScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop;
          if (scrollPosition >= offsetTop) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  // Terms of Service sections
  const termsData = [
    {
      id: "overview",
      title: "Overview",
      ref: overviewRef,
      items: [
        "Welcome to Harvest Brothers, a premier agricultural enterprise specializing in sustainable Saharan wheat cultivation. These Terms of Service (\"Terms\") govern your use of our website, products, and services.",
        "By accessing or using our website or services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our website or use our services.",
        "We reserve the right to update these Terms at any time without notice. Your continued use of our website or services constitutes acceptance of any modifications to these Terms."
      ]
    },
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      ref: acceptanceRef,
      items: [
        "By accessing this website or utilizing our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.",
        "If you are using our services on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not have such authority, you must not accept these Terms or use our services."
      ]
    },
    {
      id: "usage",
      title: "Website Usage",
      ref: usageRef,
      items: [
        "You agree to use our website and services only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use of the website.",
        "You are prohibited from using our website or services to distribute harmful content, including but not limited to viruses, malware, or other malicious code.",
        "We reserve the right to terminate or restrict your access to our website or services for any violation of these Terms or for any other reason at our sole discretion."
      ]
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      ref: privacyRef,
      items: [
        "Your use of our website and services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.",
        "By using our website and services, you consent to the collection and use of your information as described in our Privacy Policy.",
        "We are committed to protecting your privacy and will only use your personal information in accordance with applicable data protection laws."
      ]
    },
    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      ref: disclaimerRef,
      items: [
        "Our website, content, and services are provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied.",
        "We do not guarantee that our website will be secure, error-free, or available at all times. We may experience delays, outages, or other performance issues.",
        "Agricultural information and investment projections are provided for general informational purposes only and should not be construed as professional advice. Always consult with a qualified professional for specific guidance."
      ]
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      ref: intellectualPropertyRef,
      items: [
        "All content on our website, including text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Harvest Brothers or its content suppliers and is protected by international copyright laws.",
        "You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of our website or its content without our express written permission.",
        "Harvest Brothers, our logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Harvest Brothers or its affiliates. You may not use these marks without our prior written permission."
      ]
    },
    {
      id: "modification",
      title: "Modification of Terms",
      ref: modificationRef,
      items: [
        "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website.",
        "Your continued use of our website or services following the posting of revised Terms means that you accept and agree to the changes.",
        "It is your responsibility to check this page periodically for changes to our Terms."
      ]
    },
    {
      id: "governing",
      title: "Governing Law",
      ref: governingLawRef,
      items: [
        "These Terms shall be governed by and construed in accordance with the laws of Algeria, without regard to its conflict of law provisions.",
        "Any dispute arising from or relating to these Terms or your use of our website or services shall be subject to the exclusive jurisdiction of the courts in Algeria.",
        "If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein."
      ]
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>Terms of Service | Harvest Brothers</title>
        <meta name="description" content="Review the Terms of Service for Harvest Brothers agricultural website, products, and services." />
      </Helmet>
      
      {/* Header with Parallax */}
      <motion.section
        ref={containerRef}
        className="relative h-[40vh] overflow-hidden flex items-center justify-center bg-gray-900"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            y,
            opacity
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Legal document" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-20 text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Terms of Service
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg font-light max-w-3xl mx-auto"
          >
            Please read these terms carefully before using our website or services
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-sm text-gray-300"
          >
            Last Updated: April 20, 2023
          </motion.div>
        </div>
      </motion.section>
      
      {/* Table of Contents and Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sticky Table of Contents */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/4"
            >
              <div className="lg:sticky lg:top-24">
                <h2 className="text-2xl font-bold mb-6">Contents</h2>
                
                <div>
                  {termsData.map((section, i) => (
                    <TOCItem 
                      key={section.id}
                      number={i+1}
                      title={section.title}
                      targetId={section.id}
                      currentSection={currentSection}
                    />
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mt-10 bg-amber-50 p-6 rounded-xl"
                >
                  <h3 className="text-lg font-bold mb-3">Need Help?</h3>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms, please contact us.
                  </p>
                  <a 
                    href="/contact"
                    className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700"
                  >
                    <span>Contact Us</span>
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Terms Content */}
            <div className="lg:w-3/4">
              {termsData.map((section, i) => (
                <div 
                  key={section.id} 
                  id={section.id} 
                  ref={section.ref}
                  className="scroll-mt-24"
                >
                  <TermsSection
                    title={section.title}
                    items={section.items}
                    delay={i * 0.05}
                  />
                </div>
              ))}
              
              {/* Final Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 bg-gray-50 p-8 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-6">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> kwph123@aol.com</p>
                  <p><strong>Phone:</strong> +213 662 67 52 91 (Algeria) / +1 347 446 2141 (USA)</p>
                  <p><strong>Address:</strong> Timimoun, Algeria</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;
