"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import styles from "@/styles/Navbar.module.css";
import {getImageUrl} from "@/utils";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const navbarRef = useRef<HTMLElement>(null);

    const isEnglish = pathname.startsWith("/en");

    const isHomePage = pathname === "/" || pathname === "/en";
    const isGamePage =
        !isHomePage &&
        !pathname.includes("privacy-policy") &&
        !pathname.includes("characters");
    const isCharacterPage =
        pathname.startsWith("/characters") ||
        pathname.startsWith("/en/characters");

    const homeHref = isEnglish ? "/en" : "/";

    const toId = () => {
        if (pathname.startsWith("/en")) {
            return pathname.replace("/en", "") || "/";
        }
        return pathname;
    };

    const toEn = () => {
        if (pathname.startsWith("/en")) {
            return pathname;
        }
        return "/en" + pathname;
    };

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                menuOpen &&
                navbarRef.current &&
                !navbarRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [menuOpen]);

    const handleAnchorClick = () => {
        setTimeout(() => {
            history.replaceState(null, "", window.location.pathname);
        }, 200);
    };

    return (
        <nav className={styles.navbar} ref={navbarRef}>
            <div className={styles.titleGroup}>
                <Link
                    href={homeHref}
                    className={styles.title}
                    onClick={() => {
                        const html = document.documentElement;

                        html.style.scrollBehavior = "auto";
                        window.scrollTo(0, 0);

                        setTimeout(() => {
                            html.style.scrollBehavior = "smooth";
                        }, 50);
                    }}
                >mustakuusi</Link>

                <div className={styles.langGroup}>
                    <Link
                        href={toEn()}
                        className={`${styles.langBtn} ${isEnglish ? styles.activeLang : ""}`}
                        onClick={() => setMenuOpen(false)}
                        aria-label="English"
                    >
                        <img
                            src={getImageUrl("gb.png")}
                            alt="English"
                            className={styles.flag}
                            loading="lazy"
                        />
                    </Link>

                    <span className={styles.langDivider}>|</span>

                    <Link
                        href={toId()}
                        className={`${styles.langBtn} ${!isEnglish ? styles.activeLang : ""}`}
                        onClick={() => setMenuOpen(false)}
                        aria-label="Indonesia"
                    >
                        <img
                            src={getImageUrl("id.png")}
                            alt="Indonesia"
                            className={styles.flag}
                            loading="lazy"
                        />
                    </Link>
                </div>
            </div>

            <div className={styles.menu}>
                <div
                    className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
                    {(isHomePage || isGamePage) && (
                        <li>
                            <a href="#about" onClick={handleAnchorClick}>
                                {isEnglish ? "About" : "Tentang"}
                            </a>
                        </li>
                    )}

                    {(isHomePage || isCharacterPage) && (
                        <li>
                            <a href="#games" onClick={handleAnchorClick}>
                                {isEnglish ? "Games" : "Game"}
                            </a>
                        </li>
                    )}

                    {(isHomePage || isGamePage) && (
                        <li>
                            <a href="#characters" onClick={handleAnchorClick}>
                                {isEnglish ? "Characters" : "Karakter"}
                            </a>
                        </li>
                    )}

                    {isGamePage && (
                        <li>
                            <a href="#screenshots" onClick={handleAnchorClick}>
                                {isEnglish ? "Screenshots" : "Cuplikan"}
                            </a>
                        </li>
                    )}

                    {isHomePage && (
                        <li>
                            <a href="#faq" onClick={handleAnchorClick}>
                                {isEnglish ? "FAQ" : "Pertanyaan"}
                            </a>
                        </li>
                    )}

                    <li>
                        <a href="#contact" onClick={handleAnchorClick}>
                            {isEnglish ? "Contact" : "Kontak"}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};