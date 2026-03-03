import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {About} from "@/components/About";
import {Characters} from "@/components/Characters";
import {Screenshots} from "@/components/Screenshots";
import {Contact} from "@/components/Contact";
import characters from "@/public/data/characters.json";
import games from "@/public/data/games.json";

interface CharacterData {
    id: string;
    name: string;
    imageSrc: string;
    description: string;
}

interface GameData {
    id: string;
    title: string;
    imageSrc: string;
    date: string;
    description: string;
    categories: string[];
    detail: string;
    downloadLink: string;
    playLink: string;
    longDescription: string;
    privacyPolicyLink: string;
    screenshots: string[];
    characters: string[];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const game = (games as GameData[]).find((p) => p.id === id);
    return {
        title: game ? `${game.title} | mustakuusi` : "Game not found",
    };
}

export default async function GamePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const game = (games as GameData[]).find((p) => p.id === id);

    if (!game) {
        return <div></div>;
    }

    const filteredCharacters = (characters as CharacterData[]).filter((c) =>
        game.characters.includes(c.id)
    );

    return (
        <div>
            <Navbar/>
            <Hero
                title={game.title}
                description={game.description}
                downloadLink={game.downloadLink}
                playLink={game.playLink}
                imageUrl={game.imageSrc}
                date={game.date}
            />
            <About
                about="Tentang Gim"
                itemDescription={game.longDescription}
                privacyPolicyLink={game.privacyPolicyLink}
            />
            <Characters
                characterSection="Karakter di Gim"
                characters={filteredCharacters}
            />
            <Screenshots screenshots={game.screenshots} title={game.title}/>
            <Contact/>
        </div>
    );
}