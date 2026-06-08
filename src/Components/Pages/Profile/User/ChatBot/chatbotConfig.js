export const SUGGESTIONS = [
  "Show all products",
  "Show favourites",
  "Show orders",
  "Products under 1000",
  "Cheapest products",
  "Frames",
  "Paintings",
];

export const INITIAL_MESSAGES = [
  {
    id: "welcome-message",
    sender: "bot",
    text: `Hi 👋 I'm ArtVibes Assistant.

I can help you with:
• Product search
• Categories
• Favourites
• Orders
• Product recommendations

Try asking:
• Show all products
• Products under 1000
• Show favourites
• Cheapest products`,
    timestamp: new Date().toISOString(),
  },
];

export const CHATBOT_TITLE = "ArtVibes Assistant";

export const CHATBOT_PLACEHOLDER = "Ask about products, orders, favourites...";

export const MAX_CHAT_HISTORY = 100;

export const GEMINI_FALLBACK_MESSAGE =
  "⚠️ AI assistant is currently unavailable. I can still help with products, categories, favourites and orders.";

export const QUICK_ACTIONS = [
  {
    label: "❤️ Favourites",
    message: "Show favourites",
  },
  {
    label: "📦 Orders",
    message: "Show orders",
  },
  {
    label: "🛍️ Products",
    message: "Show all products",
  },
  {
    label: "💰 Under ₹1000",
    message: "Products under 1000",
  },
];
