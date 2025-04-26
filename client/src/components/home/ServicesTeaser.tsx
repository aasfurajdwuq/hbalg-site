import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { FaArrowRight } from "react-icons/fa";
import { useStaggeredAnimation } from "@/lib/animations";

const services = [
  {
    image: "https://images.unsplash.com/photo-1565647952915-ac753c27e017?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    title: "services.cultivation.title",
    description: "services.cultivation.description",
    bgColor: "bg-wheat"
  },
  {
    image: "https://images.unsplash.com/photo-1600594008661-b8db92837a64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80",
    title: "services.leasing.title",
    description: "services.leasing.description",
    bgColor: "bg-earth"
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    title: "services.consultancy.title",
    description: "services.consultancy.description",
    bgColor: "bg-leaf"
  }
];

const ServicesTeaser = () => {
  const { t } = useLanguage();
  const { elementRef, getAnimationClass } = useStaggeredAnimation("animate-slide-in-right", services.length);

  return (
    <section ref={elementRef} className="py-16 bg-stone-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">{t("services.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${getAnimationClass(index)}`}
            >
              <div className={`h-48 ${service.bgColor}`}>
                <img 
                  src={service.image} 
                  alt={t(service.title)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-2">{t(service.title)}</h3>
                <p className="text-stone-dark mb-4">{t(service.description)}</p>
                <Link href="/services">
                  <a className="text-earth-dark font-medium hover:text-earth">{t("services.learnMore")}</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services">
            <a className="inline-flex items-center text-earth-dark font-medium hover:text-earth group">
              {t("services.viewAll")}
              <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;
