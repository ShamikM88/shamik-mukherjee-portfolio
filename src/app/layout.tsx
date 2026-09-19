import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const SITE_URL = "https://shamik-mukherjee-portfolio.vercel.app";
const TITLE = "Shamik Mukherjee — Product Manager / Senior Product Owner";
const DESCRIPTION =
  "Product Owner in digital payments and tokenization, building AI-directed multi-agent systems solo. See OpenCAM Framework (a Maker-Checker credit underwriting system) and an automated job-search pipeline.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Shamik Mukherjee",
    "Product Manager",
    "Product Owner",
    "Digital Payments",
    "Tokenization",
    "Claude Code",
    "Multi-Agent AI",
  ],
  authors: [{ name: "Shamik Mukherjee", url: "https://github.com/ShamikM88" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Shamik Mukherjee — Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
