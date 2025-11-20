import OpenAI from "openai";
import { CasuranceBrand, getBrandInstructions, getMediaContactBlock } from "./brand";
import { ensureBrandCompliance } from "./brand-validator";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export interface PressReleaseContent {
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: string;
  location: string;
  tags: string[];
  imageUrl?: string;
}

async function getStockImage(topic: string): Promise<string | undefined> {
  const apiKey = process.env.PEXELS_API_KEY;
  
  if (!apiKey) {
    console.warn("PEXELS_API_KEY not configured - press releases will be generated without images");
    return undefined;
  }

  try {
    const searchQuery = topic
      .replace(/insurance/gi, "business")
      .replace(/coverage/gi, "professional")
      .replace(/press release/gi, "announcement")
      .replace(/expansion/gi, "growth")
      .split(":")[0]
      .substring(0, 50);

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: apiKey
        }
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch stock image:", response.statusText);
      return undefined;
    }

    const data: any = await response.json();
    return data.photos?.[0]?.src?.large || undefined;
  } catch (error) {
    console.error("Error fetching stock image:", error);
    return undefined;
  }
}

const pressReleaseTopics = [
  "Casurance Expands Commercial Auto Insurance Coverage to New Markets",
  "New Workers Compensation Programs Launched Across Multiple States",
  "Casurance Introduces Enhanced General Liability Coverage Options",
  "Expanded Service Areas Now Include Additional States",
  "New Specialty Insurance Programs for Transportation Industry",
  "Casurance Launches Advanced Cyber Insurance Solutions",
  "Restaurant and Hospitality Coverage Enhancements Announced",
  "Self-Storage Facility Insurance Programs Now Available",
  "Enhanced NEMT and Medical Transportation Coverage Options",
  "New Fleet Insurance Solutions for Commercial Vehicles",
  "Casurance Adds Professional Liability Coverage for Golf Industry",
  "Expanded Garage and Auto Dealer Insurance Programs",
  "New TNC and Rideshare Insurance Coverage Launched",
  "Construction Industry Insurance Solutions Enhanced",
  "Film Production Insurance Programs Now Available",
  "Limousine and Chauffeured Transportation Coverage Expanded",
  "Public Transportation Insurance Solutions Introduced",
  "Ocean Cargo and Marine Insurance Programs Launched",
  "Product Liability Coverage Enhancements for Manufacturers",
  "Security Services Insurance Programs Now Available"
];

const categories = [
  "New Coverage",
  "Service Area Expansion",
  "Program Enhancement",
  "Industry Solutions",
  "Partnership Announcements"
];

const locations = [
  "Nationwide",
  "California",
  "Nevada",
  "Arizona",
  "Oregon",
  "Ohio",
  "Illinois",
  "New York",
  "New Jersey",
  "Pennsylvania",
  "North Carolina",
  "Texas",
  "Florida",
  "Arkansas",
  "Missouri",
  "Colorado"
];

