"use client";

import styles from "@/styles/Contact.module.css";

import {MdEmail} from "react-icons/md";
import {SiFacebook, SiInstagram, SiTiktok} from "react-icons/si";

const contacts = [
    {
        label: "Email",
        href: "mailto:mustakuusi6@gmail.com",
        icon: <MdEmail size={20}/>
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/mustakuusi6",
        icon: <SiFacebook size={20}/>,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/mustakuusi",
        icon: <SiInstagram size={20}/>,
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@mustakuusi",
        icon: <SiTiktok size={20}/>,
    },
];

export const Contact = ({title}: { title: string }) => {
    return (
        <footer className={styles.container} id="contact">
            <h2 className={styles.contactLabel}>{title}</h2>
            <ul className={styles.grid}>
                {contacts.map((c) => (
                    <li key={c.label}>
                        <a
                            href={c.href}
                            className={styles.card}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={styles.iconWrap}>
                                {c.icon}
                            </div>
                            <span className={styles.label}>{c.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </footer>
    );
};