import React from "react";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  const isUser = message.type === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start max-w-xs lg:max-w-md ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}>
        <div className={`flex-shrink-0 ${isUser ? "ml-3" : "mr-3"}`}>
          {isUser ? (
            <User className="w-8 h-8 p-1 rounded-full bg-primary-500 text-white" />
          ) : (
            <Bot className="w-8 h-8 p-1 rounded-full bg-gray-500 text-white" />
          )}
        </div>
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? "bg-primary-500 text-white rounded-br-none"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
          }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          {message.timestamp && (
            <p className="text-xs mt-1 opacity-70">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
