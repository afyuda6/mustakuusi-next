import {Navbar} from "@/components/Navbar";
import {Privacy} from "@/components/Privacy";
import {Contact} from "@/components/Contact";
import games from "@/public/data/games.json";

interface GameData {
    id: string;
    title: string;
}

export async function generateMetadata({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const game = (games as GameData[]).find((p) => p.id === id);
    return {
        title: game ? `${game.title} | mustakuusi` : "Game not found",
    };
}

export default async function PrivacyPolicyPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const game = (games as GameData[]).find((p) => p.id === id);

    if (!game) {
        return <div></div>;
    }

    return (
        <div>
            <Navbar/>
            <Privacy id={id} title={game.title}/>
            <Contact/>
        </div>
    );
}