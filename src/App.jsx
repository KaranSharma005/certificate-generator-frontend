import { useEffect, useState } from 'react'
import MainPage from './components/mainpagefolder/mainPage'
import socket from '../socket'

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
    <MainPage/>
  )
}

export default App
