import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {About} from "@/components/About";
import {Characters} from "@/components/Characters";
import {Screenshots} from "@/components/Screenshots";
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
    const gamesList = (localGames as GameData[]);
    return gamesList.map((g) => ({gameId: g.id}));
}

export async function generateMetadata({params}: { params: Promise<{ gameId: string }> }) {
    const {gameId} = await params;
    const game = (localGames as GameData[]).find((p) => p.id === gameId);
    return {
        title: game ? `${game.title.id} | mustakuusi` : "Game not found",
    };
}

export default async function GamePage({params}: { params: Promise<{ gameId: string }> }) {
    const {gameId} = await params;
    const gamesList = localGames as GameData[];
    const game = gamesList.find((p) => p.id === gameId);

    if (!game) {
        notFound();
    }

    const charactersList = localCharacters as CharacterData[];

    const filteredCharacters = game.characters
        .map((gc) => {
            const character = charactersList.find((c) => c.id === gc.id);
            if (!character) return undefined;

            return {
                ...character,
                role: gc.role,
            };
        })
        .filter(
            (c): c is CharacterData & { role: { en: string; id: string } } =>
                c !== undefined
        );

    const gameStats = [
        {
            value: filteredCharacters.length,
            label: {id: "Karakter", en: "Characters"},
        },
    ];

    return (
        <div>
            <Navbar/>
            <Hero
                title={game.title.id}
                description={game.description}
                downloadLink={game.downloadLink}
                imageUrl={game.imageSrc}
                date={game.date}
                stats={gameStats}
            />
            <About
                title="DESKRIPSI GAME"
                itemDescription={game.longDescription}
                privacyPolicyLink={game.privacyPolicyLink}
            />
            <Characters characters={filteredCharacters} characterSearch={`KARAKTER DI GAME`}/>
            <Screenshots screenshots={game.screenshots} title="CUPLIKAN GAME"/>
            <Contact title="HUBUNGI KAMI"/>
        </div>
    );
}