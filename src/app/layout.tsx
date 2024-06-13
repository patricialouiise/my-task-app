import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloWrapper } from "./helpers/ApolloWrapper";

export const metadata: Metadata = {
  title: "Sample Task App",
  description: "Sample task app with authentication using Next.js and GraphQL"
};

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <html lang="en">
      <ApolloWrapper>
        <body className="flex flex-col min-h-screen">
          <Header />
          <main className="container mx-auto mt-4 flex-grow">{children}</main>
          <Footer />
        </body>
      </ApolloWrapper>
    </html>
  </>
);

export default Layout;
