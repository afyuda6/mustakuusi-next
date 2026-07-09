"use client";

import {usePathname} from "next/navigation";
import styles from "@/styles/Marquee.module.css";

export const Marquee = () => {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    return (
        <div className={styles.container}>
            <p className={styles.text}>
                {isEnglish
                    ? "Hello, welcome to mustakuusi! Explore and discover something fun here!"
                    : "Halo, selamat datang di mustakuusi! Yuk, jelajahi dan temukan hal seru di sini!"}
            </p>
        </div>
    );
};