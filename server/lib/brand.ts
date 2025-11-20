/**
 * Centralized Casurance brand constants for consistent use across the application,
 * especially in AI-generated content (blog posts, press releases).
 */

export const CasuranceBrand = {
  companyName: "Casurance",
  companyFullName: "Casurance Commercial Insurance Agency",
  
  // Contact Information
  emailDomain: "casurance.net",
  infoEmail: "info@casurance.net",
  supportEmail: "support@casurance.net",
  pressEmail: "press@casurance.net",
  
  // Phone Numbers
  phoneLocal: "323-546-3030",
  phoneTollFree: "1-888-254-0089",
  
  // Web Presence
  website: "www.casurance.net",
  websiteUrl: "https://www.casurance.net",
  
  // Service Area
  serviceArea: "15 US states",
  states: [
    "Alabama", "Arizona", "California", "Colorado", "Florida",
    "Georgia", "Illinois", "Nevada", "New York", "North Carolina",
    "Ohio", "Pennsylvania", "Tennessee", "Texas", "Washington"
  ],
  
  // Business Profile
  businessType: "B2B commercial insurance agency",
  focus: "Commercial insurance solutions for businesses",
  
  // Boilerplate for Press Releases
  boilerplate: `Casurance is a specialized commercial insurance agency serving businesses across 15 US states. With expertise in over 40 commercial insurance products across 23+ industries, Casurance provides tailored coverage solutions including commercial auto, general liability, workers' compensation, professional liability, and specialized industry-specific policies. The agency is committed to delivering carrier-agnostic advice, personalized service, and comprehensive risk management solutions to help businesses protect their operations and achieve sustainable growth.`,
  
  // About for Blog Posts
  about: `Casurance is a B2B commercial insurance agency specializing in comprehensive coverage solutions for businesses nationwide. Serving 15 states with expertise in 40+ commercial insurance products, Casurance helps companies find the right protection for their unique needs.`,
} as const;

/**
 * Returns a formatted contact block for AI-generated content
 */
export function getContactBlock(purpose: "quote" | "general" | "press" = "general"): string {
  const emailMap = {
    quote: CasuranceBrand.infoEmail,
    general: CasuranceBrand.supportEmail,
    press: CasuranceBrand.pressEmail,
  };
  
  return `For more information, contact ${CasuranceBrand.companyName} at ${emailMap[purpose]} or call ${CasuranceBrand.phoneTollFree} (toll-free) or ${CasuranceBrand.phoneLocal} (direct).`;
}

/**
 * Returns a formatted media contact block for press releases
 */
export function getMediaContactBlock(): string {
  return `## Media Contact

Sarah Martinez
Director of Communications
${CasuranceBrand.companyName}
${CasuranceBrand.pressEmail}
${CasuranceBrand.phoneTollFree}`;
}

/**
 * Returns brand instructions for AI prompts
 */
export function getBrandInstructions(): string {
  return `
CRITICAL BRANDING REQUIREMENTS - YOU MUST FOLLOW THESE EXACTLY:
- Company name: ${CasuranceBrand.companyName}
- Email domain: ONLY use @${CasuranceBrand.emailDomain} (e.g., ${CasuranceBrand.infoEmail}, ${CasuranceBrand.supportEmail}, ${CasuranceBrand.pressEmail})
- Phone numbers: ${CasuranceBrand.phoneTollFree} (toll-free) and ${CasuranceBrand.phoneLocal} (local/direct)
- Website: ${CasuranceBrand.website}
- Service area: ${CasuranceBrand.serviceArea}
- DO NOT invent other company names, phone numbers, or email addresses
- DO NOT use placeholder contact information
- ALL contact information must use the exact details provided above
`.trim();
}
