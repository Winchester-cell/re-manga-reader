import proxyApi from '../proxyApi'

const fetchChapter = async (id)=>{
    try{
        const response = await fetch(`${proxyApi}/at-home/server/${id}`)
        if(!response.ok){
            throw new Error('failed')
        }
        const data = await response.json()

        console.log(data);

        return data

    }catch(er){
        console.error('error : ' , er)

        return null
    }

}

export default fetchChapter