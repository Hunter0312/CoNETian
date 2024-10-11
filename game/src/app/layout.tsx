import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { GameProvider } from "@/utilitiy/providers/GameProvider";
import { SkeletonTheme } from "react-loading-skeleton";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The CoNETian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <GameProvider>{children}</GameProvider>
        </SkeletonTheme>
      </body>
    </html>
  );
}
