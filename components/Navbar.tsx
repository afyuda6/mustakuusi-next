"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import styles from "@/styles/Navbar.module.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const navbarRef = useRef<HTMLElement>(null);

    const isHomePage = pathname === "/";
    const isGamePage =
        pathname !== "/" &&
        !pathname.includes("privacy-policy") &&
        !pathname.includes("character");
    const isCharacterPage = pathname.startsWith("/character");

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

    return (
        <nav className={styles.navbar} ref={navbarRef}>
            <Link
                href="/"
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
                            <a href="#about" onClick={() => {
                                setTimeout(() => {
                                    history.replaceState(null, '', window.location.pathname);
                                }, 200);
                            }}>Tentang</a>
                        </li>
                    )}
                    {(isHomePage || isCharacterPage) && (
                        <li>
                            <a href="#games" onClick={() => {
                                setTimeout(() => {
                                    history.replaceState(null, '', window.location.pathname);
                                }, 200);
                            }}>Gim</a>
                        </li>
                    )}
                    {(isHomePage || isGamePage) && (
                        <li>
                            <a href="#characters" onClick={() => {
                                setTimeout(() => {
                                    history.replaceState(null, '', window.location.pathname);
                                }, 200);
                            }}>Karakter</a>
                        </li>
                    )}
                    {isGamePage && (
                        <li>
                            <a href="#screenshots" onClick={() => {
                                setTimeout(() => {
                                    history.replaceState(null, '', window.location.pathname);
                                }, 200);
                            }}>Cuplikan</a>
                        </li>
                    )}
                    <li>
                        <a href="#contact" onClick={() => {
                            setTimeout(() => {
                                history.replaceState(null, '', window.location.pathname);
                            }, 200);
                        }}>Kontak</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};