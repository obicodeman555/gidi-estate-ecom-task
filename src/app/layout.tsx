import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";
import { ProductProvider } from "@/context/ProductContext";

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
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  );
}
