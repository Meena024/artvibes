import { useState, useEffect } from "react";
import { INITIAL_MESSAGES } from "./chatbotConfig";

const CHAT_STORAGE_KEY = "artvibes_chat_messages";
const CHAT_OPEN_KEY = "artvibes_chat_open";

export const useChatbot = () => {
  const [open, setOpen] = useState(() => {
    try {
      const savedOpen = localStorage.getItem(CHAT_OPEN_KEY);

      return savedOpen ? JSON.parse(savedOpen) : false;
    } catch {
      return false;
    }
  });

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);

      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to restore chatbot messages:", error);
    }

    return INITIAL_MESSAGES;
  });

  /* ---------------- SAVE CHAT HISTORY ---------------- */

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chatbot messages:", error);
    }
  }, [messages]);

  /* ---------------- SAVE OPEN STATE ---------------- */

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_OPEN_KEY, JSON.stringify(open));
    } catch (error) {
      console.error("Failed to save chatbot state:", error);
    }
  }, [open]);

  /* ---------------- CLEAR CHAT ---------------- */

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);

    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear chatbot messages:", error);
    }
  };

  return {
    open,
    setOpen,

    input,
    setInput,

    loading,
    setLoading,

    messages,
    setMessages,

    clearChat,
  };
};
