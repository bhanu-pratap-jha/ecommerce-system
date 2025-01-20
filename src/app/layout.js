import { Inter } from "next/font/google";
import "./globals.css";
//import Navbar from "../components/Navbar";
import Navbar from "../../components/navbar"; 


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopEase",
  description: "Your one-stop online shop for quality products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}  data-new-gr-c-s-check-loaded="14.1092.0"
 data-gr-ext-installed="">
        <Navbar/>
        <main>{children}</main>
        
      </body>
    </html>
  );
}
