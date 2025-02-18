import React, { useEffect, useState } from 'react'
import fetchCover from '../Functions/fetchCover'

const useMangaCover = (id) => {

    const [coverFile, setCoverFile] = useState('')

    useEffect(() => {
        const getCover = async () => {
            const data = await fetchCover(id)
            if (data && data.attributes) {
                setCoverFile(data.attributes.fileName)
            } else {
                console.error("Cover data or attributes missing")
            }
        }

        if (id) {
            getCover()
        }
    }, [id])

    return coverFile

}

export default useMangaCover