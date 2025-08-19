import { Quantico } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Moneyprovider } from "./context.js/MoneyContext";

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "Finora: Your expense Dashboard",
  description: "Finora is an expense tracking and finance dashboard app that helps you visaulise your expense and earnings in a graphical and interactice way",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${quantico.className} antialiased`}
      >
         <Moneyprovider>

        <Navbar />
        {children}
         </Moneyprovider>
      </body>
    </html>
  );
}
