import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'aos/dist/aos.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RootLayoutContent from "@/lib/ProtectedLayout"
import AOSInitializer from "@/components/AOSInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shots by KG | Professional Photography & Cinematography",
  description:
    "You're not just booking photography or cinematography – you're investing in one of the most unforgettable experiences of your life. Explore wedding, branding, food, and storytelling projects by KG.",
  keywords: [
    "Shots by KG",
    "photography",
    "cinematography",
    "wedding photography",
    "branding photography",
    "food photography",
    "portrait photography",
    "event photography",
    "UK photographer",
    "storytelling photos"
  ],
  authors: [{ name: "KG", url: "https://www.shotsbykg.com" }],
  creator: "Shots by KG",
  openGraph: {
    title: "Shots by KG | Photography & Cinematography",
    description:
      "Capturing weddings, branding, food, portraits, and unforgettable stories through the lens. Based in the UK, creating timeless memories worldwide.",
    url: "https://www.shotsbykg.com",
    siteName: "Shots by KG",
    images: [
      {
        url: "https://www.shotsbykg.com/og-image.jpg", // 👉 add OG image in /public
        width: 1200,
        height: 630,
        alt: "Shots by KG Photography & Cinematography",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shots by KG | Photography & Cinematography",
    description:
      "You're not just booking photography or cinematography – you're investing in timeless memories.",
    images: ["https://www.shotsbykg.com/og-image.jpg"],
    creator: "@shotsbykg", // 👉 update with real handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <AOSInitializer />
        <RootLayoutContent>{children}</RootLayoutContent>
        <ToastContainer 
          position="top-right" 
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}