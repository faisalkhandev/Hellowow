"use server";

import { WriteContentOptions } from "@/types/writeTypes";

import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type ContentType =
  | "essay"
  | "governing_jurisdiction"
  | "content_improver"
  | "tone_of_voice"
  | "paragraph_writer"
  | "paragraph_completer"
  | "story_generator"
  | "grammar_fixes"
  | "content_summarizer"
  | "sentence_rewriter"
  | "article_writer"
  | "youtube_script_writer"
  | "instagram_caption_generator"
  | "paragraph_rewriter"
  | "explain_topic"
  | "content_shortener"
  | "translate"
  | "title_rewriter"
  | "linkedin_post_generator"
  | "seo_optimized_blog_post"
  | "business_name_generator"
  | "blog_post_ideas"
  | "paraphrase"
  | "business_plan_generator"
  | "cold_email_writer"
  | "rephraser"
  | "article_rewriter"
  | "meta_description_generator"
  | "blog_outline_generator"
  | "content_planner"
  | "real_estate_description_generator"
  | "content_brief_generator"
  | "post_writer"
  | "pdf_summarizer"
  | "content_detector"
  | "twitter_post_generator"
  | "slogan_generator"
  | "instagram_story_ideas"
  | "tiktok_script_writer"
  | "facebook_ad_headline_generator"
  | "trivia_generator"
  | "press_release_generator"
  | "faq_generator"
  | "podcast_script_writer"
  | "blog_post_rewriter"
  | "poll_generator"
  | "landing_page_copy_generator"
  | "bill_of_sale_generator"
  | "purchase_agreement_generator"
  | "nda_generator"
  | "privacy_policy_generator"
  | "youtube_summary";

