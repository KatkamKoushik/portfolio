import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Koushik Katkam — Data Science Student & Developer",
  description:
    "Portfolio of Koushik Katkam. A Data Science student specializing in machine learning, full-stack web development, and intelligent systems.",
  keywords: [
    "data science",
    "machine learning",
    "web development",
    "Python",
    "React",
    "Next.js",
    "portfolio",
    "developer",
  ],
  authors: [{ name: "Koushik Katkam" }],
  creator: "Koushik Katkam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://koushikkatkam.dev", // Update this with actual URL later if needed
    title: "Koushik Katkam — Data Science Student & Developer",
    description:
      "Building at the intersection of data and engineering.",
    siteName: "Koushik Katkam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koushik Katkam — Data Science Student & Developer",
    description:
      "Building at the intersection of data and engineering.",
    creator: "@KoushikKatkam",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#hero" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
