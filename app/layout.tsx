import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import "./globals.css";
import Navbar from "./section/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shabbir Thakur| Full-Stack Developer",
  description:
    "Hire Shabbir Thakur, a freelance Full-Stack Developer creating high-performance websites, custom web applications, landing pages, and responsive user experiences using modern technologies."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={poppins.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
