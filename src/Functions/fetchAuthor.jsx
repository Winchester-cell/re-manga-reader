import proxyApi from '../proxyApi'
const fetchAuthor = async (id)=> {

    try{
        const response = await fetch(`${proxyApi}/author/${id}`)
        if (!response.ok){
            throw new Error('Failed')
        }
        const data = await response.json()
        
        return data.data

    }
    catch(er){
        console.error("Error" , er)

        return null
    }

}

export default fetchAuthor