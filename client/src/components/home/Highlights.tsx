import { useLanguage } from "@/lib/i18n";
import FlipCard from "@/components/ui/flip-card";
import { FaMapMarkedAlt, FaGlobeAfrica } from "react-icons/fa";
import WheatIcon from "@/assets/icons/WheatIcon";

const highlights = [
  {
    icon: FaMapMarkedAlt,
    iconBg: "bg-wheat",
    iconColor: "text-earth-dark",
    title: "highlights.landClimate.title",
    subtitle: "highlights.landClimate.subtitle",
    details: "highlights.landClimate.details",
    backBg: "bg-wheat",
    backTextColor: "text-charcoal-dark"
  },
  {
    icon: WheatIcon,
    iconBg: "bg-leaf",
    iconColor: "text-white",
    title: "highlights.sustainable.title",
    subtitle: "highlights.sustainable.subtitle",
    details: "highlights.sustainable.details",
    backBg: "bg-leaf",
    backTextColor: "text-white"
  },
  {
    icon: FaGlobeAfrica,
    iconBg: "bg-earth",
    iconColor: "text-white",
    title: "highlights.globalReach.title",
    subtitle: "highlights.globalReach.subtitle",
    details: "highlights.globalReach.details",
    backBg: "bg-earth",
    backTextColor: "text-white"
  }
];

const Highlights = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-stone-lightest">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <FlipCard
              key={index}
              frontContent={
                <div className="text-center">
                  <div className={`w-16 h-16 ${highlight.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {typeof highlight.icon === 'function' ? (
                      <highlight.icon className={`text-2xl ${highlight.iconColor}`} />
                    ) : (
                      <highlight.icon className={`text-2xl ${highlight.iconColor}`} />
                    )}
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2">{t(highlight.title)}</h3>
                  <p className="text-stone-dark">{t(highlight.subtitle)}</p>
                </div>
              }
              backContent={
                <p className={highlight.backTextColor}>{t(highlight.details)}</p>
              }
              frontClassName="bg-white shadow-md"
              backClassName={`${highlight.backBg} shadow-md`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
