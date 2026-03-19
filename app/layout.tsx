import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import 'remixicon/fonts/remixicon.css'
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";

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
  title: "Prof. Pius Adewale Owolawi | Leading AI & 4IR Researcher | TUT South Africa",
  description:
    "Prof. Pius Adewale Owolawi (pro pius owolawi adewale) – Distinguished Professor of Telecommunication & IT and Assistant Dean at Tshwane University of Technology (TUT), South Africa. Leading researcher in AI, Machine Learning, Wireless Communications, IoT, and 4IR Innovation with 200+ peer-reviewed publications, 2000+ citations, R94M+ in research funding, and Top 500 African Researcher ranking.",
  keywords: [
    "Prof Pius Owolawi",
    "Pius Adewale Owolawi",
    "Prof. Pius Adewale Owolawi",
    "pro pius owolawi adewale",
    "Pius Owolawi TUT",
    "Pius Owolawi Tshwane University",
    "Professor Owolawi",
    "TUT Professor",
    "AI Research South Africa",
    "Machine Learning Expert South Africa",
    "Wireless Communications Researcher",
    "4IR Innovation Africa",
    "Tshwane University of Technology",
    "ECSA Professional Engineer",
    "IEEE Member",
    "SAIEE Member",
    "Top African Researcher",
    "Top 500 African Researcher",
    "PhD Electronic Engineering",
    "Computer Systems Engineering TUT",
    "Head of Department Computer Systems Engineering",
    "Assistant Dean Industry Liaison TUT",
    "IoT Research South Africa",
    "Renewable Energy Research",
    "Computer Vision Research",
    "MICTSETA",
    "AgriSETA",
    "University of KwaZulu-Natal",
    "FUTA Nigeria",
  ],
  authors: [{ name: "Prof. Pius Adewale Owolawi", url: "https://www.piusowolawi.com" }],
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
    url: "https://www.piusowolawi.com",
    title: "Prof. Pius Adewale Owolawi – Leading AI & 4IR Researcher | Tshwane University of Technology",
    description:
      "Prof. Pius Adewale Owolawi is a Distinguished Professor at TUT specializing in AI, Machine Learning, Wireless Communications, and 4IR Innovation. 200+ publications, R94M+ research funding, Top 500 African Researcher.",
    siteName: "Prof. Pius Adewale Owolawi – Academic Portfolio",
    firstName: "Pius Adewale",
    lastName: "Owolawi",
    images: [
      {
        url: "https://www.piusowolawi.com/img/prof-owolawi.jpg",
        width: 1200,
        height: 630,
        alt: "Prof. Pius Adewale Owolawi – Leading AI & 4IR Researcher at Tshwane University of Technology",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prof. Pius Adewale Owolawi – AI & 4IR Research Leader",
    description:
      "Distinguished Professor at TUT | AI & ML Expert | 200+ Publications | R94M+ Research Funding | Top 500 African Researcher | ECSA, MIEEE, SAIEE",
    images: [
      {
        url: "https://www.piusowolawi.com/img/prof-owolawi.jpg",
        alt: "Prof. Pius Adewale Owolawi",
      },
    ],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://www.piusowolawi.com",
  },
  category: "Education",
  classification: "Academic Portfolio",
  other: {
    "google-site-verification": "your-google-verification-code",
    "citation_author": "Pius Adewale Owolawi",
    "citation_author_institution": "Tshwane University of Technology",
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J9K91RP4ER"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J9K91RP4ER');
          `}
        </Script>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
        {/* {children} */}
      </body>
    </html>
  );
}
