import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/common/ToastProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pibythree SupplySense AI | Enterprise Supply Chain Intelligence",
  description:
    "AI-Powered Demand Forecasting, Inventory Optimization & Supply Chain Intelligence for Manufacturing Enterprises. A Pibythree AI Accelerator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
