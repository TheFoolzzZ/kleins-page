import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Inline script: apply saved theme before first paint to avoid flash.
const themeInit = `(function(){try{var t=localStorage.getItem("site-theme");if(t==="paper"||t==="cyber"){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","cyber");}}catch(e){document.documentElement.setAttribute("data-theme","cyber");}})();`;

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
    <html lang="en" className="scroll-smooth" data-theme="cyber" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${newsreader.variable} antialiased bg-background text-foreground cyber-theme`}
      >
        <ThemeProvider>
          <CursorTrail />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
