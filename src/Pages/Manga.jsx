import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useManga from '../Hooks/useManga'
import useMangaCover from '../Hooks/useMangaCover'
import useMangaAuthor from '../Hooks/useMangaAuthor'
import { FaBookOpenReader, FaBookOpen } from "react-icons/fa6";
import fetchChapters from '../Functions/fetchChapters'
import { IoClose } from "react-icons/io5";
import { PiStarAndCrescentFill } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import proxyAddress from '../proxy'

const Manga = () => {

    const [isChapMenuOpen, setIsChapMenuOpen] = useState(false)
    const [isDesShowingFull ,setIsDesShowingFull] = useState(false)

    const param = useParams()
    const mangaID = param.mangaID
    const manga = useManga(mangaID)
    const [coverID, setCoverID] = useState(null)
    const [authorID, setAuthorID] = useState(null)
    const [chapters, setChapters] = useState([])

    useEffect(() => {
        if (manga) {
            const cover = manga.relationships.find(rel => rel.type === "cover_art")
            if (cover) {
                setCoverID(cover.id)
            }
            const author = manga.relationships.find(rel => rel.type === "author")
            if (author) {
                setAuthorID(author.id)
            }
        }

        const getChapters = async () => {
            const data = await fetchChapters(mangaID)
            setChapters(data.data)
        }

        getChapters()


    }, [manga])


    const coverFile = useMangaCover(coverID)
    const authorName = useMangaAuthor(authorID)

    return (
        <div className='w-[100dvw] flex flex-col gap-5 h-[100dvh] px-10 py-3 lg:px-32 lg:py-10 text-gray-300 relative'>
            <Link to={'/'} className='hidden border-2 border-gray-400 rounded-full p-2 bg-zinc-900 lg:flex items-center justify-center w-1/6'><IoMdArrowRoundBack />Back Home</Link>
            {
                // main page
                manga && coverFile && (
                    <div className='w-full h-full flex flex-col lg:flex-row border-[2px] border-[#ffffff10] rounded-3xl backdrop-blur-sm overflow-hidden overflow-y-auto'>


                        <Link to={'/'} className='lg:hidden text-[14px] absolute z-50 top-3 right-3 border-2 border-gray-400 rounded-full p-3 bg-zinc-900 flex items-center'><IoMdArrowRoundBack />Back Home</Link>

                        <div className="relative -z-50 lg:h-full lg:w-[25dvw] h-[25dvh] xsm:w-full xsm:h-[40dvh] w-full sm:w-full sm:h-[44dvh] overflow-hidden">

                            <div
                                className="absolute inset-0 bg-cover bg-center blur-md lg:hidden"
                                style={{
                                    backgroundImage: `url('${proxyAddress}https://uploads.mangadex.org/covers/${mangaID}/${coverFile}&quality=5')`
                                }}
                            ></div>

                           
                            <img
                                src={`${proxyAddress}https://uploads.mangadex.org/covers/${mangaID}/${coverFile}&quality=40`}
                                alt="Cover"
                                className="relative lg:h-full lg:w-[25dvw] h-[25dvh] xsm:w-full xsm:h-[40dvh] w-full sm:w-full sm:h-[44dvh] aspect-video lg:aspect-[9/16] object-contain lg:object-cover object-top"
                            />
                        </div>

                        <div className='px-5 py-3 w-full lg:w-[69%] flex flex-col flex-grow lg:flex-grow-0'>
                            <h2 className='w-full font-bold line-clamp-1 text-[clamp(20px,2.5dvw,36px)] text-wrap'>{manga.attributes.title.en}</h2>
                            <h2 className='text-[clamp(14px,1.5dvw,30px)] font-semibold mt-1 line-clamp-1'>Author : {authorName}</h2>
                            <h2 className='text-[clamp(14px,1.3dvw,30px)] font-semibold my-3 line-clamp-1'>Description : </h2>
                            <p onClick={()=> setIsDesShowingFull(!isDesShowingFull)} className={`${isDesShowingFull ? `` : `line-clamp-5`} text-[clamp(10px,1.05dvw,16px)] text-balance desText px-2 lg:px-6 cursor-pointer`}>{manga.attributes.description.en}</p>
                            <div className='flex flex-col gap-2 my-5'>
                                <h2>Genre :</h2>
                                <ul className='flex items-center gap-2 select-none flex-wrap'>
                                    {manga.attributes.tags.slice(0, 6).map(tag => {
                                        return (<li className='border-2 px-2 py-1 rounded-lg border-[#ffffff1c] text-[clamp(10px,0.9dvw,18px)]' key={tag.id}>{tag.attributes.name.en}</li>)
                                    })}
                                </ul>
                            </div>
                            <h2 className='mb-5'>Year : {manga.attributes.year}</h2>

                            <div className='w-full  flex justify-center items-center flex-grow'><button onClick={() => setIsChapMenuOpen(true)} className='h-[clamp(40px,5dvw,55px)] bg-gray-300 text-zinc-800 font-bold flex items-center gap-2 py-3 px-5 rounded-full hover:scale-105 transition-all duration-300 text-[clamp(16px,1.8dvw,30px)]'>Read Book <FaBookOpenReader /></button></div>
                        </div>
                    </div>
                )
            }
            {
                // chapter menu
                <div className={`w-[100dvw] h-[100dvh] overflow-auto bg-zinc-900 fixed z-50 top-0 p-10 transition-all duration-300 ${isChapMenuOpen ? `left-0` : `-left-full`}`}>
                    <div className='flex items-center justify-between text-xl mb-7'>Chapter List : <IoClose className='cursor-pointer' onClick={() => setIsChapMenuOpen(false)} /></div>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 place-items-center gap-5'>
                        {
                            chapters.map(chapter => {
                                return (
                                    <Link className='w-full' key={chapter.id} to={`/chapter/${mangaID}/${chapter.id}`}>
                                        <div className='border-2 border-gray-300 w-full flex justify-center items-center gap-6 rounded-full py-2 hover:bg-slate-300 hover:text-zinc-900 transition-all duration-300'><PiStarAndCrescentFill /> Chapter : {chapter.attributes.chapter} <FaBookOpen /></div>
                                    </Link>
                                )
                            })
                        }
                    </div>

                </div>
            }
        </div>
    )
}

export default Manga
