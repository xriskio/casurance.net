import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
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

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertOceanCargoQuote = z.infer<typeof insertOceanCargoQuoteSchema>;
export type OceanCargoQuote = typeof oceanCargoQuotes.$inferSelect;
