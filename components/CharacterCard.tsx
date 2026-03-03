"use client";

import Link from "next/link";
import {useInView} from "@/hooks/useInView";
import styles from "@/styles/CharacterCard.module.css";
import {getImageUrl} from "@/utils";

interface CharacterProps {
    id?: string;
    name: string;
    imageSrc: string;
    description: string;
}

interface CharacterCardProps {
    character: CharacterProps;
    className?: string;
}

export const CharacterCard = ({
                                  character: {id, name, imageSrc},
                                  className = "",
                              }: CharacterCardProps) => {
    const {ref, isVisible} = useInView<HTMLDivElement>(0.18);

    return (
        <div ref={ref}
             className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""} ${className || ""}`}>
            <div className={styles.card}>
                <div className={styles.imagecon}>
                    <img src={getImageUrl(imageSrc)} alt={`Image of ${name}`} className={styles.image}/>
                </div>
                <Link
                    href={`/character/${id}`}
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
            </div>
        </div>
    );
};