import { useState,useEffect } from 'react'
import './App.css'
import {io} from "socket.io-client"

function App() {
useEffect(()=>{
 socket.on("connect",()=>{
  console.log("connected")
  console.log(socket.id)
  
 }) 

 socket.on("Welcome",(s)=>{
  console.log(s)
 })
},[])
  const socket = io("http://localhost:3000")
    
  return (
   <div>
    web socket
   </div>
  )
}

export default App 
