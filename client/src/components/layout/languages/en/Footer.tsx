import { Link } from "wouter";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import LanguageSwitcherSimple from "../../../shared/LanguageSwitcherSimple";
import { iconLogo } from "@/assets/image-imports";

const EnglishFooter = () => {
  const currentYear = new Date().getFullYear();
  
  // Navigation links
  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/investors", label: "Investors" },
    { href: "/contact", label: "Contact" },
  ];
  
  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  return (
    <footer className="bg-charcoal text-stone-light pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <img 
                src={iconLogo} 
                alt="Harvest Brothers Logo" 
                className="w-10 h-10 mr-3"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Harvest Brothers</span>
                <span className="text-sm font-arabic text-wheat-light" lang="ar">إخوة الحصاد</span>
              </div>
            </Link>
            <p className="text-stone mt-4 text-sm">
              Premium sustainable desert agriculture in Algeria, connecting 
              local produce to global markets while empowering communities.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {mainLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-stone hover:text-wheat-light transition duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-wheat-light mt-1 mr-3" />
                <span>Timimoun, Algeria</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-wheat-light mt-1 mr-3" />
                <div className="flex flex-col">
                  <span>+213 662 67 52 91 (Algeria)</span>
                  <span>+1 347 446 2141 (USA)</span>
                </div>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-wheat-light mr-3" />
                <span>kwph123@aol.com</span>
              </li>
            </ul>
          </div>
          
          {/* Language Selector */}
          <div>
            <h3 className="text-white font-semibold mb-4">Language</h3>
            <LanguageSwitcherSimple isFooter={true} />
            
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-2">Legal</h3>
              <ul className="space-y-2">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-stone text-sm hover:text-wheat-light transition duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-charcoal-light mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone text-sm">
            &copy; {currentYear} Harvest Brothers. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-stone">
            Crafted with ♥ for sustainable agriculture
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnglishFooter;