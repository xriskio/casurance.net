import { db } from "./db";
import { agents } from "@shared/schema";
import { hashPassword } from "./auth/utils";

async function seedAgent() {
  try {
    const existingAgent = await db.select().from(agents).limit(1);
    
    if (existingAgent.length > 0) {
      console.log("Agent already exists, skipping seed");
      return;
    }

    const hashedPassword = await hashPassword("admin123");

    await db.insert(agents).values({
      email: "admin@casurance.net",
      hashedPassword,
      fullName: "Admin Agent",
      role: "admin",
    });

    console.log("✓ Seed agent created successfully");
    console.log("  Email: admin@casurance.net");
    console.log("  Password: admin123");
    console.log("\n  IMPORTANT: Change this password after first login!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding agent:", error);
    process.exit(1);
  }
}

seedAgent();