export async function generatePressRelease(topic?: string, category?: string, location?: string): Promise<PressReleaseContent> {
  const selectedTopic = topic || pressReleaseTopics[Math.floor(Math.random() * pressReleaseTopics.length)];
  const selectedCategory = category || categories[Math.floor(Math.random() * categories.length)];
  const selectedLocation = location || locations[Math.floor(Math.random() * locations.length)];

  const prompt = `You are a professional PR writer for ${CasuranceBrand.companyName}, a commercial insurance agency. Write a formal press release about: "${selectedTopic}"

Category: ${selectedCategory}
Location: ${selectedLocation}

${getBrandInstructions()}

COMPANY BOILERPLATE (Must use EXACTLY as provided in the "Boilerplate" section):
${CasuranceBrand.boilerplate}

MEDIA CONTACT (Must use EXACTLY as shown below):
${getMediaContactBlock()}

Requirements:
1. Follow standard press release format (headline, dateline, body, boilerplate, contact info)
2. Write in third person, professional news style
3. Include a compelling headline and optional subtitle
4. Start with a strong lead paragraph answering who, what, when, where, why
5. Include relevant quotes from company executives (fictional but realistic)
6. Keep the content between 400-600 words
7. Be carrier-agnostic - do not mention specific insurance carriers
8. Include practical details about the announcement
9. Write an engaging excerpt (150-200 characters) for the lead
10. Suggest 3-5 relevant tags
11. Generate a URL-friendly slug
12. Format the content in markdown (## for sections, **bold** for emphasis)
13. ALWAYS end with "## Boilerplate" section using the exact boilerplate text provided above
14. ALWAYS end with "## Media Contact" section using the exact contact info provided above
15. DO NOT invent other company names, email addresses, or phone numbers

Return ONLY a valid JSON object with this exact structure:
{
  "title": "Press Release Headline",
  "slug": "url-friendly-slug",
  "subtitle": "Optional compelling subtitle",
  "excerpt": "Brief excerpt summarizing the announcement",
  "content": "Full press release content in markdown format",
  "category": "${selectedCategory}",
  "location": "${selectedLocation}",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  try {
    const [imageUrl, aiResponse] = await Promise.all([
      getStockImage(selectedTopic),
      openai.chat.completions.create({
        model: "gpt-5",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_completion_tokens: 4096,
      })
    ]);

    const content = aiResponse.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content generated");
    }

    const pressRelease = JSON.parse(content) as PressReleaseContent;
    
    // Validate and sanitize brand compliance
    pressRelease.content = ensureBrandCompliance(pressRelease.content);
    pressRelease.excerpt = ensureBrandCompliance(pressRelease.excerpt);
    if (pressRelease.subtitle) {
      pressRelease.subtitle = ensureBrandCompliance(pressRelease.subtitle);
    }
    
    pressRelease.imageUrl = imageUrl;
    return pressRelease;
  } catch (error) {
    console.error("Error generating press release:", error);
    throw error;
  }
}

export function getTopics(): string[] {
  return pressReleaseTopics;
}

export function getRandomTopic(): string {
  return pressReleaseTopics[Math.floor(Math.random() * pressReleaseTopics.length)];
}

export function getCategories(): string[] {
  return categories;
}

export function getLocations(): string[] {
  return locations;
}

export async function generateDraftContent(
  title: string,
  category: string,
  location: string
): Promise<{ subtitle?: string; excerpt: string; content: string; tags: string[]; imageUrl?: string }> {
  const prompt = `You are a professional PR writer for ${CasuranceBrand.companyName}. Generate a formal press release based on this title: "${title}"

Category: ${category}
Location: ${location}

${getBrandInstructions()}

COMPANY BOILERPLATE (Must use EXACTLY in the "Boilerplate" section):
${CasuranceBrand.boilerplate}

MEDIA CONTACT (Must use EXACTLY as shown below):
${getMediaContactBlock()}

Requirements:
1. Follow standard press release format
2. Write in third person, professional news style
3. Include optional compelling subtitle
4. Strong lead paragraph with key facts
5. Include realistic executive quotes
6. 400-600 words
7. Be carrier-agnostic
8. Create an engaging excerpt (150-200 characters)
9. Suggest 3-5 relevant tags
10. Use markdown formatting
11. ALWAYS end with "## Boilerplate" section using the exact boilerplate text provided
12. ALWAYS end with "## Media Contact" section using the exact contact info provided
13. DO NOT invent company names, email addresses, or phone numbers

Return ONLY a valid JSON object with this structure:
{
  "subtitle": "Optional compelling subtitle",
  "excerpt": "Brief excerpt",
  "content": "Full press release content in markdown format",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  try {
    const [imageUrl, aiResponse] = await Promise.all([
      getStockImage(title),
      openai.chat.completions.create({
        model: "gpt-5",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_completion_tokens: 4096,
      })
    ]);

    const content = aiResponse.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content generated");
    }

    const result = JSON.parse(content);
    
    // Validate and sanitize brand compliance
    result.content = ensureBrandCompliance(result.content);
    result.excerpt = ensureBrandCompliance(result.excerpt);
    if (result.subtitle) {
      result.subtitle = ensureBrandCompliance(result.subtitle);
    }
    
    result.imageUrl = imageUrl;
    return result;
  } catch (error) {
    console.error("Error generating draft content:", error);
    throw error;
  }
}

export async function improveContent(content: string, category: string): Promise<{ content: string }> {
  const prompt = `You are a professional PR writer and editor for ${CasuranceBrand.companyName}. Improve the following press release content to make it more compelling, newsworthy, and professional.

Category: ${category}

${getBrandInstructions()}

Current content:
${content}

Requirements:
1. Maintain standard press release format
2. Enhance clarity and news value
3. Improve professional tone
4. Add impact and urgency where appropriate
5. Ensure carrier-agnostic language
6. Keep markdown formatting
7. Verify all contact information uses ONLY ${CasuranceBrand.companyName} details (${CasuranceBrand.phoneTollFree}, ${CasuranceBrand.phoneLocal}, emails @${CasuranceBrand.emailDomain})
8. Remove any incorrect company names, phone numbers, or email addresses
9. If there's a boilerplate section, ensure it accurately represents ${CasuranceBrand.companyName}

Return ONLY a valid JSON object with this structure:
{
  "content": "Improved press release content in markdown format"
}`;

  try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 4096,
    });

    const responseContent = aiResponse.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No content generated");
    }

    const result = JSON.parse(responseContent);
    
    // Validate and sanitize brand compliance
    result.content = ensureBrandCompliance(result.content);
    
    return result;
  } catch (error) {
    console.error("Error improving content:", error);
    throw error;
  }
}

export async function suggestTags(title: string, content: string, category: string): Promise<{ tags: string[] }> {
  const prompt = `You are a commercial insurance PR expert. Analyze the following press release and suggest 3-5 highly relevant tags for categorization and SEO.

Title: ${title}
Category: ${category}
Content preview: ${content.substring(0, 500)}...

Requirements:
1. Tags should be specific to commercial insurance and news
2. Include both broad and specific terms
3. Use lowercase
4. Focus on newsworthy keywords
5. Consider media and SEO value

Return ONLY a valid JSON object with this structure:
{
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`;

  try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 512,
    });

    const responseContent = aiResponse.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No tags generated");
    }

    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Error suggesting tags:", error);
    throw error;
  }
}
