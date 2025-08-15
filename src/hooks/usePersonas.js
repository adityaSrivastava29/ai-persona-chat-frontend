// hooks/usePersonas.js
import { useState, useEffect } from "react";
import { personaAPI } from "../services/api";

export const usePersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPersonas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await personaAPI.getAll();
      setPersonas(response.data);
    } catch (err) {
      setError("Failed to fetch personas");
      console.error("Error fetching personas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  const refreshPersonas = () => {
    fetchPersonas();
  };

  return {
    personas,
    loading,
    error,
    refreshPersonas,
  };
};
