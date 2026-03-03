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
    playLink?: string;
    imageUrl: string;
    date?: string;
}

export const Hero = ({
                         title,
                         description,
                         downloadLink,
                         playLink,
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
                const now = new Date().getTime();
                const release = new Date(date).getTime();
                const diff = release - now;

                if (diff <= 0) {
                    setCountdown("");
                    return;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                setCountdown(`${days} hari lagi`);
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
                        {countdown && (
                            <h2 className={styles.badge}>{countdown}</h2>
                        )}
                        {!countdown && downloadLink && (
                            <a href={downloadLink} target="_blank" rel="noopener"><img
                                src={getImageUrl("googlebadge.png")}
                                alt="Unduh di Google Play"
                                className={styles.badge}
                            /></a>)}
                        {!countdown && playLink && (
                            <a href={playLink} target="_blank" rel="noopener"><img
                                src={getImageUrl("itchbadge.png")}
                                alt="Main di itch.io"
                                className={styles.badge}
                            /></a>)}
                    </div>
                )}
            </div>
            <img src={getImageUrl(`${imageUrl}`)} alt="hero"
                 className={isCharacterPage ? styles.characterHeroImg : styles.heroImg}/>
        </section>
    );
};