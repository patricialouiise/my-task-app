import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sample Task App",
  description: "Sample task app with authentication using Next.js and GraphQL"
};

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  </>
);

export default Layout;
