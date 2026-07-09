"use client";

import {usePathname} from "next/navigation";
import styles from "@/styles/Footer.module.css";

export const Footer = () => {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    return (
        <div className={styles.container}>
            <p className={styles.text}>
                {isEnglish ? (
                    <>
                        Built with Next.js:<br/>
                        mustakuusi — born from a restless mind.
                    </>
                ) : (
                    <>
                        Dibangun dengan Next.js:<br/>
                        mustakuusi — lahir dari pikiran yang tak diam.
                    </>
                )}
            </p>
        </div>
    );
};