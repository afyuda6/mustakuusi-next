import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {Games} from "@/components/Games";
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
    longDescription: string;
    privacyPolicyLink: string;
    screenshots: string[];
    characters: string[];
}

export async function generateMetadata({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const character = (characters as CharacterData[]).find((p) => p.id === id);
    return {
        title: character ? `${character.name} | mustakuusi` : "Character not found",
    };
}

export default async function CharacterPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const character = (characters as CharacterData[]).find((p) => p.id === id);

    if (!character) {
        return <div></div>;
    }

    const filteredGames = (games as GameData[]).filter((p) =>
        p.characters.includes(character.id)
    );

    return (
        <div>
            <Navbar/>
            <Hero
                title={character.name}
                imageUrl={character.imageSrc}
                description={character.description}
            />
            <Games gameSection={`${character.name} di Gim`} games={filteredGames}/>
            <Contact/>
        </div>
    );
}