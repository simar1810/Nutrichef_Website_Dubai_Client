import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { TenantProvider } from "@/contexts/TenantContext";

export const metadata: Metadata = {
  title: "NutriChef | Meal plans for busy people",
  description:
    "NutriChef provides meal plans tailored for busy people. It serves delicious food that's portioned to your requirements and fitness goals. You can choose your meals from the daily menu or build your own.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased text-foreground bg-background font-sans flex flex-col min-h-screen">
        <AuthProvider>
          <TenantProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </TenantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
