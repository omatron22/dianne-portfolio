import type { Metadata } from "next";
import { EB_Garamond, Jost } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-ui",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diannewoods.com"),
  title: "Dianne Woods Photography",
  description:
    "Fine art photography by Dianne Woods. Performers, gardens and landscapes, and still life. Moments observed rather than arranged.",
  openGraph: {
    title: "Dianne Woods Photography",
    description:
      "Fine art photography by Dianne Woods. Performers, gardens and landscapes, and still life.",
    type: "website",
    url: "https://diannewoods.com",
    images: [
      {
        url: "/images/_DSF0286-03-150.jpg",
        alt: "Photograph by Dianne Woods",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dianne Woods Photography",
    description:
      "Fine art photography by Dianne Woods. Performers, gardens and landscapes, and still life.",
    images: ["/images/_DSF0286-03-150.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${jost.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
