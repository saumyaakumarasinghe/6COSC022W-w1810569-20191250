"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await api.get("/country");
        setCountries(response.data);
      } catch (error) {
        setError("Failed to fetch countries");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Countries</h1>
        <div className="w-72">
          <Input
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? // Loading skeletons
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-4">
                  <Skeleton className="h-[120px] w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          : filteredCountries.map((country, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="relative h-[120px] mb-4">
                    <Image
                      src={country.flag}
                      alt={`${country.name} flag`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{country.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Capital: {country.capital}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Currencies: {country.currencies.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Languages: {country.languages.join(", ")}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
