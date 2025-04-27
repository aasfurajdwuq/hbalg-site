import { useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

// Animated Privacy Feature Card
const PrivacyFeatureCard = ({ icon, title, description, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Privacy Section Component
const PrivacySection = ({ title, children, index, inViewRef }) => {
  const isInView = useInView(inViewRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="mb-12"
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: '3rem' } : { width: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1 + 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="h-1 bg-amber-500 mb-4"
      />
      
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

// Main Component
const Privacy = () => {
  const { t } = useLanguage();
  
  // References for scroll animations
  const containerRef = useRef(null);
  const featuresRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  
  // Check if elements are in view
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  
  // Parallax effect for header
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Privacy features data
  const features = [
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      ),
      title: "Data Protection",
      description: "We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure."
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      title: "Transparency",
      description: "We clearly explain what data we collect, how we use it, and provide you with options to control your privacy preferences."
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      title: "Limited Collection",
      description: "We only collect and retain the information necessary to provide our services and improve your experience with our website."
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Harvest Brothers</title>
        <meta name="description" content="Learn about how Harvest Brothers collects, uses, and protects your personal information when you use our website and services." />
      </Helmet>
      
      {/* Parallax Header */}
      <motion.section
        ref={containerRef}
        className="relative h-[50vh] overflow-hidden flex items-center justify-center bg-black"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            y: headerY,
            opacity: headerOpacity
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Privacy and security concept" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-20 text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl font-light max-w-3xl mx-auto"
          >
            Protecting your data and respecting your privacy is essential to us
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
      
      {/* Privacy Features */}
      <section ref={featuresRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Our Privacy Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in transparent and ethical data practices that put you in control
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <PrivacyFeatureCard 
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={i}
                inView={isFeaturesInView}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Privacy Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <PrivacySection title="1. Information We Collect" index={0} inViewRef={section1Ref}>
            <p className="text-gray-700">
              We collect several types of information from and about users of our website, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Personal Information:</strong> Such as your name, email address, and phone number when you voluntarily submit it through contact forms or registration.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website, including which pages you visit, how long you spend on each page, and any actions you take.
              </li>
              <li>
                <strong>Device Information:</strong> Technical data about the device you use to access our website, including IP address, browser type, operating system, and device identifiers.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> Information collected through cookies and similar technologies to analyze website traffic and improve user experience.
              </li>
            </ul>
          </PrivacySection>
          
          <PrivacySection title="2. How We Use Your Information" index={1} inViewRef={section2Ref}>
            <p className="text-gray-700">
              We use the information we collect about you for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                To provide and maintain our website and services.
              </li>
              <li>
                To process and respond to your inquiries, requests, or applications.
              </li>
              <li>
                To improve our website, products, and services.
              </li>
              <li>
                To personalize your experience and deliver content relevant to your interests.
              </li>
              <li>
                To communicate with you about updates, promotions, or other news about our services.
              </li>
              <li>
                To comply with legal obligations and protect our rights and interests.
              </li>
            </ul>
          </PrivacySection>
          
          <PrivacySection title="3. Information Sharing and Disclosure" index={2} inViewRef={section3Ref}>
            <p className="text-gray-700">
              We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share your information with third parties when we have your explicit consent to do so.
              </li>
            </ul>
          </PrivacySection>
          
          <PrivacySection title="4. Data Security" index={3} inViewRef={section4Ref}>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or alteration. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p className="text-gray-700 mt-4">
              We regularly review our security procedures and practices to ensure they meet industry standards and legal requirements. We also limit access to your personal information to employees, contractors, and agents who need to know this information to perform their job functions.
            </p>
          </PrivacySection>
          
          <PrivacySection title="5. Your Rights and Choices" index={4} inViewRef={section5Ref}>
            <p className="text-gray-700">
              Depending on your location, you may have certain rights regarding your personal information. These may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                The right to access and review the personal information we hold about you.
              </li>
              <li>
                The right to correct inaccurate or incomplete information.
              </li>
              <li>
                The right to request deletion of your personal information under certain circumstances.
              </li>
              <li>
                The right to restrict or object to the processing of your personal information.
              </li>
              <li>
                The right to withdraw your consent at any time, where we rely on consent as the legal basis for processing.
              </li>
              <li>
                The right to data portability, allowing you to obtain a copy of your personal information in a structured, commonly used format.
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
          </PrivacySection>
          
          <PrivacySection title="6. Changes to This Privacy Policy" index={5} inViewRef={section6Ref}>
            <p className="text-gray-700">
              We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be effective as of the date stated at the top of the Privacy Policy.
            </p>
            <p className="text-gray-700 mt-4">
              We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information. Your continued use of our website after any changes to this Privacy Policy constitutes your acceptance of the updated policy.
            </p>
          </PrivacySection>
          
          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 bg-white p-8 rounded-2xl shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> support@hbalg.com</p>
              <p><strong>Phone:</strong> +213 662 67 52 91 (Algeria) / +1 347 446 2141 (USA)</p>
              <p><strong>Address:</strong> Timimoun, Algeria</p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              <a 
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg shadow-sm hover:bg-amber-700 transition-colors duration-300"
              >
                Contact Us Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
