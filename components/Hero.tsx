"use client";

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useInView} from "@/hooks/useInView";
import {getImageUrl} from "@/utils";
import styles from "@/styles/Hero.module.css";
import localGames from "@/public/data/games.json";
import localCharacters from "@/public/data/characters.json";

interface StatItem {
    value: number;
    label: {
        id: string;
        en: string;
    };
}

interface HeroProps {
    title: string | {
        id: string;
        en: string;
    };
    description: string | {
        id: string;
        en: string;
    };
    downloadLink?: string;
    imageUrl: string;
    date?: string;
    stats?: StatItem[];
}

export const Hero = ({
                         title,
                         description,
                         downloadLink,
                         imageUrl,
                         date,
                         stats,
                     }: HeroProps) => {
    const {ref, isVisible} = useInView<HTMLDivElement>(0.06);
    const pathname = usePathname();

    const isEnglish = pathname.startsWith("/en");

    const isHomePage = pathname === "/" || pathname === "/en";
    const isCharacterPage = pathname.startsWith("/characters/") || pathname.startsWith("/en/characters/");
    const isGamePage = !isHomePage && !isCharacterPage;

    const [countdown, setCountdown] = useState("");

    const now = Date.now();

    const dynamicStats: StatItem[] = [
        {
            value: localGames.filter(g => new Date(g.date).getTime() <= now).length,
            label: {id: "Game Dirilis", en: "Games Released"},
        },
        {
            value: localCharacters.length,
            label: {id: "Karakter Ditampilkan", en: "Characters Featured"},
        },
    ];

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

                const timeStr = `${release.getHours().toString().padStart(2, '0')}:${release.getMinutes().toString().padStart(2, '0')}`;

                if (dayDiff === 0) {
                    setCountdown(
                        isEnglish
                            ? `Today ${timeStr}`
                            : `Hari ini ${timeStr} WIB`
                    );
                } else if (dayDiff === 1) {
                    setCountdown(
                        isEnglish
                            ? `Tomorrow ${timeStr}`
                            : `Besok ${timeStr} WIB`
                    );
                } else {
                    setCountdown(
                        isEnglish
                            ? `${dayDiff} days left`
                            : `${dayDiff} hari lagi`
                    );
                }
            };

            updateCountdown();
            const timer = setInterval(updateCountdown, 1000 * 60 * 60);
            return () => clearInterval(timer);
        }
    }, [date, isEnglish]);

    const desc =
        typeof description === "string"
            ? description
            : isEnglish
                ? description.en
                : description.id;

    const googleBadge = isEnglish
        ? "googlebadge-en.png"
        : "googlebadge-id.png";

    const resolvedTitle =
        typeof title === "string"
            ? title
            : isEnglish
                ? title.en
                : title.id;

    const resolvedStats = isHomePage ? dynamicStats : stats;

    return (
        <section ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.content}>
                <h1 className={styles.title}>{resolvedTitle}</h1>
                <p className={styles.description}
                   dangerouslySetInnerHTML={{__html: desc}}></p>

                {resolvedStats && resolvedStats.length > 0 && (
                    <div className={styles.stats}>
                        {resolvedStats.map((stat, index) => (
                            <div key={index} className={styles.statItem}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>
                                    {isEnglish ? stat.label.en : stat.label.id}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {isHomePage && (
                    <a href="#games" className={styles.gameBtn} onClick={() => {
                        setTimeout(() => {
                            history.replaceState(null, '', window.location.pathname);
                        }, 200);
                    }}>{isEnglish ? "Find Games" : "Cari Game"}</a>
                )}

                {isGamePage && (
                    <div className={styles.buttonGroup}>
                        {countdown && <h2 className={styles.badge}>{countdown}</h2>}
                        {!countdown && downloadLink && (
                            <a href={downloadLink} target="_blank" rel="noopener">
                                <img
                                    src={getImageUrl(googleBadge)}
                                    alt={isEnglish ? "Get it on Google Play" : "Unduh di Google Play"}
                                    className={styles.badge}
                                    loading="lazy"
                                />
                            </a>
                        )}
                    </div>
                )}
            </div>

            <img
                src={getImageUrl(`${imageUrl}`)}
                alt="hero"
                className={isCharacterPage ? styles.characterHeroImg : styles.heroImg}
                loading="lazy"
            />
        </section>
    );
};