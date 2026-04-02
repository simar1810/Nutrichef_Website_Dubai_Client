import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Calo | Meal plans for busy people",
  description: "Calo provides meal plans tailored for busy people. It serves delicious food that's portioned to your requirements and fitness goals. You can choose your meals from the daily menu or build your own.",
  icons: {
    icon: "https://calo.app/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased text-foreground bg-background font-sans flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
