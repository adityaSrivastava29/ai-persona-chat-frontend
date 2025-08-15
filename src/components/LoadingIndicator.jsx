import React from "react";
import { Bot } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-center space-x-2">
        <Bot className="w-8 h-8 p-1 rounded-full bg-gray-500 text-white" />
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}></div>
            <div
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
