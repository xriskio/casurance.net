import type { Express } from "express";
import passport from "../auth/passport-config";
import { requireAgent, requireAdmin } from "../auth/middleware";
import { db } from "../db";
import type { IStorage } from "../storage";
import {
  quoteRequests,
  serviceRequests,
  contactRequests,
  oceanCargoQuotes,
  selfStorageQuotes,
  filmProductionQuotes,
  productLiabilityQuotes,
  securityServicesQuotes,
  submissionStatusHistory,
  highValueHomeQuotes,
  commercialFloodQuotes,
  commercialEarthquakeQuotes,
  franchisedDealerQuotes,
  garageServiceQuotes,
  autoDealerGarageQuotes,
  buildersRiskQuotes,
  vacantBuildingQuotes,
  craneRiggersQuotes,
  commercialAutoQuotes,
  generalLiabilityQuotes,
  habitationalQuotes,
  hotelQuotes,
  restaurantQuotes,
  truckingQuotes,
  workersCompQuotes,
  managementLiabilityQuotes,
  commercialPackageQuotes,
  limousineQuotes,
  publicTransportationQuotes,
  taxiBlackCarQuotes,
  quickQuotes,
  golfCountryClubQuotes,
  commercialPropertyQuotes,
  constructionCasualtyQuotes,
  cyberLiabilityQuotes,
  employmentPracticesQuotes,
  professionalLiabilityQuotes,
  religiousOrgQuotes,
  nemtApplications,
  ambulanceApplications,
  agents,
  insertAgentSchema,
  updateBlogPostSchema,
  updatePressReleaseSchema,
} from "@shared/schema";
import { desc, or, ilike, sql, and, gte, lte, eq } from "drizzle-orm";
import { hashPassword } from "../auth/utils";

