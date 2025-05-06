import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Nunito,
  Quicksand,
  DM_Sans,
} from "next/font/google";
import "./globals.css";
import { Toasts } from "./_ctx/toast";
import { Providers } from "./_ctx/providers";

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

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BestDeal Insurance",
  description: "Protecting what matters most.",
  icons: {
    icon: "/svg/qr.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quick.variable} ${dmSans.variable} ${nito.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toasts />
        </Providers>
      </body>
    </html>
  );
}
