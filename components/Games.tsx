"use client";

import { GameCard } from "./GameCard";
import styles from "@/styles/Games.module.css";

interface GameProps {
    id: string;
    title: string;
    imageSrc: string;
    date: string;
    description: string;
    categories: string[];
    detail: string;
    downloadLink: string;
}

interface GamesSectionProps {
    gameSection: string;
    games: GameProps[];
}

export const Games = ({ gameSection, games }: GamesSectionProps) => {
    return (
        <section className={styles.container} id="games">
            <h2 className={styles.title}>{gameSection}</h2>
            <div className={styles.games}>
                {games.map((game) => (
                    <GameCard key={game.id} game={game}/>
                ))}
            </div>
        </section>
    );
};