// Function to create system messages based on content type
const createSystemMessage = (type: ContentType, options: WriteContentOptions): string => {
  const {
    topic,
    tone = "neutral",
    language = "English",
    education_level,
    numSentences,
    url,
    length,
    houseDetail,
    tweetCount,
    address,
    businessName,
    from,
    company,
    purpose,
    buyerName,
    sellerName,
    itemBeingSold,
    purchasePrice,
    purchaseMethod,
    governingJurisdiction,
    otherInfo,
    deliveryDate,
    disclosingParty,
    receivingParty,
    websiteUrl,
    no_of_questions,
    no_of_answers,
    difficulty,
    pollQuestion,
    targetAudience,
    isquestionprovided,
  } = options;

  const baseMessage = `You are Nifa AI, a helpful AI assistant. You specialize in generating creative and engaging content. Please respond to the following topic in a ${tone} tone. Make sure your response is well-structured and engaging. Format your response using Markdown for better readability. You are an expert writer. Create a well-structured that is both informative and engaging. 
          Format the content with proper HTML structure following these rules:
          
          1. Start with a proper introduction that hooks the reader
          2. Use descriptive and engaging section headings
          3. Include relevant examples and explanations
          4. End with a strong conclusion
          5. Format the content using these HTML tags:
             - <h1> for the main title (use only once)
             - <h2> for main sections
             - <h3> for subsections
             - <p> for paragraphs
             - <ul> or <ol> with <li> for lists
             - <strong> for emphasis
          
          Do not use any markdown, backticks, or code blocks.
          Ensure proper spacing between sections.
          Make the content easy to read and scan.\n\n`;

  switch (type) {
    case "essay":
      return `${baseMessage} Respond to the following essay topic: **${topic}**. This should be suitable for an education level of **${education_level}** and consist of approximately **${numSentences}** sentences.`;
    case "content_improver":
      return `${baseMessage} Improve the following content with a tone of **${tone}**: **${topic}**.`;
    case "paragraph_writer":
      return `${baseMessage} Write a paragraph about: **${topic}** in a tone of **${tone}**.`;
    case "story_generator":
      return `${baseMessage} Generate a story based on the topic: **${topic}**. Number of paragraphs: **${numSentences}**.`;
    case "grammar_fixes":
      return `${baseMessage} Fix the grammar in the following text: **${topic}**.`;
    case "tone_of_voice":
      return `${baseMessage} Adjust the tone of the following text to match the ${tone} tone: **${topic}**.`;
    case "content_summarizer":
      return `${baseMessage} Summarize the content found at the following URL: **${url}**.`;
    case "sentence_rewriter":
      return `${baseMessage} Rewrite the sentence: **${topic}**.`;
    case "article_writer":
      return `${baseMessage} Write a detailed article about: **${topic}**. The article should include clear headings should be bold, subheadings, and well-organized sections with comprehensive information. Your response should be properly formatted.`;
    case "youtube_script_writer":
      return `${baseMessage} Write a YouTube script on: **${topic}**. Length: **${length}**.`;
    case "instagram_caption_generator":
      return `${baseMessage} Generate an Instagram caption for: **${topic}**.`;
    case "paragraph_rewriter":
      return `${baseMessage} Rewrite the paragraph about: **${topic}**.`;
    case "explain_topic":
      return `${baseMessage} Explain the topic so a young person can understand: **${topic}**.`;
    case "content_shortener":
      return `${baseMessage} Shorten the content found at this URL: **${url}**. Length: **${length}**.`;
    case "translate":
      return `${baseMessage} Translate the topic: **${topic}** into **${language}**.`;
    case "title_rewriter":
      return `${baseMessage} Rewrite the title: **${topic}**.`;
    case "linkedin_post_generator":
      return `${baseMessage} Generate a LinkedIn post about: **${topic}**.`;
    case "seo_optimized_blog_post":
      return `${baseMessage} Generate an SEO optimized blog post on: **${topic}**.`;
    case "business_name_generator":
      return `${baseMessage} Generate a business name for the idea: **${topic}**.`;
    case "blog_post_ideas":
      return `${baseMessage} Generate blog post ideas related to: **${topic}**. Target audience: **${targetAudience}**.`;
    case "paraphrase":
      return `${baseMessage} Paraphrase the following content: **${topic}**.`;
    case "business_plan_generator":
      return `${baseMessage} Generate a business plan for: **${topic}**.`;
    case "cold_email_writer":
      return `${baseMessage} Write a cold email about: **${topic}** from **${from}**.`;
    case "rephraser":
      return `${baseMessage} Rephrase the content while preserving bold and heading formats: **${topic}**.`;
    case "article_rewriter":
      return `${baseMessage} Rewrite the article: **${topic}** while preserving format.`;
    case "meta_description_generator":
      return `${baseMessage} Generate a meta description for: **${topic}**.`;
    case "blog_outline_generator":
      return `${baseMessage} Create an outline for a blog on: **${topic}**.`;
    case "content_planner":
      return `${baseMessage} Generate a content plan for the topic: **${topic}**.`;
    case "real_estate_description_generator":
      return `${baseMessage} Generate a real estate description for a property at **${address}** with details: **${houseDetail}**.`;
    case "content_brief_generator":
      return `${baseMessage} Generate a content brief for: **${topic}**.`;
    case "post_writer":
      return `${baseMessage} Write a social media post about: **${topic}**.`;
    case "pdf_summarizer":
      return `${baseMessage} Summarize the provided PDF document ${topic} in **${language}** more efficiently and correctly and shortly.and not in html structure it should be simple in text `;
    case "content_detector":
      return `${baseMessage} Detect AI-generated content in the text: **${topic}**.`;
    case "twitter_post_generator":
      return `${baseMessage} Generate a Twitter post on **${topic}** with a **${tone}** tone. This will consist of ${tweetCount} tweet.`;
    case "slogan_generator":
      return `${baseMessage} Generate a slogan for the business: **${businessName}**, describing: **${topic}**.`;
    case "instagram_story_ideas":
      return `${baseMessage} Generate Instagram story ideas for: **${topic}**.`;
    case "tiktok_script_writer":
      return `${baseMessage} Write a TikTok script on: **${topic}**. Tone: **${tone}**.`;
    case "facebook_ad_headline_generator":
      return `${baseMessage} Generate a Facebook ad headline for **${company}**. It offers: **${purpose}**.`;
    case "trivia_generator":
      return `${baseMessage} Generate **${no_of_questions}** trivia questions with **${no_of_answers}** answers on **${topic}**. Difficulty level: **${difficulty}**.`;
    case "press_release_generator":
      return `${baseMessage} Write a press release for **${company}**. Purpose: **${purpose}**.`;
    case "faq_generator":
      return `${baseMessage} Generate frequently asked questions for: **${topic}**.`;
    case "podcast_script_writer":
      return `${baseMessage} Generate a podcast script for **${topic}** in a **${tone}** tone.`;
    case "blog_post_rewriter":
      return `${baseMessage} Rewrite the blog post on: **${topic}**.`;
    case "poll_generator":
      return `${baseMessage} Generate a poll for **${topic}**. **${pollQuestion}** number of questions required.  **${no_of_answers}** number of answers required.`;
    case "landing_page_copy_generator":
      return `${baseMessage} Generate landing page copy for **${company}**. Purpose: **${purpose}**.`;
    case "bill_of_sale_generator":
      return `${baseMessage} Generate a Bill of Sale. Buyer: **${buyerName}**. Seller: **${sellerName}**. Item: **${itemBeingSold}**. Price: **${purchasePrice}**. Purchase Method: **${purchaseMethod}**. Governing Jurisdiction: **${governingJurisdiction}**. Other Information: **${otherInfo}**.`;
    case "purchase_agreement_generator":
      return `${baseMessage} Generate a purchase agreement. Buyer: **${buyerName}**. Seller: **${sellerName}**. Item: **${itemBeingSold}**. Jurisdiction: **${governingJurisdiction}**. Price: **${purchasePrice}**. Delivery Date: **${deliveryDate}**.`;
    case "nda_generator":
      return `${baseMessage} Generate a non-disclosure agreement. Disclosing Party: **${disclosingParty}**. Receiving Party: **${receivingParty}**.`;
    case "privacy_policy_generator":
      return `${baseMessage} Generate a privacy policy for **${company}**. Website: **${websiteUrl}**. Address: **${address}**.`;
    case "youtube_summary":
      return `${baseMessage} Generate a summary for this YouTube video URL: **${url}**.`;
    default:
      return `${baseMessage} Provide paragraph in given tone ${tone}.`;
  }
};

