import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klein - AI Explorer & Product Manager",
  description: "Personal portfolio of Klein, a B2B Product Manager and AI explorer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground cyber-theme`}
      >
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
