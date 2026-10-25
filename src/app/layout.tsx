import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fraunces is a refined editorial serif used sparingly for the welcome
// message and select editorial details.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Yash Chopra — Full-Stack Developer & AI/ML Enthusiast",
  description:
    "The interactive portfolio of Yash Chopra — a B.Tech CSE student and developer building intelligent things for the web and beyond.",
  keywords: [
    "Yash Chopra",
    "portfolio",
    "full-stack developer",
    "AI/ML",
    "RAG",
    "Scout",
    "CodeLens",
    "Krishimitra",
    "MAIT",
  ],
  authors: [{ name: "Yash Chopra" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Yash Chopra — Full-Stack Developer & AI/ML Enthusiast",
    description:
      "An interactive macOS-inspired portfolio. Open the desktop, explore the projects, and say hello.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Chopra — Full-Stack Developer",
    description: "Interactive macOS-style developer portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply persisted theme before paint to avoid flash of wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var raw = localStorage.getItem('yash-portfolio-preferences');
                var theme = raw ? (JSON.parse(raw).state || {}).theme : 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
