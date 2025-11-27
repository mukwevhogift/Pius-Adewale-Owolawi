import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Montserrat } from "next/font/google";
import 'remixicon/fonts/remixicon.css'
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";

const bebasNeue = Bebas_Neue({
  weight: "400", // only one weight available
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f8' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
};

export const metadata: Metadata = {
  title: "Prof. Pius Adewale Owolawi | PhD, ECSA, MIEEE - Academic Portfolio",
  description: "Distinguished Professor and Assistant Dean at Tshwane University of Technology. Leading researcher in AI, Machine Learning, Wireless Communications, and 4IR Innovation with 200+ publications and R94M+ in research funding.",
  keywords: [
    "Prof Pius Owolawi",
    "Pius Adewale Owolawi",
    "TUT Professor",
    "AI Research South Africa",
    "Machine Learning Expert",
    "Wireless Communications",
    "4IR Innovation",
    "Tshwane University of Technology",
    "ECSA",
    "IEEE Member",
    "Top African Researcher",
    "PhD Electronic Engineering",
    "Research Chair",
    "MICTSETA"
  ],
  authors: [{ name: "Prof. Pius Adewale Owolawi" }],
  creator: "Prof. Pius Adewale Owolawi",
  publisher: "Tshwane University of Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_ZA",
    url: "https://piusowolawi.com",
    title: "Prof. Pius Adewale Owolawi - Leading AI & 4IR Researcher",
    description: "Distinguished Professor at TUT specializing in AI, Machine Learning, and Wireless Communications. 200+ publications, R94M+ research funding, Top 500 African Researcher.",
    siteName: "Prof. Pius Owolawi Portfolio",
    images: [
      {
        url: "/img/prof-owolawi.jpg",
        width: 1200,
        height: 630,
        alt: "Prof. Pius Adewale Owolawi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prof. Pius Adewale Owolawi - AI & 4IR Research Leader",
    description: "Distinguished Professor | AI & ML Expert | 200+ Publications | R94M+ Research Funding | Top 500 African Researcher",
    images: ["/img/prof-owolawi.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://piusowolawi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
        {/* {children} */}
      </body>
    </html>
  );
}
