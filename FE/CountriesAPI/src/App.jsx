import { useState, useEffect } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {


   

  return (
    <>

<Routes>
    <Route exact path='/' element={<Countries/>}/>
    <Route exact path='/country/:id' element={<Country/>}/>
  
    </Routes>
    </>
  )
}

export default App
