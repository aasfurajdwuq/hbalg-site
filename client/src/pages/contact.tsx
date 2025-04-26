import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobeAfrica } from "react-icons/fa";
import { africaIcon } from '@/assets/image-imports';

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
              opacity: 0.3
            }}
            animate={{ 
              x: [
                0,
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
                0
              ],
              y: [
                0,
                Math.random() * 50 - 25,
                Math.random() * 50 - 25,
                0
              ],
            }}
            transition={{ 
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        );
      })}
    </div>
  );
};

// Form Success Animation
const SuccessAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-center py-8"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
    >
      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </motion.div>
    
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-2xl font-bold mb-2"
    >
      Message Sent Successfully!
    </motion.h3>
    
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-gray-600"
    >
      Thank you for contacting us. We'll respond to your message within 48 hours.
    </motion.p>
    
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.location.reload()}
      className="mt-6 px-6 py-2 bg-amber-500 text-white rounded-lg"
    >
      Send Another Message
    </motion.button>
  </motion.div>
);

// Main Component
const Contact = () => {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // References for animations
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const contactInfoRef = useRef(null);
  
  // Check if elements are in view
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 });
  const isContactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.3 });
  
  // Contact info with icons
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
      values: ["+213 662 67 52 91 (Algeria)", "+1 347 446 2141 (USA)"],
      delay: 0.1
    },
    {
      icon: <FaEnvelope className="text-amber-500" />,
      label: "Email",
      value: "kwph123@aol.com",
      delay: 0.2
    },
    {
      icon: <FaGlobeAfrica className="text-amber-500" />,
      label: "Working Hours",
      value: "Monday-Friday: 9AM-5PM (GMT+1)",
      delay: 0.3
    }
  ];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Send form data to our API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Email sent successfully');
        setFormSubmitted(true);
      } else {
        console.error('Failed to send email');
        alert('Failed to send your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-bold mb-8 tracking-tight"
              >
                Send Us a Message
              </motion.h2>
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
                        <motion.input 
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                        <motion.input 
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                      <motion.select
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Agricultural Services">Agricultural Services</option>
                        <option value="Investment Opportunities">Investment Opportunities</option>
                        <option value="Partnership Proposal">Partnership Proposal</option>
                        <option value="Other">Other</option>
                      </motion.select>
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-32 resize-none"
                        placeholder="How can we help you?"
                        required
                      ></motion.textarea>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300"
                    >
                      <span>Send Message</span>
                      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </motion.form>
                ) : (
                  <SuccessAnimation />
                )}
              </AnimatePresence>
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4 text-xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.label}</h3>
                {item.values ? (
                  <div className="space-y-1">
                    {item.values.map((value, idx) => (
                      <p key={idx} className="text-gray-600">{value}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {[
              {
                question: "What are your office hours?",
                answer: "Our office in Timimoun, Algeria is open Monday through Friday from 9AM to 5PM (GMT+1). Our US-based team members follow Eastern Time (ET)."
              },
              {
                question: "How quickly can I expect a response?",
                answer: "We aim to respond to all inquiries within 48 hours during business days. For urgent matters, please indicate so in your message subject."
              },
              {
                question: "Do you offer farm tours or site visits?",
                answer: "Yes, we welcome visitors to our farms in Timimoun. Site visits can be arranged by appointment for potential investors and partners. Please contact us at least two weeks in advance to schedule."
              },
              {
                question: "How can I apply for a job with Harvest Brothers?",
                answer: "We post all job openings on our LinkedIn page and website. You can also send your resume to our email with the subject line 'Employment Opportunity'."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <motion.h3 
                  className="text-xl font-bold mb-3 flex items-center"
                  initial={{ color: "#1f2937" }}
                  whileHover={{ color: "#d97706" }}
                >
                  <span className="mr-3 text-amber-500">Q:</span>
                  {faq.question}
                </motion.h3>
                <p className="pl-7 text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Agriculture Together?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Whether you're interested in our agricultural services, investment opportunities, or potential partnerships,
              we're eager to start the conversation.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-8 py-4 bg-white text-green-800 rounded-full font-bold shadow-lg">
                Contact Us Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
