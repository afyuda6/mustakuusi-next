"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useInView} from "@/hooks/useInView";
import styles from "@/styles/About.module.css";

interface AboutProps {
    itemDescription: string | {
        en: string;
        id: string;
    };
    privacyPolicyLink?: string;
    title: string;
}

export const About = ({itemDescription, privacyPolicyLink, title}: AboutProps) => {
    const {ref, isVisible} = useInView(0.06);
    const pathname = usePathname();

    const isEnglish = pathname.startsWith("/en");
    const isGamePage = pathname !== "/" && pathname !== "/en";

    const privacyHref =
        isEnglish && privacyPolicyLink && !privacyPolicyLink.startsWith("/en")
            ? `/en${privacyPolicyLink}`
            : privacyPolicyLink;

    const description =
        typeof itemDescription === "string"
            ? itemDescription
            : isEnglish ? itemDescription.en : itemDescription.id;

    return (
        <section ref={ref} className={`${styles.container} ${styles.fadeUp} ${isVisible ? styles.visible : ""}`}
                 id="about">
            <div className={styles.content}>
                <h2 className={styles.aboutLabel}>{title}</h2>
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                        <div className={styles.aboutItemText}>
                            <p>{description}</p>

                            {isGamePage && privacyHref && (
                                <div>
                                    <br/>
                                    <p>
                                        📄 <Link
                                        href={privacyHref}
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
                                        {isEnglish
                                            ? "Privacy Policy"
                                            : "Kebijakan Privasi"}
                                    </Link>
                                    </p>
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};