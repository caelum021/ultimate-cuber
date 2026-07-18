import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { SettingsProvider } from "@/components/SettingsProvider";
import { BrainrotUnlockProvider } from "@/components/BrainrotUnlock";

// Applies the saved theme before first paint to avoid a flash of the wrong theme.
const themeScript = `try{var s=JSON.parse(localStorage.getItem('ultimatecuber.settings.v1'));document.documentElement.dataset.theme=(s&&s.theme)||'dark';}catch(e){document.documentElement.dataset.theme='dark';}`;

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
    default: "Ultimate Cuber — Speedcube Timer & Learning Hub",
    template: "%s · Ultimate Cuber",
  },
  description:
    "A fast, WCA-style speedcube timer with solve tracking (ao5, ao12, PB) and a learning hub for OLL, PLL, and F2L. Get to sub-20 and beyond.",
  metadataBase: new URL("https://ultimatecuber.com"),
  // Favicon/app icon comes from app/icon.jpg and app/apple-icon.jpg (Next file convention).
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SettingsProvider>
          <BrainrotUnlockProvider>
            <Nav />
            <main className="flex-1 flex flex-col">{children}</main>
          </BrainrotUnlockProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
