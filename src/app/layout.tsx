import type { Metadata } from "next";
import { Permanent_Marker, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const permanentMarker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: '--font-permanent-marker' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ["400", "600"], subsets: ["latin"], variable: '--font-ibm-plex-mono' });

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
    <html lang="en" className={`${permanentMarker.variable} ${ibmPlexMono.variable}`}>
      <body className={permanentMarker.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}