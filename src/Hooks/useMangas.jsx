import React, { useEffect, useState } from 'react'
import fetchMangas from '../Functions/fetchMangas'

const useMangas = (searchedParam , offset) => {

    const [mangas , setMangas] = useState([])
    const [totalManga , setTotalManga] = useState(null)

    useEffect(() => {

        const getMangas = async ()=>{

            const data = await fetchMangas(searchedParam , offset)

            console.log(data);

            setMangas(data.data)

            setTotalManga(data.total)
            
        }

        getMangas()

    }, [searchedParam , offset])
    
    return [mangas , totalManga] 


}

export default useMangas