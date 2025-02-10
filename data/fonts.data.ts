import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fonts = `${spaceMono.variable}`;

export default fonts;
