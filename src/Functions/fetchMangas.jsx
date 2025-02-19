import proxyApi from '../proxyApi'
const fetchMangas = async (searchedParam , offset) => {
    try {

        if (searchedParam) {
            const response = await fetch(`${proxyApi}/manga?title=${searchedParam}&limit=12&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`)

            if (!response.ok) {
                throw new Error('Failed to Fetch')
            }

            const data = await response.json()

            return data

        }else{
            const response = await fetch(`${proxyApi}/manga?offset=${offset}&limit=12`)
    
            if (!response.ok) {
                throw new Error('Failed to Fetch')
            }
    
            const data = await response.json()
    
            return data

        }


    } catch (er) {

        console.error('Error fetching mangas:', er);

        return []
    }
}

export default fetchMangas