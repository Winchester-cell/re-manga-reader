import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useMangaCover from '../Hooks/useMangaCover'
import proxyAddress from '../proxy'

export default function MangaCard({ id, attributes, relationships }) {


    const coverID = relationships.find(rel => {
        return rel.type === "cover_art"
    }).id


    const coverFile = useMangaCover(coverID)


    if (!coverFile) {
        return (
            <div className='w-full h-64 overflow-hidden rounded-xl shadow backdrop-blur-sm flex border-[2px] border-[#ffffff10] text-gray-300'>
                <div className="w-36 h-64 bg-gray-300 animate-pulse" />
                <div className='px-5 py-4 w-72'>
                    <div className='font-bold text-lg'>Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <Link className='w-full' to={`/manga/${id}`}>
            <div className='w-full h-64 overflow-hidden rounded-xl shadow backdrop-blur-sm flex border-[2px] border-[#ffffff10] text-gray-300 hover:scale-105 transition-all duration-500'>
                <img
                    className='w-[30%] h-64 block object-cover'
                    src={`${proxyAddress}https://uploads.mangadex.org/covers/${id}/${coverFile}&quality=7`}
                    alt="Manga Cover"
                    loading="lazy"
                />
                <div className='pl-4 py-4 w-[65%]'>
                    <div className='font-bold text-lg overflow-hidden text-ellipsis line-clamp-2 h-14 w-full'>
                        {attributes.title.en}
                    </div>
                    <div className='mt-1 w-full'>Description :</div>
                    <div className='text-xs line-clamp-[8] w-full desText'>{attributes.description.en ? attributes.description.en : `No description available yet`}</div>
                </div>
            </div>       
        </Link>
    )
}
