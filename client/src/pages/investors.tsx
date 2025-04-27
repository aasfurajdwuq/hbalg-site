import { useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { FaChartLine, FaHandHoldingUsd, FaLeaf, FaMoneyBillWave, FaSeedling, FaChartBar } from "react-icons/fa";
import EmailJSForm from "@/components/forms/EmailJSForm";
import ROICalculator from "@/components/investors/ROICalculator";

// Animated Statistic Card Component
const StatCard = ({ icon, title, value, description, delay = 0, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl shadow-lg p-8 text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-amber-700 mb-2">{value}</h3>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Animated Particles Background
const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400/30"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default function Investors() {
  // References for scroll animations
  const statsRef = useRef(null);
  const calculatorRef = useRef(null);
  const formRef = useRef(null);
  const projectionRef = useRef(null);
  
  // Check if sections are in view
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const isCalculatorInView = useInView(calculatorRef, { once: true, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isProjectionInView = useInView(projectionRef, { once: true, amount: 0.2 });
  
  // Statistics data
  const stats = [
    {
      icon: <FaChartLine className="text-amber-600 text-2xl" />,
      title: "Average ROI",
      value: "7%",
      description: "Annual return on investment across our agricultural portfolio",
      delay: 0
    },
    {
      icon: <FaLeaf className="text-amber-600 text-2xl" />,
      title: "Hectares",
      value: "3,200+",
      description: "Total farmland under management in prime Algerian locations",
      delay: 0.2
    },
    {
      icon: <FaSeedling className="text-amber-600 text-2xl" />,
      title: "Growth",
      value: "25%",
      description: "Projected annual growth in total managed agricultural land",
      delay: 0.4
    },
    {
      icon: <FaMoneyBillWave className="text-amber-600 text-2xl" />,
      title: "Total Investment",
      value: "$10M+",
      description: "Capital deployed across various agricultural initiatives",
      delay: 0.6
    },
  ];
  
  // Projection milestones
  const projectionMilestones = [
    {
      year: "2026",
      title: "Expansion Phase I",
      description: "Increase agricultural land to 5,000 hectares and implement advanced irrigation technologies across 80% of operations.",
      icon: <FaLeaf className="text-amber-600 text-2xl" />,
      delay: 0
    },
    {
      year: "2027",
      title: "Distribution Network",
      description: "Establish direct export channels to European markets and build state-of-the-art processing facilities.",
      icon: <FaChartBar className="text-amber-600 text-2xl" />,
      delay: 0.3
    },
    {
      year: "2028",
      title: "Sustainable Scale",
      description: "Reach 10,000 hectares under management and achieve carbon-neutral agriculture practices across all properties.",
      icon: <FaHandHoldingUsd className="text-amber-600 text-2xl" />,
      delay: 0.6
    }
  ];
  
  // EmailJS configuration for investor form
  const serviceId = "service_7rtmy0o";
  const templateId = "template_jkkcq1l";
  const publicKey = "rjdn_Wt8FhMSIEIvQ";
  const toEmail = "support@hbalg.com";
  
  return (
    <>
      <Helmet>
        <title>Investment Opportunities | Harvest Brothers</title>
        <meta name="description" content="Discover premium investment opportunities in agricultural operations with Harvest Brothers. Enjoy attractive returns while supporting sustainable farming in Algeria." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-700 to-amber-900 text-white overflow-hidden">
        <ParticlesBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              Premium Investment Opportunities
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl font-light mb-10"
            >
              Partner with Harvest Brothers to cultivate sustainable growth and premium returns through innovative agricultural investments.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="#investment-form">
                <button className="inline-block px-8 py-4 bg-white text-amber-700 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors">
                  Explore Opportunities
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section ref={statsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Our Investment Performance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since our founding in 2022, we've consistently delivered attractive returns while expanding our agricultural operations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCard 
                key={i} 
                icon={stat.icon} 
                title={stat.title} 
                value={stat.value} 
                description={stat.description} 
                delay={stat.delay}
                isInView={isStatsInView}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* ROI Calculator Section */}
      <section ref={calculatorRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Calculate Your Investment Growth</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our interactive calculator to estimate the potential returns on your agricultural investment with Harvest Brothers
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCalculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <ROICalculator />
          </motion.div>
        </div>
      </section>

      {/* Future Projections Section */}
      <section ref={projectionRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isProjectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Growth and Future Projections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our strategic roadmap for the coming years ensures continued growth and sustainable returns for our investment partners
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {projectionMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isProjectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: milestone.delay, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row gap-6 mb-12 bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="md:w-1/6 flex flex-col items-center md:items-start">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    {milestone.icon}
                  </div>
                  <span className="text-3xl font-bold text-amber-600">{milestone.year}</span>
                </div>
                <div className="md:w-5/6">
                  <h3 className="text-2xl font-bold mb-3">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Investment Form Section */}
      <section id="investment-form" ref={formRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Begin Your Investment Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below to express your interest, and our investment team will contact you to discuss opportunities tailored to your goals
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <EmailJSForm 
                serviceId={serviceId}
                templateId={templateId}
                publicKey={publicKey}
                toEmail={toEmail}
                formType="investor"
                title="Investor Information"
              />
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow with Us?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Join our community of investors who are cultivating returns while supporting sustainable agricultural development in Algeria.
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
              href="#investment-form"
              className="px-8 py-4 rounded-lg bg-white text-amber-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Investing Now
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = "/contact"}
              className="px-8 py-4 rounded-lg bg-amber-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Our Team
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}