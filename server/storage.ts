import { quoteRequests, serviceRequests, oceanCargoQuotes, selfStorageQuotes, filmProductionQuotes, productLiabilityQuotes, securityServicesQuotes, nemtApplications, ambulanceApplications, tncApplications, limousineQuotes, publicTransportationQuotes, taxiBlackCarQuotes, quickQuotes, contactRequests, applicationFiles, blogPosts, pressReleases, newsletterSubscriptions, highValueHomeQuotes, commercialFloodQuotes, commercialEarthquakeQuotes, franchisedDealerQuotes, garageServiceQuotes, autoDealerGarageQuotes, golfCountryClubQuotes, type InsertQuoteRequest, type QuoteRequest, type InsertServiceRequest, type ServiceRequest, type InsertOceanCargoQuote, type OceanCargoQuote, type InsertSelfStorageQuote, type SelfStorageQuote, type InsertFilmProductionQuote, type FilmProductionQuote, type InsertProductLiabilityQuote, type ProductLiabilityQuote, type InsertSecurityServicesQuote, type SecurityServicesQuote, type InsertNemtApplication, type NemtApplication, type InsertAmbulanceApplication, type AmbulanceApplication, type InsertTncApplication, type TncApplication, type InsertLimousineQuote, type LimousineQuote, type InsertPublicTransportationQuote, type PublicTransportationQuote, type InsertTaxiBlackCarQuote, type TaxiBlackCarQuote, type InsertQuickQuote, type QuickQuote, type InsertContactRequest, type ContactRequest, type ApplicationFile, type InsertBlogPost, type BlogPost, type InsertPressRelease, type PressRelease, type InsertNewsletterSubscription, type NewsletterSubscription, type InsertHighValueHomeQuote, type HighValueHomeQuote, type InsertCommercialFloodQuote, type CommercialFloodQuote, type InsertCommercialEarthquakeQuote, type CommercialEarthquakeQuote, type InsertFranchisedDealerQuote, type FranchisedDealerQuote, type InsertGarageServiceQuote, type GarageServiceQuote, type InsertAutoDealerGarageQuote, type AutoDealerGarageQuote, type InsertGolfCountryClubQuote, type GolfCountryClubQuote } from "@shared/schema";
import { db } from "./db";
import { randomUUID } from "crypto";
import { eq, desc, like, or } from "drizzle-orm";

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
  createTaxiBlackCarQuote(quote: InsertTaxiBlackCarQuote): Promise<TaxiBlackCarQuote>;
  createQuickQuote(quote: InsertQuickQuote): Promise<QuickQuote>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getApplicationFile(fileId: number): Promise<ApplicationFile | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(category?: string, search?: string): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<void>;
  createPressRelease(release: InsertPressRelease): Promise<PressRelease>;
  getPressReleases(category?: string, search?: string): Promise<PressRelease[]>;
  getPressReleaseBySlug(slug: string): Promise<PressRelease | undefined>;
  getPressReleaseById(id: number): Promise<PressRelease | undefined>;
  updatePressRelease(id: number, release: Partial<InsertPressRelease>): Promise<PressRelease | undefined>;
  deletePressRelease(id: number): Promise<void>;
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByToken(token: string): Promise<NewsletterSubscription | undefined>;
  unsubscribeNewsletter(token: string): Promise<NewsletterSubscription | undefined>;
  createHighValueHomeQuote(quote: InsertHighValueHomeQuote): Promise<HighValueHomeQuote>;
  createCommercialFloodQuote(quote: InsertCommercialFloodQuote): Promise<CommercialFloodQuote>;
  createCommercialEarthquakeQuote(quote: InsertCommercialEarthquakeQuote): Promise<CommercialEarthquakeQuote>;
  createFranchisedDealerQuote(quote: InsertFranchisedDealerQuote): Promise<FranchisedDealerQuote>;
  createGarageServiceQuote(quote: InsertGarageServiceQuote): Promise<GarageServiceQuote>;
  createAutoDealerGarageQuote(quote: InsertAutoDealerGarageQuote): Promise<AutoDealerGarageQuote>;
  createGolfCountryClubQuote(quote: InsertGolfCountryClubQuote): Promise<GolfCountryClubQuote>;
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

  async createTaxiBlackCarQuote(insertQuote: InsertTaxiBlackCarQuote): Promise<TaxiBlackCarQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(taxiBlackCarQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createQuickQuote(insertQuote: InsertQuickQuote): Promise<QuickQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(quickQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = randomUUID();
    const [request] = await db
      .insert(contactRequests)
      .values({ ...insertRequest, id })
      .returning();
    return request;
  }

  async getApplicationFile(fileId: number): Promise<ApplicationFile | undefined> {
    const [file] = await db
      .select()
      .from(applicationFiles)
      .where(eq(applicationFiles.id, fileId))
      .limit(1);
    return file;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async getBlogPosts(category?: string, search?: string): Promise<BlogPost[]> {
    let query = db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));

    if (category) {
      query = query.where(eq(blogPosts.category, category)) as any;
    }

    if (search) {
      const searchPattern = `%${search}%`;
      query = query.where(
        or(
          like(blogPosts.title, searchPattern),
          like(blogPosts.excerpt, searchPattern),
          like(blogPosts.content, searchPattern)
        )
      ) as any;
    }

    return await query;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return post;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);
    return post;
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set(updates)
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async createPressRelease(insertRelease: InsertPressRelease): Promise<PressRelease> {
    const [release] = await db
      .insert(pressReleases)
      .values(insertRelease)
      .returning();
    return release;
  }

  async getPressReleases(category?: string, search?: string): Promise<PressRelease[]> {
    let query = db.select().from(pressReleases).orderBy(desc(pressReleases.publishedAt));

    if (category) {
      query = query.where(eq(pressReleases.category, category)) as any;
    }

    const results = await query;

    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      return results.filter(release =>
        release.title.toLowerCase().includes(searchLower) ||
        release.excerpt.toLowerCase().includes(searchLower) ||
        release.content.toLowerCase().includes(searchLower) ||
        release.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return results;
  }

  async getPressReleaseBySlug(slug: string): Promise<PressRelease | undefined> {
    const [release] = await db
      .select()
      .from(pressReleases)
      .where(eq(pressReleases.slug, slug))
      .limit(1);
    return release;
  }

  async getPressReleaseById(id: number): Promise<PressRelease | undefined> {
    const [release] = await db
      .select()
      .from(pressReleases)
      .where(eq(pressReleases.id, id))
      .limit(1);
    return release;
  }

  async updatePressRelease(id: number, updates: Partial<InsertPressRelease>): Promise<PressRelease | undefined> {
    const [release] = await db
      .update(pressReleases)
      .set(updates)
      .where(eq(pressReleases.id, id))
      .returning();
    return release;
  }

  async deletePressRelease(id: number): Promise<void> {
    await db.delete(pressReleases).where(eq(pressReleases.id, id));
  }

  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [subscription] = await db
      .insert(newsletterSubscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async getNewsletterSubscriptionByToken(token: string): Promise<NewsletterSubscription | undefined> {
    const [subscription] = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.unsubscribeToken, token))
      .limit(1);
    return subscription;
  }

  async unsubscribeNewsletter(token: string): Promise<NewsletterSubscription | undefined> {
    const [subscription] = await db
      .update(newsletterSubscriptions)
      .set({ status: "unsubscribed", unsubscribedAt: new Date() })
      .where(eq(newsletterSubscriptions.unsubscribeToken, token))
      .returning();
    return subscription;
  }

  async createHighValueHomeQuote(insertQuote: InsertHighValueHomeQuote): Promise<HighValueHomeQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(highValueHomeQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createCommercialFloodQuote(insertQuote: InsertCommercialFloodQuote): Promise<CommercialFloodQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(commercialFloodQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createCommercialEarthquakeQuote(insertQuote: InsertCommercialEarthquakeQuote): Promise<CommercialEarthquakeQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(commercialEarthquakeQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createFranchisedDealerQuote(insertQuote: InsertFranchisedDealerQuote): Promise<FranchisedDealerQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(franchisedDealerQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createGarageServiceQuote(insertQuote: InsertGarageServiceQuote): Promise<GarageServiceQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(garageServiceQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createAutoDealerGarageQuote(insertQuote: InsertAutoDealerGarageQuote): Promise<AutoDealerGarageQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(autoDealerGarageQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }

  async createGolfCountryClubQuote(insertQuote: InsertGolfCountryClubQuote): Promise<GolfCountryClubQuote> {
    const id = randomUUID();
    const [quote] = await db
      .insert(golfCountryClubQuotes)
      .values({ ...insertQuote, id })
      .returning();
    return quote;
  }
}

export const storage = new DatabaseStorage();
