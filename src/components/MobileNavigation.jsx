// components/MobileNavigation.jsx
import React from "react";
import { Bot, Plus } from "lucide-react";

const MobileNavigation = ({ currentView, setCurrentView }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-pb">
      <div className="flex justify-around py-2">
        <button
          onClick={() => setCurrentView("personas")}
          className={`flex flex-col items-center p-2 ${
            currentView === "personas"
              ? "text-primary-500"
              : "text-gray-500 dark:text-gray-400"
          }`}>
          <Bot className="w-6 h-6" />
          <span className="text-xs mt-1">Personas</span>
        </button>
        <button
          onClick={() => setCurrentView("create")}
          className={`flex flex-col items-center p-2 ${
            currentView === "create"
              ? "text-primary-500"
              : "text-gray-500 dark:text-gray-400"
          }`}>
          <Plus className="w-6 h-6" />
          <span className="text-xs mt-1">Create</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNavigation;
