import proxyApi from '../proxyApi'
const fetchChapters = async (mangaID) => {
    try {
        const response = await fetch(`${proxyApi}/manga/${mangaID}/feed?limit=300&translatedLanguage[]=en&order[chapter]=asc`);
        const data = await response.json();

        return data

    } catch (error) {
        console.error("Error fetching chapters:", error);
    }
}

export default fetchChapters