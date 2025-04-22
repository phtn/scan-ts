import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import { Toasts } from "./_ctx/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nito = Nunito({
  variable: "--font-nito",
  subsets: ["latin"],
});

const quick = Quicksand({
  variable: "--font-quick",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoProtect Insurance",
  description: "Proudly deployed on Vercel. That's wassup!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quick.variable} ${nito.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toasts />
      </body>
    </html>
  );
}
