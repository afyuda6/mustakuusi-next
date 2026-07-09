"use client";

import {ChangeEvent, startTransition, useCallback, useDeferredValue, useState, useRef, useEffect} from "react";
import {usePathname} from "next/navigation";
import {GameCard} from "./GameCard";
import styles from "@/styles/Games.module.css";
import categoryTree from "@/public/data/categories.json";

interface GameProps {
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
    characters?: {
        id: string;
        role: {
            en: string;
            id: string;
        };
    }[];
}

interface GamesSectionProps {
    games: GameProps[];
    allGames?: GameProps[];
    gameSearch: string;
    characterId?: string;
    isUpcoming?: boolean;
    sectionId?: string;
}

const getCategoryLabel = (value: string, isEnglish: boolean): string | null => {
    for (const parent of categoryTree) {
        if (parent.value === value) return isEnglish ? parent.label.en : parent.label.id;
        const child = parent.children.find(c => c.value === value);
        if (child) return isEnglish ? child.label.en : child.label.id;
    }
    return null;
};

export const Games = ({games, allGames, gameSearch, characterId, isUpcoming, sectionId}: GamesSectionProps) => {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    const now = Date.now();

    const categorySource = (allGames ?? games).filter(game => {
        const releaseTime = new Date(game.date).getTime();
        return isUpcoming ? releaseTime > now : releaseTime <= now;
    });

    const availableCategoryTree = categoryTree
        .map(parent => ({
            ...parent,
            children: parent.children.filter(child => {
                const childLabel = getCategoryLabel(child.value, isEnglish);
                return categorySource.some(game => {
                    const cats = isEnglish ? game.categories.en : game.categories.id;
                    return cats.includes(childLabel ?? "");
                });
            })
        }))
        .filter(parent => {
            const parentLabel = getCategoryLabel(parent.value, isEnglish);
            return categorySource.some(game => {
                const cats = isEnglish ? game.categories.en : game.categories.id;
                return cats.includes(parentLabel ?? "");
            });
        });

    const [searchKeyword, setSearchKeyword] = useState("");
    const [activeParent, setActiveParent] = useState("all");
    const [activeChild, setActiveChild] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const trackRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const deferredKeyword = useDeferredValue(searchKeyword);
    const normalizedKeyword = deferredKeyword.trim().toLowerCase();

    const isSearching = normalizedKeyword.length > 0;
    const isFilteringCategory = activeParent !== "all" || activeChild !== null;

    const filteredGames = games.filter((game) => {
        const releaseTime = new Date(game.date).getTime();
        const matchesRelease = isUpcoming ? releaseTime > now : releaseTime <= now;
        if (!matchesRelease) return false;

        const currentCategories = isEnglish
            ? game.categories.en
            : game.categories.id;

        const matchesCategory = (() => {
            if (activeParent === "all") return true;

            const parentLabel = getCategoryLabel(activeParent, isEnglish);
            if (!parentLabel) return true;
            if (!currentCategories.includes(parentLabel)) return false;
            if (!activeChild) return true;

            const childLabel = getCategoryLabel(activeChild, isEnglish);
            if (!childLabel) return true;
            return currentCategories.includes(childLabel);
        })();

        if (!normalizedKeyword) return matchesCategory;

        const combinedText = [
            isEnglish ? game.title.en : game.title.id,
            isEnglish ? game.description.en : game.description.id,
            ...currentCategories
        ]
            .join(" ")
            .toLowerCase();

        const keywords = normalizedKeyword.split(/\s+/);
        const matchesSearch = keywords.every((word) => combinedText.includes(word));

        return matchesCategory && matchesSearch;
    })
        .sort((a, b) => {
            const aTime = new Date(a.date).getTime();
            const bTime = new Date(b.date).getTime();
            return isUpcoming ? aTime - bTime : bTime - aTime;
        });

    const total = filteredGames.length;

    const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
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
    }, []);

    const goTo = (index: number) => {
        const clamped = Math.max(0, Math.min(index, total - 1));
        setActiveIndex(clamped);
        scrollToIndex(clamped);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        startTransition(() => setSearchKeyword(event.target.value));
    };

    const handleParentChange = (value: string) => {
        startTransition(() => {
            setActiveParent((prev) => (prev === value ? "all" : value));
            setActiveChild(null);
        });
    };

    const handleChildChange = (value: string) => {
        startTransition(() => {
            setActiveChild((prev) => (prev === value ? null : value));
        });
    };

    useEffect(() => {
        setActiveIndex(0);
        scrollToIndex(0, "auto");
        return () => {
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [normalizedKeyword, activeParent, activeChild, total, scrollToIndex]);

    useEffect(() => {
        scrollToIndex(activeIndex);
        return () => {
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [activeIndex, scrollToIndex]);

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
    }, [filteredGames]);

    const activeTree = availableCategoryTree.find((c) => c.value === activeParent);

    const handleCategoryClickFromCard = useCallback((categoryLabel: string) => {
        for (const parent of categoryTree) {
            const parentLabel = isEnglish ? parent.label.en : parent.label.id;
            if (parentLabel === categoryLabel) {
                startTransition(() => {
                    setActiveParent((prev) => prev === parent.value ? "all" : parent.value);
                    setActiveChild(null);
                });
                return;
            }
            const child = parent.children.find(c =>
                (isEnglish ? c.label.en : c.label.id) === categoryLabel
            );
            if (child) {
                startTransition(() => {
                    setActiveParent(parent.value);
                    setActiveChild((prev) => prev === child.value ? null : child.value);
                });
                return;
            }
        }
    }, [isEnglish]);

    const activeCategories = (() => {
        const result: string[] = [];
        if (activeParent !== "all") {
            const parentLabel = getCategoryLabel(activeParent, isEnglish);
            if (parentLabel) result.push(parentLabel);
        }
        if (activeChild) {
            const childLabel = getCategoryLabel(activeChild, isEnglish);
            if (childLabel) result.push(childLabel);
        }
        return result;
    })();

    return (
        <section className={`${styles.container} ${total === 0 ? styles.containerEmpty : ""}`}
                 id={sectionId ?? "games"}>
            <div className={styles.searchRow}>
                <label
                    className={styles.searchLabel}
                    htmlFor={!isUpcoming ? "games-search" : undefined}
                >
                    {gameSearch}
                </label>

                {!isUpcoming && (
                    <input
                        id="games-search"
                        type="search"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        placeholder={isEnglish ? "Type a title, category, or keyword..." : "Ketik judul, kategori, atau kata kunci..."}
                        className={styles.searchInput}
                    />
                )}
            </div>

            <div className={styles.categoryFilter}>
                {availableCategoryTree.map(({value, label}) => (
                    <button
                        key={value}
                        className={`${styles.categoryBtn} ${
                            activeParent === value ? styles.categoryBtnActive : ""
                        }`}
                        onClick={() => handleParentChange(value)}
                    >
                        {isEnglish ? label.en : label.id}
                    </button>
                ))}
            </div>

            {activeTree && activeTree.children.length > 0 && (
                <div className={styles.subCategoryFilter}>
                    {activeTree.children.map((child) => (
                        <button
                            key={child.value}
                            className={`${styles.categoryBtn} ${styles.categoryBtnSub} ${
                                activeChild === child.value ? styles.categoryBtnActive : ""
                            }`}
                            onClick={() => handleChildChange(child.value)}
                        >
                            {isEnglish ? child.label.en : child.label.id}
                        </button>
                    ))}
                </div>
            )}

            {(isSearching || isFilteringCategory) && (
                <p className={styles.gameCount}>
                    {isEnglish ? `Showing ${total} game${total !== 1 ? "s" : ""}` : `Menampilkan ${total} game`}
                </p>
            )}

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
                            <div className={styles.carouselSlide} data-spacer="true" aria-hidden="true">
                                <div>
                                    <span></span>
                                </div>
                            </div>

                            {filteredGames.map((game, i) => (
                                <div
                                    key={game.id}
                                    className={`${styles.carouselSlide} ${
                                        i === activeIndex ? styles.slideActive : ""
                                    }`}
                                >
                                    <GameCard
                                        game={game}
                                        searchKeyword={normalizedKeyword}
                                        characterId={characterId}
                                        onCategoryClick={handleCategoryClickFromCard}
                                        activeCategories={activeCategories}
                                    />
                                </div>
                            ))}

                            <div className={styles.carouselSlide} data-spacer="true" aria-hidden="true">
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
                            {filteredGames.map((_, i) => (
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
                    {isSearching
                        ? isEnglish
                            ? `No games match "${searchKeyword.trim()}".`
                            : `Tidak ada game yang cocok dengan "${searchKeyword.trim()}".`
                        : isFilteringCategory
                            ? isEnglish
                                ? "No games in this category."
                                : "Tidak ada game dalam kategori ini."
                            : isEnglish
                                ? "No games available."
                                : "Tidak ada game."}
                </p>
            )}
        </section>
    );
};