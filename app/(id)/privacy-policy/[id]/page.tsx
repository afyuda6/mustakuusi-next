import {Navbar} from "@/components/Navbar";
import {Privacy} from "@/components/Privacy";
import {Contact} from "@/components/Contact";
import localGames from "@/public/data/games.json";
import {notFound} from "next/navigation";

interface GameData {
    id: string;
    title: {
        id: string;
        en: string;
    };
}

export async function generateStaticParams() {
    const gamesList = (localGames as GameData[]);
    return gamesList.map((g) => ({ id: g.id }));
}

export async function generateMetadata({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const game = (localGames as GameData[]).find((p) => p.id === id);
    return {
        title: game ? `${game.title.id} | mustakuusi` : "Game not found",
    };
}

export default async function PrivacyPolicyPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const gamesList = localGames as GameData[];
    const game = gamesList.find((p) => p.id === id);

    if (!game) {
        notFound();
    }

    return (
        <div>
            <Navbar/>
            <Privacy id={id} title={game.title.id} defaultLang="id"/>
            <Contact title="HUBUNGI KAMI"/>
        </div>
    );
}
