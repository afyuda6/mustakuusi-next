import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {Games} from "@/components/Games";
import {Contact} from "@/components/Contact";
import localCharacters from "@/public/data/characters.json";
import localGames from "@/public/data/games.json";
import {notFound} from "next/navigation";

interface CharacterData {
    id: string;
    name: string;
    imageSrc: string;
    description: {
        id: string;
        en: string;
    };
}

interface GameData {
    id: string;
    title: {
        id: string;
        en: string;
    };
    imageSrc: string;
    date: string;
    description: {
        id: string;
        en: string;
    };
    categories: {
        id: string[];
        en: string[];
    };
    detail: string;
    downloadLink: string;
    longDescription: {
        en: string;
        id: string;
    };
    privacyPolicyLink: string;
    screenshots: string[];
    characters: {
        id: string;
        role: {
            en: string;
            id: string;
        };
    }[];
}

export async function generateStaticParams() {
    const characterList = (localCharacters as CharacterData[]);
    return characterList.map((c) => ({id: c.id}));
}

export async function generateMetadata({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const character = (localCharacters as CharacterData[]).find((p) => p.id === id);
    return {
        title: character ? `${character.name} | mustakuusi` : "Character not found",
    };
}

export default async function CharacterPageEN({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const characterList = localCharacters as CharacterData[];
    const character = characterList.find((p) => p.id === id);

    if (!character) {
        notFound();
    }

    const gamesList = localGames as GameData[];

    const filteredGames = gamesList.filter((p) =>
        p.characters?.some((c) => c.id === character.id)
    );

    const characterStats = [
        {
            value: filteredGames.length,
            label: {id: "Game", en: "Games"},
        },
    ];

    return (
        <div>
            <Navbar/>
            <Hero
                title={character.name}
                imageUrl={character.imageSrc}
                description={character.description}
                stats={characterStats}
            />
            <Games games={filteredGames} gameSearch={`GAMES FEATURING ${character.name}`} characterId={character.id}/>
            <Contact title="GET IN TOUCH"/>
        </div>
    );
}