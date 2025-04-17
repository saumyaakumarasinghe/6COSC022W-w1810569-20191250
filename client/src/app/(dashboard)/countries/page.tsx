"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AxiosError } from "axios";
import api from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useAuth } from "@/contexts/auth-context";

interface Country {
  name: string;
  capital: string;
  currencies: string[];
  languages: string[];
  flag: string;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const { logout } = useAuth();

  const handleError = useCallback(
    (err: AxiosError<{ message: string }>) => {
      if (err.response?.status === 401) {
        logout();
        return true;
      }
      return false;
    },
    [logout],
  );

  const fetchCountries = useCallback(async () => {
    try {
      const response = await api.get("/country");
      setCountries(response.data);
      setError("");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (!handleError(error)) {
        setError(error.response?.data?.message || "Failed to fetch countries");
      }
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  async function fetchCountryByName(name: string) {
    try {
      const response = await api.get(`/country/${encodeURIComponent(name)}`);
      setSelectedCountry(response.data);
      setError("");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (!handleError(error)) {
        setError(
          error.response?.data?.message || "Failed to fetch country details",
        );
      }
    }
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={fetchCountries} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 gap-4 flex-col sm:flex-row">
        <h1 className="text-2xl font-semibold">Countries</h1>
        <Input
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[400px]">
          <Spinner size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries.map((country) => (
            <div
              key={country.name}
              className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
              onClick={() => fetchCountryByName(country.name)}
            >
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
              <div className="aspect-[3/2] relative">
                <Image
                  src={selectedCountry.flag}
                  alt={`Flag of ${selectedCountry.name}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Capital</h3>
                <p>{selectedCountry.capital}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Currencies</h3>
                <p>{selectedCountry.currencies.join(", ")}</p>
              </div>
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
