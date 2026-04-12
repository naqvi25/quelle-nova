import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Quelle Nova — B2B Industrial Sourcing Platform",
    template: "%s | Quelle Nova",
  },
  description:
    "We connect global buyers with verified manufacturers across complex supply chains — components, assemblies, materials, and engineered solutions across 12 industries.",
  keywords: [
    "B2B sourcing",
    "industrial procurement",
    "supply chain",
    "manufacturing",
    "automotive sourcing",
    "defence aerospace sourcing",
    "mining equipment",
    "industrial components",
    "OEM sourcing",
    "Quelle Nova",
  ],
  authors: [{ name: "Quelle Nova" }],
  creator: "Quelle Nova",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quellenova.com",
    siteName: "Quelle Nova",
    title: "Quelle Nova — B2B Industrial Sourcing Platform",
    description:
      "Verified manufacturers. Precision sourcing. Global reach. Connect with qualified suppliers across automotive, defence, mining, industrial and 8 more critical industries.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quelle Nova — B2B Industrial Sourcing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quelle Nova — B2B Industrial Sourcing Platform",
    description:
      "Verified manufacturers. Precision sourcing. Global reach across 12 industries.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-[#020202] text-zinc-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}
