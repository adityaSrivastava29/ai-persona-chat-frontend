import React from "react";
import PersonaCard from "./PersonaCard";

const PersonasList = ({ personas, onSelectPersona }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Choose a Persona to Chat With
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <PersonaCard
            key={persona._id}
            persona={persona}
            onClick={() => onSelectPersona(persona)}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonasList;
