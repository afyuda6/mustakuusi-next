"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {useInView} from "@/hooks/useInView";
import {getImageUrl} from "@/utils";
import styles from "@/styles/GameCard.module.css";

interface GameProps {
    title: string;
    imageSrc: string;
    date: string;
    description: string;
    categories: string[];
    detail: string;
    downloadLink: string;
}

interface GameCardProps {
    game: GameProps;
}

export const GameCard = ({
                             game: {title, imageSrc, date, categories, detail, downloadLink},
                         }: GameCardProps) => {
    const {ref, isVisible} = useInView<HTMLDivElement>(0.18);
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        if (date) {
            const updateCountdown = () => {
                const now = new Date();
                const release = new Date(date);

                const diffMs = release.getTime() - now.getTime();
                if (diffMs <= 0) {
                    setCountdown("");
                    return;
                }

                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const releaseDay = new Date(release.getFullYear(), release.getMonth(), release.getDate());
                const dayDiff = Math.round((releaseDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                if (dayDiff === 0) {
                    setCountdown(`Hari ini ${release.getHours()}:${release.getMinutes().toString().padStart(2, '0')} WIB`);
                } else if (dayDiff === 1) {
                    setCountdown(`Besok ${release.getHours()}:${release.getMinutes().toString().padStart(2, '0')} WIB`);
                } else {
                    setCountdown(`${dayDiff} hari lagi`);
                }
            };

            updateCountdown();
            const timer = setInterval(updateCountdown, 1000 * 60 * 60);
            return () => clearInterval(timer);
        }
    }, [date]);

    return (
        <div ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.card}>
                <img src={getImageUrl(imageSrc)} alt={`Image of ${title}`} className={styles.image}/>
                <h3 className={styles.title}>
                    <Link
                        href={detail}
                        onClick={() => {
                            const html = document.documentElement;
                            html.style.scrollBehavior = "auto";
                            requestAnimationFrame(() => {
                                window.scrollTo(0, 0);
                                requestAnimationFrame(() => {
                                    html.style.scrollBehavior = "smooth";
                                });
                            });
                        }}
                    >{title}</Link>
                </h3>
                <time className={styles.date} dateTime={date}>
                    Dirilis: {new Date(date).toLocaleDateString("id-ID", {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                })} WIB
                </time>
                <ul className={styles.categories}>
                    {categories.map((category, id) => (
                        <li key={id} className={styles.category}>{category}</li>
                    ))}
                </ul>
                <div className={styles.links}>
                    {countdown && <h2 className={styles.badge}>{countdown}</h2>}
                    {!countdown && downloadLink && (
                        <a href={downloadLink} target="_blank" rel="noopener">
                            <img
                                src={getImageUrl("googlebadge.png")}
                                alt="Unduh di Google Play"
                                className={styles.badge}
                            />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};