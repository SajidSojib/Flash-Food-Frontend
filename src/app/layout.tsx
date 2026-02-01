import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FlashFood | Discover & Order Delicious Meals",
    template: "%s | FlashFood",
  },
  description:
    "FlashFood is a modern food ordering platform where customers discover meals, providers manage menus, and orders are delivered seamlessly.",

  keywords: [
    "food ordering",
    "meal delivery",
    "restaurant app",
    "food marketplace",
    "Next.js food app",
    "FlashFood",
  ],

  authors: [{ name: "Sajid Ahmed" }],

  creator: "Sajid Ahmed Sojib",
  metadataBase: new URL("https://flashfood.vercel.app"), // change later to your real domain

  openGraph: {
    title: "FlashFood",
    description:
      "Discover meals, order food online, and manage restaurants with FlashFood.",
    url: "https://flashfood.vercel.app",
    siteName: "FlashFood",
    images: [
      {
        url: "/og-image.png", // add later inside public/
        width: 1200,
        height: 630,
        alt: "FlashFood App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FlashFood",
    description:
      "Modern full-stack food ordering platform built with Next.js & Express.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
