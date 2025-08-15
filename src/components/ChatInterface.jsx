// components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from "react";
import { Bot, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import LoadingIndicator from "./LoadingIndicator";
import ChatInput from "./ChatInput";
import { personaAPI } from "../services/api";

const ChatInterface = ({ persona, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!persona) return;

      try {
        const response = await personaAPI.getChatHistory(persona._id);
        if (response.data.messages) {
          const formattedMessages = response.data.messages.map((msg) => ({
            type: msg.role,
            content: msg.content,
            timestamp: msg.timestamp,
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setMessages([]);
      }
    };

    loadChatHistory();
  }, [persona]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (messageText) => {
    const userMessage = {
      type: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      let response;
      if (persona.isHardcoded) {
        const personaKey = persona.name.toLowerCase().includes("hitesh")
          ? "hitesh"
          : "piyush";
        response = await personaAPI.chatWithHardcodedPersona(
          personaKey,
          messageText
        );
      } else {
        // For custom personas, use the dedicated API that continues the chat
        console.log("Custom persona chat with ID:", persona._id);
        console.log("System Prompt:", persona.systemPrompt);

        if (!persona.systemPrompt) {
          throw new Error("System prompt is missing for custom persona");
        }

        response = await personaAPI.continueCustomPersonaChat(
          persona._id,
          persona.systemPrompt,
          messageText
        );
      }

      const aiMessage = {
        type: "assistant",
        content: response.data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    setLoading(false);
  };

  if (!persona) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Bot className="w-8 h-8 text-primary-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {persona.name}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {persona.isHardcoded ? "Default" : "Custom"} Persona
              </span>
            </div>
          </div>
          <button
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            title="Close chat and go back to personas">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-lg font-medium mb-2">
                Start a conversation with {persona.name}
              </p>
              <p className="text-sm">
                Ask anything you'd like to know or discuss!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          )}
          {loading && (
            <div className="flex justify-start mb-6">
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <LoadingIndicator />
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                  {persona.name} is thinking...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput
          onSendMessage={sendMessage}
          disabled={loading}
          placeholder={`Ask ${persona.name} anything...`}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
