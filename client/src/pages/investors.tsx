import { useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { FaChartLine, FaHandHoldingUsd, FaUserTie, FaLeaf, FaMoneyBillWave, FaChartBar } from "react-icons/fa";
import EmailJSForm from "@/components/forms/EmailJSForm";

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

// Team Member Card Component
const TeamMemberCard = ({ name, title, image, description, delay = 0, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="h-48 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
          <FaUserTie className="text-amber-600 text-5xl" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-amber-600 font-medium mb-4">{title}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Investment Card Component
const InvestmentCard = ({ title, description, roi, features, delay = 0, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="mb-6">
        <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-semibold mb-4">
          Up to {roi}% ROI
        </span>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>

      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <svg className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link href="/contact">
          <a className="block w-full py-3 rounded-lg bg-amber-600 text-white text-center font-medium hover:bg-amber-700 transition-colors">
            Learn More
          </a>
        </Link>
      </div>
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
  const teamRef = useRef(null);
  const investmentOptionsRef = useRef(null);
  const formRef = useRef(null);
  
  // Check if sections are in view
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.2 });
  const isInvestmentOptionsInView = useInView(investmentOptionsRef, { once: true, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  
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
      icon: <FaUserTie className="text-amber-600 text-2xl" />,
      title: "Jobs Created",
      value: "100+",
      description: "Employment opportunities generated for local communities",
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
  
  // Team members data
  const teamMembers = [
    {
      name: "Karim Hamdani",
      title: "Founder & CEO",
      description: "With over 15 years in agribusiness, Karim leads our mission to transform Algerian agriculture through sustainable practices and innovative technologies.",
      delay: 0
    },
    {
      name: "Adam Benali",
      title: "Vice President",
      description: "Adam oversees operations and strategic initiatives, bringing his expertise in agricultural economics and international market development.",
      delay: 0.2
    },
    {
      name: "Slimane Bouaziz",
      title: "Finance Director",
      description: "Slimane manages our investor relations and financial planning, with a background in agricultural finance and commodity markets.",
      delay: 0.4
    }
  ];
  
  // Investment options data
  const investmentOptions = [
    {
      title: "Premium Crop Program",
      description: "Direct investment in our premium desert crop cultivation, with priority access to harvest profits.",
      roi: "5-8",
      features: [
        "Minimum investment: $25,000",
        "2-year minimum commitment",
        "Quarterly dividend payments",
        "Annual performance reports",
        "Farm visit opportunities"
      ],
      delay: 0
    },
    {
      title: "Expansion Partnership",
      description: "Strategic partnership for expanding our cultivation to new regions with proven agricultural potential.",
      roi: "6-9",
      features: [
        "Minimum investment: $100,000",
        "3-year minimum commitment",
        "Semi-annual dividend payments",
        "Detailed project progress reports",
        "Named recognition at farm sites"
      ],
      delay: 0.2
    },
    {
      title: "Innovation Fund",
      description: "Investment in our agricultural technology initiatives, including irrigation systems and sustainable farming methods.",
      roi: "7-10",
      features: [
        "Minimum investment: $50,000",
        "2-year minimum commitment",
        "Technology licensing opportunities",
        "Quarterly progress meetings",
        "Early access to new developments"
      ],
      delay: 0.4
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
                <a className="inline-block px-8 py-4 bg-white text-amber-700 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors">
                  Explore Opportunities
                </a>
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
      
      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team combines agricultural expertise with financial acumen to deliver consistent results
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <TeamMemberCard 
                key={i} 
                name={member.name} 
                title={member.title} 
                description={member.description} 
                delay={member.delay}
                isInView={isTeamInView}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Investment Options Section */}
      <section ref={investmentOptionsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInvestmentOptionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Investment Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our curated selection of investment options tailored to different objectives and commitment levels
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentOptions.map((option, i) => (
              <InvestmentCard 
                key={i} 
                title={option.title} 
                description={option.description} 
                roi={option.roi} 
                features={option.features} 
                delay={option.delay}
                isInView={isInvestmentOptionsInView}
              />
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
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="/contact"
              className="px-8 py-4 rounded-lg bg-amber-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Our Team
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}