import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Header = ({ currentView, setCurrentView }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Persona Chat
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              <button
                onClick={() => setCurrentView("personas")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "personas"
                    ? "bg-primary-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}>
                Personas
              </button>
              <button
                onClick={() => setCurrentView("create")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === "create"
                    ? "bg-primary-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}>
                Create Persona
              </button>
            </nav>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
