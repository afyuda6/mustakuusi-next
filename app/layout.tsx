import type {Metadata} from "next";
import {Fuzzy_Bubbles, Patrick_Hand, Roboto} from "next/font/google";
import "@/styles/App.module.css";
import "./globals.css";
import {Marquee} from "@/components/Marquee";
import {Footer} from "@/components/Footer";

const fuzzyBubbles = Fuzzy_Bubbles({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-fuzzy-bubbles",
});

const patrickHand = Patrick_Hand({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-patrick-hand",
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "mustakuusi",
    description: "Eksplorasi Teka-teki, Pengetahuan, dan Edukasi",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={`${fuzzyBubbles.variable} ${patrickHand.variable} ${roboto.variable}`}>
        <body>
        <Marquee/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
