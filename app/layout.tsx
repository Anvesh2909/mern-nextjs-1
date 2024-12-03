import type { Metadata } from "next";
import "./globals.css";
import {Poppins} from 'next/font/google';
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Evenza",
  description: "Evenza is a platform for event management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
