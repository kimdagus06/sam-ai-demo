import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { StatusBar } from "./components/StatusBar";

export const metadata: Metadata = {
  title: "Chat Assistant",
  description: "Mobile chat assistant interface",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} antialiased bg-white text-slate-900 pt-12`}
        suppressHydrationWarning={true}
      >
        <StatusBar />
        {children}
      </body>
    </html>
  );
}
