async function fetchWords(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Bestand niet gevonden");
        const text = await response.text();
        return text.trim().split(/\s+/);
    } catch (error) {
        console.error(error);
        return [];
    }
}