import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Investors from "@/pages/investors";
import PremiumReturns from "@/pages/investments/premium-returns";
import StrategicPartnerships from "@/pages/investments/strategic-partnerships";
import SustainableGrowth from "@/pages/investments/sustainable-growth";
import Contact from "@/pages/contact";
import Legal from "@/pages/legal";
import { useEffect, useState } from "react";

// Language type definition
type Language = "en" | "ar" | "ar-dz" | "fr" | "es" | "ur" | "it";

function Router() {
  // Get preferred language from URL or localStorage
  const getPreferredLanguage = (): Language => {
    // Check URL parameter first
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang") as Language;
      if (langParam && ["en", "ar", "ar-dz", "fr", "es", "ur", "it"].includes(langParam)) {
        return langParam;
      }
      
      // Then check localStorage
      const storedLang = localStorage.getItem("preferredLanguage") as Language;
      if (storedLang && ["en", "ar", "ar-dz", "fr", "es", "ur", "it"].includes(storedLang)) {
        return storedLang;
      }
    }
    
    // Default to English
    return "en";
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(getPreferredLanguage());
  
  // Update language when URL changes
  useEffect(() => {
    const updateLanguage = () => {
      setCurrentLanguage(getPreferredLanguage());
    };
    
    window.addEventListener('popstate', updateLanguage);
    return () => window.removeEventListener('popstate', updateLanguage);
  }, []);
  
  // Set document direction based on language
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = ["ar", "ar-dz", "ur"].includes(currentLanguage) ? "rtl" : "ltr";
    
    // Store the selected language in localStorage
    localStorage.setItem("preferredLanguage", currentLanguage);
  }, [currentLanguage]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services">
        {() => <Redirect to="/investors" />}
      </Route>
      <Route path="/services/saharan-crops">
        {() => <Redirect to="/investors" />}
      </Route>
      <Route path="/services/agricultural-research">
        {() => <Redirect to="/investors" />}
      </Route>
      <Route path="/services/irrigation-systems">
        {() => <Redirect to="/investors" />}
      </Route>
      <Route path="/services/diverse-portfolio">
        {() => <Redirect to="/investors" />}
      </Route>
      <Route path="/services/sustainable-practices">
        {() => <Redirect to="/investors" />}
      </Route>
      <Route path="/services/global-distribution">
        {() => <Redirect to="/investors" />}
      </Route>
      <Route path="/investments/premium-returns" component={PremiumReturns} />
      <Route path="/investments/strategic-partnerships" component={StrategicPartnerships} />
      <Route path="/investments/sustainable-growth" component={SustainableGrowth} />
      <Route path="/investors" component={Investors} />
      <Route path="/contact" component={Contact} />
      <Route path="/legal" component={Legal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Get preferred language for root component
  const getPreferredLanguage = (): Language => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang") as Language;
      if (langParam && ["en", "ar", "ar-dz", "fr", "es", "ur", "it"].includes(langParam)) {
        return langParam;
      }
      
      const storedLang = localStorage.getItem("preferredLanguage") as Language;
      if (storedLang && ["en", "ar", "ar-dz", "fr", "es", "ur", "it"].includes(storedLang)) {
        return storedLang;
      }
    }
    return "en";
  };

  const [language, setLanguage] = useState<Language>(getPreferredLanguage());
  const dir = ["ar", "ar-dz", "ur"].includes(language) ? "rtl" : "ltr";

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
