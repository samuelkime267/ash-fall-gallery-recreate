import type { Metadata } from "next";
import fonts from "@/data/fonts.data";
import "@/styles/globals.scss";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "All blue",
  description: "Blue images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
