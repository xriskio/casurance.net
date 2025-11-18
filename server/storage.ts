import { quoteRequests, serviceRequests, oceanCargoQuotes, selfStorageQuotes, filmProductionQuotes, productLiabilityQuotes, securityServicesQuotes, nemtApplications, ambulanceApplications, tncApplications, limousineQuotes, publicTransportationQuotes, applicationFiles, type InsertQuoteRequest, type QuoteRequest, type InsertServiceRequest, type ServiceRequest, type InsertOceanCargoQuote, type OceanCargoQuote, type InsertSelfStorageQuote, type SelfStorageQuote, type InsertFilmProductionQuote, type FilmProductionQuote, type InsertProductLiabilityQuote, type ProductLiabilityQuote, type InsertSecurityServicesQuote, type SecurityServicesQuote, type InsertNemtApplication, type NemtApplication, type InsertAmbulanceApplication, type AmbulanceApplication, type InsertTncApplication, type TncApplication, type InsertLimousineQuote, type LimousineQuote, type InsertPublicTransportationQuote, type PublicTransportationQuote, type ApplicationFile } from "@shared/schema";
import { db } from "./db";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export interface IStorage {
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  createServiceRequest(service: InsertServiceRequest): Promise<ServiceRequest>;
  createOceanCargoQuote(quote: InsertOceanCargoQuote): Promise<OceanCargoQuote>;
  createSelfStorageQuote(quote: InsertSelfStorageQuote): Promise<SelfStorageQuote>;
  createFilmProductionQuote(quote: InsertFilmProductionQuote): Promise<FilmProductionQuote>;
  createProductLiabilityQuote(quote: InsertProductLiabilityQuote): Promise<ProductLiabilityQuote>;
  createSecurityServicesQuote(quote: InsertSecurityServicesQuote): Promise<SecurityServicesQuote>;
  createNemtApplication(application: InsertNemtApplication, files: { [fieldname: string]: Express.Multer.File[] }): Promise<NemtApplication>;
  createAmbulanceApplication(application: InsertAmbulanceApplication, files: { [fieldname: string]: Express.Multer.File[] }): Promise<AmbulanceApplication>;
  createTncApplication(application: InsertTncApplication, files: { [fieldname: string]: Express.Multer.File[] }): Promise<TncApplication>;
  createLimousineQuote(quote: InsertLimousineQuote): Promise<LimousineQuote>;
  createPublicTransportationQuote(quote: InsertPublicTransportationQuote): Promise<PublicTransportationQuote>;
  getApplicationFile(fileId: number): Promise<ApplicationFile | undefined>;
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

  async createNemtApplication(insertApplication: InsertNemtApplication, files: { [fieldname: string]: Express.Multer.File[] }): Promise<NemtApplication> {
    const id = randomUUID();
    const [application] = await db
      .insert(nemtApplications)
      .values({ ...insertApplication, id })
      .returning();

    if (files) {
      for (const [fieldName, fileArray] of Object.entries(files)) {
        if (fileArray && fileArray.length > 0) {
          const file = fileArray[0];
          await db.insert(applicationFiles).values({
            applicationType: "nemt",
            applicationId: id,
            fileType: fieldName,
            originalFilename: file.originalname,
            storedFilename: file.filename,
            fileSize: file.size,
            mimeType: file.mimetype,
          });
        }
      }
    }

    return application;
  }

  async createAmbulanceApplication(insertApplication: InsertAmbulanceApplication, files: { [fieldname: string]: Express.Multer.File[] }): Promise<AmbulanceApplication> {
    const id = randomUUID();
    const [application] = await db
      .insert(ambulanceApplications)
      .values({ ...insertApplication, id })
      .returning();

    if (files) {
      for (const [fieldName, fileArray] of Object.entries(files)) {
        if (fileArray && fileArray.length > 0) {
          const file = fileArray[0];
          await db.insert(applicationFiles).values({
            applicationType: "ambulance",
            applicationId: id,
            fileType: fieldName,
            originalFilename: file.originalname,
            storedFilename: file.filename,
            fileSize: file.size,
            mimeType: file.mimetype,
          });
        }
      }
    }

    return application;
  }

  async createTncApplication(insertApplication: InsertTncApplication, files: { [fieldname: string]: Express.Multer.File[] }): Promise<TncApplication> {
    const id = randomUUID();
    const [application] = await db
      .insert(tncApplications)
      .values({ ...insertApplication, id })
      .returning();

    if (files) {
      for (const [fieldName, fileArray] of Object.entries(files)) {
        if (fileArray && fileArray.length > 0) {
          const file = fileArray[0];
          await db.insert(applicationFiles).values({
            applicationType: "tnc",
            applicationId: id,
            fileType: fieldName,
            originalFilename: file.originalname,
            storedFilename: file.filename,
            fileSize: file.size,
            mimeType: file.mimetype,
          });
        }
      }
    }

    return application;
  }

  async createLimousineQuote(insertQuote: InsertLimousineQuote): Promise<LimousineQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(limousineQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createPublicTransportationQuote(insertQuote: InsertPublicTransportationQuote): Promise<PublicTransportationQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(publicTransportationQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async getApplicationFile(fileId: number): Promise<ApplicationFile | undefined> {
    const [file] = await db
      .select()
      .from(applicationFiles)
      .where(eq(applicationFiles.id, fileId))
      .limit(1);
    return file;
  }
}

export const storage = new DatabaseStorage();
