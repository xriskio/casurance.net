import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, insertServiceRequestSchema, insertOceanCargoQuoteSchema, insertSelfStorageQuoteSchema, insertFilmProductionQuoteSchema, insertProductLiabilityQuoteSchema, insertSecurityServicesQuoteSchema, insertNemtApplicationSchema, insertAmbulanceApplicationSchema, insertTncApplicationSchema, insertLimousineQuoteSchema, insertPublicTransportationQuoteSchema, insertTaxiBlackCarQuoteSchema, insertQuickQuoteSchema, insertContactRequestSchema, insertBlogPostSchema, insertPressReleaseSchema, insertNewsletterSubscriptionSchema, insertHighValueHomeQuoteSchema, insertCommercialFloodQuoteSchema, insertCommercialEarthquakeQuoteSchema, insertFranchisedDealerQuoteSchema, insertGarageServiceQuoteSchema, insertAutoDealerGarageQuoteSchema, insertGolfCountryClubQuoteSchema } from "@shared/schema";
import { registerAgentRoutes } from "./routes/agent";
import { generateBlogPost, getCategories, getTopics, generateDraftContent, improveContent, suggestTags } from "./lib/ai-blog-generator";
import { generatePressRelease, getCategories as getPressCategories, getTopics as getPressTopics, getLocations, generateDraftContent as generatePressDraft, improveContent as improvePressContent, suggestTags as suggestPressTags } from "./lib/ai-press-release-generator";
import { generateReferenceNumber } from "./utils/referenceNumber";
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
      const referenceNumber = generateReferenceNumber('RFQ');
      const quote = await storage.createQuoteRequest({ ...validatedData, referenceNumber } as any);
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
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Contact Requests
  app.post("/api/contact-requests", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const request = await storage.createContactRequest(validatedData);
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
  app.post("/api/blog-posts/generate", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/blog-posts", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/blog-posts/ai-assist/draft", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/blog-posts/ai-assist/improve", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/blog-posts/ai-assist/tags", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/press-releases/generate", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/press-releases", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/press-releases/ai-assist/draft", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/press-releases/ai-assist/improve", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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
  app.post("/api/press-releases/ai-assist/tags", async (req, res) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
      }

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

  registerAgentRoutes(app);

  const httpServer = createServer(app);

  return httpServer;
}
