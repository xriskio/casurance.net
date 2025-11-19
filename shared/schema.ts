import { pgTable, text, varchar, timestamp, json, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quoteRequests = pgTable("quote_requests", {
  id: varchar("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
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
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  insuranceType: text("insurance_type").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactRequests = pgTable("contact_requests", {
  id: varchar("id").primaryKey(),
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

export const highValueHomeQuotes = pgTable("high_value_home_quotes", {
  id: varchar("id").primaryKey(),
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

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequests).omit({
  id: true,
  createdAt: true,
});

export const insertOceanCargoQuoteSchema = createInsertSchema(oceanCargoQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertSelfStorageQuoteSchema = createInsertSchema(selfStorageQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertFilmProductionQuoteSchema = createInsertSchema(filmProductionQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertProductLiabilityQuoteSchema = createInsertSchema(productLiabilityQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertSecurityServicesQuoteSchema = createInsertSchema(securityServicesQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertLimousineQuoteSchema = createInsertSchema(limousineQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertPublicTransportationQuoteSchema = createInsertSchema(publicTransportationQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertTaxiBlackCarQuoteSchema = createInsertSchema(taxiBlackCarQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertQuickQuoteSchema = createInsertSchema(quickQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({
  id: true,
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
  createdAt: true,
});

export const insertAmbulanceApplicationSchema = createInsertSchema(ambulanceApplications).omit({
  id: true,
  createdAt: true,
});

export const insertTncApplicationSchema = createInsertSchema(tncApplications).omit({
  id: true,
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

export const insertHighValueHomeQuoteSchema = createInsertSchema(highValueHomeQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertCommercialFloodQuoteSchema = createInsertSchema(commercialFloodQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertCommercialEarthquakeQuoteSchema = createInsertSchema(commercialEarthquakeQuotes).omit({
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
export type InsertHighValueHomeQuote = z.infer<typeof insertHighValueHomeQuoteSchema>;
export type HighValueHomeQuote = typeof highValueHomeQuotes.$inferSelect;
export type InsertCommercialFloodQuote = z.infer<typeof insertCommercialFloodQuoteSchema>;
export type CommercialFloodQuote = typeof commercialFloodQuotes.$inferSelect;
export type InsertCommercialEarthquakeQuote = z.infer<typeof insertCommercialEarthquakeQuoteSchema>;
export type CommercialEarthquakeQuote = typeof commercialEarthquakeQuotes.$inferSelect;
