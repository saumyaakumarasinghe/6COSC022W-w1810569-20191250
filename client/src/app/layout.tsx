// Type import for Next.js metadata
import type { Metadata } from "next";

// Google font imports from Next.js font optimization
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Layout wrapper that includes context providers
import { ClientLayout } from "./client-layout";

// Load Geist Sans font with custom CSS variable
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load Geist Mono font with custom CSS variable
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global metadata configuration
export const metadata: Metadata = {
  title: "Global Country Information System",
  description: "Global Country Information System",
};

// Root layout applied to every page in the app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Apply font variables and smoothing
      >
        <ClientLayout>{children}</ClientLayout>{" "}
        {/* Wrap children with client-side context */}
      </body>
    </html>
  );
}
