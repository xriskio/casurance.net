import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, insertServiceRequestSchema, insertOceanCargoQuoteSchema, insertSelfStorageQuoteSchema, insertFilmProductionQuoteSchema, insertProductLiabilityQuoteSchema, insertSecurityServicesQuoteSchema, insertNemtApplicationSchema, insertAmbulanceApplicationSchema, insertTncApplicationSchema, insertLimousineQuoteSchema, insertPublicTransportationQuoteSchema } from "@shared/schema";
import { registerAgentRoutes } from "./routes/agent";
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, Excel, and CSV files are allowed."));
  }
};

const upload = multer({
  storage: uploadStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

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

  // Security Services Quotes
  app.post("/api/security-services-quotes", async (req, res) => {
    try {
      const validatedData = insertSecurityServicesQuoteSchema.parse(req.body);
      const quote = await storage.createSecurityServicesQuote(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // NEMT Applications with file uploads
  app.post("/api/nemt-applications", upload.fields([
    { name: "vehicleList", maxCount: 1 },
    { name: "driverList", maxCount: 1 },
    { name: "lossRuns", maxCount: 1 }
  ]), async (req, res) => {
    try {
      const applicationData = JSON.parse(req.body.applicationData);
      const validatedData = insertNemtApplicationSchema.parse(applicationData);
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const application = await storage.createNemtApplication(validatedData, files);
      
      res.json(application);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Ambulance Applications with file uploads
  app.post("/api/ambulance-applications", upload.fields([
    { name: "vehicleList", maxCount: 1 },
    { name: "driverList", maxCount: 1 },
    { name: "lossRuns", maxCount: 1 }
  ]), async (req, res) => {
    try {
      const applicationData = JSON.parse(req.body.applicationData);
      const validatedData = insertAmbulanceApplicationSchema.parse(applicationData);
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const application = await storage.createAmbulanceApplication(validatedData, files);
      
      res.json(application);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // TNC/Rideshare Applications with file uploads
  app.post("/api/tnc-applications", upload.fields([
    { name: "termsOfService", maxCount: 1 },
    { name: "financialStatements", maxCount: 1 },
    { name: "lossRuns", maxCount: 1 },
    { name: "vehicleSchedule", maxCount: 1 }
  ]), async (req, res) => {
    try {
      const applicationData = JSON.parse(req.body.applicationData);
      const validatedData = insertTncApplicationSchema.parse(applicationData);
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const application = await storage.createTncApplication(validatedData, files);
      
      res.json(application);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Limousine Quotes
  app.post("/api/limousine-quotes", async (req, res) => {
    try {
      const validatedData = insertLimousineQuoteSchema.parse(req.body);
      const quote = await storage.createLimousineQuote(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Public Transportation Quotes
  app.post("/api/public-transportation-quotes", async (req, res) => {
    try {
      const validatedData = insertPublicTransportationQuoteSchema.parse(req.body);
      const quote = await storage.createPublicTransportationQuote(validatedData);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // File download endpoint for authenticated agents
  app.get("/api/files/:fileId", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const fileId = parseInt(req.params.fileId);
      const file = await storage.getApplicationFile(fileId);
      
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      
      const filePath = path.join(process.cwd(), "uploads", file.storedFilename);
      res.download(filePath, file.originalFilename);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error downloading file" });
    }
  });

  registerAgentRoutes(app);

  const httpServer = createServer(app);

  return httpServer;
}
