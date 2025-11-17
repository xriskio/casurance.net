import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import MiddleMarket from "@/pages/MiddleMarket";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quote" component={QuotePage} />
      <Route path="/quote/commercial-auto" component={CommercialAutoQuote} />
      <Route path="/quote/general-liability" component={GeneralLiabilityQuote} />
      <Route path="/quote/workers-compensation" component={WorkersCompQuote} />
      <Route path="/quote/habitational" component={HabitationalQuote} />
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
      <Route path="/service" component={ServicePage} />
      <Route path="/coverages" component={CoveragesIndex} />
      <Route path="/middle-market" component={MiddleMarket} />
      <Route path="/coverage/:slug" component={CoveragePage} />
      <Route path="/industries" component={IndustriesIndex} />
      <Route path="/industry/:slug" component={IndustryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
