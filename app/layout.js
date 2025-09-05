import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { SchoolProvider } from "@/context/SchoolContext";
import SchoolsFetcher from "./components/SchoolsFetcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Campus Hub",
  description: "A platform to showcase educational institutions",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SchoolProvider>
          <Header />
          <ToastContainer position="top-right" autoClose={3000} />

          <SchoolsFetcher>{children}</SchoolsFetcher>
        </SchoolProvider>
      </body>
    </html>
  );
}
