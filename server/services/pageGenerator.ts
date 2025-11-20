import OpenAI from "openai";
import { getBrandInstructions } from "../lib/brand";
import { validateBrandCompliance, ensureBrandCompliance } from "../lib/brand-validator";

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is required for AI page generation");
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export interface GeneratePageParams {
  topic: string;
  targetAudience?: string;
  keywords?: string[];
  includeCallToAction?: boolean;
}

export interface GeneratedPage {
  title: string;
  slug: string;
  metaDescription: string;
  content: string;
}

export async function generatePage(params: GeneratePageParams): Promise<GeneratedPage> {
  const { topic, targetAudience = "commercial business owners", keywords = [], includeCallToAction = true } = params;

  const keywordsText = keywords.length > 0 ? `Focus on these keywords: ${keywords.join(", ")}.` : "";
  const ctaText = includeCallToAction
    ? "Include a clear call-to-action encouraging readers to contact Casurance for a quote or consultation."
    : "";

  const prompt = `You are a professional content writer for Casurance, a commercial insurance agency.

${getBrandInstructions()}

Write a comprehensive, SEO-optimized web page about: "${topic}"

Target Audience: ${targetAudience}
${keywordsText}
${ctaText}

Requirements:
1. Create an engaging, professional title (60-70 characters)
2. Write a compelling meta description (150-160 characters)
3. Generate a URL-friendly slug based on the title
4. Write comprehensive, well-structured content (800-1200 words) in HTML format
5. Use proper HTML formatting: <h2>, <h3>, <p>, <ul>, <ol>, <strong>, <em> tags
6. Include relevant insurance industry information and best practices
7. Maintain a professional, trustworthy tone
8. Be carrier-agnostic - never mention specific insurance carriers
9. Use ONLY Casurance branding information provided above
10. Make content actionable and valuable for commercial business owners

Return the response as JSON with this structure:
{
  "title": "Page Title Here",
  "slug": "url-friendly-slug",
  "metaDescription": "Meta description here",
  "content": "HTML content here"
}`;

  try {
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert content writer specializing in commercial insurance. Generate professional, SEO-optimized web pages. Always return valid JSON responses.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error("No response from AI");
    }

    const generatedPage = JSON.parse(responseText) as GeneratedPage;

    // Validate and sanitize brand information in all text fields
    const titleValidation = validateBrandCompliance(generatedPage.title);
    const contentValidation = validateBrandCompliance(generatedPage.content);
    const metaValidation = validateBrandCompliance(generatedPage.metaDescription || "");

    // Collect all errors
    const allErrors = [
      ...titleValidation.errors,
      ...contentValidation.errors,
      ...metaValidation.errors,
    ];

    if (allErrors.length > 0) {
      console.warn("Brand validation warnings:", allErrors);
      // Auto-sanitize instead of throwing errors
    }

    // Return sanitized content
    return {
      title: ensureBrandCompliance(generatedPage.title),
      slug: generatedPage.slug,
      metaDescription: ensureBrandCompliance(generatedPage.metaDescription || ""),
      content: ensureBrandCompliance(generatedPage.content),
    };
  } catch (error: any) {
    console.error("Error generating page:", error);
    throw new Error(`Failed to generate page: ${error.message}`);
  }
}
