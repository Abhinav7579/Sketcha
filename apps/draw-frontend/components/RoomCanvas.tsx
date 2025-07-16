"use client"
import { WS_URL } from "@/config";
import { Canvas } from "./Canvas";
import { useEffect,useState } from "react"
export function RoomCanvas({roomId}:{
    roomId:string
}){
  

  const[socket,setsocket]=useState<WebSocket| null>(null)
  useEffect(()=>{
    const ws=new WebSocket(`${WS_URL}?token=${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1NzkxZWNmLTFmMTUtNGYyMy05YzQzLTE4MmJlZmY4MjU5NCIsImlhdCI6MTc1MjU4Mjc4NX0.I6K9JV2r-hIPYg7bsorxXbqz_kF6BXw_oA2Vw9nlY8E"}`)
    ws.onopen=()=>{
        setsocket(ws);
        ws.send(JSON.stringify({
            type:"join_room",
            roomId
        }))
    }

  },[])
  
     
    if(!socket){
        return <div>
            connecting to server.....
        </div>
    }
    return(
        <div>
            <Canvas roomId={roomId} socket={socket}/>
           
        </div>
    )
}
