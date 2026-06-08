import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "../../../../../UI/CSS/ChatBot.module.css";

import { SellerProductsActions } from "../../../../../Redux store/Seller/SellerProductActions";

import { useChatbot } from "./useChatbot";
import { getGeminiResponse } from "./geminiService";
import { handleLocalIntent } from "./chatbotIntents";

import {
  scrollToBottom,
  botReply,
  userMessage,
  trimMessages,
} from "./chatbotHelpers";

import {
  CHATBOT_TITLE,
  CHATBOT_PLACEHOLDER,
  SUGGESTIONS,
  QUICK_ACTIONS,
} from "./chatbotConfig";

const ChatBot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.sellerProducts.products);

  const categories = useSelector((state) => state.sellerProducts.category);

  const favItems = useSelector((state) => state.cart.favItems);

  const {
    open,
    setOpen,
    input,
    setInput,
    loading,
    setLoading,
    messages,
    setMessages,
    clearChat,
  } = useChatbot();

  const messagesRef = useRef(null);

  useEffect(() => {
    scrollToBottom(messagesRef);
  }, [messages, loading]);

  const sendMessage = async (customQuestion = null) => {
    const question = customQuestion || input;

    if (!question.trim() || loading) return;

    userMessage(setMessages, question);

    setInput("");

    const localAction = handleLocalIntent({
      question,
      products,
      categories,
      favItems,
      navigate,
      dispatch,
      SellerProductsActions,
    });

    if (localAction.handled) {
      botReply(setMessages, localAction.response);
      return;
    }

    setLoading(true);

    try {
      const result = await getGeminiResponse({
        question,
        messages,
        products,
        categories,
        favItems,
      });

      botReply(setMessages, result.text);
    } catch (error) {
      console.error(error);

      botReply(setMessages, "Sorry, something went wrong.");
    } finally {
      setLoading(false);

      setMessages((prev) => trimMessages(prev));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <button
        className={styles.chatIcon}
        onClick={() => setOpen((prev) => !prev)}
      >
        💬
      </button>

      {open && (
        <div className={styles.chatbot}>
          <div className={styles.header}>
            <span>{CHATBOT_TITLE}</span>

            <div>
              <button
                className={styles.clearBtn}
                onClick={clearChat}
                title="Clear Chat"
              >
                🗑️
              </button>

              <button
                className={styles.closeBtn}
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          <div className={styles.messages} ref={messagesRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${
                  msg.sender === "user" ? styles.user : styles.bot
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className={`${styles.message} ${styles.bot}`}>
                ArtVibes Assistant is typing...
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <>
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    className={styles.suggestionBtn}
                    onClick={() => sendMessage(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className={styles.quickActions}>
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    className={styles.quickBtn}
                    onClick={() => sendMessage(action.message)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className={styles.inputContainer}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={CHATBOT_PLACEHOLDER}
              disabled={loading}
            />

            <button onClick={() => sendMessage()} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
