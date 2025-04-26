import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const Terms = () => {
  const { t } = useLanguage();

  const termsSections = [
    {
      id: "site-usage",
      title: "terms.sections.siteUsage.title",
      content: "terms.sections.siteUsage.content"
    },
    {
      id: "intellectual-property",
      title: "terms.sections.intellectualProperty.title",
      content: "terms.sections.intellectualProperty.content"
    },
    {
      id: "user-responsibilities",
      title: "terms.sections.userResponsibilities.title",
      content: "terms.sections.userResponsibilities.content"
    },
    {
      id: "disclaimers",
      title: "terms.sections.disclaimers.title",
      content: "terms.sections.disclaimers.content"
    },
    {
      id: "limitation-liability",
      title: "terms.sections.limitationLiability.title",
      content: "terms.sections.limitationLiability.content"
    },
    {
      id: "indemnification",
      title: "terms.sections.indemnification.title",
      content: "terms.sections.indemnification.content"
    },
    {
      id: "term-termination",
      title: "terms.sections.termTermination.title",
      content: "terms.sections.termTermination.content"
    },
    {
      id: "governing-law",
      title: "terms.sections.governingLaw.title",
      content: "terms.sections.governingLaw.content"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("terms.meta.title")}</title>
        <meta name="description" content={t("terms.meta.description")} />
      </Helmet>
      
      {/* Banner */}
      <div className="bg-charcoal py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center">{t("terms.banner.title")}</h1>
          <p className="text-center text-stone-dark mt-4 max-w-3xl mx-auto">
            {t("terms.banner.description")}
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
                  <h2 className="text-xl font-serif font-bold mb-4">{t("terms.contents")}</h2>
                  <ul className="space-y-2">
                    {termsSections.map((section) => (
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
                  <p className="text-lg mb-8">{t("terms.lastUpdated")}: May 1, 2025</p>
                  
                  <p className="mb-8">{t("terms.introduction")}</p>
                  
                  <Accordion type="single" collapsible className="mb-8">
                    {termsSections.map((section) => (
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
                  
                  <h2 className="text-2xl font-serif font-bold mb-4">{t("terms.contact.title")}</h2>
                  <p>{t("terms.contact.content")}</p>
                  <ul className="list-disc pl-6 mt-2 mb-8">
                    <li>
                      <strong>{t("terms.contact.email")}:</strong> kwph123@aol.com
                    </li>
                    <li>
                      <strong>{t("terms.contact.phone")}:</strong> +213 662 67 52 91
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

export default Terms;
