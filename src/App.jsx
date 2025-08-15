import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import PersonasList from "./components/PersonasList";
import CreatePersonaForm from "./components/CreatePersonaForm";
import ChatInterface from "./components/ChatInterface";
import MobileNavigation from "./components/MobileNavigation";
import Footer from "./components/Footer";
import { usePersonas } from "./hooks/usePersonas";

function AppContent() {
  const [currentView, setCurrentView] = useState("personas");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const { personas, loading, error, refreshPersonas } = usePersonas();

  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona);
    setCurrentView("chat");
  };

  const handlePersonaCreated = () => {
    setCurrentView("personas");
    refreshPersonas();
  };

  const handleBackToPersonas = () => {
    setCurrentView("personas");
    setSelectedPersona(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading personas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={refreshPersonas}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Header currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8 w-full">
        {currentView === "personas" && (
          <PersonasList
            personas={personas}
            onSelectPersona={handleSelectPersona}
          />
        )}

        {currentView === "create" && (
          <CreatePersonaForm onPersonaCreated={handlePersonaCreated} />
        )}

        {currentView === "chat" && selectedPersona && (
          <ChatInterface
            persona={selectedPersona}
            onBack={handleBackToPersonas}
          />
        )}
      </main>

      <Footer />

      <MobileNavigation
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
