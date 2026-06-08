import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

let model = null;

try {
  if (apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);

    model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
  }
} catch (error) {
  console.error("Gemini Initialization Error:", error);
}

export const getGeminiResponse = async ({
  question,
  messages,
  products,
  categories,
  favItems,
}) => {
  try {
    if (!model) {
      return {
        success: false,
        text: "AI assistant is currently unavailable.",
      };
    }

    const history = messages
      .slice(-10)
      .map((m) => `${m.sender}: ${m.text}`)
      .join("\n");

    const catalog = products
      .slice(0, 50)
      .map(
        (product) =>
          `${product.title} | ₹${product.price} | ${product.category}`,
      )
      .join("\n");

    const prompt = `
You are ArtVibes Shopping Assistant.

About ArtVibes:
- Online shopping platform
- Categories include paintings, frames and art products
- Users can browse products
- Users can search products
- Users can add products to favourites
- Users can add products to cart
- Users can place orders

Current Categories:
${categories.map((c) => c.title).join(", ")}

Favourite Count:
${favItems.length}

Available Products:
${catalog}

Recent Conversation:
${history}

Instructions:
- Be friendly
- Be concise
- Keep replies under 120 words
- Recommend products from the available catalog whenever possible
- If asked for gift ideas, suggest products from catalog
- If asked for decor ideas, recommend suitable categories/products
- Use bullet points when helpful
- Do not invent products that do not exist in catalog

User Question:
${question}
`;

    const result = await model.generateContent(prompt);

    const responseText = result?.response?.text?.();

    return {
      success: true,
      text: responseText || "I couldn't generate a response.",
    };
  } catch (error) {
    console.error("Gemini Error:", error);

    const errorMessage = error?.message?.toLowerCase() || "";

    /* ---------------- QUOTA EXCEEDED ---------------- */

    if (errorMessage.includes("429") || errorMessage.includes("quota")) {
      return {
        success: false,
        text: "⚠️ AI quota has been reached. I can still help with products, categories, favourites and orders.",
      };
    }

    /* ---------------- INVALID API KEY ---------------- */

    if (
      errorMessage.includes("api key") ||
      errorMessage.includes("permission") ||
      errorMessage.includes("403")
    ) {
      return {
        success: false,
        text: "⚠️ AI assistant configuration error. Please check Gemini API settings.",
      };
    }

    /* ---------------- NETWORK ERROR ---------------- */

    if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      return {
        success: false,
        text: "⚠️ Unable to reach AI service. Please check your internet connection.",
      };
    }

    /* ---------------- GENERIC ERROR ---------------- */

    return {
      success: false,
      text: "⚠️ AI assistant is temporarily unavailable. You can still use product search, categories, favourites and cart features.",
    };
  }
};
