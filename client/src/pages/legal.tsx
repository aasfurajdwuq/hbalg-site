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

// Legal Section Component with Animated List
const LegalSection = ({ title, items, delay = 0 }) => {
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

// Tab Component
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-medium rounded-full transition-all duration-300 text-sm ${
      active 
      ? "bg-black text-white shadow-lg" 
      : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);

// Main Component
const Legal = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("terms");
  
  // References for scroll animations
  const containerRef = useRef(null);
  
  // Parallax effect for header
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Terms of Service sections
  const termsData = [
    {
      id: "overview",
      title: "Overview",
      items: [
        "Welcome to Harvest Brothers, a premier agricultural enterprise specializing in sustainable Saharan wheat cultivation. These Terms of Service (\"Terms\") govern your use of our website, products, and services.",
        "By accessing or using our website or services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our website or use our services.",
        "We reserve the right to update these Terms at any time without notice. Your continued use of our website or services constitutes acceptance of any modifications to these Terms."
      ]
    },
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      items: [
        "By accessing this website or utilizing our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.",
        "If you are using our services on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not have such authority, you must not accept these Terms or use our services."
      ]
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      items: [
        "All content on our website, including text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Harvest Brothers or its content suppliers and is protected by international copyright laws.",
        "You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of our website or its content without our express written permission.",
        "Harvest Brothers, our logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Harvest Brothers or its affiliates. You may not use these marks without our prior written permission."
      ]
    },
    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      items: [
        "Our website, content, and services are provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied.",
        "We do not guarantee that our website will be secure, error-free, or available at all times. We may experience delays, outages, or other performance issues.",
        "Agricultural information and investment projections are provided for general informational purposes only and should not be construed as professional advice. Always consult with a qualified professional for specific guidance."
      ]
    },
    {
      id: "governing",
      title: "Governing Law",
      items: [
        "These Terms shall be governed by and construed in accordance with the laws of Algeria, without regard to its conflict of law provisions.",
        "Any dispute arising from or relating to these Terms or your use of our website or services shall be subject to the exclusive jurisdiction of the courts in Algeria.",
        "If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein."
      ]
    }
  ];
  
  // Privacy Policy sections
  const privacyData = [
    {
      id: "information",
      title: "Information We Collect",
      items: [
        "We collect several types of information from and about users of our website, including personal information (such as your name, email address, and phone number), usage data (how you use our website), device information (technical data about your device), and cookies (information collected through cookies and similar technologies).",
        "We use this information to provide and maintain our website and services, process and respond to your inquiries, improve our offerings, personalize your experience, communicate with you about updates or promotions, and comply with legal obligations.",
        "We employ appropriate technical and organizational measures to protect your information from unauthorized access, loss, misuse, or alteration."
      ]
    },
    {
      id: "sharing",
      title: "Information Sharing",
      items: [
        "We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted service providers who assist us in operating our website and conducting our business.",
        "We may disclose your information if required to do so by law or in response to valid requests by public authorities, in the event of a business transfer like a merger or acquisition, or when we have your explicit consent to do so.",
        "We implement appropriate technical and organizational measures to protect your personal information, though no method of internet transmission is 100% secure."
      ]
    },
    {
      id: "rights",
      title: "Your Rights and Choices",
      items: [
        "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, restrict, or object to the processing of your data.",
        "You may have the right to withdraw consent at any time or request data portability. To exercise these rights, please contact us using the information provided in the \"Contact Us\" section.",
        "We may update our Privacy Policy periodically to reflect changes in our practices. The updated version will be effective as of the date stated at the top of the policy."
      ]
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>Terms & Privacy | Harvest Brothers</title>
        <meta name="description" content="Review the legal terms, privacy policy, and guidelines for Harvest Brothers agricultural website, products, and services." />
      </Helmet>
      
      {/* Header with Parallax */}
      <motion.section
        ref={containerRef}
        className="relative h-[40vh] overflow-hidden flex items-center justify-center bg-gray-900"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            y: headerY,
            opacity: headerOpacity
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
            Terms & Privacy
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg font-light max-w-3xl mx-auto"
          >
            Please read our terms and privacy policy carefully
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-sm text-gray-300"
          >
            Last Updated: April 26, 2025
          </motion.div>
        </div>
      </motion.section>
      
      {/* Tabs and Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Apple-style tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-16"
          >
            <nav className="flex space-x-2 rounded-full bg-gray-100 p-1 shadow-sm">
              <TabButton 
                active={activeTab === "terms"} 
                onClick={() => setActiveTab("terms")}
              >
                Terms of Service
              </TabButton>
              <TabButton 
                active={activeTab === "privacy"} 
                onClick={() => setActiveTab("privacy")}
              >
                Privacy Policy
              </TabButton>
            </nav>
          </motion.div>
          
          {/* Content */}
          <div className="min-h-[800px]">
            {activeTab === "terms" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {termsData.map((section, i) => (
                  <LegalSection
                    key={section.id}
                    title={section.title}
                    items={section.items}
                    delay={i * 0.05}
                  />
                ))}
              </motion.div>
            )}
            
            {activeTab === "privacy" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {privacyData.map((section, i) => (
                  <LegalSection
                    key={section.id}
                    title={section.title}
                    items={section.items}
                    delay={i * 0.05}
                  />
                ))}
              </motion.div>
            )}
          </div>
          
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 bg-gray-50 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about our Terms or Privacy Policy, please contact us at:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> kwph123@aol.com</p>
              <p><strong>Phone:</strong> +213 662 67 52 91 (Algeria) / +1 347 446 2141 (USA)</p>
              <p><strong>Address:</strong> Timimoun, Algeria</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Legal;
