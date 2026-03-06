"use client";

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useInView} from "@/hooks/useInView";
import {getImageUrl} from "@/utils";
import styles from "@/styles/Hero.module.css";

interface HeroProps {
    title: string;
    description: string;
    downloadLink?: string;
    imageUrl: string;
    date?: string;
}

export const Hero = ({
                         title,
                         description,
                         downloadLink,
                         imageUrl,
                         date,
                     }: HeroProps) => {
    const {ref, isVisible} = useInView<HTMLDivElement>(0.18);
    const pathname = usePathname();

    const isHomePage = pathname === "/";
    const isCharacterPage = pathname.startsWith("/character/");
    const isGamePage = pathname !== "/" && !isCharacterPage;

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
                    setCountdown(`Hari ini ${release.getHours()}:${release.getMinutes().toString().padStart(2,'0')} WIB`);
                } else if (dayDiff === 1) {
                    setCountdown(`Besok ${release.getHours()}:${release.getMinutes().toString().padStart(2,'0')} WIB`);
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
        <section ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description} dangerouslySetInnerHTML={{__html: description}}></p>
                {isHomePage && (
                    <a href="#games" className={styles.gameBtn} onClick={() => {
                        setTimeout(() => {
                            history.replaceState(null, '', window.location.pathname);
                        }, 200);
                    }}>Cari Gim</a>
                )}
                {isGamePage && (
                    <div className={styles.buttonGroup}>
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
                )}
            </div>
            <img
                src={getImageUrl(`${imageUrl}`)}
                alt="hero"
                className={isCharacterPage ? styles.characterHeroImg : styles.heroImg}
            />
        </section>
    );
};