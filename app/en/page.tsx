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
            "Explore puzzles, knowledge, and education through logic games, quizzes, and casual arcades.",
    };
}

export default async function HomePageEN() {

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": localFaq.map(item => ({
            "@type": "Question",
            "name": item.question.en,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.en,
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
                title="Explore Puzzles, Knowledge, and Education"
                description="Each world offers a new way to think and learn through games."
                imageUrl="hero.png"
            />
            <About
                title="ABOUT US"
                itemDescription="We design logic puzzle games, knowledge quizzes, educational quizzes, and casual arcades that are easy to play, fun, and sharpen the way you think. We focus on simple mechanics and smooth gameplay, so every game is not only entertaining but also provides educational value. Our goal is to create gaming experiences that bring joy, learning, and imagination to players of all ages."
            />
            <Games games={localGames} allGames={localGames} gameSearch="ALL GAMES" sectionId="games"/>
            <Characters characters={localCharacters} characterSearch="ALL CHARACTERS"/>
            <Games games={localGames} allGames={localGames} gameSearch="COMING SOON" isUpcoming sectionId="upcoming"/>
            <FAQ title="FREQUENTLY ASKED QUESTIONS"/>
            <Contact title="GET IN TOUCH"/>
        </div>
    );
}