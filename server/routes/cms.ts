import type { Express, Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import { db } from "../db";
import { cmsPages, cmsMenuItems, cmsMedia } from "../../shared/schema";
import {
  insertCmsPageSchema,
  updateCmsPageSchema,
  insertCmsMenuItemSchema,
  updateCmsMenuItemSchema,
  insertCmsMediaSchema,
} from "../../shared/schema";
import { eq, desc, asc } from "drizzle-orm";
import { generatePage } from "../services/pageGenerator";

// Authentication middleware for CMS routes
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized - Agent authentication required" });
}

// Configure multer for image uploads
const uploadDir = path.join(process.cwd(), "attached_assets", "uploads");

// Ensure upload directory exists
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."));
    }
  },
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function registerCmsRoutes(app: Express) {
  // ==================== CMS PAGES ====================

  // Get all pages (with optional filters)
  app.get("/api/cms/pages", async (req, res) => {
    try {
      const { published, search } = req.query;

      let query = db.select().from(cmsPages);

      const pages = await query;

      // Filter in memory (could be optimized with SQL WHERE clauses)
      let filteredPages = pages;

      if (published !== undefined) {
        const isPublished = published === "true";
        filteredPages = filteredPages.filter((p) => p.isPublished === (isPublished ? "true" : "false"));
      }

      if (search && typeof search === "string") {
        const searchLower = search.toLowerCase();
        filteredPages = filteredPages.filter(
          (p) =>
            p.title.toLowerCase().includes(searchLower) ||
            p.slug.toLowerCase().includes(searchLower) ||
            p.content.toLowerCase().includes(searchLower)
        );
      }

      // Sort by most recent first
      filteredPages.sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt;
        const dateB = b.updatedAt || b.createdAt;
        if (!dateA || !dateB) return 0;
        return dateB.getTime() - dateA.getTime();
      });

      res.json(filteredPages);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching pages" });
    }
  });

  // Get single page by ID
  app.get("/api/cms/pages/:id", async (req, res) => {
    try {
      const page = await db.select().from(cmsPages).where(eq(cmsPages.id, req.params.id)).limit(1);

      if (page.length === 0) {
        return res.status(404).json({ message: "Page not found" });
      }

      res.json(page[0]);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching page" });
    }
  });

  // Get single page by slug (for public display)
  app.get("/api/cms/pages/slug/:slug", async (req, res) => {
    try {
      const page = await db.select().from(cmsPages).where(eq(cmsPages.slug, req.params.slug)).limit(1);

      if (page.length === 0) {
        return res.status(404).json({ message: "Page not found" });
      }

      // Only return published pages for public access
      if (page[0].isPublished !== "true") {
        return res.status(404).json({ message: "Page not found" });
      }

      res.json(page[0]);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching page" });
    }
  });

  // Create new page (authenticated agents only)
  app.post("/api/cms/pages", ensureAuthenticated, async (req, res) => {
    try {
      const validatedData = insertCmsPageSchema.parse(req.body);

      // Generate slug if not provided
      const slug = validatedData.slug || slugify(validatedData.title);

      const id = randomUUID();
      const now = new Date();

      const newPage = await db
        .insert(cmsPages)
        .values({
          id,
          ...validatedData,
          slug,
          createdAt: now,
          updatedAt: now,
          publishedAt: validatedData.isPublished === "true" ? now : null,
        })
        .returning();

      res.json(newPage[0]);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Update page (authenticated agents only)
  app.patch("/api/cms/pages/:id", ensureAuthenticated, async (req, res) => {
    try {
      const validatedData = updateCmsPageSchema.parse(req.body);

      // If slug is being updated, slugify it
      if (validatedData.slug) {
        validatedData.slug = slugify(validatedData.slug);
      }

      const now = new Date();

      // If publishing, set publishedAt
      const updateData: any = {
        ...validatedData,
        updatedAt: now,
      };

      if (validatedData.isPublished === "true") {
        const existingPage = await db.select().from(cmsPages).where(eq(cmsPages.id, req.params.id)).limit(1);
        if (existingPage.length > 0 && existingPage[0].isPublished !== "true") {
          updateData.publishedAt = now;
        }
      }

      const updatedPage = await db.update(cmsPages).set(updateData).where(eq(cmsPages.id, req.params.id)).returning();

      if (updatedPage.length === 0) {
        return res.status(404).json({ message: "Page not found" });
      }

      res.json(updatedPage[0]);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Delete page (authenticated agents only)
  app.delete("/api/cms/pages/:id", ensureAuthenticated, async (req, res) => {
    try {
      const deletedPage = await db.delete(cmsPages).where(eq(cmsPages.id, req.params.id)).returning();

      if (deletedPage.length === 0) {
        return res.status(404).json({ message: "Page not found" });
      }

      res.json({ message: "Page deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error deleting page" });
    }
  });

  // Generate page with AI (authenticated agents only)
  app.post("/api/cms/pages/generate", ensureAuthenticated, async (req, res) => {
    try {
      const { topic, targetAudience, keywords, includeCallToAction } = req.body;

      if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
      }

      const generatedPage = await generatePage({
        topic,
        targetAudience,
        keywords,
        includeCallToAction,
      });

      // The generatePage function already returns sanitized/validated content
      // Create the page in the database with the validated content
      const id = randomUUID();
      const now = new Date();

      // Ensure unique slug by checking for existing pages
      let slug = generatedPage.slug;
      let counter = 1;
      while (true) {
        const existing = await db.select().from(cmsPages).where(eq(cmsPages.slug, slug)).limit(1);
        if (existing.length === 0) break;
        slug = `${generatedPage.slug}-${counter}`;
        counter++;
      }

      const newPage = await db
        .insert(cmsPages)
        .values({
          id,
          slug,
          title: generatedPage.title,
          metaDescription: generatedPage.metaDescription,
          content: generatedPage.content,
          isPublished: "false",
          isAiGenerated: "true",
          author: "Casurance Team",
          createdAt: now,
          updatedAt: now,
          publishedAt: null,
        })
        .returning();

      res.json(newPage[0]);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error generating page" });
    }
  });

  // ==================== MENU ITEMS ====================

  // Get all menu items
  app.get("/api/cms/menu-items", async (req, res) => {
    try {
      const { menuLocation, activeOnly } = req.query;

      let menuItems = await db.select().from(cmsMenuItems).orderBy(asc(cmsMenuItems.orderIndex));

      if (menuLocation && typeof menuLocation === "string") {
        menuItems = menuItems.filter((item) => item.menuLocation === menuLocation);
      }

      if (activeOnly === "true") {
        menuItems = menuItems.filter((item) => item.isActive === "true");
      }

      res.json(menuItems);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching menu items" });
    }
  });

  // Create menu item (authenticated agents only)
  app.post("/api/cms/menu-items", ensureAuthenticated, async (req, res) => {
    try {

      const validatedData = insertCmsMenuItemSchema.parse(req.body);

      const id = randomUUID();
      const now = new Date();

      const newMenuItem = await db
        .insert(cmsMenuItems)
        .values({
          id,
          ...validatedData,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      res.json(newMenuItem[0]);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Update menu item (authenticated agents only)
  app.patch("/api/cms/menu-items/:id", ensureAuthenticated, async (req, res) => {
    try {

      const validatedData = updateCmsMenuItemSchema.parse(req.body);

      const updatedMenuItem = await db
        .update(cmsMenuItems)
        .set({
          ...validatedData,
          updatedAt: new Date(),
        })
        .where(eq(cmsMenuItems.id, req.params.id))
        .returning();

      if (updatedMenuItem.length === 0) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      res.json(updatedMenuItem[0]);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Delete menu item (authenticated agents only)
  app.delete("/api/cms/menu-items/:id", ensureAuthenticated, async (req, res) => {
    try {
      const deletedMenuItem = await db.delete(cmsMenuItems).where(eq(cmsMenuItems.id, req.params.id)).returning();

      if (deletedMenuItem.length === 0) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      res.json({ message: "Menu item deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error deleting menu item" });
    }
  });

  // ==================== MEDIA LIBRARY ====================

  // Get all media
  app.get("/api/cms/media", async (req, res) => {
    try {
      const media = await db.select().from(cmsMedia).orderBy(desc(cmsMedia.createdAt));
      res.json(media);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error fetching media" });
    }
  });

  // Upload media (authenticated agents only)
  app.post("/api/cms/media/upload", ensureAuthenticated, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = req.user as any;
      const { altText, caption } = req.body;

      const id = randomUUID();
      const filePath = `/assets/uploads/${req.file.filename}`;

      const newMedia = await db
        .insert(cmsMedia)
        .values({
          id,
          fileName: req.file.filename,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          fileSize: req.file.size,
          filePath,
          altText: altText || null,
          caption: caption || null,
          uploadedBy: user.email || "admin@casurance.com",
          createdAt: new Date(),
        })
        .returning();

      res.json(newMedia[0]);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error uploading media" });
    }
  });

  // Update media metadata (authenticated agents only)
  app.patch("/api/cms/media/:id", ensureAuthenticated, async (req, res) => {
    try {
      const { altText, caption } = req.body;

      const updatedMedia = await db
        .update(cmsMedia)
        .set({
          altText: altText || null,
          caption: caption || null,
        })
        .where(eq(cmsMedia.id, req.params.id))
        .returning();

      if (updatedMedia.length === 0) {
        return res.status(404).json({ message: "Media not found" });
      }

      res.json(updatedMedia[0]);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid request data" });
    }
  });

  // Delete media (authenticated agents only)
  app.delete("/api/cms/media/:id", ensureAuthenticated, async (req, res) => {
    try {

      const media = await db.select().from(cmsMedia).where(eq(cmsMedia.id, req.params.id)).limit(1);

      if (media.length === 0) {
        return res.status(404).json({ message: "Media not found" });
      }

      // Delete file from filesystem
      const filePath = path.join(uploadDir, media[0].fileName);
      await fs.unlink(filePath).catch((err) => console.error("Error deleting file:", err));

      // Delete from database
      await db.delete(cmsMedia).where(eq(cmsMedia.id, req.params.id));

      res.json({ message: "Media deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error deleting media" });
    }
  });
}
