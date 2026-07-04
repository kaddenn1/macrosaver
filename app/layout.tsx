import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MacroSaver | Performance Nutrition Price Tracker",
  description: "Automated macro calculation and price tracking dashboard for fitness supplements, clear whey isolates, and workout gear.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-gray-100 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}