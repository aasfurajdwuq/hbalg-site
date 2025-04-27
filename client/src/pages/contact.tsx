import { useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobeAfrica } from "react-icons/fa";
import EmailJSForm from "@/components/forms/EmailJSForm";

// Google Maps Component
const GoogleMap = ({ inView }) => {
  return (
    <motion.div 
      className="w-full h-full min-h-[400px]"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111281.0107449427!2d2.8965568!3d29.2594535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12582ee3dbb2db21%3A0xef2c13c4c0e38e00!2sTimimoun%2C%20Algeria!5e0!3m2!1sen!2sus!4v1714698423196!5m2!1sen!2sus" 
        width="100%" 
        height="100%" 
        style={{ border: 0, borderRadius: "1rem", minHeight: "400px" }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map of Timimoun, Algeria"
      ></iframe>
    </motion.div>
  );
};

// Floating Particle Background
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200"
            style={{ 
              width: size, 
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay
            }}
          />
        );
      })}
    </div>
  );
};

export default function Contact() {
  const { t } = useLanguage();
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const contactInfoRef = useRef(null);
  
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isMapInView = useInView(mapRef, { once: true, amount: 0.2 });
  const isContactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.2 });
  
  // Contact Information data
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-amber-500" />,
      label: "Address",
      value: "Timimoun, Algeria",
      delay: 0
    },
    {
      icon: <FaPhoneAlt className="text-amber-500" />,
      label: "Phone",
      value: "+213 662 67 52 91",
      delay: 0.1
    },
    {
      icon: <FaEnvelope className="text-amber-500" />,
      label: "Email",
      value: "support@hbalg.com",
      delay: 0.2
    },
    {
      icon: <FaGlobeAfrica className="text-amber-500" />,
      label: "Working Hours",
      value: "Monday-Friday: 9AM-5PM (GMT+1)",
      delay: 0.3
    }
  ];
  
  // EmailJS configuration
  const serviceId = "service_7rtmy0o";
  const templateId = "template_jkkcq1l";
  const publicKey = "rjdn_Wt8FhMSIEIvQ";
  const toEmail = "support@hbalg.com";
  
  return (
    <>
      <Helmet>
        <title>Contact Us | Harvest Brothers</title>
        <meta name="description" content="Get in touch with the Harvest Brothers team to discuss collaboration or learn more about our premium agricultural services." />
      </Helmet>
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-r from-amber-700 to-green-800 text-white overflow-hidden">
        <FloatingParticles />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              Let's Connect
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl font-light"
            >
              Have questions about our agricultural services or investment opportunities? 
              We'd love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <EmailJSForm 
                  serviceId={serviceId}
                  templateId={templateId}
                  publicKey={publicKey}
                  toEmail={toEmail}
                  formType="contact"
                  title="Send Us a Message"
                />
              </motion.div>
            </div>
            
            {/* Google Map */}
            <motion.div 
              ref={mapRef}
              className="md:w-1/2 bg-gray-50 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={isMapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <GoogleMap inView={isMapInView} />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section ref={contactInfoRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Contact Information</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to get in touch with our team
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isContactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: item.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white rounded-xl p-6 text-center shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.label}</h3>
                <p className="text-gray-600">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Together?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Whether you're looking to partner with us, invest in our operations, or simply learn more about what we do, 
              our team is here to assist you on your journey.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#"
              className="px-8 py-4 rounded-lg bg-white text-amber-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Our Services
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#"
              className="px-8 py-4 rounded-lg bg-amber-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Investment Opportunities
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}