import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/lib/animations";
import { FaHandshake, FaTools, FaUsers, FaHeart } from "react-icons/fa";

const About = () => {
  const { t } = useLanguage();
  const { elementRef: section1Ref, className: section1Class } = useScrollAnimation("animate-fade-in");
  const { elementRef: section2Ref, className: section2Class } = useScrollAnimation("animate-fade-in");
  const { elementRef: section3Ref, className: section3Class } = useScrollAnimation("animate-fade-in");
  const { elementRef: section4Ref, className: section4Class } = useScrollAnimation("animate-fade-in");

  // Core values data
  const values = [
    { icon: <FaHandshake className="text-3xl text-wheat" />, title: t("about.values.integrity.title"), description: t("about.values.integrity.description") },
    { icon: <FaTools className="text-3xl text-wheat" />, title: t("about.values.innovation.title"), description: t("about.values.innovation.description") },
    { icon: <FaUsers className="text-3xl text-wheat" />, title: t("about.values.community.title"), description: t("about.values.community.description") },
    { icon: <FaHeart className="text-3xl text-wheat" />, title: t("about.values.stewardship.title"), description: t("about.values.stewardship.description") }
  ];

  return (
    <>
      <Helmet>
        <title>{t("about.meta.title")}</title>
        <meta name="description" content={t("about.meta.description")} />
      </Helmet>
      
      {/* Banner */}
      <div className="bg-earth py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center">{t("about.banner.title")}</h1>
        </div>
      </div>
      
      {/* Who We Are Section */}
      <section ref={section1Ref} className={`py-16 bg-white ${section1Class}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6">{t("about.whoWeAre.title")}</h2>
            <div className="space-y-4">
              <p>{t("about.whoWeAre.paragraph1")}</p>
              <p>{t("about.whoWeAre.paragraph2")}</p>
              <p>{t("about.whoWeAre.missionStatement")}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our People Section */}
      <section ref={section2Ref} className={`py-16 bg-stone-light ${section2Class}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6">{t("about.ourPeople.title")}</h2>
            <h3 className="text-xl font-serif mb-6">{t("about.ourPeople.subhead")}</h3>
            
            <ul className="list-disc pl-6 space-y-3">
              <li>{t("about.ourPeople.points.fairWages")}</li>
              <li>{t("about.ourPeople.points.safeConditions")}</li>
              <li>{t("about.ourPeople.points.training")}</li>
              <li>{t("about.ourPeople.points.community")}</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission Section */}
      <section ref={section3Ref} className={`py-16 bg-white ${section3Class}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-serif font-bold mb-4">{t("about.vision.title")}</h3>
                  <p>{t("about.vision.description")}</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-serif font-bold mb-4">{t("about.mission.title")}</h3>
                  <p>{t("about.mission.description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section ref={section4Ref} className={`py-16 bg-stone-lightest ${section4Class}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">{t("about.values.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                  <div className="mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2">{value.title}</h3>
                  <p className="text-stone-dark">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Goals Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">{t("about.goals.title")}</h2>
            <div className="space-y-6">
              <p>{t("about.goals.paragraph")}</p>
              <div className="bg-stone-light p-6 rounded-lg">
                <h3 className="text-xl font-serif font-semibold mb-4">{t("about.goals.roadmap.title")}</h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="bg-wheat rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-medium">{t("about.goals.roadmap.shortTerm.title")}</h4>
                      <p className="text-stone-dark">{t("about.goals.roadmap.shortTerm.description")}</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-wheat rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-medium">{t("about.goals.roadmap.midTerm.title")}</h4>
                      <p className="text-stone-dark">{t("about.goals.roadmap.midTerm.description")}</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-wheat rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-medium">{t("about.goals.roadmap.longTerm.title")}</h4>
                      <p className="text-stone-dark">{t("about.goals.roadmap.longTerm.description")}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
