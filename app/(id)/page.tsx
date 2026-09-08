import {SocialRedirect} from "@/components/SocialRedirect";
import {TiktokBrowserWarning} from "@/components/TiktokBrowserWarning";
import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {About} from "@/components/About";
import {Games} from "@/components/Games";
import {Characters} from "@/components/Characters";
import {Contact} from "@/components/Contact";
import localCharacters from "@/public/data/characters.json";
import localGames from "@/public/data/games.json";
import localFaq from "@/public/data/faq.json";
import {FAQ} from "@/components/FAQ";

export async function generateMetadata() {
    return {
        title: "mustakuusi",
        description:
            "Eksplorasi puzzle, pengetahuan, dan edukasi melalui game logika, kuis, dan arkade kasual.",
    };
}

export default async function HomePage() {

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": localFaq.map(item => ({
            "@type": "Question",
            "name": item.question.id,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.id,
            },
        })),
    };

    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
            />
            <SocialRedirect/>
            <TiktokBrowserWarning/>
            <Navbar/>
            <Hero
                title="Eksplorasi Puzzle, Pengetahuan, dan Edukasi"
                description="Setiap dunia menawarkan cara baru untuk berpikir dan belajar melalui game."
                imageUrl="hero.png"
            />
            <About
                title="TENTANG KAMI"
                itemDescription="Kami merancang game puzzle logika, kuis pengetahuan, kuis edukasi, serta arkade kasual yang mudah dimainkan, menyenangkan, dan dapat mengasah cara berpikir. Kami berfokus pada pembuatan mekanik sederhana dan gameplay yang halus, sehingga setiap game tidak hanya menghibur, tetapi juga memberikan nilai edukatif. Tujuan kami adalah menciptakan pengalaman bermain yang membawa keceriaan, pembelajaran, dan imajinasi bagi pemain dari berbagai usia."
            />
            <Games games={localGames} allGames={localGames} gameSearch="SEMUA GAME" sectionId="games"/>
            <Characters characters={localCharacters} characterSearch="SEMUA KARAKTER"/>
            <Games games={localGames} allGames={localGames} gameSearch="AKAN HADIR" isUpcoming sectionId="upcoming"/>
            <FAQ title="PERTANYAAN YANG SERING DIAJUKAN"/>
            <Contact title="HUBUNGI KAMI"/>
        </div>
    );
}