import type { Metadata } from "next";
import { Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });
const permanentMarker = Permanent_Marker({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FightMe - Get Roasted!",
  description: "Get roasted based on your online profiles. Can you handle the heat?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${permanentMarker.className}`}>{children}</body>
    </html>
  );
}
