import React, { useState } from "react";
import { Plus } from "lucide-react";
import { personaAPI } from "../services/api";

const CreatePersonaForm = ({ onPersonaCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    systemPrompt: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.systemPrompt.trim()) return;

    setIsLoading(true);
    try {
      await personaAPI.chatWithCustomPersona(
        formData.systemPrompt,
        "Hello! I'm ready to help you.",
        formData.name
      );

      setFormData({ name: "", systemPrompt: "" });
      onPersonaCreated();
    } catch (error) {
      console.error("Error creating persona:", error);
    }
    setIsLoading(false);
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Create Custom Persona
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Persona Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Python Expert, Math Tutor"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            System Prompt
          </label>
          <textarea
            value={formData.systemPrompt}
            onChange={handleChange("systemPrompt")}
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe the persona's expertise, teaching style, and personality..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={
            isLoading || !formData.name.trim() || !formData.systemPrompt.trim()
          }
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
          <Plus className="w-5 h-5 inline mr-2" />
          {isLoading ? "Creating..." : "Create Persona"}
        </button>
      </form>
    </div>
  );
};

export default CreatePersonaForm;
