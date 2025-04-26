import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import SaharanCrops from "@/pages/services/saharan-crops";
import AgriculturalResearch from "@/pages/services/agricultural-research";
import IrrigationSystems from "@/pages/services/irrigation-systems";
import DiversePortfolio from "@/pages/services/diverse-portfolio";
import SustainablePractices from "@/pages/services/sustainable-practices";
import GlobalDistribution from "@/pages/services/global-distribution";
import Investors from "@/pages/investors";
import Contact from "@/pages/contact";
import Legal from "@/pages/legal";
import { useLanguage } from "./lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/saharan-crops" component={SaharanCrops} />
      <Route path="/services/agricultural-research" component={AgriculturalResearch} />
      <Route path="/services/irrigation-systems" component={IrrigationSystems} />
      <Route path="/services/diverse-portfolio" component={DiversePortfolio} />
      <Route path="/services/sustainable-practices" component={SustainablePractices} />
      <Route path="/services/global-distribution" component={GlobalDistribution} />
      <Route path="/investors" component={Investors} />
      <Route path="/contact" component={Contact} />
      <Route path="/legal" component={Legal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { language, dir } = useLanguage();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div lang={language} dir={dir} className="min-h-screen flex flex-col">
          <Toaster />
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
