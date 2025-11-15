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
      <Route path="/service" component={ServicePage} />
      <Route path="/coverages" component={CoveragesIndex} />
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
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
