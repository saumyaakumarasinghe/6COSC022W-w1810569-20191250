"use client"; // Marks this file as a client-side component in Next.js

// React hooks and Axios
import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import Image from "next/image";

// API and custom hooks
import api from "@/lib/api"; // Pre-configured Axios instance
import { useErrorHandler } from "@/hooks/use-error-handler"; // Custom hook for centralized error handling

// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Spinner,
  ErrorMessage,
} from "@/components/ui";

// Type definition for country object
interface Country {
  name: string;
  capital: string;
  currencies: string[];
  languages: string[];
  flag: string;
}

export default function CountriesPage() {
  // State variables
  const [countries, setCountries] = useState<Country[]>([]); // List of all countries
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [search, setSearch] = useState(""); // Search query
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // Selected country for modal display

  const handleError = useErrorHandler(); // Initialize custom error handler

  // Function to fetch all countries from API
  const fetchCountries = useCallback(async () => {
    try {
      const response = await api.get("/country");
      setCountries(response.data); // Store countries in state
      setError(""); // Clear any previous errors
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      // Fallback if custom handler doesn't handle it
      if (!handleError(error)) {
        setError(error.message || "Failed to fetch countries");
      }
    } finally {
      setLoading(false); // Stop loading spinner
    }
  }, [handleError]);

  // Fetch countries on initial render
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // Fetch single country details by name
  async function fetchCountryByName(name: string) {
    try {
      const response = await api.get(`/country/${encodeURIComponent(name)}`);
      setSelectedCountry(response.data); // Show details in modal
      setError(""); // Clear previous error
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error)) {
        setError(error.message || "Failed to fetch country details");
      }
    }
  }

  // Filter countries based on search input
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Show error UI if something went wrong
  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={fetchCountries} />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page header and search bar */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-col sm:flex-row">
        <h1 className="text-2xl font-semibold">Countries</h1>
        <Input
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {/* Show loading spinner or list of countries */}
      {loading ? (
        <div className="flex items-center justify-center h-[400px]">
          <Spinner size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Render each country card */}
          {filteredCountries.map((country) => (
            <div
              key={country.name}
              className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
              onClick={() => fetchCountryByName(country.name)}
            >
              {/* Flag image */}
              <div className="aspect-[3/2] relative mb-4">
                <Image
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">{country.name}</h2>
              <p className="text-muted-foreground">{country.capital}</p>
            </div>
          ))}
        </div>
      )}

      {/* Country detail dialog */}
      <Dialog
        open={!!selectedCountry}
        onOpenChange={() => setSelectedCountry(null)}
      >
        {selectedCountry && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedCountry.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Flag */}
              <div className="aspect-[3/2] relative">
                <Image
                  src={selectedCountry.flag}
                  alt={`Flag of ${selectedCountry.name}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              {/* Capital */}
              <div>
                <h3 className="font-semibold mb-1">Capital</h3>
                <p>{selectedCountry.capital}</p>
              </div>
              {/* Currencies */}
              <div>
                <h3 className="font-semibold mb-1">Currencies</h3>
                <p>{selectedCountry.currencies.join(", ")}</p>
              </div>
              {/* Languages */}
              <div>
                <h3 className="font-semibold mb-1">Languages</h3>
                <p>{selectedCountry.languages.join(", ")}</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
