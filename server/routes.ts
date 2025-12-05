import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { requireAgent } from "./auth/middleware";
import { insertQuoteRequestSchema, insertServiceRequestSchema, insertOceanCargoQuoteSchema, insertSelfStorageQuoteSchema, insertFilmProductionQuoteSchema, insertProductLiabilityQuoteSchema, insertSecurityServicesQuoteSchema, insertBuildersRiskQuoteSchema, insertVacantBuildingQuoteSchema, insertCraneRiggersQuoteSchema, insertCommercialAutoQuoteSchema, insertGeneralLiabilityQuoteSchema, insertHabitationalQuoteSchema, insertHotelQuoteSchema, insertRestaurantQuoteSchema, insertTruckingQuoteSchema, insertWorkersCompQuoteSchema, insertManagementLiabilityQuoteSchema, insertCommercialPackageQuoteSchema, insertNemtApplicationSchema, insertAmbulanceApplicationSchema, insertTncApplicationSchema, insertLimousineQuoteSchema, insertPublicTransportationQuoteSchema, insertTaxiBlackCarQuoteSchema, insertQuickQuoteSchema, insertContactRequestSchema, insertBlogPostSchema, insertPressReleaseSchema, insertNewsletterSubscriptionSchema, insertHighValueHomeQuoteSchema, insertCommercialFloodQuoteSchema, insertCommercialEarthquakeQuoteSchema, insertFranchisedDealerQuoteSchema, insertGarageServiceQuoteSchema, insertAutoDealerGarageQuoteSchema, insertGolfCountryClubQuoteSchema, insertCommercialPropertyQuoteSchema, insertConstructionCasualtyQuoteSchema, insertCyberLiabilityQuoteSchema, insertEmploymentPracticesQuoteSchema, insertProfessionalLiabilityQuoteSchema, insertReligiousOrgQuoteSchema, insertTncQuoteSchema, insertPersonalLinesQuoteSchema } from "@shared/schema";
import { registerAgentRoutes } from "./routes/agent";
import { registerCmsRoutes } from "./routes/cms";
import sitemapRouter from "./routes/sitemap";
import { generateBlogPost, getCategories, getTopics, generateDraftContent, improveContent, suggestTags } from "./lib/ai-blog-generator";
import { generatePressRelease, getCategories as getPressCategories, getTopics as getPressTopics, getLocations, generateDraftContent as generatePressDraft, improveContent as improvePressContent, suggestTags as suggestPressTags } from "./lib/ai-press-release-generator";
import { generateReferenceNumber } from "./utils/referenceNumber";
import { sendQuoteConfirmationEmail, sendServiceRequestConfirmationEmail, sendAgentQuoteNotification, sendAgentServiceNotification } from "./services/emailService";
import { getRedirectUrl } from "./redirects";
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
  // SEO Redirect Middleware - Handle old casurance.com URLs with 301 redirects
  app.use((req, res, next) => {
    const lowerPath = req.path.toLowerCase();
    if (lowerPath.startsWith('/api/') || lowerPath.startsWith('/assets/')) {
      return next();
    }
    
    const redirectUrl = getRedirectUrl(req.path);
    if (redirectUrl && redirectUrl !== lowerPath) {
      const queryString = req.url.slice(req.path.length);
      return res.redirect(301, redirectUrl + queryString);
    }
    next();
  });

  // Quote Requests
  app.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createQuoteRequest({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.businessName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: validatedData.insuranceType
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Service Requests
  app.post("/api/service-requests", async (req, res) => {
    try {
      const validatedData = insertServiceRequestSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('SRQ');
      const service = await storage.createServiceRequest({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.businessName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        requestType: validatedData.requestType,
        description: validatedData.description
      };
      
      sendServiceRequestConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentServiceNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(service);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Ocean Cargo Quotes
  app.post("/api/ocean-cargo-quotes", async (req, res) => {
    try {
      const validatedData = insertOceanCargoQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createOceanCargoQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.applicantName,
        contactName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone || '',
        insuranceType: 'Ocean Cargo Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Self Storage Quotes
  app.post("/api/self-storage-quotes", async (req, res) => {
    try {
      const validatedData = insertSelfStorageQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createSelfStorageQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Self Storage Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Film Production Quotes
  app.post("/api/film-production-quotes", async (req, res) => {
    try {
      const validatedData = insertFilmProductionQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createFilmProductionQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.applicantName,
        contactName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Film Production Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Product Liability Quotes
  app.post("/api/product-liability-quotes", async (req, res) => {
    try {
      const validatedData = insertProductLiabilityQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createProductLiabilityQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Product Liability Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Security Services Quotes
  app.post("/api/security-services-quotes", async (req, res) => {
    try {
      const validatedData = insertSecurityServicesQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createSecurityServicesQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Security Services Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Builders Risk Quotes
  app.post("/api/builders-risk-quotes", async (req, res) => {
    try {
      const validatedData = insertBuildersRiskQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createBuildersRiskQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Builders Risk Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Vacant Building Quotes
  app.post("/api/vacant-building-quotes", async (req, res) => {
    try {
      const validatedData = insertVacantBuildingQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createVacantBuildingQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Vacant Building Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Crane & Riggers Quotes
  app.post("/api/crane-riggers-quotes", async (req, res) => {
    try {
      const validatedData = insertCraneRiggersQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createCraneRiggersQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Crane & Riggers Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Commercial Auto Quotes
  app.post("/api/commercial-auto-quotes", async (req, res) => {
    try {
      const validatedData = insertCommercialAutoQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createCommercialAutoQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.insuredName,
        contactName: validatedData.insuredName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Commercial Auto Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // General Liability Quotes
  app.post("/api/general-liability-quotes", async (req, res) => {
    try {
      const validatedData = insertGeneralLiabilityQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createGeneralLiabilityQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.businessName,
        contactName: validatedData.businessName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'General Liability Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Habitational Quotes
  app.post("/api/habitational-quotes", async (req, res) => {
    try {
      const validatedData = insertHabitationalQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createHabitationalQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Habitational Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Hotel Quotes
  app.post("/api/hotel-quotes", async (req, res) => {
    try {
      const validatedData = insertHotelQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createHotelQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Hotel Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Restaurant Quotes
  app.post("/api/restaurant-quotes", async (req, res) => {
    try {
      const validatedData = insertRestaurantQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createRestaurantQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.restaurantName,
        contactName: validatedData.restaurantName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Restaurant Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Trucking Quotes
  app.post("/api/trucking-quotes", async (req, res) => {
    try {
      const validatedData = insertTruckingQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createTruckingQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: validatedData.companyName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Trucking Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Workers Comp Quotes
  app.post("/api/workers-comp-quotes", async (req, res) => {
    try {
      const validatedData = insertWorkersCompQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createWorkersCompQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.businessName,
        contactName: validatedData.businessName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Workers Compensation Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Management Liability Quotes
  app.post("/api/management-liability-quotes", async (req, res) => {
    try {
      const validatedData = insertManagementLiabilityQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createManagementLiabilityQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: validatedData.companyName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Management Liability Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Commercial Package Quotes
  app.post("/api/commercial-package-quotes", async (req, res) => {
    try {
      const validatedData = insertCommercialPackageQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createCommercialPackageQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.businessName,
        contactName: validatedData.businessName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Commercial Package Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
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
      const referenceNumber = generateReferenceNumber('RFQ');
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const application = await storage.createNemtApplication({ ...validatedData, referenceNumber } as any, files);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.businessName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'NEMT Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
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
      const referenceNumber = generateReferenceNumber('RFQ');
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const application = await storage.createAmbulanceApplication({ ...validatedData, referenceNumber } as any, files);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.businessName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Ambulance Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
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
      const referenceNumber = generateReferenceNumber('RFQ');
      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const application = await storage.createTncApplication({ ...validatedData, referenceNumber } as any, files);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: validatedData.contactName,
        email: validatedData.contactEmail,
        phone: validatedData.contactPhone,
        insuranceType: 'TNC/Rideshare Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(application);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Limousine Quotes
  app.post("/api/limousine-quotes", async (req, res) => {
    try {
      const validatedData = insertLimousineQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createLimousineQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: validatedData.contactPerson,
        email: validatedData.email,
        phone: validatedData.businessPhone,
        insuranceType: 'Limousine Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Public Transportation Quotes
  app.post("/api/public-transportation-quotes", async (req, res) => {
    try {
      const validatedData = insertPublicTransportationQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createPublicTransportationQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: validatedData.companyName,
        email: validatedData.contactEmail,
        phone: validatedData.contactPhone,
        insuranceType: 'Public Transportation Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Taxi/Black Car Quotes
  app.post("/api/taxi-quote", async (req, res) => {
    try {
      const validatedData = insertTaxiBlackCarQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createTaxiBlackCarQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: validatedData.contactPerson,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Taxi/Black Car Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Quick Quotes
  app.post("/api/quick-quote", async (req, res) => {
    try {
      const validatedData = insertQuickQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createQuickQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.name,
        contactName: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Quick Quote'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Contact Requests
  app.post("/api/contact-requests", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('SRQ');
      const request = await storage.createContactRequest({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.businessName || validatedData.contactName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        requestType: 'Contact Request',
        description: validatedData.message || ''
      };
      
      sendServiceRequestConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentServiceNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(request);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // High Value Home Quotes
  app.post("/api/high-value-home-quotes", async (req, res) => {
    try {
      const validatedData = insertHighValueHomeQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createHighValueHomeQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.primaryNamedInsured,
        contactName: validatedData.primaryNamedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'High Value Home Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Commercial Flood Quotes
  app.post("/api/commercial-flood-quotes", async (req, res) => {
    try {
      const validatedData = insertCommercialFloodQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createCommercialFloodQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Commercial Flood Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Commercial Earthquake Quotes
  app.post("/api/commercial-earthquake-quotes", async (req, res) => {
    try {
      const validatedData = insertCommercialEarthquakeQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createCommercialEarthquakeQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.namedInsured,
        contactName: validatedData.namedInsured,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Commercial Earthquake Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Franchised Dealer Quotes
  app.post("/api/franchised-dealer-quotes", async (req, res) => {
    try {
      const validatedData = insertFranchisedDealerQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createFranchisedDealerQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.applicantName,
        contactName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Franchised Dealer Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Garage Service Quotes
  app.post("/api/garage-service-quotes", async (req, res) => {
    try {
      const validatedData = insertGarageServiceQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createGarageServiceQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.applicantName,
        contactName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Garage Service Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Auto Dealer/Garage Quotes (Comprehensive K2 Form)
  app.post("/api/auto-dealer-garage-quotes", async (req, res) => {
    try {
      const validatedData = insertAutoDealerGarageQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createAutoDealerGarageQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.applicantName,
        contactName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Auto Dealer/Garage Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Golf & Country Club Quotes
  app.post("/api/golf-country-club-quotes", async (req, res) => {
    try {
      const validatedData = insertGolfCountryClubQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createGolfCountryClubQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.clubName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Golf & Country Club Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Commercial Property Quotes
  app.post("/api/commercial-property-quotes", async (req, res) => {
    try {
      const validatedData = insertCommercialPropertyQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createCommercialPropertyQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.applicantName,
        contactName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Commercial Property Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Construction Casualty Quotes
  app.post("/api/construction-casualty-quotes", async (req, res) => {
    try {
      const validatedData = insertConstructionCasualtyQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createConstructionCasualtyQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.applicantName,
        contactName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Construction Casualty Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Cyber Liability Quotes
  app.post("/api/cyber-liability-quotes", async (req, res) => {
    try {
      const validatedData = insertCyberLiabilityQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createCyberLiabilityQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: validatedData.companyName,
        email: validatedData.email,
        phone: validatedData.phone || '',
        insuranceType: 'Cyber Liability Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Employment Practices Quotes
  app.post("/api/employment-practices-quotes", async (req, res) => {
    try {
      const validatedData = insertEmploymentPracticesQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createEmploymentPracticesQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: validatedData.companyName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Employment Practices Liability Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Professional Liability Quotes
  app.post("/api/professional-liability-quotes", async (req, res) => {
    try {
      const validatedData = insertProfessionalLiabilityQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createProfessionalLiabilityQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.firmName,
        contactName: validatedData.firmName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Professional Liability Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Religious Organization Quotes
  app.post("/api/religious-org-quotes", async (req, res) => {
    try {
      const validatedData = insertReligiousOrgQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createReligiousOrgQuote({ ...validatedData, referenceNumber } as any);
      
      const emailData = {
        referenceNumber,
        businessName: validatedData.applicantName,
        contactName: validatedData.applicantName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'Religious Organization Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // TNC / Shared Economy Quotes
  app.post("/api/tnc-quotes", async (req, res) => {
    try {
      const validatedData = insertTncQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createTncQuote({ ...validatedData, referenceNumber } as any);
      
      const contactName = (validatedData.payload as any)?.contactName || validatedData.companyName;
      const emailData = {
        referenceNumber,
        businessName: validatedData.companyName,
        contactName: contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: 'TNC / Shared Economy Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Personal Lines Quotes
  app.post("/api/personal-lines-quotes", async (req, res) => {
    try {
      const validatedData = insertPersonalLinesQuoteSchema.parse(req.body);
      const referenceNumber = generateReferenceNumber('PLQ');
      const quote = await storage.createPersonalLinesQuote({ ...validatedData, referenceNumber } as any);
      
      const coverageTypeLabels: Record<string, string> = {
        'personal-auto': 'Personal Auto Insurance',
        'homeowners': 'Homeowners Insurance',
        'landlord-protector': 'Landlord/Rental Property Insurance',
        'high-value-home': 'High Value Home Insurance',
        'wildfire-brush-area': 'Wildfire & Brush Area Home Insurance',
        'residential-earthquake': 'Residential Earthquake Insurance'
      };
      
      const emailData = {
        referenceNumber,
        businessName: `${validatedData.firstName} ${validatedData.lastName}`,
        contactName: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        phone: validatedData.phone,
        insuranceType: coverageTypeLabels[validatedData.coverageType] || 'Personal Lines Insurance'
      };
      
      sendQuoteConfirmationEmail(emailData).catch(err => console.error('Failed to send confirmation email:', err));
      sendAgentQuoteNotification(emailData).catch(err => console.error('Failed to send agent notification:', err));
      
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Blog Posts - List all or filter by category/search
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      const posts = await storage.getBlogPosts(category, search);
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching blog posts" });
    }
  });

  // Blog Post - Get by slug
  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching blog post" });
    }
  });

  // Generate AI blog post (authenticated agents only)
  app.post("/api/blog-posts/generate", requireAgent, async (req, res) => {
    try {
      const { topic, category } = req.body;
      const generatedContent = await generateBlogPost(topic, category);
      
      const post = await storage.createBlogPost({
        ...generatedContent,
        isAiGenerated: "true",
        author: "Casurance Team"
      });
      
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error generating blog post" });
    }
  });

  // Get blog categories
  app.get("/api/blog-categories", async (req, res) => {
    try {
      const categories = getCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching categories" });
    }
  });

  // Get blog topics (for agent portal topic selection)
  app.get("/api/blog-topics", async (req, res) => {
    try {
      const topics = getTopics();
      res.json(topics);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching topics" });
    }
  });

  // Create manual blog post (authenticated agents only)
  app.post("/api/blog-posts", requireAgent, async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid blog post data", 
          errors: result.error.errors 
        });
      }

      const post = await storage.createBlogPost({
        ...result.data,
        isAiGenerated: "false",
        author: "Casurance Team"
      });

      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error creating blog post" });
    }
  });

  // AI Assist: Generate draft content (authenticated agents only)
  app.post("/api/blog-posts/ai-assist/draft", requireAgent, async (req, res) => {
    try {
      const { title, category } = req.body;
      
      if (!title || !category) {
        return res.status(400).json({ message: "Title and category are required" });
      }

      const draft = await generateDraftContent(title, category);
      res.json(draft);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error generating draft content" });
    }
  });

  // AI Assist: Improve content (authenticated agents only)
  app.post("/api/blog-posts/ai-assist/improve", requireAgent, async (req, res) => {
    try {
      const { content, category } = req.body;
      
      if (!content || !category) {
        return res.status(400).json({ message: "Content and category are required" });
      }

      const improved = await improveContent(content, category);
      res.json(improved);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error improving content" });
    }
  });

  // AI Assist: Suggest tags (authenticated agents only)
  app.post("/api/blog-posts/ai-assist/tags", requireAgent, async (req, res) => {
    try {
      const { title, content, category } = req.body;
      
      if (!title && !content) {
        return res.status(400).json({ message: "Title or content is required" });
      }

      const tags = await suggestTags(title || "", content || "", category || "");
      res.json(tags);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error suggesting tags" });
    }
  });

  // Press Releases - List all
  app.get("/api/press-releases", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      const releases = await storage.getPressReleases(category, search);
      res.json(releases);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching press releases" });
    }
  });

  // Press Release - Get by slug
  app.get("/api/press-releases/:slug", async (req, res) => {
    try {
      const release = await storage.getPressReleaseBySlug(req.params.slug);
      if (!release) {
        return res.status(404).json({ message: "Press release not found" });
      }
      res.json(release);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching press release" });
    }
  });

  // Generate AI press release (authenticated agents only)
  app.post("/api/press-releases/generate", requireAgent, async (req, res) => {
    try {
      const { topic, category, location } = req.body;
      const generatedContent = await generatePressRelease(topic, category, location);
      
      const release = await storage.createPressRelease({
        ...generatedContent,
        isAiGenerated: "true"
      });
      
      res.json(release);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error generating press release" });
    }
  });

  // Get press release categories
  app.get("/api/press-categories", async (req, res) => {
    try {
      const categories = getPressCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching categories" });
    }
  });

  // Get press release topics (for agent portal topic selection)
  app.get("/api/press-topics", async (req, res) => {
    try {
      const topics = getPressTopics();
      res.json(topics);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching topics" });
    }
  });

  // Get press release locations
  app.get("/api/press-locations", async (req, res) => {
    try {
      const locations = getLocations();
      res.json(locations);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching locations" });
    }
  });

  // Create manual press release (authenticated agents only)
  app.post("/api/press-releases", requireAgent, async (req, res) => {
    try {

      const result = insertPressReleaseSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid press release data", 
          errors: result.error.errors 
        });
      }

      const release = await storage.createPressRelease({
        ...result.data,
        isAiGenerated: "false"
      });

      res.json(release);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error creating press release" });
    }
  });

  // AI Assist: Generate draft content (authenticated agents only)
  app.post("/api/press-releases/ai-assist/draft", requireAgent, async (req, res) => {
    try {
      const { title, category, location } = req.body;
      
      if (!title || !category || !location) {
        return res.status(400).json({ message: "Title, category, and location are required" });
      }

      const draft = await generatePressDraft(title, category, location);
      res.json(draft);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error generating draft content" });
    }
  });

  // AI Assist: Improve content (authenticated agents only)
  app.post("/api/press-releases/ai-assist/improve", requireAgent, async (req, res) => {
    try {
      const { content, category } = req.body;
      
      if (!content || !category) {
        return res.status(400).json({ message: "Content and category are required" });
      }

      const improved = await improvePressContent(content, category);
      res.json(improved);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error improving content" });
    }
  });

  // AI Assist: Suggest tags (authenticated agents only)
  app.post("/api/press-releases/ai-assist/tags", requireAgent, async (req, res) => {
    try {
      const { title, content, category } = req.body;
      
      if (!title && !content) {
        return res.status(400).json({ message: "Title or content is required" });
      }

      const tags = await suggestPressTags(title || "", content || "", category || "");
      res.json(tags);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error suggesting tags" });
    }
  });

  // Newsletter subscription (public endpoint)
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Valid email address is required" });
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address format" });
      }

      const unsubscribeToken = randomUUID();
      
      const subscription = await storage.createNewsletterSubscription({
        email: email.toLowerCase().trim(),
        status: "active",
        unsubscribeToken
      });
      
      res.json({ 
        message: "Successfully subscribed to newsletter",
        email: subscription.email
      });
    } catch (error: any) {
      // Handle unique constraint violation (duplicate email)
      if (error.code === '23505' || error.message?.includes('unique')) {
        return res.status(409).json({ message: "This email is already subscribed to our newsletter" });
      }
      res.status(500).json({ message: error.message || "Error subscribing to newsletter" });
    }
  });

  // Newsletter unsubscribe (public endpoint)
  app.post("/api/newsletter/unsubscribe/:token", async (req, res) => {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({ message: "Unsubscribe token is required" });
      }

      const subscription = await storage.unsubscribeNewsletter(token);
      
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found or already unsubscribed" });
      }
      
      res.json({ 
        message: "Successfully unsubscribed from newsletter",
        email: subscription.email
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error unsubscribing from newsletter" });
    }
  });

  // Get subscription status by token (public endpoint)
  app.get("/api/newsletter/subscription/:token", async (req, res) => {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({ message: "Token is required" });
      }

      const subscription = await storage.getNewsletterSubscriptionByToken(token);
      
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      
      res.json({ 
        email: subscription.email,
        status: subscription.status,
        subscribedAt: subscription.subscribedAt,
        unsubscribedAt: subscription.unsubscribedAt
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching subscription" });
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

  registerAgentRoutes(app, storage);
  registerCmsRoutes(app);
  
  // Register sitemap routes
  app.use(sitemapRouter);
  
  // Serve robots.txt from public directory
  app.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  const httpServer = createServer(app);

  return httpServer;
}
