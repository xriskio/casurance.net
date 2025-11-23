import { CasuranceBrand } from './brand';

/**
 * Validation result for brand compliance
 */
export interface BrandValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Helper: Normalize email by stripping leading/trailing punctuation and quotes
 */
function normalizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/^[^\w]+/, '')   // Remove leading non-word characters
    .replace(/[^\w]+$/, '');  // Remove ALL trailing non-word characters (including dots)
}

/**
 * Helper: Normalize phone by extracting only digits
 */
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Patterns that should never appear in generated content
 */
const FORBIDDEN_PATTERNS = [
  // Company names that are not Casurance
  /Pacific\s+Pinnacle/i,
  /PacificPinnacle/i,
  /\bPPI\b/,
  
  // Wrong email domains
  /@pacificpinnacleins\.com/i,
  /@pacific-pinnacle/i,
  
  // Wrong phone numbers
  /213-555-\d{4}/,
  /\(213\)\s*555-\d{4}/,
  /213\.555\.\d{4}/,
  
  // Generic placeholder emails/phones
  /example@example\.com/i,
  /555-1234/,
  /\(555\)\s*555-/,
];

/**
 * Patterns that must appear in generated content
 * Note: companyName is optional for educational blog content (SEO best practice)
 */
const REQUIRED_PATTERNS = {
  companyName: /Casurance/,
  emailDomain: /@casurance\.net/i,
};

/**
 * Validates that generated content adheres to Casurance branding
 */
export function validateBrandCompliance(content: string): BrandValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for forbidden patterns
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(content)) {
      errors.push(`Found forbidden pattern: ${pattern.source}`);
    }
  }

  // Check for required patterns
  // Note: Company name is optional in educational blog content (better SEO)
  // Only enforce for press releases or content with contact info
  if (!REQUIRED_PATTERNS.companyName.test(content)) {
    // Only treat as error if content has contact info (email/phone) without company name
    const hasContactInfo = content.includes('@') || /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(content);
    if (hasContactInfo) {
      errors.push('Missing company name "Casurance" (required when contact info is present)');
    }
    // Otherwise just a warning for educational content
    else {
      warnings.push('Content does not mention "Casurance" (acceptable for educational blog posts)');
    }
  }

  // Check if email domain is used correctly (if email is present)
  // This is now a HARD ERROR, not a warning
  if (content.includes('@')) {
    // More precise email regex that doesn't capture trailing punctuation
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
    const emails = content.match(emailRegex) || [];
    
    // Normalize emails by stripping leading/trailing punctuation before checking domain
    const invalidEmails = emails.filter(email => {
      const normalized = normalizeEmail(email);
      return !normalized.endsWith('@casurance.com');
    });
    
    if (invalidEmails.length > 0) {
      errors.push(`Found invalid email addresses: ${invalidEmails.join(', ')}. All emails must use @casurance.com domain.`);
    }
  }

  // Check for valid phone numbers (if phone numbers are present)
  // This is now a HARD ERROR, not a warning
  const phonePatterns = [
    CasuranceBrand.phoneLocal,
    CasuranceBrand.phoneTollFree,
  ];
  
  const phoneRegex = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const foundPhones = content.match(phoneRegex) || [];
  
  if (foundPhones.length > 0) {
    const invalidPhones = foundPhones.filter(phone => {
      // Normalize by extracting only digits for comparison
      const normalized = normalizePhone(phone);
      
      // Ignore fragments that are too short (likely not actual phone numbers)
      if (normalized.length < 10) {
        return false;
      }
      
      // Check if this normalized phone matches either approved phone (also normalized)
      const isValid = phonePatterns.some(validPhone => {
        const validNormalized = normalizePhone(validPhone);
        // Match if the found phone ends with the valid phone (handles +1 prefix)
        // or if they're exactly equal
        return normalized.endsWith(validNormalized) || normalized === validNormalized;
      });
      
      return !isValid;
    });
    
    if (invalidPhones.length > 0) {
      errors.push(`Found invalid phone numbers: ${invalidPhones.join(', ')}. Only use ${CasuranceBrand.phoneLocal} or ${CasuranceBrand.phoneTollFree}.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Sanitizes content by replacing known incorrect patterns with correct ones
 */
export function sanitizeBrandContent(content: string): string {
  let sanitized = content;

  // Replace wrong company names
  sanitized = sanitized.replace(/Pacific\s+Pinnacle\s+Insurance\s+Services?/gi, 'Casurance');
  sanitized = sanitized.replace(/PacificPinnacle/gi, 'Casurance');

  // Replace ALL non-casurance.com email addresses with appropriate Casurance emails
  // Use comprehensive email pattern to catch all possible usernames
  sanitized = sanitized.replace(
    /([A-Za-z0-9._%+-]+)@(?!casurance\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
    (match, username) => {
      // Normalize username by removing dots, underscores, etc. for mapping
      const normalizedUsername = username.toLowerCase().replace(/[._%+-]/g, '');
      
      // Map common email patterns
      const emailMap: Record<string, string> = {
        'info': CasuranceBrand.infoEmail,
        'press': CasuranceBrand.pressEmail,
        'pressteam': CasuranceBrand.pressEmail,
        'support': CasuranceBrand.supportEmail,
        'contact': CasuranceBrand.infoEmail,
        'media': CasuranceBrand.pressEmail,
        'news': CasuranceBrand.pressEmail,
        'hospitality': CasuranceBrand.infoEmail,
        'sales': CasuranceBrand.infoEmail,
        'hello': CasuranceBrand.infoEmail,
      };
      return emailMap[normalizedUsername] || CasuranceBrand.infoEmail;
    }
  );

  // Replace ALL phone numbers that aren't our approved ones with the toll-free number
  // This is a broad approach to catch any phone number pattern
  const approvedPhones = [
    CasuranceBrand.phoneLocal,
    CasuranceBrand.phoneTollFree,
  ];
  
  sanitized = sanitized.replace(
    /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    (match) => {
      // Check if this is already an approved phone
      const normalized = normalizePhone(match);
      
      // Ignore fragments that are too short (likely not actual phone numbers)
      if (normalized.length < 10) {
        return match;
      }
      
      const isApproved = approvedPhones.some(validPhone => {
        const validNormalized = normalizePhone(validPhone);
        return normalized.endsWith(validNormalized) || normalized === validNormalized;
      });
      
      // If already approved, keep it; otherwise replace with toll-free
      return isApproved ? match : CasuranceBrand.phoneTollFree;
    }
  );

  // Remove extension labels that might be left behind
  sanitized = sanitized.replace(/\s+(ext\.?|extension)\s*\d+/gi, '');

  return sanitized;
}

/**
 * Validates and sanitizes content, throwing an error if validation still fails after sanitization
 */
export function ensureBrandCompliance(content: string): string {
  // First attempt: validate original content
  let validation = validateBrandCompliance(content);
  
  if (validation.isValid) {
    return content;
  }

  // Second attempt: sanitize and validate again
  const sanitized = sanitizeBrandContent(content);
  validation = validateBrandCompliance(sanitized);

  if (!validation.isValid) {
    throw new Error(
      `Content failed brand validation after sanitization:\n${validation.errors.join('\n')}`
    );
  }

  if (validation.warnings.length > 0) {
    console.warn('Brand validation warnings:', validation.warnings);
  }

  return sanitized;
}
