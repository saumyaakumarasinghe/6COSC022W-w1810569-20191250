// Import UI components and core dependencies
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Homepage component
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col xl:flex-row">
      {/* Left Section: Content area with branding and actions */}
      <div className="flex-1 bg-[#2B4380] p-6 md:p-12 lg:p-16 flex items-center justify-center">
        <div className="max-w-2xl space-y-8">
          {/* Page heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Global Country Information System
          </h1>

          {/* Page subheading/description */}
          <p className="text-lg md:text-xl text-white/90">
            Explore detailed information about countries worldwide. Access
            comprehensive data about languages, currencies, and more.
          </p>

          {/* Login and Register buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-medium text-base"
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white font-medium text-base hover:bg-white/90 text-[#2B4380]"
            >
              <Link href="/register">Create an account</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid sm:grid-cols-2 gap-6 pt-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
              <h3 className="text-xl font-semibold text-white mb-2">
                Country Data
              </h3>
              <p className="text-white/80">
                Access detailed information about countries, including capitals,
                currencies, and languages
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
              <h3 className="text-xl font-semibold text-white mb-2">
                Admin Features
              </h3>
              <p className="text-white/80">
                Manage users and control access to the country information
                system
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Visual illustration */}
      <div className="flex-1 bg-white p-6 md:p-12 lg:p-16 flex items-center justify-center">
        <div className="relative w-full max-w-lg aspect-square">
          <Image
            src="/globe.svg"
            alt="World Globe Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
}
