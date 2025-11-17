import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, insertServiceRequestSchema, insertOceanCargoQuoteSchema, insertSelfStorageQuoteSchema, insertFilmProductionQuoteSchema, insertProductLiabilityQuoteSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote Requests
  app.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quote = await storage.createQuoteRequest(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Service Requests
  app.post("/api/service-requests", async (req, res) => {
    try {
      const validatedData = insertServiceRequestSchema.parse(req.body);
      const service = await storage.createServiceRequest(validatedData);
      res.json(service);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Ocean Cargo Quotes
  app.post("/api/ocean-cargo-quotes", async (req, res) => {
    try {
      const validatedData = insertOceanCargoQuoteSchema.parse(req.body);
      const quote = await storage.createOceanCargoQuote(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Self Storage Quotes
  app.post("/api/self-storage-quotes", async (req, res) => {
    try {
      const validatedData = insertSelfStorageQuoteSchema.parse(req.body);
      const quote = await storage.createSelfStorageQuote(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Film Production Quotes
  app.post("/api/film-production-quotes", async (req, res) => {
    try {
      const validatedData = insertFilmProductionQuoteSchema.parse(req.body);
      const quote = await storage.createFilmProductionQuote(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Product Liability Quotes
  app.post("/api/product-liability-quotes", async (req, res) => {
    try {
      const validatedData = insertProductLiabilityQuoteSchema.parse(req.body);
      const quote = await storage.createProductLiabilityQuote(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
