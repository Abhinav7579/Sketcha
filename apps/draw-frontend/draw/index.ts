import { HTTP_BACKEND } from "@/config";
import axios from "axios";
type Shape={
    type:"rect";
    x:number;
    y:number;
    width:number;
    height:number;
}|{
    type:"circle";
    centerX:number;
    centerY:number;
    radius:number;
}

export async function initDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
      const ctx=canvas.getContext("2d")
        let existingShapes:Shape[]=await getExistingShapes(roomId);

            if(!ctx){
                return;
            }

            socket.onmessage=(event)=>{
                const message=JSON.parse(event.data);
                if(message.type=="chat"){
                    const parsedShape=JSON.parse(message.message)
                    existingShapes.push(parsedShape.shape)
                    clearCanvas(existingShapes,canvas,ctx); 
                }
            }
            
            clearCanvas(existingShapes,canvas,ctx); 
            let clicked=false;
            let startX=0;
            let startY=0;
            canvas.addEventListener("mousedown",(e)=>{
                const rect = canvas.getBoundingClientRect();
                clicked = true;
                startX = e.clientX - rect.left;
                startY = e.clientY - rect.top;


            })
             canvas.addEventListener("mouseup",(e)=>{
                
                const rect = canvas.getBoundingClientRect();
                const endX = e.clientX - rect.left;
                const endY = e.clientY - rect.top;
                const width = endX - startX;
                const height = endY - startY;
                const shape:Shape={
                    type:"rect",
                    x:startX,
                    y:startY,
                    width:width,
                    height:height
                }
                existingShapes.push(shape)
            clicked=false;

            socket.send(JSON.stringify({
                type:"chat",
                message:JSON.stringify({shape}),
                roomId
            }))
            })

             canvas.addEventListener("mousemove",(e)=>{
                if(clicked){
                     const rect = canvas.getBoundingClientRect();
                      const currentX = e.clientX - rect.left;
                     const currentY = e.clientY - rect.top;
                     const width = currentX - startX;
                     const height = currentY - startY;
                    clearCanvas(existingShapes,canvas,ctx)
                    ctx.strokeStyle="rgba(255,255,255)"
                    ctx.strokeRect(startX,startY,width,height)
                }
})
}
function clearCanvas(existingShapes:Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId:string){
    const res=  await axios.get(`${HTTP_BACKEND}/api/v1/user/chats/${roomId}`);
    //@ts-ignore
    const messages=res.data.messages;

    const shapes=messages.map((x:{message:string})=>{
        const messageData=JSON.parse(x.message);
        return messageData.shape
    })

    return shapes;


}