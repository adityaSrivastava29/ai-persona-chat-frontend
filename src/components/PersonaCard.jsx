import React from "react";
import { Bot } from "lucide-react";

const PersonaCard = ({ persona, onClick }) => {
  return (
    <div className="persona-card" onClick={onClick}>
      <div className="flex items-center mb-3">
        <Bot className="w-8 h-8 text-primary-500 mr-3" />
        <div>
          <h3 className="text-lg font-semibold">{persona.name}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {persona.isHardcoded ? "Default" : "Custom"} Persona
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {persona.systemPrompt?.substring(0, 100)}...
      </p>
    </div>
  );
};

export default PersonaCard;
