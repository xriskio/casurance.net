import OpenAI from "openai";

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

  const prompt = `You are a commercial insurance expert writing for a professional insurance agency blog. Write a comprehensive, informative blog post about: "${selectedTopic}"

Category: ${selectedCategory}

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
    // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 8192,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content generated");
    }

    const blogPost = JSON.parse(content) as BlogPostContent;
    return blogPost;
  } catch (error) {
    console.error("Error generating blog post:", error);
    throw error;
  }
}

export function getRandomTopic(): string {
  return commercialInsuranceTopics[Math.floor(Math.random() * commercialInsuranceTopics.length)];
}

export function getCategories(): string[] {
  return categories;
}
