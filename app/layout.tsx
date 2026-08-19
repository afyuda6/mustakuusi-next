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
    description: "Eksplorasi puzzle, pengetahuan, dan edukasi melalui game logika, kuis, dan arkade kasual.",
    openGraph: {
        title: "mustakuusi",
        description: "Eksplorasi puzzle, pengetahuan, dan edukasi melalui game logika, kuis, dan arkade kasual.",
        url: "https://mustakuusi.vercel.app/",
        siteName: "mustakuusi",
        images: [
            {
                url: "https://mustakuusi.vercel.app/assets/hero.png",
                width: 1200,
                height: 630,
                alt: "mustakuusi",
            },
        ],
        type: "website",
    },
};

export default function RootLayout({children}: { children: React.ReactNode; }) {
    return (
        <html className={`${fuzzyBubbles.variable} ${patrickHand.variable} ${roboto.variable}`}>
        <head>
            <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1172152988966182"
                    crossOrigin="anonymous"></script>
        </head>
        <body>
        <Marquee/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}