// Function to generate content based on the type and options
export const generateContent = async (type: ContentType, options: WriteContentOptions) => {
  const message = createSystemMessage(type, options);
  console.log("message is:", message);

  let userMessage = `"${options.topic || 'No specific topic'}". Structure it with proper HTML formatting and make it engaging for readers. Include practical examples and insights where relevant.`;

  switch (type) {
    case "essay":
      userMessage = `Write an essay on the topic: "${options.topic}". Ensure it is suitable for an education level of "${options.education_level}" and consists of approximately "${options.numSentences}" sentences.`;
      break;
    case "content_improver":
      userMessage = `Improve the following content: "${options.topic}".`;
      break;
    case "paragraph_writer":
      userMessage = `Write a paragraph about: "${options.topic}".`;
      break;
    case "story_generator":
      userMessage = `Generate a story based on the topic: "${options.topic}". Number of paragraphs: "${options.numSentences}".`;
      break;
    case "grammar_fixes":
      userMessage = `Fix the grammar in the following text: "${options.topic}".`;
      break;
    case "tone_of_voice":
      userMessage = `Adjust the tone of the following text to match the "${options.tone}" tone: "${options.topic}".`;
      break;
    case "content_summarizer":
      userMessage = `Summarize the content found at the following URL: "${options.url}".`;
      break;
    case "sentence_rewriter":
      userMessage = `Rewrite the sentence: "${options.topic}".`;
      break;
    case "article_writer":
      userMessage = `Write a detailed article about: "${options.topic}".`;
      break;
    case "youtube_script_writer":
      userMessage = `Write a YouTube script on: "${options.topic}". Length: "${options.length}".Tone:"${options.tone}"`;
      break;
    case "instagram_caption_generator":
      userMessage = `Generate an Instagram caption for: "${options.topic}".`;
      break;
    case "paragraph_rewriter":
      userMessage = `Rewrite the paragraph about: "${options.topic}".`;
      break;
    case "explain_topic":
      userMessage = `Explain the topic so a young person can understand: "${options.topic}".`;
      break;
    case "content_shortener":
      userMessage = `Shorten the content found at this URL: "${options.url}". Length: "${options.length}".`;
      break;
    case "translate":
      userMessage = `Translate the topic: "${options.topic}" into "${options.language}".`;
      break;
    case "title_rewriter":
      userMessage = `Rewrite the title: "${options.topic}".`;
      break;
    case "linkedin_post_generator":
      userMessage = `Generate a LinkedIn post about: "${options.topic}".`;
      break;
    case "seo_optimized_blog_post":
      userMessage = `Generate an SEO optimized blog post on: "${options.topic}".`;
      break;
    case "business_name_generator":
      userMessage = `Generate a business name for the idea: "${options.topic}".`;
      break;
    case "blog_post_ideas":
      userMessage = `Generate blog post ideas related to: "${options.topic}". Target audience: "${options.targetAudience}".`;
      break;
    case "paraphrase":
      userMessage = `Paraphrase the following content: "${options.topic}".`;
      break;
    case "business_plan_generator":
      userMessage = `Generate a business plan for: "${options.topic}".`;
      break;
    case "cold_email_writer":
      userMessage = `Write a cold email about: "${options.topic}" from "${options.from}".`;
      break;
    case "rephraser":
      userMessage = `Rephrase the content while preserving bold and heading formats: "${options.topic}".`;
      break;
    case "article_rewriter":
      userMessage = `Rewrite the article: "${options.topic}" while preserving format.`;
      break;
    case "meta_description_generator":
      userMessage = `Generate a meta description for: "${options.topic}".`;
      break;
    case "blog_outline_generator":
      userMessage = `Create an outline for a blog on: "${options.topic}".`;
      break;
    case "content_planner":
      userMessage = `Generate a content plan for the topic: "${options.topic}".`;
      break;
    case "real_estate_description_generator":
      userMessage = `Generate a real estate description for a property at "${options.address}" with details: "${options.houseDetail}".`;
      break;
    case "content_brief_generator":
      userMessage = `Generate a content brief for: "${options.topic}".`;
      break;
    case "post_writer":
      userMessage = `Write a social media post about: "${options.topic}".`;
      break;
    case "pdf_summarizer":
      userMessage = `Summarize the provided PDF document "${options.topic}" in "${options.language}" more efficiently and correctly and shortly.`;
      break;
    case "content_detector":
      userMessage = `Detect AI-generated content in the text: "${options.topic}".`;
      break;
    case "twitter_post_generator":
      userMessage = `Generate a Twitter post on "${options.topic}" with a "${options.tone}" tone. This will consist of ${options.tweetCount} tweets.`;
      break;
    case "slogan_generator":
      userMessage = `Generate a slogan for the business: "${options.businessName}", describing: "${options.topic}".`;
      break;
    case "instagram_story_ideas":
      userMessage = `Generate Instagram story ideas for: "${options.topic}".`;
      break;
    case "tiktok_script_writer":
      userMessage = `Write a TikTok script on: "${options.topic}". Tone: "${options.tone}".`;
      break;
    case "facebook_ad_headline_generator":
      userMessage = `Generate a Facebook ad headline for "${options.company}". It offers: "${options.purpose}".`;
      break;
    case "trivia_generator":
      userMessage = `Generate ${options.no_of_questions} trivia questions with ${options.no_of_answers} answers on "${options.topic}". Difficulty level: "${options.difficulty}".`;
      break;
    case "press_release_generator":
      userMessage = `Write a press release for "${options.company}". Purpose: "${options.purpose}".`;
      break;
    case "faq_generator":
      userMessage = `Generate frequently asked questions for: "${options.topic}".`;
      break;
    case "podcast_script_writer":
      userMessage = `Generate a podcast script for "${options.topic}" in a "${options.tone}" tone.`;
      break;
    case "blog_post_rewriter":
      userMessage = `Rewrite the blog post on: "${options.topic}".`;
      break;
      case "poll_generator":
        userMessage = `Generate a poll for "${options.topic}". ${
          options.isquestionprovided 
            ? `If a question is provided, use "${options.pollQuestion}".` 
            : `Generate a question based on the topic "${options.topic}".`
        } Number of answers required: "${options.no_of_answers}".`;
        break;
    case "landing_page_copy_generator":
      userMessage = `Generate landing page copy for "${options.company}". Purpose: "${options.purpose}".`;
      break;
    case "bill_of_sale_generator":
      userMessage = `Generate a Bill of Sale. Buyer: "${options.buyerName}". Seller: "${options.sellerName}". Item: "${options.itemBeingSold}". Price: "${options.purchasePrice}". Purchase Method: "${options.purchaseMethod}". Governing Jurisdiction: "${options.governingJurisdiction}". Other Information: "${options.otherInfo}".`;
      break;
    case "purchase_agreement_generator":
      userMessage = `Generate a purchase agreement. Buyer: "${options.buyerName}". Seller: "${options.sellerName}". Item: "${options.itemBeingSold}". Jurisdiction: "${options.governingJurisdiction}". Price: "${options.purchasePrice}". Delivery Date: "${options.deliveryDate}".`;
      break;
    case "nda_generator":
      userMessage = `Generate a non-disclosure agreement. Disclosing Party: "${options.disclosingParty}". Receiving Party: "${options.receivingParty}".`;
      break;
    case "privacy_policy_generator":
      userMessage = `Generate a privacy policy for "${options.company}". Website: "${options.websiteUrl}". Address: "${options.address}".`;
      break;
    case "youtube_summary":
      userMessage = `Generate a summary for this YouTube video URL: "${options.url}".`;
      break;
    default:
      userMessage = `Provide a paragraph in the given tone "${options.tone}".`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: message
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content || "No content generated";
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content. Please try again later.");
  }
};
export async function continueWriting(
  existingContent: string,
  textAmount: string,
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  if (!existingContent) {
    throw new Error("No existing content to continue from");
  }

  let instruction = "";
  let maxTokens = 2000;

  switch (textAmount) {
    case "A Sentence":
      instruction =
        "Continue this text with one well-crafted sentence that naturally flows from the existing content.";
      maxTokens = 100;
      break;
    case "A Few Sentences":
      instruction =
        "Continue this text with 2-3 sentences that naturally flow from the existing content.";
      maxTokens = 250;
      break;
    case "A Paragraph":
      instruction =
        "Continue this text with a full paragraph (4-5 sentences) that naturally flows from the existing content.";
      maxTokens = 500;
      break;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: `You are Nifa AI, a helpful AI assistant that specializes in continuing existing content.
                   
                   ${instruction}
                   Only provide the continuation - do not repeat or reference the existing content.
                   Make sure your response flows naturally from the existing text.
                   Format your response using Markdown if appropriate.Format the content with proper HTML structure following these rules:
          
          1. Start with a proper introduction that hooks the reader
          2. Use descriptive and engaging section headings
          3. Include relevant examples and explanations
          4. End with a strong conclusion
          5. Format the content using these HTML tags:
             - <h1> for the main title (use only once)
             - <h2> for main sections
             - <h3> for subsections
             - <p> for paragraphs
             - <ul> or <ol> with <li> for lists
             - <strong> for emphasis
          
          Do not use any markdown, backticks, or code blocks.
          Ensure proper spacing between sections.
          Make the content easy to read and scan.\n\n`,
        },
        {
          role: "user",
          content: `Existing content: "${existingContent}"\n\nPlease continue this content following the provided instructions.`,
        },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
      presence_penalty: 0.6,
      frequency_penalty: 0.6,
    });

    return response.choices[0].message.content || "No content generated";
  } catch (error) {
    console.error("Error continuing content:", error);
    throw new Error("Failed to continue writing. Please try again later.");
  }
}

