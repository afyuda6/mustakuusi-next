"use client";

import {ChangeEvent, startTransition, useDeferredValue, useState, useRef, useEffect} from "react";
import {usePathname} from "next/navigation";
import {CharacterCard} from "./CharacterCard";
import styles from "@/styles/Characters.module.css";

interface CharacterProps {
    id: string;
    name: string;
    imageSrc: string;
    description: {
        id: string;
        en: string;
    };
    role?: {
        en: string;
        id: string;
    };
}

interface CharactersSectionProps {
    characters: CharacterProps[];
    characterSearch: string;
}

const GhostCharacterCard = () => (
    <div>
        <span></span>
    </div>
);

export const Characters = ({characters, characterSearch}: CharactersSectionProps) => {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    const [searchKeyword, setSearchKeyword] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const deferredKeyword = useDeferredValue(searchKeyword);
    const normalizedKeyword = deferredKeyword.trim().toLowerCase();

    const filteredCharacters = characters.filter((c) =>
        c.name.toLowerCase().includes(normalizedKeyword)
    );

    const total = filteredCharacters.length;

    const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
        const track = trackRef.current;
        if (!track) return;

        const slides = Array.from(track.children).filter((child) =>
            child.classList.contains(styles.carouselSlide) &&
            !child.hasAttribute("data-spacer")
        ) as HTMLElement[];

        const slide = slides[index];
        if (!slide) return;

        isScrollingRef.current = true;

        track.scrollTo({
            left: slide.offsetLeft - (track.offsetWidth - slide.offsetWidth) / 2,
            behavior,
        });

        if (behavior === "smooth") {
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false;
            }, 300);
        } else {
            isScrollingRef.current = false;
        }
    };

    const goTo = (index: number) => {
        const clamped = Math.max(0, Math.min(index, total - 1));
        setActiveIndex(clamped);
        scrollToIndex(clamped);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setSearchKeyword(event.target.value);
        });
    };

    useEffect(() => {
        setActiveIndex(0);
        scrollToIndex(0, "auto");
    }, [normalizedKeyword, total]);

    useEffect(() => {
        scrollToIndex(activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleScroll = () => {
            if (isScrollingRef.current) return;

            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

            scrollTimeoutRef.current = setTimeout(() => {
                const slides = Array.from(track.children).filter((child) =>
                    child.classList.contains(styles.carouselSlide) &&
                    !child.hasAttribute("data-spacer")
                ) as HTMLElement[];

                if (!slides.length) return;

                const trackCenter = track.scrollLeft + track.offsetWidth / 2;

                let closestIndex = 0;
                let closestDistance = Infinity;

                slides.forEach((slide, i) => {
                    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
                    const distance = Math.abs(trackCenter - slideCenter);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = i;
                    }
                });

                setActiveIndex(closestIndex);
            }, 50);
        };

        track.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            track.removeEventListener("scroll", handleScroll);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [filteredCharacters]);

    return (
        <section className={styles.container} id="characters">
            <div className={styles.searchRow}>
                <label className={styles.searchLabel} htmlFor="characters-search">
                    {characterSearch}
                </label>
                <input
                    id="characters-search"
                    type="search"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    placeholder={isEnglish ? "Type a name..." : "Ketik nama..."}
                    className={styles.searchInput}
                />
            </div>

            {total > 0 ? (
                <div className={styles.carouselWrapper}>
                    <button
                        className={`${styles.navBtn} ${styles.btnPrev}`}
                        onClick={() => goTo(activeIndex - 1)}
                        disabled={activeIndex === 0}
                    >
                        &#8249;
                    </button>

                    <div className={styles.carouselViewport}>
                        <div className={styles.carouselTrack} ref={trackRef}>
                            <div className={styles.carouselSpacerSlide} data-spacer="true" aria-hidden="true">
                                <div>
                                    <span></span>
                                </div>
                            </div>

                            {filteredCharacters.map((character, i) => (
                                <div
                                    key={character.id}
                                    className={`${styles.carouselSlide} ${
                                        i === activeIndex ? styles.slideActive : ""
                                    }`}
                                >
                                    <CharacterCard character={character}/>
                                </div>
                            ))}

                            <div className={styles.carouselSpacerSlide} data-spacer="true" aria-hidden="true">
                                <div>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`${styles.navBtn} ${styles.btnNext}`}
                        onClick={() => goTo(activeIndex + 1)}
                        disabled={activeIndex === total - 1}
                    >
                        &#8250;
                    </button>

                    {total > 1 && (
                        <div className={styles.dots}>
                            {filteredCharacters.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.dot} ${
                                        i === activeIndex ? styles.dotActive : ""
                                    }`}
                                    onClick={() => goTo(i)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p className={styles.emptyState}>
                    {isEnglish
                        ? `No characters match the keyword "${searchKeyword.trim()}".`
                        : `Tidak ada karakter yang cocok dengan kata kunci "${searchKeyword.trim()}".`}
                </p>
            )}
        </section>
    );
};