"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useInView} from "@/hooks/useInView";
import styles from "@/styles/CharacterCard.module.css";
import {getImageUrl} from "@/utils";

interface CharacterProps {
    id?: string;
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

interface CharacterCardProps {
    character: CharacterProps;
    className?: string;
}

export const CharacterCard = ({
                                  character: {id, name, imageSrc, role},
                                  className = "",
                              }: CharacterCardProps) => {
    const {ref, isVisible} = useInView<HTMLDivElement>(0.06);
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    return (
        <div ref={ref}
             className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""} ${className || ""}`}>
            <div className={styles.card}>
                <div className={styles.imagecon}>
                    <img src={getImageUrl(imageSrc)} alt={`Image of ${name}`} className={styles.image} loading="lazy"/>
                </div>
                <Link
                    href={isEnglish ? `/en/characters/${id}` : `/characters/${id}`}
                    className={styles.title}
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
                >{name}</Link>
                {role && (
                    <p className={styles.roleText}>{isEnglish ? role.en : role.id}</p>
                )}
            </div>
        </div>
    );
};