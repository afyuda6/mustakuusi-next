import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {About} from "@/components/About";
import {Games} from "@/components/Games";
import {Characters} from "@/components/Characters";
import {Contact} from "@/components/Contact";
import characters from "@/public/data/characters.json";
import games from "@/public/data/games.json";

export async function generateMetadata() {
    return {
        title: "mustakuusi",
        description:
            "Eksplorasi teka-teki, pengetahuan, dan edukasi melalui gim logika, kuis, dan arkade kasual.",
    };
}

export default async function HomePage() {
    return (
        <div>
            <Navbar/>
            <Hero
                title="Eksplorasi Teka-teki, Pengetahuan, dan Edukasi"
                description="Setiap dunia menawarkan cara baru untuk berpikir dan belajar melalui gim."
                imageUrl="hero.png"
            />
            <About
                about="Tentang"
                itemDescription="Kami merancang gim teka-teki logika, kuis pengetahuan, kuis edukasi, serta arkade kasual yang mudah dimainkan, menyenangkan, dan dapat mengasah cara berpikir. Kami berfokus pada pembuatan mekanik sederhana dan gameplay yang halus, sehingga setiap gim tidak hanya menghibur, tetapi juga memberikan nilai edukatif. Tujuan kami adalah menciptakan pengalaman bermain yang membawa keceriaan, pembelajaran, dan imajinasi bagi pemain dari berbagai usia."
            />
            <Games gameSection="Gim" games={games}/>
            <Characters characterSection="Karakter" characters={characters}/>
            <Contact/>
        </div>
    );
}