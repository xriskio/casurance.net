import { quoteRequests, serviceRequests, oceanCargoQuotes, selfStorageQuotes, filmProductionQuotes, productLiabilityQuotes, securityServicesQuotes, type InsertQuoteRequest, type QuoteRequest, type InsertServiceRequest, type ServiceRequest, type InsertOceanCargoQuote, type OceanCargoQuote, type InsertSelfStorageQuote, type SelfStorageQuote, type InsertFilmProductionQuote, type FilmProductionQuote, type InsertProductLiabilityQuote, type ProductLiabilityQuote, type InsertSecurityServicesQuote, type SecurityServicesQuote } from "@shared/schema";
import { db } from "./db";
import { randomUUID } from "crypto";

export interface IStorage {
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  createServiceRequest(service: InsertServiceRequest): Promise<ServiceRequest>;
  createOceanCargoQuote(quote: InsertOceanCargoQuote): Promise<OceanCargoQuote>;
  createSelfStorageQuote(quote: InsertSelfStorageQuote): Promise<SelfStorageQuote>;
  createFilmProductionQuote(quote: InsertFilmProductionQuote): Promise<FilmProductionQuote>;
  createProductLiabilityQuote(quote: InsertProductLiabilityQuote): Promise<ProductLiabilityQuote>;
  createSecurityServicesQuote(quote: InsertSecurityServicesQuote): Promise<SecurityServicesQuote>;
}

export class DatabaseStorage implements IStorage {
  async createQuoteRequest(insertQuote: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = randomUUID();
    const [quote] = await db
      .insert(quoteRequests)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createServiceRequest(insertService: InsertServiceRequest): Promise<ServiceRequest> {
    const id = randomUUID();
    const [service] = await db
      .insert(serviceRequests)
      .values({ ...insertService, id })
      .returning();
    return service;
  }

  async createOceanCargoQuote(insertQuote: InsertOceanCargoQuote): Promise<OceanCargoQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(oceanCargoQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createSelfStorageQuote(insertQuote: InsertSelfStorageQuote): Promise<SelfStorageQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(selfStorageQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createFilmProductionQuote(insertQuote: InsertFilmProductionQuote): Promise<FilmProductionQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(filmProductionQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createProductLiabilityQuote(insertQuote: InsertProductLiabilityQuote): Promise<ProductLiabilityQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(productLiabilityQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createSecurityServicesQuote(insertQuote: InsertSecurityServicesQuote): Promise<SecurityServicesQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(securityServicesQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }
}

export const storage = new DatabaseStorage();
