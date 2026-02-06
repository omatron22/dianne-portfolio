import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dianne Woods Photography",
  description: "Photography portfolio of Dianne Woods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
