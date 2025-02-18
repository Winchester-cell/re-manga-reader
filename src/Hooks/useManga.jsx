import React, { useEffect, useState } from 'react'
import fetchManga from '../Functions/fetchManga'

const useManga = (mangaID) => {

    const [manga , setManga] = useState(null)

    useEffect(()=>{
        const getManga = async () => {

            if (!mangaID) return;

            const data = await fetchManga(mangaID)

            setManga(data)

        }

        getManga()

    },[mangaID])

    return manga
  
}

export default useManga