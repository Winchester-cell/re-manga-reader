import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Manga from './Pages/Manga'
import Chapter from './Pages/Chapter'
import Search from './Pages/Search'

//https://img-proxy-rho.vercel.app/image-proxy?url=

const MainRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/search/:searchedWord' element={<Search/>} />
        <Route path='/manga/:mangaID' element={<Manga/>}/>
        <Route path='/chapter/:mangaID/:chapterID' element={<Chapter/>}/>
    </Routes>
  )
}

export default MainRouter