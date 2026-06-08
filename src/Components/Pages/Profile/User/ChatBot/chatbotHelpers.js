export const createMessage = (sender, text) => ({
  id: Date.now().toString() + Math.random().toString(36).slice(2),

  sender,

  text,

  timestamp: new Date().toISOString(),
});

/* ---------------- SCROLL ---------------- */

export const scrollToBottom = (ref) => {
  if (!ref?.current) return;

  ref.current.scrollTop = ref.current.scrollHeight;
};

/* ---------------- BOT MESSAGE ---------------- */

export const botReply = (setMessages, text) => {
  setMessages((prev) => [...prev, createMessage("bot", text)]);
};

/* ---------------- USER MESSAGE ---------------- */

export const userMessage = (setMessages, text) => {
  setMessages((prev) => [...prev, createMessage("user", text)]);
};

/* ---------------- FORMAT TIME ---------------- */

export const formatMessageTime = (timestamp) => {
  try {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

/* ---------------- LIMIT HISTORY ---------------- */

export const trimMessages = (messages, max = 100) => {
  if (!Array.isArray(messages)) return [];

  if (messages.length <= max) return messages;

  return messages.slice(-max);
};

/* ---------------- CHAT EXPORT ---------------- */

export const exportChatText = (messages) => {
  return messages
    .map((msg) => {
      const sender = msg.sender === "bot" ? "ArtVibes Assistant" : "User";

      return `${sender}: ${msg.text}`;
    })
    .join("\n\n");
};
