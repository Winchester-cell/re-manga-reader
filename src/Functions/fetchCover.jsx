import proxyApi from '../proxyApi'
const fetchCover = async (coverID) => {
    try{
        const response = await fetch(`${proxyApi}/cover/${coverID}`)
        if (!response.ok){
            throw new Error('Failed')
        }

        const data = await response.json()


        return data.data


    }catch(er){
        
        console.error('Error fetching mangas:', er);

        return null

    }

}

export default fetchCover