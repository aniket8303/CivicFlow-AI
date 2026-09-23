import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CivicFlow-AI",
  description: "AI-powered civic issue reporting platform",
};

import DemoModeBanner from "@/components/DemoModeBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DemoModeBanner />
        {children}
      </body>
    </html>
  );
}