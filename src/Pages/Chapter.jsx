import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import fetchChapter from '../Functions/fetchChapter';
import proxyAddress from '../proxy';

export default function Chapter() {

  const [chapterFiles, setChapterFile] = useState([])
  const [baseUrl, setBaseUrl] = useState('')
  const [hash, setHash] = useState('')

  let params = useParams()
  let chapterID = params.chapterID
  let mangaID = params.mangaID

  useEffect(() => {

    const getChapter = async () => {
      const data = await fetchChapter(chapterID)
      setBaseUrl(data.baseUrl)
      setHash(data.chapter.hash)
      setChapterFile(data.chapter.dataSaver)
    }

    getChapter()

  }, [])

  let navigate = useNavigate()

  const backHomeFunc = () => {
    navigate(`/manga/${mangaID}`)
  }



  return (
    <div className='text-gray-300 font-bold flex flex-col items-center'>
      <button onClick={backHomeFunc} className='my-5 text-lg gap-2 flex justify-center items-center font-bold text-gray-300 bg-gray-900 xl:px-20 xl:py-3 px-7 py-2  rounded-xl hover:scale-110 duration-500 transition-all' > <IoIosArrowBack /> <span>Back To MangaPage</span>   </button>
      {
        chapterFiles.map((chapterFile, index) => {
          return (
            <div className='text-zinc-500'>
              {/* <span>{index+1} / {chapterFiles.length}</span> */}
              <img className='w-[80dvw] sm:w[70dvw] lg:w-[50dvw]' key={index} loading='lazy' src={`${proxyAddress}${baseUrl}/data-saver/${hash}/${chapterFile}&quality=40`} alt="" />
            </div>
            )
        })
      }

    </div>
  )
}
