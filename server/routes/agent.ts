import type { Express } from "express";
import passport from "../auth/passport-config";
import { requireAgent } from "../auth/middleware";
import { db } from "../db";
import {
  quoteRequests,
  serviceRequests,
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
} from "@shared/schema";
import { desc, or, ilike, sql, and, gte, lte } from "drizzle-orm";

export function registerAgentRoutes(app: Express) {
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
}
