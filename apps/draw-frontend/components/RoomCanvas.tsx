"use client"
import { WS_URL } from "@/config";
import { Canvas } from "./Canvas";
import { useEffect,useState } from "react"
export function RoomCanvas({roomId}:{
    roomId:string
}){
  

  const[socket,setsocket]=useState<WebSocket| null>(null)
  useEffect(()=>{
    const ws=new WebSocket(`${WS_URL}?token=${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmMGRiOTdiLTZiNGYtNDY5OS1hYmMyLTdhNTRkMDU0NzQxNCIsImlhdCI6MTc1MDQxNzQyNX0.ZV3gCWQUZryqpn9eW9n1r26HoSzoTi5KQoaKfbN4bJs"}`)
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
