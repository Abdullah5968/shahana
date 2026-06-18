import type { Metadata } from "next";
import { Inter, Marcellus } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHAHANA | Luxury Pakistani Fashion House",
  description:
    "SHAHANA — modern royal luxury fashion rooted in Pakistani heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${marcellus.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}