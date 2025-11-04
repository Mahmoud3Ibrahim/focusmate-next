import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600", "700"]
});

export const metadata: Metadata = {
  title: "FocusMate - Master Your Time, Boost Productivity",
  description: "A modern Pomodoro timer application built with Next.js. Master your time and boost productivity using the proven Pomodoro Technique with 25-minute focused work sessions.",
  keywords: ["pomodoro", "timer", "focus", "productivity", "time management", "pomodoro technique", "work timer"],
  authors: [{ name: "Mahmoud Ibrahim" }],
  openGraph: {
    title: "FocusMate - Master Your Time, Boost Productivity",
    description: "A modern Pomodoro timer application. Master your time and boost productivity using the proven Pomodoro Technique with 25-minute focused work sessions.",
    type: "website",
    url: "https://focusmate.vercel.app",
    images: [
      {
        url: "/screenshoots/1.png",
        width: 1920,
        height: 1080,
        alt: "FocusMate - Pomodoro Timer Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusMate - Master Your Time, Boost Productivity",
    description: "A modern Pomodoro timer application. Master your time and boost productivity using the proven Pomodoro Technique.",
    images: ["/screenshoots/1.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
