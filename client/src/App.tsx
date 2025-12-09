import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  
  return null;
}
import Home from "@/pages/Home";
import QuotePage from "@/pages/QuotePage";
import ServicePage from "@/pages/ServicePage";
import CoveragesIndex from "@/pages/CoveragesIndex";
import IndustriesIndex from "@/pages/IndustriesIndex";
import CoveragePage from "@/pages/CoveragePage";
import IndustryPage from "@/pages/IndustryPage";
import CommercialAutoQuote from "@/pages/CommercialAutoQuote";
import GeneralLiabilityQuote from "@/pages/GeneralLiabilityQuote";
import WorkersCompQuote from "@/pages/WorkersCompQuote";
import HabitationalQuote from "@/pages/HabitationalQuote";
import OfficeQuote from "@/pages/OfficeQuote";
import TruckingQuote from "@/pages/TruckingQuote";
import HotelQuote from "@/pages/HotelQuote";
import RestaurantQuote from "@/pages/RestaurantQuote";
import BuildersRiskQuote from "@/pages/BuildersRiskQuote";
import VacantBuildingQuote from "@/pages/VacantBuildingQuote";
import CraneRiggersQuote from "@/pages/CraneRiggersQuote";
import ReligiousOrgQuote from "@/pages/ReligiousOrgQuote";
import CommercialPropertyQuote from "@/pages/CommercialPropertyQuote";
import CyberLiabilityQuote from "@/pages/CyberLiabilityQuote";
import EmploymentPracticesQuote from "@/pages/EmploymentPracticesQuote";
import ProfessionalLiabilityQuote from "@/pages/ProfessionalLiabilityQuote";
import ConstructionCasualtyQuote from "@/pages/ConstructionCasualtyQuote";
import OceanCargoQuote from "@/pages/OceanCargoQuote";
import SelfStorageQuote from "@/pages/SelfStorageQuote";
import FilmProductionQuote from "@/pages/FilmProductionQuote";
import ProductLiabilitySelector from "@/pages/ProductLiabilitySelector";
import ProductLiabilityQuote from "@/pages/ProductLiabilityQuote";
import SecurityServicesQuote from "@/pages/SecurityServicesQuote";
import ViolentAttackQuote from "@/pages/ViolentAttackQuote";
import MiddleMarket from "@/pages/MiddleMarket";
import AgentLogin from "@/pages/AgentLogin";
import AgentPortal from "@/pages/AgentPortal";
import AgentSubmissionDetail from "@/pages/AgentSubmissionDetail";
import AdminPanel from "@/pages/AdminPanel";
import CmsPages from "@/pages/CmsPages";
import NemtApplicationPage from "@/pages/NemtApplicationPage";
import AmbulanceApplicationPage from "@/pages/AmbulanceApplicationPage";
import TncRideshareApplicationPage from "@/pages/TncRideshareApplicationPage";
import LimousineQuote from "@/pages/LimousineQuote";
import PublicTransportationQuote from "@/pages/PublicTransportationQuote";
import TaxiQuote from "@/pages/TaxiQuote";
import TNCQuote from "@/pages/TNCQuote";
import HighValueHomeQuote from "@/pages/HighValueHomeQuote";
import CommercialFloodQuote from "@/pages/CommercialFloodQuote";
import CommercialEarthquakeQuote from "@/pages/CommercialEarthquakeQuote";
import FranchisedDealerQuote from "@/pages/FranchisedDealerQuote";
import GarageServiceQuote from "@/pages/GarageServiceQuote";
import AutoDealerGarageQuote from "@/pages/AutoDealerGarageQuote";
import GolfCountryClubQuote from "@/pages/GolfCountryClubQuote";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import PressReleasesPage from "@/pages/PressReleasesPage";
import PressReleasePage from "@/pages/PressReleasePage";
import UnsubscribePage from "@/pages/UnsubscribePage";
import CmsPageDisplay from "@/pages/CmsPageDisplay";
import LocationsIndex from "@/pages/LocationsIndex";
import LocationPage from "@/pages/LocationPage";
import PersonalLinesIndex from "@/pages/PersonalLinesIndex";
import PersonalLinesQuote from "@/pages/PersonalLinesQuote";
import AdvertisingLandingPage from "@/pages/AdvertisingLandingPage";
import WorkersCompLandingPage from "@/pages/WorkersCompLandingPage";
import LiquorStoreInsuranceLanding from "@/pages/LiquorStoreInsuranceLanding";
import BuildersRiskLanding from "@/pages/BuildersRiskLanding";
import AutoServicesLanding from "@/pages/AutoServicesLanding";
import GeicoCommercialAutoLanding from "@/pages/GeicoCommercialAutoLanding";
import GeicoPrivatePassengerLanding from "@/pages/GeicoPrivatePassengerLanding";
import QuoteThankYou from "@/pages/QuoteThankYou";
import AccessibilityPage from "@/pages/AccessibilityPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quote" component={QuotePage} />
      <Route path="/quote/thank-you" component={QuoteThankYou} />
      <Route path="/quote/commercial-auto" component={CommercialAutoQuote} />
      <Route path="/quote/general-liability" component={GeneralLiabilityQuote} />
      <Route path="/quote/workers-compensation" component={WorkersCompQuote} />
      <Route path="/quote/habitational" component={HabitationalQuote} />
      <Route path="/quote/office-building" component={OfficeQuote} />
      <Route path="/quote/trucking" component={TruckingQuote} />
      <Route path="/quote/hotel" component={HotelQuote} />
      <Route path="/quote/restaurant" component={RestaurantQuote} />
      <Route path="/quote/builders-risk" component={BuildersRiskQuote} />
      <Route path="/quote/vacant-building" component={VacantBuildingQuote} />
      <Route path="/quote/crane-riggers" component={CraneRiggersQuote} />
      <Route path="/quote/religious-organization" component={ReligiousOrgQuote} />
      <Route path="/quote/commercial-property" component={CommercialPropertyQuote} />
      <Route path="/quote/cyber-liability" component={CyberLiabilityQuote} />
      <Route path="/quote/employment-practices" component={EmploymentPracticesQuote} />
      <Route path="/quote/professional-liability" component={ProfessionalLiabilityQuote} />
      <Route path="/quote/construction-casualty" component={ConstructionCasualtyQuote} />
      <Route path="/quote/ocean-cargo" component={OceanCargoQuote} />
      <Route path="/quote/self-storage" component={SelfStorageQuote} />
      <Route path="/quote/film-production" component={FilmProductionQuote} />
      <Route path="/quote/product-liability" component={ProductLiabilitySelector} />
      <Route path="/quote/product-liability/:type" component={ProductLiabilityQuote} />
      <Route path="/quote/security-services" component={SecurityServicesQuote} />
      <Route path="/quote/violent-attack" component={ViolentAttackQuote} />
      <Route path="/service" component={ServicePage} />
      <Route path="/coverages" component={CoveragesIndex} />
      <Route path="/middle-market" component={MiddleMarket} />
      <Route path="/coverage/:slug" component={CoveragePage} />
      <Route path="/industries" component={IndustriesIndex} />
      <Route path="/industry/:slug" component={IndustryPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/press-releases" component={PressReleasesPage} />
      <Route path="/press-releases/:slug" component={PressReleasePage} />
      <Route path="/unsubscribe" component={UnsubscribePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/accessibility" component={AccessibilityPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/get-quote" component={AdvertisingLandingPage} />
      <Route path="/lp" component={AdvertisingLandingPage} />
      <Route path="/lp/insurance" component={AdvertisingLandingPage} />
      <Route path="/lp/commercial-insurance" component={AdvertisingLandingPage} />
      <Route path="/workers-comp-california-nevada" component={WorkersCompLandingPage} />
      <Route path="/lp/workers-comp" component={WorkersCompLandingPage} />
      <Route path="/lp/workers-compensation" component={WorkersCompLandingPage} />
      <Route path="/liquor-store-insurance" component={LiquorStoreInsuranceLanding} />
      <Route path="/lp/liquor-store" component={LiquorStoreInsuranceLanding} />
      <Route path="/lp/liquor-liability" component={LiquorStoreInsuranceLanding} />
      <Route path="/builders-risk-insurance" component={BuildersRiskLanding} />
      <Route path="/lp/builders-risk" component={BuildersRiskLanding} />
      <Route path="/lp/construction-insurance" component={BuildersRiskLanding} />
      <Route path="/auto-services-insurance" component={AutoServicesLanding} />
      <Route path="/lp/auto-services" component={AutoServicesLanding} />
      <Route path="/lp/garage-liability" component={AutoServicesLanding} />
      <Route path="/lp/garagekeepers" component={AutoServicesLanding} />
      <Route path="/geico-commercial-auto" component={GeicoCommercialAutoLanding} />
      <Route path="/geico-private-passenger" component={GeicoPrivatePassengerLanding} />
      <Route path="/lp/geico-commercial" component={GeicoCommercialAutoLanding} />
      <Route path="/lp/geico-personal" component={GeicoPrivatePassengerLanding} />
      <Route path="/agent" component={AgentLogin} />
      <Route path="/agent/login" component={AgentLogin} />
      <Route path="/agent/portal" component={AgentPortal} />
      <Route path="/agent-portal" component={AgentPortal} />
      <Route path="/agent/submission/:type/:id" component={AgentSubmissionDetail} />
      <Route path="/agent/cms/pages" component={CmsPages} />
      <Route path="/admin/panel" component={AdminPanel} />
      <Route path="/admin-panel" component={AdminPanel} />
      <Route path="/apply/nemt" component={NemtApplicationPage} />
      <Route path="/apply/ambulance" component={AmbulanceApplicationPage} />
      <Route path="/apply/tnc-rideshare" component={TncRideshareApplicationPage} />
      <Route path="/quote/limousine" component={LimousineQuote} />
      <Route path="/quote/public-transportation" component={PublicTransportationQuote} />
      <Route path="/quote/taxi" component={TaxiQuote} />
      <Route path="/quote/tnc" component={TNCQuote} />
      <Route path="/quote/shared-economy" component={TNCQuote} />
      <Route path="/quote/high-value-home" component={HighValueHomeQuote} />
      <Route path="/quote/commercial-flood" component={CommercialFloodQuote} />
      <Route path="/quote/commercial-earthquake" component={CommercialEarthquakeQuote} />
      <Route path="/quote/franchised-dealers" component={FranchisedDealerQuote} />
      <Route path="/quote/garage-service-centers" component={GarageServiceQuote} />
      <Route path="/quote/auto-dealer-garage" component={AutoDealerGarageQuote} />
      <Route path="/quote/golf-country-club" component={GolfCountryClubQuote} />
      <Route path="/locations" component={LocationsIndex} />
      <Route path="/location/:citySlug/:insuranceSlug" component={LocationPage} />
      <Route path="/personal-lines" component={PersonalLinesIndex} />
      <Route path="/quote/personal-lines" component={PersonalLinesQuote} />
      <Route path="/page/:slug" component={CmsPageDisplay} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <ScrollToTop />
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Toaster />
          <Router />
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
