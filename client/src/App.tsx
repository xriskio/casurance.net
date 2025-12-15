import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
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

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" data-testid="page-loader">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/20"></div>
        <div className="h-4 w-32 bg-muted rounded"></div>
      </div>
    </div>
  );
}

const Home = lazy(() => import("@/pages/Home"));
const QuotePage = lazy(() => import("@/pages/QuotePage"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const CoveragesIndex = lazy(() => import("@/pages/CoveragesIndex"));
const IndustriesIndex = lazy(() => import("@/pages/IndustriesIndex"));
const CoveragePage = lazy(() => import("@/pages/CoveragePage"));
const IndustryPage = lazy(() => import("@/pages/IndustryPage"));
const CommercialAutoQuote = lazy(() => import("@/pages/CommercialAutoQuote"));
const GeneralLiabilityQuote = lazy(() => import("@/pages/GeneralLiabilityQuote"));
const WorkersCompQuote = lazy(() => import("@/pages/WorkersCompQuote"));
const HabitationalQuote = lazy(() => import("@/pages/HabitationalQuote"));
const OfficeQuote = lazy(() => import("@/pages/OfficeQuote"));
const TruckingQuote = lazy(() => import("@/pages/TruckingQuote"));
const HotelQuote = lazy(() => import("@/pages/HotelQuote"));
const RestaurantQuote = lazy(() => import("@/pages/RestaurantQuote"));
const BuildersRiskQuote = lazy(() => import("@/pages/BuildersRiskQuote"));
const VacantBuildingQuote = lazy(() => import("@/pages/VacantBuildingQuote"));
const CraneRiggersQuote = lazy(() => import("@/pages/CraneRiggersQuote"));
const ReligiousOrgQuote = lazy(() => import("@/pages/ReligiousOrgQuote"));
const CommercialPropertyQuote = lazy(() => import("@/pages/CommercialPropertyQuote"));
const CyberLiabilityQuote = lazy(() => import("@/pages/CyberLiabilityQuote"));
const EmploymentPracticesQuote = lazy(() => import("@/pages/EmploymentPracticesQuote"));
const ProfessionalLiabilityQuote = lazy(() => import("@/pages/ProfessionalLiabilityQuote"));
const ConstructionCasualtyQuote = lazy(() => import("@/pages/ConstructionCasualtyQuote"));
const OceanCargoQuote = lazy(() => import("@/pages/OceanCargoQuote"));
const SelfStorageQuote = lazy(() => import("@/pages/SelfStorageQuote"));
const FilmProductionQuote = lazy(() => import("@/pages/FilmProductionQuote"));
const ProductLiabilitySelector = lazy(() => import("@/pages/ProductLiabilitySelector"));
const ProductLiabilityQuote = lazy(() => import("@/pages/ProductLiabilityQuote"));
const SecurityServicesQuote = lazy(() => import("@/pages/SecurityServicesQuote"));
const ViolentAttackQuote = lazy(() => import("@/pages/ViolentAttackQuote"));
const MiddleMarket = lazy(() => import("@/pages/MiddleMarket"));
const AgentLogin = lazy(() => import("@/pages/AgentLogin"));
const AgentPortal = lazy(() => import("@/pages/AgentPortal"));
const AgentSubmissionDetail = lazy(() => import("@/pages/AgentSubmissionDetail"));
const AdminPanel = lazy(() => import("@/pages/AdminPanel"));
const CmsPages = lazy(() => import("@/pages/CmsPages"));
const NemtApplicationPage = lazy(() => import("@/pages/NemtApplicationPage"));
const AmbulanceApplicationPage = lazy(() => import("@/pages/AmbulanceApplicationPage"));
const TncRideshareApplicationPage = lazy(() => import("@/pages/TncRideshareApplicationPage"));
const LimousineQuote = lazy(() => import("@/pages/LimousineQuote"));
const PublicTransportationQuote = lazy(() => import("@/pages/PublicTransportationQuote"));
const TaxiQuote = lazy(() => import("@/pages/TaxiQuote"));
const TNCQuote = lazy(() => import("@/pages/TNCQuote"));
const HighValueHomeQuote = lazy(() => import("@/pages/HighValueHomeQuote"));
const CommercialFloodQuote = lazy(() => import("@/pages/CommercialFloodQuote"));
const CommercialEarthquakeQuote = lazy(() => import("@/pages/CommercialEarthquakeQuote"));
const FranchisedDealerQuote = lazy(() => import("@/pages/FranchisedDealerQuote"));
const GarageServiceQuote = lazy(() => import("@/pages/GarageServiceQuote"));
const AutoDealerGarageQuote = lazy(() => import("@/pages/AutoDealerGarageQuote"));
const GolfCountryClubQuote = lazy(() => import("@/pages/GolfCountryClubQuote"));
const FairPlanQuotePage = lazy(() => import("@/pages/FairPlanQuotePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const PressReleasesPage = lazy(() => import("@/pages/PressReleasesPage"));
const PressReleasePage = lazy(() => import("@/pages/PressReleasePage"));
const UnsubscribePage = lazy(() => import("@/pages/UnsubscribePage"));
const CmsPageDisplay = lazy(() => import("@/pages/CmsPageDisplay"));
const LocationsIndex = lazy(() => import("@/pages/LocationsIndex"));
const LocationPage = lazy(() => import("@/pages/LocationPage"));
const PersonalLinesIndex = lazy(() => import("@/pages/PersonalLinesIndex"));
const PersonalLinesQuote = lazy(() => import("@/pages/PersonalLinesQuote"));
const AdvertisingLandingPage = lazy(() => import("@/pages/AdvertisingLandingPage"));
const WorkersCompLandingPage = lazy(() => import("@/pages/WorkersCompLandingPage"));
const LiquorStoreInsuranceLanding = lazy(() => import("@/pages/LiquorStoreInsuranceLanding"));
const BuildersRiskLanding = lazy(() => import("@/pages/BuildersRiskLanding"));
const AutoServicesLanding = lazy(() => import("@/pages/AutoServicesLanding"));
const GeicoCommercialAutoLanding = lazy(() => import("@/pages/GeicoCommercialAutoLanding"));
const GeicoPrivatePassengerLanding = lazy(() => import("@/pages/GeicoPrivatePassengerLanding"));
const BristolWestCommercialAutoLanding = lazy(() => import("@/pages/BristolWestCommercialAutoLanding"));
const BristolWestPrivatePassengerLanding = lazy(() => import("@/pages/BristolWestPrivatePassengerLanding"));
const BerkshireHathawayCommercialAutoLanding = lazy(() => import("@/pages/BerkshireHathawayCommercialAutoLanding"));
const UberBlackInsuranceLanding = lazy(() => import("@/pages/UberBlackInsuranceLanding"));
const RestaurantBarInsuranceLanding = lazy(() => import("@/pages/RestaurantBarInsuranceLanding"));
const TechnologyInsuranceLanding = lazy(() => import("@/pages/TechnologyInsuranceLanding"));
const ManufacturingInsuranceLanding = lazy(() => import("@/pages/ManufacturingInsuranceLanding"));
const ChubbSpecialProgramsLanding = lazy(() => import("@/pages/ChubbSpecialProgramsLanding"));
const ChubbPartnersLanding = lazy(() => import("@/pages/ChubbPartnersLanding"));
const ChubbBOPLanding = lazy(() => import("@/pages/ChubbBOPLanding"));
const ChubbWorkersCompLanding = lazy(() => import("@/pages/ChubbWorkersCompLanding"));
const ChubbUmbrellaLanding = lazy(() => import("@/pages/ChubbUmbrellaLanding"));
const ChubbCyberLanding = lazy(() => import("@/pages/ChubbCyberLanding"));
const ChubbBenchmarqLanding = lazy(() => import("@/pages/ChubbBenchmarqLanding"));
const ChubbMiddleMarketLanding = lazy(() => import("@/pages/ChubbMiddleMarketLanding"));
const GranadaHabitationalLanding = lazy(() => import("@/pages/GranadaHabitationalLanding"));
const LimousineTransportationPage = lazy(() => import("@/pages/LimousineTransportationPage"));
const LimousineInsuranceLanding = lazy(() => import("@/pages/LimousineInsuranceLanding"));
const RestaurantBarIndustryPage = lazy(() => import("@/pages/RestaurantBarIndustryPage"));
const CommercialUmbrellaLanding = lazy(() => import("@/pages/CommercialUmbrellaLanding"));
const ReligiousOrgLanding = lazy(() => import("@/pages/ReligiousOrgLanding"));
const ReligiousOrgIndustryPage = lazy(() => import("@/pages/ReligiousOrgIndustryPage"));
const GeneralLiabilityPage = lazy(() => import("@/pages/GeneralLiabilityPage"));
const GeneralLiabilityLanding = lazy(() => import("@/pages/GeneralLiabilityLanding"));
const ApartmentsLanding = lazy(() => import("@/pages/ApartmentsLanding"));
const OldBuildingsLanding = lazy(() => import("@/pages/OldBuildingsLanding"));
const QuoteThankYou = lazy(() => import("@/pages/QuoteThankYou"));
const AccessibilityPage = lazy(() => import("@/pages/AccessibilityPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
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
        <Route path="/coverage/general-liability" component={GeneralLiabilityPage} />
        <Route path="/coverage/:slug" component={CoveragePage} />
        <Route path="/industries" component={IndustriesIndex} />
        <Route path="/industry/limousine-transportation" component={LimousineTransportationPage} />
        <Route path="/industry/restaurant-bar-tavern" component={RestaurantBarIndustryPage} />
        <Route path="/industry/religious-organizations" component={ReligiousOrgIndustryPage} />
        <Route path="/industry/apartments-industry" component={ApartmentsLanding} />
        <Route path="/industry/old-buildings" component={OldBuildingsLanding} />
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
        <Route path="/bristol-west-commercial-auto" component={BristolWestCommercialAutoLanding} />
        <Route path="/bristol-west-private-passenger" component={BristolWestPrivatePassengerLanding} />
        <Route path="/berkshire-hathaway-commercial-auto" component={BerkshireHathawayCommercialAutoLanding} />
        <Route path="/lp/bristol-west" component={BristolWestCommercialAutoLanding} />
        <Route path="/lp/bhhc" component={BerkshireHathawayCommercialAutoLanding} />
        <Route path="/uber-black-insurance" component={UberBlackInsuranceLanding} />
        <Route path="/lp/uber-black" component={UberBlackInsuranceLanding} />
        <Route path="/limo-insurance" component={LimousineInsuranceLanding} />
        <Route path="/lp/limo" component={LimousineInsuranceLanding} />
        <Route path="/lp/limousine" component={LimousineInsuranceLanding} />
        <Route path="/restaurant-bar-insurance" component={RestaurantBarInsuranceLanding} />
        <Route path="/technology-insurance" component={TechnologyInsuranceLanding} />
        <Route path="/manufacturing-insurance" component={ManufacturingInsuranceLanding} />
        <Route path="/chubb-special-programs" component={ChubbSpecialProgramsLanding} />
        <Route path="/lp/chubb" component={ChubbSpecialProgramsLanding} />
        <Route path="/partners/chubb" component={ChubbPartnersLanding} />
        <Route path="/partners/chubb-bop" component={ChubbBOPLanding} />
        <Route path="/partners/chubb-workers-comp" component={ChubbWorkersCompLanding} />
        <Route path="/partners/chubb-umbrella" component={ChubbUmbrellaLanding} />
        <Route path="/partners/chubb-cyber" component={ChubbCyberLanding} />
        <Route path="/partners/chubb-benchmarq" component={ChubbBenchmarqLanding} />
        <Route path="/partners/chubb-middle-market" component={ChubbMiddleMarketLanding} />
        <Route path="/partners/granada-habitational" component={GranadaHabitationalLanding} />
        <Route path="/lp/restaurant-insurance" component={RestaurantBarInsuranceLanding} />
        <Route path="/lp/bar-insurance" component={RestaurantBarInsuranceLanding} />
        <Route path="/lp/commercial-umbrella" component={CommercialUmbrellaLanding} />
        <Route path="/lp/umbrella" component={CommercialUmbrellaLanding} />
        <Route path="/lp/excess-liability" component={CommercialUmbrellaLanding} />
        <Route path="/commercial-umbrella-insurance" component={CommercialUmbrellaLanding} />
        <Route path="/lp/religious-organization" component={ReligiousOrgLanding} />
        <Route path="/lp/church-insurance" component={ReligiousOrgLanding} />
        <Route path="/lp/house-of-worship" component={ReligiousOrgLanding} />
        <Route path="/religious-organization-insurance" component={ReligiousOrgLanding} />
        <Route path="/lp/general-liability" component={GeneralLiabilityLanding} />
        <Route path="/general-liability-insurance" component={GeneralLiabilityLanding} />
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
        <Route path="/quote/fair-plan" component={FairPlanQuotePage} />
        <Route path="/locations" component={LocationsIndex} />
        <Route path="/location/:citySlug/:insuranceSlug" component={LocationPage} />
        <Route path="/personal-lines" component={PersonalLinesIndex} />
        <Route path="/quote/personal-lines" component={PersonalLinesQuote} />
        <Route path="/page/:slug" component={CmsPageDisplay} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
