import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import ContactForm from "@/components/forms/ContactForm";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("contact.meta.title")}</title>
        <meta name="description" content={t("contact.meta.description")} />
      </Helmet>
      
      {/* Banner */}
      <div className="bg-wheat py-16 text-charcoal-dark">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center">{t("contact.banner.title")}</h1>
        </div>
      </div>
      
      {/* Contact Details and Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">{t("contact.details.title")}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-wheat-light p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-xl text-earth-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{t("contact.details.address.title")}</h3>
                    <p className="text-stone-dark">{t("contact.address")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-wheat-light p-3 rounded-full mr-4">
                    <FaPhoneAlt className="text-xl text-earth-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{t("contact.details.phone.title")}</h3>
                    <p className="text-stone-dark">
                      <a href="tel:+21366267529" className="hover:text-earth transition">
                        {t("contact.phoneAlgeria")}
                      </a>
                    </p>
                    <p className="text-stone-dark">
                      <a href="tel:+13474462141" className="hover:text-earth transition">
                        {t("contact.phoneUSA")}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-wheat-light p-3 rounded-full mr-4">
                    <FaEnvelope className="text-xl text-earth-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{t("contact.details.email.title")}</h3>
                    <p className="text-stone-dark">
                      <a href="mailto:kwph123@aol.com" className="hover:text-earth transition">
                        {t("contact.email")}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-wheat-light p-3 rounded-full mr-4">
                    <FaGlobe className="text-xl text-earth-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{t("contact.details.website.title")}</h3>
                    <p className="text-stone-dark">{window.location.origin}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-stone-light p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-serif font-bold mb-6">{t("contact.form.title")}</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-stone-lightest">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">{t("contact.map.title")}</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113998.0392277754!2d0.15872845!3d29.2538444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaaa9fac8d7bca91%3A0x63b6752447265ad1!2sTimimoun%2C%20Algeria!5e0!3m2!1sen!2sus!4v1652291234567!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of Timimoun, Algeria"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
