import {MetadataRoute} from "next";
import games from "@/public/data/games.json";
import characters from "@/public/data/characters.json";

const BASE_URL = "https://mustakuusi.vercel.app";

const LOCALES = ["", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
    const gameRoutes = LOCALES.flatMap((locale) =>
        games.map((game) => ({
            url: `${BASE_URL}/${locale ? `${locale}/` : ""}${game.id}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.9,
        }))
    );

    const privacyRoutes = LOCALES.flatMap((locale) =>
        games.map((game) => ({
            url: `${BASE_URL}/${locale ? `${locale}/` : ""}privacy-policy/${game.id}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }))
    );

    const characterRoutes = LOCALES.flatMap((locale) =>
        characters.map((char) => ({
            url: `${BASE_URL}/${locale ? `${locale}/` : ""}characters/${char.id}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        }))
    );

    return [
        ...LOCALES.map((locale) => ({
            url: locale ? `${BASE_URL}/${locale}` : BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1.0,
        })),
        ...gameRoutes,
        ...privacyRoutes,
        ...characterRoutes,
    ];
}