export async function rewriteContent(
  content: string,
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  if (!content) {
    throw new Error("No content to rewrite");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: `You are Nifa AI, a helpful AI assistant that specializes in rewriting content.
                   Rewrite the following content.
                   Maintain the same meaning and key points, but express them in a fresh way.
                   Format your response using Markdown for better readability.
                    Format your response using Markdown if appropriate.Format the content with proper HTML structure following these rules:
          
          1. Start with a proper introduction that hooks the reader
          2. Use descriptive and engaging section headings
          3. Include relevant examples and explanations
          4. End with a strong conclusion
          5. Format the content using these HTML tags:
             - <h1> for the main title (use only once)
             - <h2> for main sections
             - <h3> for subsections
             - <p> for paragraphs
             - <ul> or <ol> with <li> for lists
             - <strong> for emphasis
          
          Do not use any markdown, backticks, or code blocks.
          Ensure proper spacing between sections.
          Make the content easy to read and scan.\n\n`,
        },
        {
          role: "user",
          content: `Please rewrite this content: "${content}"`,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
      presence_penalty: 0.6,
      frequency_penalty: 0.6,
    });

    return response.choices[0].message.content || "No content generated";
  } catch (error) {
    console.error("Error rewriting content:", error);
    throw new Error("Failed to rewrite content. Please try again later.");
  }
}





