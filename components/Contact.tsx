"use client";

import styles from "@/styles/Contact.module.css";
import {getImageUrl} from "@/utils";

export const Contact = () => {
    return (
        <footer className={styles.container} id="contact">
            <div className={styles.text}>
                <h2>Kontak</h2>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <img src={getImageUrl("emailIcon.png")} alt="email icon"/>
                    <a href="mailto:mustakuusi6@gmail.com">mustakuusi6@gmail.com</a>
                </li>
                <li className={styles.link}>
                    <img src={getImageUrl("linkedinIcon.png")} alt="linkedin icon"/>
                    <a href="https://www.linkedin.com/company/mustakuusi" target="_blank"
                       rel="noopener">linkedin.com/company/mustakuusi</a>
                </li>
            </ul>
        </footer>
    );
};