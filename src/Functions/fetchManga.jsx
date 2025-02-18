import proxyApi from '../proxyApi'
const fetchManga = async (id) => {

    
    try{
        const response = await fetch(`${proxyApi}/manga/${id}`)

        if(!response.ok){
            throw new Error('Failed to Fetch')
        }

        const data = await response.json()

        return data.data

    }catch(error){
        
        console.error('Error fetching mangas:', error);

        return null
    }
}

export default fetchManga