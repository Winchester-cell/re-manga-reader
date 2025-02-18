import React, { useEffect, useState } from 'react'
import fetchAuthor from '../Functions/fetchAuthor'

const useMangaAuthor = (authorID) => {

    const [author , setAuthor] = useState(null)

    useEffect(()=>{
        
        const getAuthor = async () => {
            const data = await fetchAuthor(authorID)
            if (data && data.attributes) {
                setAuthor(data.attributes.name)
            } else {
                console.error("Author data or attributes missing")
            }
        }

        if (authorID) {
            getAuthor()
        }


    },[authorID])

    return author
  
}

export default useMangaAuthor