export function registerAgentRoutes(app: Express, storage: IStorage) {
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "Authentication failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const { hashedPassword, ...userWithoutPassword } = user;
        return res.json({ user: userWithoutPassword });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", requireAgent, (req, res) => {
    const { hashedPassword, ...userWithoutPassword } = req.user as any;
    res.json({ user: userWithoutPassword });
  });

  app.get("/api/agent/submissions", requireAgent, async (req, res) => {
    try {
      const { type, search, dateFrom, dateTo, status } = req.query;

      const filters: any[] = [];
      if (search && typeof search === "string") {
        const searchPattern = `%${search}%`;
        filters.push(
          or(
            ilike(quoteRequests.businessName, searchPattern),
            ilike(quoteRequests.contactName, searchPattern),
            ilike(quoteRequests.email, searchPattern)
          )
        );
      }

      if (dateFrom && typeof dateFrom === "string") {
        const fromDate = new Date(dateFrom);
        filters.push(gte(quoteRequests.createdAt, fromDate));
      }

      if (dateTo && typeof dateTo === "string") {
        const toDate = new Date(dateTo);
        filters.push(lte(quoteRequests.createdAt, toDate));
      }

      let submissions: any[] = [];

      if (!type || type === "quote") {
        const quotes = await db
          .select()
          .from(quoteRequests)
          .where(filters.length > 0 ? and(...filters) : undefined)
          .orderBy(desc(quoteRequests.createdAt))
          .limit(100);

        submissions.push(
          ...quotes.map((q) => ({
            ...q,
            submissionType: "quote",
            status: "pending",
          }))
        );
      }

      if (!type || type === "service") {
        const services = await db
          .select()
          .from(serviceRequests)
          .orderBy(desc(serviceRequests.createdAt))
          .limit(100);

        submissions.push(
          ...services.map((s) => ({
            ...s,
            submissionType: "service",
            status: "pending",
          }))
        );
      }

      if (!type || type === "ocean-cargo") {
        const oceanCargo = await db
          .select()
          .from(oceanCargoQuotes)
          .orderBy(desc(oceanCargoQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...oceanCargo.map((o) => ({
            ...o,
            submissionType: "ocean-cargo",
          }))
        );
      }

      if (!type || type === "self-storage") {
        const selfStorage = await db
          .select()
          .from(selfStorageQuotes)
          .orderBy(desc(selfStorageQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...selfStorage.map((s) => ({
            ...s,
            submissionType: "self-storage",
          }))
        );
      }

      if (!type || type === "film-production") {
        const filmProduction = await db
          .select()
          .from(filmProductionQuotes)
          .orderBy(desc(filmProductionQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...filmProduction.map((f) => ({
            ...f,
            submissionType: "film-production",
          }))
        );
      }

      if (!type || type === "product-liability") {
        const productLiability = await db
          .select()
          .from(productLiabilityQuotes)
          .orderBy(desc(productLiabilityQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...productLiability.map((p) => ({
            ...p,
            submissionType: "product-liability",
          }))
        );
      }

      if (!type || type === "security-services") {
        const securityServices = await db
          .select()
          .from(securityServicesQuotes)
          .orderBy(desc(securityServicesQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...securityServices.map((s) => ({
            ...s,
            submissionType: "security-services",
          }))
        );
      }

      if (!type || type === "high-value-home") {
        const highValueHome = await db
          .select()
          .from(highValueHomeQuotes)
          .orderBy(desc(highValueHomeQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...highValueHome.map((h) => ({
            ...h,
            submissionType: "high-value-home",
          }))
        );
      }

      if (!type || type === "commercial-flood") {
        const commercialFlood = await db
          .select()
          .from(commercialFloodQuotes)
          .orderBy(desc(commercialFloodQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...commercialFlood.map((c) => ({
            ...c,
            submissionType: "commercial-flood",
          }))
        );
      }

      if (!type || type === "commercial-earthquake") {
        const commercialEarthquake = await db
          .select()
          .from(commercialEarthquakeQuotes)
          .orderBy(desc(commercialEarthquakeQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...commercialEarthquake.map((c) => ({
            ...c,
            submissionType: "commercial-earthquake",
          }))
        );
      }

      if (!type || type === "franchised-dealer") {
        const franchisedDealer = await db
          .select()
          .from(franchisedDealerQuotes)
          .orderBy(desc(franchisedDealerQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...franchisedDealer.map((f) => ({
            ...f,
            submissionType: "franchised-dealer",
          }))
        );
      }

      if (!type || type === "garage-service") {
        const garageService = await db
          .select()
          .from(garageServiceQuotes)
          .orderBy(desc(garageServiceQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...garageService.map((g) => ({
            ...g,
            submissionType: "garage-service",
          }))
        );
      }

      if (!type || type === "auto-dealer-garage") {
        const autoDealerGarage = await db
          .select()
          .from(autoDealerGarageQuotes)
          .orderBy(desc(autoDealerGarageQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...autoDealerGarage.map((a) => ({
            ...a,
            submissionType: "auto-dealer-garage",
          }))
        );
      }

      if (!type || type === "builders-risk") {
        const buildersRisk = await db
          .select()
          .from(buildersRiskQuotes)
          .orderBy(desc(buildersRiskQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...buildersRisk.map((b) => ({
            ...b,
            submissionType: "builders-risk",
          }))
        );
      }

      if (!type || type === "vacant-building") {
        const vacantBuilding = await db
          .select()
          .from(vacantBuildingQuotes)
          .orderBy(desc(vacantBuildingQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...vacantBuilding.map((v) => ({
            ...v,
            submissionType: "vacant-building",
          }))
        );
      }

      if (!type || type === "crane-riggers") {
        const craneRiggers = await db
          .select()
          .from(craneRiggersQuotes)
          .orderBy(desc(craneRiggersQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...craneRiggers.map((c) => ({
            ...c,
            submissionType: "crane-riggers",
          }))
        );
      }

      if (!type || type === "commercial-auto") {
        const commercialAuto = await db
          .select()
          .from(commercialAutoQuotes)
          .orderBy(desc(commercialAutoQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...commercialAuto.map((c) => ({
            ...c,
            submissionType: "commercial-auto",
          }))
        );
      }

      if (!type || type === "general-liability") {
        const generalLiability = await db
          .select()
          .from(generalLiabilityQuotes)
          .orderBy(desc(generalLiabilityQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...generalLiability.map((g) => ({
            ...g,
            submissionType: "general-liability",
          }))
        );
      }

      if (!type || type === "habitational") {
        const habitational = await db
          .select()
          .from(habitationalQuotes)
          .orderBy(desc(habitationalQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...habitational.map((h) => ({
            ...h,
            submissionType: "habitational",
          }))
        );
      }

      if (!type || type === "hotel") {
        const hotel = await db
          .select()
          .from(hotelQuotes)
          .orderBy(desc(hotelQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...hotel.map((h) => ({
            ...h,
            submissionType: "hotel",
          }))
        );
      }

      if (!type || type === "restaurant") {
        const restaurant = await db
          .select()
          .from(restaurantQuotes)
          .orderBy(desc(restaurantQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...restaurant.map((r) => ({
            ...r,
            submissionType: "restaurant",
          }))
        );
      }

      if (!type || type === "trucking") {
        const trucking = await db
          .select()
          .from(truckingQuotes)
          .orderBy(desc(truckingQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...trucking.map((t) => ({
            ...t,
            submissionType: "trucking",
          }))
        );
      }

      if (!type || type === "workers-comp") {
        const workerComp = await db
          .select()
          .from(workersCompQuotes)
          .orderBy(desc(workersCompQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...workerComp.map((w) => ({
            ...w,
            submissionType: "workers-comp",
          }))
        );
      }

      if (!type || type === "management-liability") {
        const managementLiability = await db
          .select()
          .from(managementLiabilityQuotes)
          .orderBy(desc(managementLiabilityQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...managementLiability.map((m) => ({
            ...m,
            submissionType: "management-liability",
          }))
        );
      }

      if (!type || type === "commercial-package") {
        const commercialPackage = await db
          .select()
          .from(commercialPackageQuotes)
          .orderBy(desc(commercialPackageQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...commercialPackage.map((c) => ({
            ...c,
            submissionType: "commercial-package",
          }))
        );
      }

      if (!type || type === "limousine") {
        const limousine = await db
          .select()
          .from(limousineQuotes)
          .orderBy(desc(limousineQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...limousine.map((l) => ({
            ...l,
            submissionType: "limousine",
          }))
        );
      }

      if (!type || type === "public-transportation") {
        const publicTransportation = await db
          .select()
          .from(publicTransportationQuotes)
          .orderBy(desc(publicTransportationQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...publicTransportation.map((p) => ({
            ...p,
            submissionType: "public-transportation",
          }))
        );
      }

      if (!type || type === "taxi-black-car") {
        const taxiBlackCar = await db
          .select()
          .from(taxiBlackCarQuotes)
          .orderBy(desc(taxiBlackCarQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...taxiBlackCar.map((t) => ({
            ...t,
            submissionType: "taxi-black-car",
          }))
        );
      }

      if (!type || type === "quick") {
        const quick = await db
          .select()
          .from(quickQuotes)
          .orderBy(desc(quickQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...quick.map((q) => ({
            ...q,
            submissionType: "quick",
          }))
        );
      }

      if (!type || type === "golf-country-club") {
        const golfCountryClub = await db
          .select()
          .from(golfCountryClubQuotes)
          .orderBy(desc(golfCountryClubQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...golfCountryClub.map((g) => ({
            ...g,
            submissionType: "golf-country-club",
          }))
        );
      }

      if (!type || type === "commercial-property") {
        const commercialProperty = await db
          .select()
          .from(commercialPropertyQuotes)
          .orderBy(desc(commercialPropertyQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...commercialProperty.map((c) => ({
            ...c,
            submissionType: "commercial-property",
          }))
        );
      }

      if (!type || type === "construction-casualty") {
        const constructionCasualty = await db
          .select()
          .from(constructionCasualtyQuotes)
          .orderBy(desc(constructionCasualtyQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...constructionCasualty.map((c) => ({
            ...c,
            submissionType: "construction-casualty",
          }))
        );
      }

      if (!type || type === "cyber-liability") {
        const cyberLiability = await db
          .select()
          .from(cyberLiabilityQuotes)
          .orderBy(desc(cyberLiabilityQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...cyberLiability.map((c) => ({
            ...c,
            submissionType: "cyber-liability",
          }))
        );
      }

      if (!type || type === "employment-practices") {
        const employmentPractices = await db
          .select()
          .from(employmentPracticesQuotes)
          .orderBy(desc(employmentPracticesQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...employmentPractices.map((e) => ({
            ...e,
            submissionType: "employment-practices",
          }))
        );
      }

      if (!type || type === "professional-liability") {
        const professionalLiability = await db
          .select()
          .from(professionalLiabilityQuotes)
          .orderBy(desc(professionalLiabilityQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...professionalLiability.map((p) => ({
            ...p,
            submissionType: "professional-liability",
          }))
        );
      }

      if (!type || type === "religious-org") {
        const religiousOrg = await db
          .select()
          .from(religiousOrgQuotes)
          .orderBy(desc(religiousOrgQuotes.createdAt))
          .limit(100);

        submissions.push(
          ...religiousOrg.map((r) => ({
            ...r,
            submissionType: "religious-org",
          }))
        );
      }

      if (!type || type === "contact") {
        const contacts = await db
          .select()
          .from(contactRequests)
          .orderBy(desc(contactRequests.createdAt))
          .limit(100);

        submissions.push(
          ...contacts.map((c) => ({
            ...c,
            submissionType: "contact",
            referenceNumber: `CONTACT-${c.id.substring(0, 8).toUpperCase()}`,
            status: "pending",
          }))
        );
      }

      if (!type || type === "nemt") {
        const nemtApps = await db
          .select()
          .from(nemtApplications)
          .orderBy(desc(nemtApplications.createdAt))
          .limit(100);

        submissions.push(
          ...nemtApps.map((n) => ({
            ...n,
            submissionType: "nemt",
            status: "pending",
          }))
        );
      }

      if (!type || type === "ambulance") {
        const ambulanceApps = await db
          .select()
          .from(ambulanceApplications)
          .orderBy(desc(ambulanceApplications.createdAt))
          .limit(100);

        submissions.push(
          ...ambulanceApps.map((a) => ({
            ...a,
            submissionType: "ambulance",
            status: "pending",
          }))
        );
      }

      submissions.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });

      res.json({ submissions });
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.patch("/api/agent/submissions/:type/:id/status", requireAgent, async (req, res) => {
    try {
      const { type, id } = req.params;
      const { status, notes } = req.body;
      const agent = req.user as any;

      await db.insert(submissionStatusHistory).values({
        submissionType: type,
        submissionId: id,
        status,
        notes,
        changedBy: agent.id,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  app.post("/api/agent/submissions/:type/:id/confirm", requireAgent, async (req, res) => {
    try {
      const { type, id } = req.params;
      const agent = req.user as any;

      await db.insert(submissionStatusHistory).values({
        submissionType: type,
        submissionId: id,
        status: "confirmed",
        notes: "Confirmation sent to client",
        changedBy: agent.id,
        confirmedAt: new Date(),
      });

      res.json({ success: true, message: "Confirmation recorded" });
    } catch (error) {
      console.error("Error sending confirmation:", error);
      res.status(500).json({ error: "Failed to send confirmation" });
    }
  });

  app.get("/api/admin/agents", requireAdmin, async (req, res) => {
    try {
      const allAgents = await db
        .select({
          id: agents.id,
          email: agents.email,
          fullName: agents.fullName,
          role: agents.role,
          createdAt: agents.createdAt,
          lastLoginAt: agents.lastLoginAt,
        })
        .from(agents)
        .orderBy(desc(agents.createdAt));

      res.json({ agents: allAgents });
    } catch (error) {
      console.error("Error fetching agents:", error);
      res.status(500).json({ error: "Failed to fetch agents" });
    }
  });

  app.post("/api/admin/agents", requireAdmin, async (req, res) => {
    try {
      const { password, ...restData } = req.body;
      const validatedData = insertAgentSchema.omit({ hashedPassword: true }).parse(restData);
      const hashedPwd = await hashPassword(password);
      
      const [newAgent] = await db
        .insert(agents)
        .values({
          ...validatedData,
          hashedPassword: hashedPwd,
          email: validatedData.email.toLowerCase(),
        })
        .returning({
          id: agents.id,
          email: agents.email,
          fullName: agents.fullName,
          role: agents.role,
          createdAt: agents.createdAt,
        });

      res.json({ agent: newAgent });
    } catch (error: any) {
      console.error("Error creating agent:", error);
      if (error.code === '23505') {
        return res.status(400).json({ error: "An agent with this email already exists" });
      }
      res.status(400).json({ error: error.message || "Failed to create agent" });
    }
  });

  app.patch("/api/admin/agents/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { email, fullName, role, password } = req.body;

      const updateData: any = {};
      if (email) updateData.email = email.toLowerCase();
      if (fullName) updateData.fullName = fullName;
      if (role) updateData.role = role;
      if (password) updateData.hashedPassword = await hashPassword(password);

      const [updatedAgent] = await db
        .update(agents)
        .set(updateData)
        .where(eq(agents.id, parseInt(id)))
        .returning({
          id: agents.id,
          email: agents.email,
          fullName: agents.fullName,
          role: agents.role,
          createdAt: agents.createdAt,
          lastLoginAt: agents.lastLoginAt,
        });

      if (!updatedAgent) {
        return res.status(404).json({ error: "Agent not found" });
      }

      res.json({ agent: updatedAgent });
    } catch (error: any) {
      console.error("Error updating agent:", error);
      if (error.code === '23505') {
        return res.status(400).json({ error: "An agent with this email already exists" });
      }
      res.status(400).json({ error: error.message || "Failed to update agent" });
    }
  });

  app.delete("/api/admin/agents/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const currentUser = req.user as any;

      if (currentUser.id === parseInt(id)) {
        return res.status(400).json({ error: "You cannot delete your own account" });
      }

      const [deletedAgent] = await db
        .delete(agents)
        .where(eq(agents.id, parseInt(id)))
        .returning({ id: agents.id });

      if (!deletedAgent) {
        return res.status(404).json({ error: "Agent not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting agent:", error);
      res.status(500).json({ error: "Failed to delete agent" });
    }
  });

  app.get("/api/agent/blog-posts", requireAgent, async (req, res) => {
    try {
      const { category, search } = req.query;
      const posts = await storage.getBlogPosts(
        category as string | undefined,
        search as string | undefined
      );
      res.json({ posts });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/agent/blog-posts/:id", requireAgent, async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPostById(parseInt(id));
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ post });
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.patch("/api/agent/blog-posts/:id", requireAgent, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateBlogPostSchema.parse(req.body);
      const updatedPost = await storage.updateBlogPost(parseInt(id), validatedData);
      if (!updatedPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ post: updatedPost });
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/agent/blog-posts/:id", requireAgent, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogPost(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.get("/api/agent/press-releases", requireAgent, async (req, res) => {
    try {
      const { category, search } = req.query;
      const releases = await storage.getPressReleases(
        category as string | undefined,
        search as string | undefined
      );
      res.json({ releases });
    } catch (error) {
      console.error("Error fetching press releases:", error);
      res.status(500).json({ error: "Failed to fetch press releases" });
    }
  });

  app.get("/api/agent/press-releases/:id", requireAgent, async (req, res) => {
    try {
      const { id } = req.params;
      const release = await storage.getPressReleaseById(parseInt(id));
      if (!release) {
        return res.status(404).json({ error: "Press release not found" });
      }
      res.json({ release });
    } catch (error) {
      console.error("Error fetching press release:", error);
      res.status(500).json({ error: "Failed to fetch press release" });
    }
  });

  app.patch("/api/agent/press-releases/:id", requireAgent, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updatePressReleaseSchema.parse(req.body);
      const updatedRelease = await storage.updatePressRelease(parseInt(id), validatedData);
      if (!updatedRelease) {
        return res.status(404).json({ error: "Press release not found" });
      }
      res.json({ release: updatedRelease });
    } catch (error) {
      console.error("Error updating press release:", error);
      res.status(500).json({ error: "Failed to update press release" });
    }
  });

  app.delete("/api/agent/press-releases/:id", requireAgent, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePressRelease(parseInt(id));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting press release:", error);
      res.status(500).json({ error: "Failed to delete press release" });
    }
  });
}
