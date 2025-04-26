import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const Privacy = () => {
  const { t } = useLanguage();

  const privacySections = [
    {
      id: "data-collected",
      title: "privacy.sections.dataCollected.title",
      content: "privacy.sections.dataCollected.content"
    },
    {
      id: "data-usage",
      title: "privacy.sections.dataUsage.title",
      content: "privacy.sections.dataUsage.content"
    },
    {
      id: "cookies",
      title: "privacy.sections.cookies.title",
      content: "privacy.sections.cookies.content"
    },
    {
      id: "third-party",
      title: "privacy.sections.thirdParty.title",
      content: "privacy.sections.thirdParty.content"
    },
    {
      id: "user-rights",
      title: "privacy.sections.userRights.title",
      content: "privacy.sections.userRights.content"
    },
    {
      id: "data-protection",
      title: "privacy.sections.dataProtection.title",
      content: "privacy.sections.dataProtection.content"
    },
    {
      id: "policy-changes",
      title: "privacy.sections.policyChanges.title",
      content: "privacy.sections.policyChanges.content"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("privacy.meta.title")}</title>
        <meta name="description" content={t("privacy.meta.description")} />
      </Helmet>
      
      {/* Banner */}
      <div className="bg-charcoal py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center">{t("privacy.banner.title")}</h1>
          <p className="text-center text-stone-dark mt-4 max-w-3xl mx-auto">
            {t("privacy.banner.description")}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-xl font-serif font-bold mb-4">{t("privacy.contents")}</h2>
                  <ul className="space-y-2">
                    {privacySections.map((section) => (
                      <li key={section.id}>
                        <a 
                          href={`#${section.id}`} 
                          className="text-earth-dark hover:text-earth transition"
                        >
                          {t(section.title)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Main content */}
              <div className="md:col-span-3">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg mb-8">{t("privacy.lastUpdated")}: May 1, 2025</p>
                  
                  <p className="mb-8">{t("privacy.introduction")}</p>
                  
                  <Accordion type="single" collapsible className="mb-8">
                    {privacySections.map((section) => (
                      <AccordionItem key={section.id} value={section.id} id={section.id}>
                        <AccordionTrigger className="text-lg font-semibold">
                          {t(section.title)}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="mt-2 text-stone-dark whitespace-pre-line">
                            {t(section.content)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  
                  <h2 className="text-2xl font-serif font-bold mb-4">{t("privacy.contact.title")}</h2>
                  <p>{t("privacy.contact.content")}</p>
                  <ul className="list-disc pl-6 mt-2 mb-8">
                    <li>
                      <strong>{t("privacy.contact.email")}:</strong> kwph123@aol.com
                    </li>
                    <li>
                      <strong>{t("privacy.contact.phone")}:</strong> +213 662 67 52 91
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
