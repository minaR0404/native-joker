import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "NativeJoker — Translate Formal English to Native Slang",
  description:
    "Turn boring formal English into fun native slang instantly. Free online slang translator — Gen Z, casual, street talk and more.",
  keywords: [
    "slang translator",
    "formal to casual english",
    "gen z translator",
    "make text sound natural",
    "informal english converter",
    "native english slang",
  ],
  openGraph: {
    title: "NativeJoker — Translate Formal English to Native Slang",
    description:
      "Turn boring formal English into fun native slang instantly. Free slang translator.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
