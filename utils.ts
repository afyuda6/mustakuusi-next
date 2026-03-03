export function getImageUrl(path: string): string {
    const cleanPath = path.replace(/^\/+/, "");
    return `https://mustakuusi-content.vercel.app/assets/${cleanPath}`;
}