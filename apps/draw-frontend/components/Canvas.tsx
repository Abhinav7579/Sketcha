import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Button } from "@repo/ui/button";
export function Canvas({
    roomId,socket
}:{roomId:string
    socket:WebSocket
}){
    const canvasRef=useRef<HTMLCanvasElement>(null);
    const[tool,settool]=useState<string>("rect");
      const toolRef = useRef<string>("rect");
  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);
      useEffect(()=>{
        if(canvasRef.current){
            const canvas=canvasRef.current;
          initDraw(canvas,roomId,socket, () => toolRef.current)
        }

    },[canvasRef,socket])
    return(<div>
         <canvas ref={canvasRef} width={2000} height={2000}></canvas>
        <div className="flex justify-center gap-3 fixed bottom-5 ml-[60px]">
        <Button children={"Box"} className={"bg-blue-500 text-white hover:bg-red-500 cursor-pointer px-3 py-1 rounded-lg shadow-lg"} onClick={()=>settool("rect")}/> 
        <Button children={"Circle"} className={"bg-blue-500 text-white hover:bg-red-500 cursor-pointer px-3 py-1 rounded-lg shadow-lg"} onClick={()=>settool("circle")}/>
        <Button children={"Text"} className={"bg-blue-500 text-white hover:bg-red-500 cursor-pointer px-3 py-1 rounded-lg shadow-lg"} onClick={()=>settool("text")}/>
        <Button children={"Line"} className={"bg-blue-500 text-white hover:bg-red-500 cursor-pointer  px-3 py-1 rounded-lg shadow-lg"} onClick={()=>settool("line")}/>
        <Button children={"Move"} className={"bg-blue-500 text-white hover:bg-red-500 cursor-pointer  px-3 py-1 rounded-lg shadow-lg"} onClick={() => settool("move")} />
        <Button children={"Eraser"} className={"bg-blue-500 text-white hover:bg-red-500 cursor-pointer px-3 py-1 rounded-lg shadow-lg"} onClick={()=>settool("eraser")}/>
        </div>
    </div>

    )
}