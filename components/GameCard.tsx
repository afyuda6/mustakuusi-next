"use client";

import {useEffect, useState, useSyncExternalStore} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useInView} from "@/hooks/useInView";
import {getImageUrl} from "@/utils";
import styles from "@/styles/GameCard.module.css";

interface GameProps {
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
    characters?: {
        id: string;
        role: {
            en: string;
            id: string;
        };
    }[];
}

interface GameCardProps {
    game: GameProps;
    searchKeyword?: string;
    animateOnMount?: boolean;
    characterId?: string;
    onCategoryClick?: (category: string) => void;
    activeCategories?: string[];
}

const subscribe = () => () => {
};

export const GameCard = ({
                             game: {title, imageSrc, date, categories, detail, downloadLink, characters},
                             searchKeyword = "",
                             animateOnMount = true,
                             characterId = "",
                             onCategoryClick,
                             activeCategories = [],
                         }: GameCardProps) => {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    const {ref, isVisible} = useInView<HTMLDivElement>(0.06);
    const [countdown, setCountdown] = useState("");

    const currentCategories = isEnglish ? categories.en : categories.id;

    const resolvedTitle = isEnglish ? title.en : title.id;
    const normalizedTitle = resolvedTitle.toLowerCase();
    const normalizedSearch = searchKeyword.toLowerCase();

    const matchingCategories = currentCategories.filter((category) =>
        category.toLowerCase().includes(normalizedSearch)
    );

    const hasDirectMatch =
        !!normalizedSearch &&
        (normalizedTitle.includes(normalizedSearch) ||
            matchingCategories.length > 0);

    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 1000 * 60);

        return () => clearInterval(timer);
    }, []);

    const releaseDate = new Date(date);
    const isReleased = releaseDate.getTime() <= now;

    const formattedDate = useSyncExternalStore(
        subscribe,
        () =>
            releaseDate.toLocaleDateString(
                isEnglish ? "en-US" : "id-ID",
                {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                }
            ).replace(".", ":"),
        () => ""
    );

    useEffect(() => {
        if (!date) return;

        const updateCountdown = () => {
            const now = new Date();
            const release = new Date(date);

            const diffMs = release.getTime() - now.getTime();
            if (diffMs <= 0) {
                setCountdown("");
                return;
            }

            const today = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );
            const releaseDay = new Date(
                release.getFullYear(),
                release.getMonth(),
                release.getDate()
            );

            const dayDiff = Math.round(
                (releaseDay.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24)
            );

            const timeStr = `${release
                .getHours()
                .toString()
                .padStart(2, "0")}:${release
                .getMinutes()
                .toString()
                .padStart(2, "0")}`;

            if (dayDiff === 0) {
                setCountdown(
                    isEnglish ? `Today ${timeStr}` : `Hari ini ${timeStr} WIB`
                );
            } else if (dayDiff === 1) {
                setCountdown(
                    isEnglish ? `Tomorrow ${timeStr}` : `Besok ${timeStr} WIB`
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
    }, [date, isEnglish]);

    const containerClassName = animateOnMount
        ? `${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`
        : styles.container;

    const role = characterId
        ? characters?.find((c) => c.id === characterId)?.role
        : null;

    const detailHref =
        isEnglish && detail && !detail.startsWith("/en")
            ? `/en${detail}`
            : detail;

    const googleBadge = isEnglish
        ? "googlebadge-en.png"
        : "googlebadge-id.png";

    return (
        <div ref={ref} className={containerClassName}>
            <div className={`${styles.card} ${hasDirectMatch ? styles.cardMatched : ""}`}>
                {role && (
                    <span className={styles.roleBadge}>
                        {isEnglish ? `As ${role.en}` : `Sebagai ${role.id}`}
                    </span>
                )}

                <img src={getImageUrl(imageSrc)} alt={`Image of ${resolvedTitle}`} className={styles.image}
                     loading="lazy"/>

                <h3 className={styles.title}>
                    <Link
                        href={detailHref}
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
                    >
                        {resolvedTitle}
                    </Link>
                </h3>
                <time className={styles.date} dateTime={date}>
                    {formattedDate &&
                        (isEnglish
                            ? `${isReleased ? "Released" : "Releases"}: ${formattedDate}`
                            : `${isReleased ? "Dirilis" : "Rilis"}: ${formattedDate} WIB`)}
                </time>
                <ul className={styles.categories}>
                    {currentCategories.map((category, id) => (
                        <li
                            key={id}
                            className={`${styles.category} ${onCategoryClick ? styles.categoryClickable : ""} ${
                                activeCategories.includes(category) ? styles.categoryActive : ""
                            }`}
                            onClick={() => onCategoryClick?.(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                <div className={styles.links}>
                    {countdown && <h2 className={styles.badge}>{countdown}</h2>}

                    {!countdown && downloadLink && (
                        <a href={downloadLink} target="_blank" rel="noopener">
                            <img
                                src={getImageUrl(googleBadge)}
                                alt={
                                    isEnglish
                                        ? "Get it on Google Play"
                                        : "Unduh di Google Play"
                                }
                                className={styles.badge}
                                loading="lazy"
                            />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};