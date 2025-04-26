import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStaggeredAnimation } from "@/lib/animations";
import { FaWheatAwn, FaLandmark, FaChartLine } from "react-icons/fa";

const Services = () => {
  const { t } = useLanguage();
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const { elementRef, getAnimationClass } = useStaggeredAnimation("animate-slide-in-right", 3);

  // Service data
  const services = [
    {
      id: "cultivation",
      icon: <FaWheatAwn className="text-4xl text-earth-dark" />,
      title: "services.cultivation.title",
      description: "services.cultivation.description",
      details: "services.cultivation.details"
    },
    {
      id: "leasing",
      icon: <FaLandmark className="text-4xl text-earth-dark" />,
      title: "services.leasing.title",
      description: "services.leasing.description",
      details: "services.leasing.details"
    },
    {
      id: "consultancy",
      icon: <FaChartLine className="text-4xl text-earth-dark" />,
      title: "services.consultancy.title",
      description: "services.consultancy.description",
      details: "services.consultancy.details"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("services.meta.title")}</title>
        <meta name="description" content={t("services.meta.description")} />
      </Helmet>
      
      {/* Banner */}
      <div className="bg-leaf py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center">{t("services.banner.title")}</h1>
        </div>
      </div>
      
      {/* Services Grid */}
      <section ref={elementRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} className={`${getAnimationClass(index)}`}>
                <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-wheat rounded-full flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h2 className="text-xl font-serif font-semibold mb-2">{t(service.title)}</h2>
                  <p className="text-stone-dark mb-6">{t(service.description)}</p>
                  
                  <Dialog open={openDialog === service.id} onOpenChange={(open) => setOpenDialog(open ? service.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-auto text-earth hover:text-white hover:bg-earth">
                        {t("services.learnMore")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">{t(service.title)}</DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="text-base">
                        <p className="mb-4">{t(service.description)}</p>
                        <p className="mb-4">{t(service.details)}</p>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Services Overview */}
      <section className="py-16 bg-stone-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">{t("services.overview.title")}</h2>
            <p className="mb-6 text-center">{t("services.overview.description")}</p>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-serif font-semibold mb-4">{t("services.customSolutions.title")}</h3>
              <p className="mb-4">{t("services.customSolutions.description")}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("services.customSolutions.point1")}</li>
                <li>{t("services.customSolutions.point2")}</li>
                <li>{t("services.customSolutions.point3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
