import OpenAI from "openai";
import { CasuranceBrand, getBrandInstructions } from "./brand";
import { ensureBrandCompliance } from "./brand-validator";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export interface BlogPostContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl?: string;
}

// Fetch stock image based on topic
async function getStockImage(topic: string): Promise<string | undefined> {
  const apiKey = process.env.PEXELS_API_KEY;
  
  if (!apiKey) {
    console.warn("PEXELS_API_KEY not configured - blog posts will be generated without images");
    return undefined;
  }

  try {
    const searchQuery = topic
      .replace(/insurance/gi, "business")
      .replace(/coverage/gi, "professional")
      .replace(/liability/gi, "agreement")
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

const commercialInsuranceTopics = [
  "Understanding Commercial Auto Insurance Coverage Requirements",
  "Workers Compensation Insurance: What Every Business Needs to Know",
  "General Liability Insurance for Small Businesses",
  "Cyber Insurance: Protecting Your Business from Digital Threats",
  "Professional Liability Insurance vs General Liability",
  "Commercial Property Insurance: Coverage and Exclusions",
  "Employment Practices Liability Insurance (EPLI) Explained",
  "Insurance for Transportation and Logistics Companies",
  "Restaurant and Hospitality Insurance: Essential Coverage Types",
  "Construction Insurance: Managing Risk on the Job Site",
  "Umbrella Policies: Additional Liability Protection for Businesses",
  "Insurance Certificates: When and How to Request Them",
  "Business Interruption Insurance: Protecting Revenue During Disruptions",
  "Directors and Officers (D&O) Insurance Basics",
  "Product Liability Insurance for Manufacturers",
  "Fleet Insurance: Managing Multiple Vehicles Efficiently",
  "Self-Storage Facility Insurance Requirements",
  "Film Production Insurance: Coverage for Creative Projects",
  "NEMT and Medical Transportation Insurance Essentials",
  "Rideshare and TNC Insurance: Coverage Gaps and Solutions"
];

const categories = [
  "Commercial Insurance Basics",
  "Industry-Specific Coverage",
  "Risk Management",
  "Insurance News & Updates",
  "Claims & Policy Management"
];

export async function generateBlogPost(topic?: string, category?: string): Promise<BlogPostContent> {
  const selectedTopic = topic || commercialInsuranceTopics[Math.floor(Math.random() * commercialInsuranceTopics.length)];
  const selectedCategory = category || categories[Math.floor(Math.random() * categories.length)];

  const prompt = `You are a commercial insurance expert writing for ${CasuranceBrand.companyName}, a professional commercial insurance agency. Write a comprehensive, informative blog post about: "${selectedTopic}"

Category: ${selectedCategory}

${getBrandInstructions()}

About ${CasuranceBrand.companyName}:
${CasuranceBrand.about}

Requirements:
1. Write in a professional, authoritative tone suitable for business decision-makers
2. Include practical, actionable information
3. Use proper insurance industry terminology
4. Structure the content with clear sections using markdown headings (##, ###)
5. Keep the content between 800-1200 words
6. Be carrier-agnostic - do not mention specific insurance carriers by name
7. Include an engaging excerpt (150-200 characters)
8. Suggest 3-5 relevant tags
9. Generate a URL-friendly slug
10. If mentioning contact information, use ONLY the ${CasuranceBrand.companyName} details provided above
11. Do NOT invent company names, phone numbers, or email addresses

Return ONLY a valid JSON object with this exact structure:
{
  "title": "The blog post title",
  "slug": "url-friendly-slug",
  "excerpt": "Brief compelling excerpt",
  "content": "Full blog post content in markdown format",
  "category": "${selectedCategory}",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  try {
    // Fetch stock image and generate blog post in parallel
    const [imageUrl, aiResponse] = await Promise.all([
      getStockImage(selectedTopic),
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      openai.chat.completions.create({
        model: "gpt-5",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_completion_tokens: 8192,
      })
    ]);

    const content = aiResponse.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content generated");
    }

    const blogPost = JSON.parse(content) as BlogPostContent;
    
    // Validate and sanitize brand compliance
    blogPost.content = ensureBrandCompliance(blogPost.content);
    blogPost.excerpt = ensureBrandCompliance(blogPost.excerpt);
    
    blogPost.imageUrl = imageUrl;
    return blogPost;
  } catch (error) {
    console.error("Error generating blog post:", error);
    throw error;
  }
}

export function getTopics(): string[] {
  return commercialInsuranceTopics;
}

export function getRandomTopic(): string {
  return commercialInsuranceTopics[Math.floor(Math.random() * commercialInsuranceTopics.length)];
}

export function getCategories(): string[] {
  return categories;
}

// Generate draft content based on title and category
export async function generateDraftContent(title: string, category: string): Promise<{ excerpt: string; content: string; tags: string[]; imageUrl?: string }> {
  const prompt = `You are a commercial insurance expert writing for ${CasuranceBrand.companyName}. Generate a comprehensive blog post draft based on this title: "${title}"

Category: ${category}

${getBrandInstructions()}

About ${CasuranceBrand.companyName}:
${CasuranceBrand.about}

Requirements:
1. Write in a professional, authoritative tone for business decision-makers
2. Include practical, actionable information
3. Use proper insurance industry terminology
4. Structure with clear sections using markdown headings (##, ###)
5. 800-1200 words
6. Be carrier-agnostic - no specific carrier names
7. Create an engaging excerpt (150-200 characters)
8. Suggest 3-5 relevant tags
9. If mentioning contact information, use ONLY the ${CasuranceBrand.companyName} details provided above
10. Do NOT invent company names, phone numbers, or email addresses

Return ONLY a valid JSON object with this structure:
{
  "excerpt": "Brief compelling excerpt",
  "content": "Full blog post content in markdown format",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  try {
    const [imageUrl, aiResponse] = await Promise.all([
      getStockImage(title),
      openai.chat.completions.create({
        model: "gpt-5",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_completion_tokens: 8192,
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
    
    result.imageUrl = imageUrl;
    return result;
  } catch (error) {
    console.error("Error generating draft content:", error);
    throw error;
  }
}

// Improve existing content
export async function improveContent(content: string, category: string): Promise<{ content: string }> {
  const prompt = `You are a commercial insurance expert and professional editor working for ${CasuranceBrand.companyName}. Improve the following blog post content to make it more engaging, professional, and valuable for business decision-makers.

Category: ${category}

${getBrandInstructions()}

Current content:
${content}

Requirements:
1. Maintain the same general structure and key points
2. Enhance clarity and readability
3. Add relevant insurance terminology where appropriate
4. Improve transitions between sections
5. Make it more engaging while staying professional
6. Ensure carrier-agnostic language
7. If contact information is mentioned, verify it uses ONLY ${CasuranceBrand.companyName} details (${CasuranceBrand.phoneTollFree}, emails @${CasuranceBrand.emailDomain})
8. Remove any incorrect company names, phone numbers, or email addresses
9. Return the improved content in markdown format

Return ONLY a valid JSON object with this structure:
{
  "content": "Improved blog post content in markdown format"
}`;

  try {
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 8192,
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

// Suggest relevant tags
export async function suggestTags(title: string, content: string, category: string): Promise<{ tags: string[] }> {
  const prompt = `You are a commercial insurance SEO expert. Analyze the following blog post and suggest 3-5 highly relevant tags that will help with discoverability and categorization.

Title: ${title}
Category: ${category}
Content preview: ${content.substring(0, 500)}...

Requirements:
1. Tags should be specific to commercial insurance topics
2. Include both broad and specific terms
3. Use lowercase
4. Focus on industry-relevant keywords
5. Consider SEO value

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
