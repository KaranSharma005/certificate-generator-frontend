import { useEffect, useState } from 'react'
import MainPage from './components/mainpagefolder/mainPage'
import socket from '../socket'
import EmailInputPage from './components/emailPage/email'
import {Routes, Route} from 'react-router-dom'

function App() {
    useEffect(() => {
      socket.on('connect', () => {
        console.log('connected');
      });
    
      return () => {
        socket.disconnect(); 
      };
    }, []);

  return(
    <Routes>
      <Route path = '/' element = {<EmailInputPage/>} />
      <Route path = '/generateCertificates' element = {<MainPage/>} />
    </Routes>
  )
}

export default App