//blog



interface BlogIdea {
  title: string;
  type: "ai" | "search";
}

export async function generateIdeas(topic: string): Promise<{
  aiTitles: BlogIdea[];
  searchTitles: BlogIdea[];
}> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  if (!topic) {
    throw new Error("Please enter a topic");
  }

  try {
    // Generate AI titles
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content:
            "You are an expert blog title generator. Generate 3 creative, engaging, and SEO-friendly blog titles for the given topic. Format each title on a new line.",
        },
        {
          role: "user",
          content: `Generate 3 blog titles related to: ${topic}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const aiTitles =
      aiResponse.choices[0].message.content
        ?.split("\n")
        .filter((title) => title.trim())
        .map((title) => ({
          title: title.replace(/^\d+\.\s*/, "").trim(),
          type: "ai" as const,
        })) || [];

    // Generate search-based titles
    const searchResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content:
            "You are an SEO expert. Generate 3 search-optimized blog titles based on common search patterns and keywords for the given topic. Format each title on a new line.",
        },
        {
          role: "user",
          content: `Generate 3 SEO-optimized blog titles related to: ${topic}`,
        },
      ],
      temperature: 0.6,
      max_tokens: 200,
    });

    const searchTitles =
      searchResponse.choices[0].message.content
        ?.split("\n")
        .filter((title) => title.trim())
        .map((title) => ({
          title: title.replace(/^\d+\.\s*/, "").trim(),
          type: "search" as const,
        })) || [];

    return {
      aiTitles,
      searchTitles,
    };
  } catch (error) {
    console.error("Error generating ideas:", error);
    throw new Error("Failed to generate ideas. Please try again later.");
  }
}

export async function generateArticle(title: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  if (!title) {
    throw new Error("Please select a title");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: `You are an expert article writer. Create a well-structured 1500-word article that is both informative and engaging. 
          Format the content with proper HTML structure following these rules:
          
          1. Start with a proper introduction that hooks the reader
          2. Use descriptive and engaging section headings
          3. Include relevant examples and explanations
          4. End with a strong conclusion
          5. Format the content using these HTML tags:
             - <h1> for the main title (use only once)
             - <h2> for main sections
             - <h3> for subsections
             - <p> for paragraphs
             - <ul> or <ol> with <li> for lists
             - <strong> for emphasis
          
          Do not use any markdown, backticks, or code blocks.
          Ensure proper spacing between sections.
          Make the content easy to read and scan.`,
        },
        {
          role: "user",
          content: `Create a comprehensive article with this title: "${title}". 
          Structure it with proper HTML formatting and make it engaging for readers.
          Include practical examples and insights where relevant.`,
        },
      ],
      temperature: 0.6,
      max_tokens: 2000,
    });

    let content = response.choices[0].message.content || "No content generated";

    // Clean up any potential markdown or unwanted formatting
    content = content
      .replace(/```/g, "") // Remove code blocks
      .replace(/`/g, "") // Remove inline code formatting
      .replace(/\n{3,}/g, "\n\n") // Normalize spacing
      .trim();

    // Ensure content starts with proper HTML
    if (!content.toLowerCase().includes("<h1>")) {
      content = `<h1>${title}</h1>\n\n${content}`;
    }

    // Add wrapper for consistent styling
    content = `<div class="article-content">${content}</div>`;

    return content;
  } catch (error) {
    console.error("Error generating article:", error);
    throw new Error("Failed to generate article. Please try again later.");
  }
}
