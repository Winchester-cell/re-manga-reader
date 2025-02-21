import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import MangaCard from '../Components/MangaCard'
import useMangas from '../Hooks/useMangas'



const Home = () => {


    const [page, setPage] = useState(1)
    const [offset, setOffset] = useState(0)
    const [mangas, totalManga] = useMangas(null, offset)
    const totalPage = 833

    const inputRegex = /^\d+$/;
    const [inputText, setInputText] = useState('')

    useEffect(() => {
        setOffset((page - 1) * 12)
    }, [page])

    const prevPageHanlder = () => {
        page === 1 ? setPage(1) : setPage(page - 1)
    }
    const nextPageHanlder = () => {
        page === totalPage ? setPage(totalPage) : setPage(page + 1)
    }

    const keyDownHandler = (e) => {
        if(e.key === 'Enter'){
            setPageHandler()
        }
    }
    const setPageHandler = () => {
        const isRegexOk = inputRegex.test(inputText)
        const isHigherThanTotal = ( +inputText < 1 || +inputText > totalPage )
        if(!isHigherThanTotal && isRegexOk){
            setPage(+inputText)
        }
    }

    const onChangeHandler = (e)=>{
        if(inputRegex.test(e.target.value)){
            setInputText(e.target.value)
        }
    }

    return (
        <div className='min-h-[100vh] relative text-gray-300'>
            <Navbar></Navbar>
            <div className='pt-32 container mr-auto ml-auto px-5 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-7 lg:gap-0' >
                <div className='text-2xl font-semibold'>
                    Manga List :
                </div>
                <div className='flex flex-col lg:flex-row items-center gap-2 lg:gap-7'>
                    <div className='border-2 border-gray-500 rounded-full flex items-center px-3 backdrop-blur-sm'>
                        <input type="text" onKeyDown={keyDownHandler} onChange={onChangeHandler} value={inputText} placeholder='Jump to page ...' className='bg-transparent block w-28 outline-none placeholder:text-sm' />
                        <IoIosArrowBack onClick={setPageHandler} className='cursor-pointer' />
                    </div>
                    <div className='flex items-center gap-2 '>
                        <button onClick={prevPageHanlder}><IoIosArrowBack /></button>
                        <div className='border-2 border-gray-500 rounded-full px-5 flex items-center backdrop-blur-sm'>Page : {page} / {totalPage}</div>
                        <button onClick={nextPageHanlder}><IoIosArrowForward /></button>
                    </div>
                </div>
            </div>
            {
                mangas && (
                    <div className=' grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 place-items-center gap-5 container mr-auto ml-auto pt-7 px-5'>
                        {mangas.map(manga => {
                            return <MangaCard key={manga.id} {...manga}></MangaCard>
                        })}
                    </div>
                )
            }
            <div className='container pb-32 pt-7 mr-auto ml-auto px-5 flex flex-col lg:flex-row lg:justify-end lg:items-center gap-7 lg:gap-0' >
                <div className='flex flex-col lg:flex-row items-center gap-2 lg:gap-7'>
                    
                    <div className='border-2 border-gray-500 rounded-full flex items-center px-3 backdrop-blur-sm'>
                        <input type="text" onKeyDown={keyDownHandler} onChange={(e) => setInputText(e.target.value)} value={inputText} placeholder='Jump to page ...' className='bg-transparent block w-28 outline-none placeholder:text-sm' />
                        <IoIosArrowBack onClick={setPageHandler} className='cursor-pointer' />
                    </div>
                    <div className='flex items-center gap-2 '>
                        <button onClick={prevPageHanlder}><IoIosArrowBack /></button>
                        <div className='border-2 border-gray-500 rounded-full px-5 flex items-center backdrop-blur-sm'>Page : {page} / {totalPage}</div>
                        <button onClick={nextPageHanlder}><IoIosArrowForward /></button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home