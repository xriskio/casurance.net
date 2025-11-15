import { quoteRequests, serviceRequests, oceanCargoQuotes, type InsertQuoteRequest, type QuoteRequest, type InsertServiceRequest, type ServiceRequest, type InsertOceanCargoQuote, type OceanCargoQuote } from "@shared/schema";
import { db } from "./db";
import { randomUUID } from "crypto";

export interface IStorage {
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  createServiceRequest(service: InsertServiceRequest): Promise<ServiceRequest>;
  createOceanCargoQuote(quote: InsertOceanCargoQuote): Promise<OceanCargoQuote>;
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
}

export const storage = new DatabaseStorage();
