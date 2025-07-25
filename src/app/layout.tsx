import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";

const inter = Questrial({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "Your one-stop shop for everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
