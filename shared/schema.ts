import { pgTable, text, varchar, timestamp, json, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quoteRequests = pgTable("quote_requests", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  streetAddress: text("street_address"),
  addressLine2: text("address_line2"),
  city: text("city"),
  state: text("state"),
  postalCode: text("postal_code"),
  insuranceType: text("insurance_type").notNull(),
  industry: text("industry"),
  employeeCount: text("employee_count"),
  annualRevenue: text("annual_revenue"),
  coverageNeeds: text("coverage_needs").array(),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const serviceRequests = pgTable("service_requests", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  policyNumber: text("policy_number"),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  requestType: text("request_type").notNull(),
  priority: text("priority"),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const oceanCargoQuotes = pgTable("ocean_cargo_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  effectiveDate: text("effective_date").notNull(),
  vesselLimit: text("vessel_limit"),
  aircraftLimit: text("aircraft_limit"),
  optionalCoverages: text("optional_coverages").array().notNull().default([]),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const selfStorageQuotes = pgTable("self_storage_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date").notNull(),
  totalLocations: text("total_locations"),
  generalLiabilityLimit: text("general_liability_limit"),
  totalGrossSales: text("total_gross_sales"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const filmProductionQuotes = pgTable("film_production_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  productionStartDate: text("production_start_date"),
  productionEndDate: text("production_end_date"),
  grossProductionCost: text("gross_production_cost"),
  numberOfProductions: text("number_of_productions"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productLiabilityQuotes = pgTable("product_liability_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  productType: text("product_type").notNull(),
  effectiveDate: text("effective_date"),
  annualSales: text("annual_sales"),
  limitOfInsurance: text("limit_of_insurance"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const securityServicesQuotes = pgTable("security_services_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  totalGuardHours: text("total_guard_hours"),
  limitOfInsurance: text("limit_of_insurance"),
  yearsInBusiness: text("years_in_business"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const violentAttackQuotes = pgTable("violent_attack_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  propertyType: text("property_type").notNull(),
  effectiveDate: text("effective_date"),
  annualRevenue: text("annual_revenue"),
  numberOfEmployees: text("number_of_employees"),
  averageMonthlyVisitors: text("average_monthly_visitors"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const buildersRiskQuotes = pgTable("builders_risk_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  projectStartDate: text("project_start_date"),
  projectCompletionDate: text("project_completion_date"),
  projectLocationAddress: text("project_location_address"),
  constructionType: text("construction_type"),
  hardCost: text("hard_cost"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vacantBuildingQuotes = pgTable("vacant_building_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  buildingAddress: text("building_address"),
  buildingType: text("building_type"),
  yearBuilt: text("year_built"),
  squareFootage: text("square_footage"),
  limitOfInsurance: text("limit_of_insurance"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const craneRiggersQuotes = pgTable("crane_riggers_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  limitOfInsurance: text("limit_of_insurance"),
  numberOfCranes: text("number_of_cranes"),
  yearsInBusiness: text("years_in_business"),
  annualRevenue: text("annual_revenue"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commercialAutoQuotes = pgTable("commercial_auto_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  insuredName: text("insured_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  liabilityLimit: text("liability_limit"),
  yearsInBusiness: text("years_in_business"),
  numberOfVehicles: text("number_of_vehicles"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const generalLiabilityQuotes = pgTable("general_liability_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  limitOfInsurance: text("limit_of_insurance"),
  businessType: text("business_type"),
  annualRevenue: text("annual_revenue"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const habitationalQuotes = pgTable("habitational_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  propertyAddress: text("property_address"),
  numberOfUnits: text("number_of_units"),
  buildingValue: text("building_value"),
  effectiveDate: text("effective_date"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const officeQuotes = pgTable("office_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  propertyAddress: text("property_address"),
  numberOfBuildings: text("number_of_buildings"),
  totalSquareFeet: text("total_square_feet"),
  numberOfStories: text("number_of_stories"),
  buildingValue: text("building_value"),
  effectiveDate: text("effective_date"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hotelQuotes = pgTable("hotel_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  propertyAddress: text("property_address"),
  numberOfRooms: text("number_of_rooms"),
  annualRevenue: text("annual_revenue"),
  effectiveDate: text("effective_date"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const restaurantQuotes = pgTable("restaurant_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  restaurantName: text("restaurant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  seatingCapacity: text("seating_capacity"),
  annualSales: text("annual_sales"),
  effectiveDate: text("effective_date"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const truckingQuotes = pgTable("trucking_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  dotNumber: text("dot_number"),
  numberOfTrucks: text("number_of_trucks"),
  operatingRadius: text("operating_radius"),
  effectiveDate: text("effective_date"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workersCompQuotes = pgTable("workers_comp_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  industry: text("industry"),
  numberOfEmployees: text("number_of_employees"),
  annualPayroll: text("annual_payroll"),
  effectiveDate: text("effective_date"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const managementLiabilityQuotes = pgTable("management_liability_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  annualRevenue: text("annual_revenue"),
  numberOfEmployees: text("number_of_employees"),
  limitOfInsurance: text("limit_of_insurance"),
  effectiveDate: text("effective_date"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commercialPackageQuotes = pgTable("commercial_package_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type"),
  annualRevenue: text("annual_revenue"),
  buildingValue: text("building_value"),
  effectiveDate: text("effective_date"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("agent"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
});

export const agentSessions = pgTable("agent_sessions", {
  sid: varchar("sid").primaryKey(),
  sess: json("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

export const submissionStatusHistory = pgTable("submission_status_history", {
  id: serial("id").primaryKey(),
  submissionType: text("submission_type").notNull(),
  submissionId: varchar("submission_id").notNull(),
  status: text("status").notNull(),
  notes: text("notes"),
  changedBy: integer("changed_by").references(() => agents.id),
  confirmedAt: timestamp("confirmed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const nemtApplications = pgTable("nemt_applications", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  yearsInBusiness: text("years_in_business"),
  numberOfVehicles: text("number_of_vehicles"),
  numberOfDrivers: text("number_of_drivers"),
  operatingRadius: text("operating_radius"),
  autoLiabilityCoverage: text("auto_liability_coverage"),
  autoPhysicalDamage: text("auto_physical_damage").default("no"),
  hnoaCoverage: text("hnoa_coverage").default("no"),
  workersCompensation: text("workers_compensation").default("no"),
  generalLiability: text("general_liability").default("no"),
  professionalLiability: text("professional_liability").default("no"),
  umbrellaCoverage: text("umbrella_coverage").default("no"),
  excessAutoLiability: text("excess_auto_liability").default("no"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ambulanceApplications = pgTable("ambulance_applications", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  yearsInBusiness: text("years_in_business"),
  numberOfVehicles: text("number_of_vehicles"),
  numberOfDrivers: text("number_of_drivers"),
  operatingRadius: text("operating_radius"),
  autoLiabilityCoverage: text("auto_liability_coverage"),
  autoPhysicalDamage: text("auto_physical_damage").default("no"),
  hnoaCoverage: text("hnoa_coverage").default("no"),
  workersCompensation: text("workers_compensation").default("no"),
  generalLiability: text("general_liability").default("no"),
  professionalLiability: text("professional_liability").default("no"),
  umbrellaCoverage: text("umbrella_coverage").default("no"),
  excessAutoLiability: text("excess_auto_liability").default("no"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tncApplications = pgTable("tnc_applications", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  primaryStreetAddress: text("primary_street_address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  dateEstablished: text("date_established"),
  totalDrivers: text("total_drivers"),
  requestingGLCoverage: text("requesting_gl_coverage").default("no"),
  requestingAutoCoverage: text("requesting_auto_coverage").default("no"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const limousineQuotes = pgTable("limousine_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  businessPhone: text("business_phone").notNull(),
  mailingAddress: text("mailing_address"),
  yearsInBusiness: text("years_in_business"),
  numberOfEmployees: text("number_of_employees"),
  autoLiabilityLimit: text("auto_liability_limit"),
  comprehensiveDeductible: text("comprehensive_deductible"),
  collisionDeductible: text("collision_deductible"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const publicTransportationQuotes = pgTable("public_transportation_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  mailingAddress: text("mailing_address"),
  yearsEstablished: text("years_established"),
  fleetSize: text("fleet_size"),
  autoLiabilityLimit: text("auto_liability_limit"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const taxiBlackCarQuotes = pgTable("taxi_black_car_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  mailingAddress: text("mailing_address"),
  yearsInBusiness: text("years_in_business"),
  fleetSize: text("fleet_size"),
  autoLiabilityLimit: text("auto_liability_limit"),
  dispatchPercentage: text("dispatch_percentage"),
  tncParticipation: text("tnc_participation").default("no"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quickQuotes = pgTable("quick_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  state: text("state").notNull(),
  vehicles: text("vehicles"),
  insuranceType: text("insurance_type").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactRequests = pgTable("contact_requests", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  businessName: text("business_name"),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  title: text("title"),
  preferredContactMethod: text("preferred_contact_method"),
  preferredContactTime: text("preferred_contact_time"),
  topicsOfInterest: text("topics_of_interest").array().notNull().default([]),
  message: text("message").notNull(),
  sourcePath: text("source_path"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const applicationFiles = pgTable("application_files", {
  id: serial("id").primaryKey(),
  applicationType: text("application_type").notNull(),
  applicationId: varchar("application_id").notNull(),
  fileType: text("file_type").notNull(),
  originalFilename: text("original_filename").notNull(),
  storedFilename: text("stored_filename").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().notNull().default([]),
  author: text("author").notNull().default("Casurance Team"),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  isAiGenerated: text("is_ai_generated").notNull().default("true"),
});

export const pressReleases = pgTable("press_releases", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  subtitle: text("subtitle"),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull().default("Nationwide"),
  contactName: text("contact_name").notNull().default("Casurance Media Relations"),
  contactEmail: text("contact_email").notNull().default("media@casurance.com"),
  contactPhone: text("contact_phone").notNull().default("1-888-254-0089"),
  tags: text("tags").array().notNull().default([]),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  isAiGenerated: text("is_ai_generated").notNull().default("true"),
});

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("active"),
  unsubscribeToken: text("unsubscribe_token").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

export const personalLinesQuotes = pgTable("personal_lines_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  coverageType: text("coverage_type").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  effectiveDate: text("effective_date"),
  currentInsurer: text("current_insurer"),
  propertyType: text("property_type"),
  yearBuilt: text("year_built"),
  squareFootage: text("square_footage"),
  dwellingValue: text("dwelling_value"),
  numberOfVehicles: text("number_of_vehicles"),
  vehicleInfo: text("vehicle_info"),
  driverInfo: text("driver_info"),
  additionalCoverages: text("additional_coverages").array().default([]),
  additionalInfo: text("additional_info"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const highValueHomeQuotes = pgTable("high_value_home_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  primaryNamedInsured: text("primary_named_insured").notNull(),
  secondaryNamedInsured: text("secondary_named_insured"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  dwellingAddress: text("dwelling_address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  constructionType: text("construction_type"),
  yearConstructed: text("year_constructed"),
  squareFootage: text("square_footage"),
  roofingType: text("roofing_type"),
  protectionClass: text("protection_class"),
  dwellingValue: text("dwelling_value"),
  requestedValuation: text("requested_valuation"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commercialFloodQuotes = pgTable("commercial_flood_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  propertyAddress: text("property_address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  floodZone: text("flood_zone"),
  buildingCoverage: text("building_coverage"),
  contentsCoverage: text("contents_coverage"),
  yearBuilt: text("year_built"),
  numberOfStories: text("number_of_stories"),
  constructionType: text("construction_type"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commercialEarthquakeQuotes = pgTable("commercial_earthquake_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  namedInsured: text("named_insured").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  propertyAddress: text("property_address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  buildingValue: text("building_value"),
  contentsValue: text("contents_value"),
  yearBuilt: text("year_built"),
  numberOfStories: text("number_of_stories"),
  constructionType: text("construction_type"),
  desiredDeductible: text("desired_deductible"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const franchisedDealerQuotes = pgTable("franchised_dealer_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  mailingAddress: text("mailing_address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  yearsInBusiness: text("years_in_business"),
  dealershipType: text("dealership_type"),
  numberOfLocations: text("number_of_locations"),
  newAutoSalesPercent: text("new_auto_sales_percent"),
  usedAutoSalesPercent: text("used_auto_sales_percent"),
  serviceRepairPercent: text("service_repair_percent"),
  numberOfDealerPlates: text("number_of_dealer_plates"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const garageServiceQuotes = pgTable("garage_service_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  mailingAddress: text("mailing_address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  yearsInBusiness: text("years_in_business"),
  businessType: text("business_type"),
  numberOfLocations: text("number_of_locations"),
  repairServicesPercent: text("repair_services_percent"),
  partsAccessoriesPercent: text("parts_accessories_percent"),
  numberOfEmployees: text("number_of_employees"),
  annualGrossSales: text("annual_gross_sales"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const autoDealerGarageQuotes = pgTable("auto_dealer_garage_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  mailingAddress: text("mailing_address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  businessType: text("business_type"),
  yearsInBusiness: text("years_in_business"),
  numberOfLocations: text("number_of_locations"),
  operationType: text("operation_type"),
  dealershipType: text("dealership_type"),
  numberOfDealerPlates: text("number_of_dealer_plates"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const golfCountryClubQuotes = pgTable("golf_country_club_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  clubName: text("club_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  clubType: text("club_type"),
  numberOfHoles: text("number_of_holes"),
  acreage: text("acreage"),
  annualRevenue: text("annual_revenue"),
  generalLiabilityLimit: text("general_liability_limit"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commercialPropertyQuotes = pgTable("commercial_property_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  occupancyTypes: text("occupancy_types").array(),
  smokeDetectorsCommon: text("smoke_detectors_common"),
  smokeDetectorsUnits: text("smoke_detectors_units"),
  hasSprinklerSystem: text("has_sprinkler_system"),
  roofMaterial: text("roof_material"),
  freezeProtectionMeasures: text("freeze_protection_measures").array(),
  buildingValue: text("building_value"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const constructionCasualtyQuotes = pgTable("construction_casualty_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  contractorLicenseNumber: text("contractor_license_number"),
  effectiveDate: text("effective_date"),
  payrollNext12Months: text("payroll_next_12_months"),
  subcontractorCostsNext12Months: text("subcontractor_costs_next_12_months"),
  yearsInBusinessCurrentName: text("years_in_business_current_name"),
  residentialPercent: text("residential_percent"),
  commercialPercent: text("commercial_percent"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cyberLiabilityQuotes = pgTable("cyber_liability_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  effectiveDate: text("effective_date"),
  industry: text("industry"),
  recordsVolume: text("records_volume"),
  encryptedAtRest: text("encrypted_at_rest"),
  mfaForRemoteAccess: text("mfa_for_remote_access"),
  securityTrainingFrequency: text("security_training_frequency"),
  requestedLimit: text("requested_limit"),
  requestedRetention: text("requested_retention"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const employmentPracticesQuotes = pgTable("employment_practices_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  totalFullTimeEmployees: text("total_full_time_employees"),
  hasEmploymentHandbook: text("has_employment_handbook"),
  hasAtWillProvision: text("has_at_will_provision"),
  requestedLimit: text("requested_limit"),
  requestedRetention: text("requested_retention"),
  stateOfIncorporation: text("state_of_incorporation"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const professionalLiabilityQuotes = pgTable("professional_liability_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  firmName: text("firm_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  effectiveDate: text("effective_date"),
  principals: text("principals"),
  professionals: text("professionals"),
  pastFiscalYearRevenue: text("past_fiscal_year_revenue"),
  hasWrittenContracts: text("has_written_contracts"),
  requestedLimit: text("requested_limit"),
  requestedRetention: text("requested_retention"),
  natureOfBusiness: text("nature_of_business"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const religiousOrgQuotes = pgTable("religious_org_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  denomination: text("denomination"),
  numberOfMembers: text("number_of_members"),
  is501c3: text("is_501c3"),
  hasYouthProgram: text("has_youth_program"),
  effectiveDate: text("effective_date"),
  requestedLimit: text("requested_limit"),
  numberOfVolunteers: text("number_of_volunteers"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tncQuotes = pgTable("tnc_quotes", {
  id: varchar("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessSegment: text("business_segment"),
  fleetSize: text("fleet_size"),
  activeDrivers: text("active_drivers"),
  effectiveDate: text("effective_date"),
  liabilityLimit: text("liability_limit"),
  operatingStates: text("operating_states"),
  requestedCoverages: text("requested_coverages"),
  status: text("status").notNull().default("pending"),
  payload: json("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// CMS Tables
export const cmsPages = pgTable("cms_pages", {
  id: varchar("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaDescription: text("meta_description"),
  content: text("content").notNull(),
  isPublished: text("is_published").notNull().default("false"),
  isAiGenerated: text("is_ai_generated").notNull().default("false"),
  featuredImage: text("featured_image"),
  author: text("author").notNull().default("Casurance Team"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cmsMenuItems = pgTable("cms_menu_items", {
  id: varchar("id").primaryKey(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  menuLocation: text("menu_location").notNull().default("header"),
  parentId: text("parent_id"),
  orderIndex: integer("order_index").notNull().default(0),
  isExternal: text("is_external").notNull().default("false"),
  isActive: text("is_active").notNull().default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cmsMedia = pgTable("cms_media", {
  id: varchar("id").primaryKey(),
  fileName: text("file_name").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: text("file_path").notNull(),
  altText: text("alt_text"),
  caption: text("caption"),
  uploadedBy: text("uploaded_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequests).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertOceanCargoQuoteSchema = createInsertSchema(oceanCargoQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertSelfStorageQuoteSchema = createInsertSchema(selfStorageQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertFilmProductionQuoteSchema = createInsertSchema(filmProductionQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertProductLiabilityQuoteSchema = createInsertSchema(productLiabilityQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertSecurityServicesQuoteSchema = createInsertSchema(securityServicesQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertViolentAttackQuoteSchema = createInsertSchema(violentAttackQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertBuildersRiskQuoteSchema = createInsertSchema(buildersRiskQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertVacantBuildingQuoteSchema = createInsertSchema(vacantBuildingQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertCraneRiggersQuoteSchema = createInsertSchema(craneRiggersQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertCommercialAutoQuoteSchema = createInsertSchema(commercialAutoQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertGeneralLiabilityQuoteSchema = createInsertSchema(generalLiabilityQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertHabitationalQuoteSchema = createInsertSchema(habitationalQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertOfficeQuoteSchema = createInsertSchema(officeQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertHotelQuoteSchema = createInsertSchema(hotelQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertRestaurantQuoteSchema = createInsertSchema(restaurantQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertTruckingQuoteSchema = createInsertSchema(truckingQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertWorkersCompQuoteSchema = createInsertSchema(workersCompQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertManagementLiabilityQuoteSchema = createInsertSchema(managementLiabilityQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertCommercialPackageQuoteSchema = createInsertSchema(commercialPackageQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertLimousineQuoteSchema = createInsertSchema(limousineQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertPublicTransportationQuoteSchema = createInsertSchema(publicTransportationQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertTaxiBlackCarQuoteSchema = createInsertSchema(taxiBlackCarQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertQuickQuoteSchema = createInsertSchema(quickQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
  lastLoginAt: true,
});

export const insertSubmissionStatusHistorySchema = createInsertSchema(submissionStatusHistory).omit({
  id: true,
  createdAt: true,
});

export const insertNemtApplicationSchema = createInsertSchema(nemtApplications).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertAmbulanceApplicationSchema = createInsertSchema(ambulanceApplications).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertTncApplicationSchema = createInsertSchema(tncApplications).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertApplicationFileSchema = createInsertSchema(applicationFiles).omit({
  id: true,
  uploadedAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  publishedAt: true,
});

export const updateBlogPostSchema = insertBlogPostSchema.partial();

export const insertPressReleaseSchema = createInsertSchema(pressReleases).omit({
  id: true,
  createdAt: true,
  publishedAt: true,
});

export const updatePressReleaseSchema = insertPressReleaseSchema.partial();

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  subscribedAt: true,
});

export const insertPersonalLinesQuoteSchema = createInsertSchema(personalLinesQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertHighValueHomeQuoteSchema = createInsertSchema(highValueHomeQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertCommercialFloodQuoteSchema = createInsertSchema(commercialFloodQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertCommercialEarthquakeQuoteSchema = createInsertSchema(commercialEarthquakeQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertFranchisedDealerQuoteSchema = createInsertSchema(franchisedDealerQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertGarageServiceQuoteSchema = createInsertSchema(garageServiceQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertAutoDealerGarageQuoteSchema = createInsertSchema(autoDealerGarageQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertGolfCountryClubQuoteSchema = createInsertSchema(golfCountryClubQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertCommercialPropertyQuoteSchema = createInsertSchema(commercialPropertyQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertConstructionCasualtyQuoteSchema = createInsertSchema(constructionCasualtyQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertCyberLiabilityQuoteSchema = createInsertSchema(cyberLiabilityQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertEmploymentPracticesQuoteSchema = createInsertSchema(employmentPracticesQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertProfessionalLiabilityQuoteSchema = createInsertSchema(professionalLiabilityQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertReligiousOrgQuoteSchema = createInsertSchema(religiousOrgQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertTncQuoteSchema = createInsertSchema(tncQuotes).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
});

export const insertCmsPageSchema = createInsertSchema(cmsPages)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    publishedAt: true,
  })
  .extend({
    slug: z.string().optional(),
  });

export const updateCmsPageSchema = insertCmsPageSchema.partial();

export const insertCmsMenuItemSchema = createInsertSchema(cmsMenuItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCmsMenuItemSchema = insertCmsMenuItemSchema.partial();

export const insertCmsMediaSchema = createInsertSchema(cmsMedia).omit({
  id: true,
  createdAt: true,
});

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertOceanCargoQuote = z.infer<typeof insertOceanCargoQuoteSchema>;
export type OceanCargoQuote = typeof oceanCargoQuotes.$inferSelect;
export type InsertSelfStorageQuote = z.infer<typeof insertSelfStorageQuoteSchema>;
export type SelfStorageQuote = typeof selfStorageQuotes.$inferSelect;
export type InsertFilmProductionQuote = z.infer<typeof insertFilmProductionQuoteSchema>;
export type FilmProductionQuote = typeof filmProductionQuotes.$inferSelect;
export type InsertProductLiabilityQuote = z.infer<typeof insertProductLiabilityQuoteSchema>;
export type ProductLiabilityQuote = typeof productLiabilityQuotes.$inferSelect;
export type InsertSecurityServicesQuote = z.infer<typeof insertSecurityServicesQuoteSchema>;
export type SecurityServicesQuote = typeof securityServicesQuotes.$inferSelect;
export type InsertViolentAttackQuote = z.infer<typeof insertViolentAttackQuoteSchema>;
export type ViolentAttackQuote = typeof violentAttackQuotes.$inferSelect;
export type InsertBuildersRiskQuote = z.infer<typeof insertBuildersRiskQuoteSchema>;
export type BuildersRiskQuote = typeof buildersRiskQuotes.$inferSelect;
export type InsertVacantBuildingQuote = z.infer<typeof insertVacantBuildingQuoteSchema>;
export type VacantBuildingQuote = typeof vacantBuildingQuotes.$inferSelect;
export type InsertCraneRiggersQuote = z.infer<typeof insertCraneRiggersQuoteSchema>;
export type CraneRiggersQuote = typeof craneRiggersQuotes.$inferSelect;
export type InsertCommercialAutoQuote = z.infer<typeof insertCommercialAutoQuoteSchema>;
export type CommercialAutoQuote = typeof commercialAutoQuotes.$inferSelect;
export type InsertGeneralLiabilityQuote = z.infer<typeof insertGeneralLiabilityQuoteSchema>;
export type GeneralLiabilityQuote = typeof generalLiabilityQuotes.$inferSelect;
export type InsertHabitationalQuote = z.infer<typeof insertHabitationalQuoteSchema>;
export type HabitationalQuote = typeof habitationalQuotes.$inferSelect;
export type InsertOfficeQuote = z.infer<typeof insertOfficeQuoteSchema>;
export type OfficeQuote = typeof officeQuotes.$inferSelect;
export type InsertHotelQuote = z.infer<typeof insertHotelQuoteSchema>;
export type HotelQuote = typeof hotelQuotes.$inferSelect;
export type InsertRestaurantQuote = z.infer<typeof insertRestaurantQuoteSchema>;
export type RestaurantQuote = typeof restaurantQuotes.$inferSelect;
export type InsertTruckingQuote = z.infer<typeof insertTruckingQuoteSchema>;
export type TruckingQuote = typeof truckingQuotes.$inferSelect;
export type InsertWorkersCompQuote = z.infer<typeof insertWorkersCompQuoteSchema>;
export type WorkersCompQuote = typeof workersCompQuotes.$inferSelect;
export type InsertManagementLiabilityQuote = z.infer<typeof insertManagementLiabilityQuoteSchema>;
export type ManagementLiabilityQuote = typeof managementLiabilityQuotes.$inferSelect;
export type InsertCommercialPackageQuote = z.infer<typeof insertCommercialPackageQuoteSchema>;
export type CommercialPackageQuote = typeof commercialPackageQuotes.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;
export type InsertSubmissionStatusHistory = z.infer<typeof insertSubmissionStatusHistorySchema>;
export type SubmissionStatusHistory = typeof submissionStatusHistory.$inferSelect;
export type InsertNemtApplication = z.infer<typeof insertNemtApplicationSchema>;
export type NemtApplication = typeof nemtApplications.$inferSelect;
export type InsertAmbulanceApplication = z.infer<typeof insertAmbulanceApplicationSchema>;
export type AmbulanceApplication = typeof ambulanceApplications.$inferSelect;
export type InsertTncApplication = z.infer<typeof insertTncApplicationSchema>;
export type TncApplication = typeof tncApplications.$inferSelect;
export type InsertLimousineQuote = z.infer<typeof insertLimousineQuoteSchema>;
export type LimousineQuote = typeof limousineQuotes.$inferSelect;
export type InsertPublicTransportationQuote = z.infer<typeof insertPublicTransportationQuoteSchema>;
export type PublicTransportationQuote = typeof publicTransportationQuotes.$inferSelect;
export type InsertTaxiBlackCarQuote = z.infer<typeof insertTaxiBlackCarQuoteSchema>;
export type TaxiBlackCarQuote = typeof taxiBlackCarQuotes.$inferSelect;
export type InsertQuickQuote = z.infer<typeof insertQuickQuoteSchema>;
export type QuickQuote = typeof quickQuotes.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertApplicationFile = z.infer<typeof insertApplicationFileSchema>;
export type ApplicationFile = typeof applicationFiles.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertPressRelease = z.infer<typeof insertPressReleaseSchema>;
export type PressRelease = typeof pressReleases.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertPersonalLinesQuote = z.infer<typeof insertPersonalLinesQuoteSchema>;
export type PersonalLinesQuote = typeof personalLinesQuotes.$inferSelect;
export type InsertHighValueHomeQuote = z.infer<typeof insertHighValueHomeQuoteSchema>;
export type HighValueHomeQuote = typeof highValueHomeQuotes.$inferSelect;
export type InsertCommercialFloodQuote = z.infer<typeof insertCommercialFloodQuoteSchema>;
export type CommercialFloodQuote = typeof commercialFloodQuotes.$inferSelect;
export type InsertCommercialEarthquakeQuote = z.infer<typeof insertCommercialEarthquakeQuoteSchema>;
export type CommercialEarthquakeQuote = typeof commercialEarthquakeQuotes.$inferSelect;
export type InsertFranchisedDealerQuote = z.infer<typeof insertFranchisedDealerQuoteSchema>;
export type FranchisedDealerQuote = typeof franchisedDealerQuotes.$inferSelect;
export type InsertGarageServiceQuote = z.infer<typeof insertGarageServiceQuoteSchema>;
export type GarageServiceQuote = typeof garageServiceQuotes.$inferSelect;
export type InsertAutoDealerGarageQuote = z.infer<typeof insertAutoDealerGarageQuoteSchema>;
export type AutoDealerGarageQuote = typeof autoDealerGarageQuotes.$inferSelect;
export type InsertGolfCountryClubQuote = z.infer<typeof insertGolfCountryClubQuoteSchema>;
export type GolfCountryClubQuote = typeof golfCountryClubQuotes.$inferSelect;
export type InsertCommercialPropertyQuote = z.infer<typeof insertCommercialPropertyQuoteSchema>;
export type CommercialPropertyQuote = typeof commercialPropertyQuotes.$inferSelect;
export type InsertConstructionCasualtyQuote = z.infer<typeof insertConstructionCasualtyQuoteSchema>;
export type ConstructionCasualtyQuote = typeof constructionCasualtyQuotes.$inferSelect;
export type InsertCyberLiabilityQuote = z.infer<typeof insertCyberLiabilityQuoteSchema>;
export type CyberLiabilityQuote = typeof cyberLiabilityQuotes.$inferSelect;
export type InsertEmploymentPracticesQuote = z.infer<typeof insertEmploymentPracticesQuoteSchema>;
export type EmploymentPracticesQuote = typeof employmentPracticesQuotes.$inferSelect;
export type InsertProfessionalLiabilityQuote = z.infer<typeof insertProfessionalLiabilityQuoteSchema>;
export type ProfessionalLiabilityQuote = typeof professionalLiabilityQuotes.$inferSelect;
export type InsertReligiousOrgQuote = z.infer<typeof insertReligiousOrgQuoteSchema>;
export type ReligiousOrgQuote = typeof religiousOrgQuotes.$inferSelect;
export type InsertTncQuote = z.infer<typeof insertTncQuoteSchema>;
export type TncQuote = typeof tncQuotes.$inferSelect;
export type InsertCmsPage = z.infer<typeof insertCmsPageSchema>;
export type UpdateCmsPage = z.infer<typeof updateCmsPageSchema>;
export type CmsPage = typeof cmsPages.$inferSelect;
export type InsertCmsMenuItem = z.infer<typeof insertCmsMenuItemSchema>;
export type UpdateCmsMenuItem = z.infer<typeof updateCmsMenuItemSchema>;
export type CmsMenuItem = typeof cmsMenuItems.$inferSelect;
export type InsertCmsMedia = z.infer<typeof insertCmsMediaSchema>;
export type CmsMedia = typeof cmsMedia.$inferSelect;
