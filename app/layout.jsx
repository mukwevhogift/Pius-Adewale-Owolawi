import "./globals.css";

export const metadata = {
  title: "Prof. Pius A. Owolawi, PhD | Global AI & Business Transformation Executive",
  description:
    "Global AI and business transformation executive — Digital Strategy, Industry 4.0, Enterprise Innovation. 20+ years of leadership, R94.2M+ (≈US$5M) secured, 200+ publications.",
  openGraph: {
    title: "Prof. Pius A. Owolawi, PhD",
    description:
      "Global AI & Business Transformation Executive | Digital Strategy | Industry 4.0 | Enterprise Innovation",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
