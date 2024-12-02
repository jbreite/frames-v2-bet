import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Farcaster Frames v2 Demo",
  description: "A Farcaster Frames v2 demo app",
};

const openRunde = localFont({
  src: [
    {
      path: "./fonts/OpenRunde-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/OpenRunde-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/OpenRunde-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/OpenRunde-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-runde",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openRunde.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
