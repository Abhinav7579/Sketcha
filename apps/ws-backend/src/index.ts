import {WebSocketServer,WebSocket} from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASS } from "@repo/backend-common/config"
import {prismaClient} from "@repo/db/client"
const wss=new WebSocketServer({port:8080});


interface User{
    ws:WebSocket,
    userId:string,
    rooms:string[]
}
const users:User[]=[]; 


function checkUser(token:string):string|null{
    try{
    const decoded=jwt.verify(token,JWT_PASS)

    if(typeof decoded=="string"){
        return null;
    }

    if(!decoded || !decoded.id){
        return null;
    }
    return decoded.id;
}
catch(e){
    return null
}

}

wss.on('connection',function connection(ws,request){
   
    const url=request.url; //ws://localhost:8080?token=1234
    if(!url){
         console.log("No URL in request");
        return;
    }
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token=queryParams.get('token')
    console.log("Token received:", token);
    
    //@ts-ignore
    const userId=checkUser(token);
    console.log(" User ID from token:", userId);

    if(!userId){
        ws.close();
        return null;
    }
    users.push({
        ws:ws,
        userId:userId,
        rooms:[]
    })

    ws.on('message',async(data)=>{
        const parsedaData=JSON.parse(data as unknown as string);  //first user will send{type:"join-room",roomId:1}
        if(parsedaData.type==="join_room"){
            const user=users.find(x=>x.ws===ws);
            user?.rooms.push(parsedaData.roomId)
        }
        if(parsedaData.type==="leave_room"){
              const user=users.find(x=>x.ws===ws);
              if(!user){
                return;
              }
              user.rooms=user?.rooms.filter(x=>x!==parsedaData.roomId)
        }


        if(parsedaData.type==="chat"){     //user is sending {chat,message,roomid}
          const roomId=parsedaData.roomId;
          const message=parsedaData.message;

          await prismaClient.chat.create({
            data:{
                roomId:parseInt(roomId),
                message,
                userId
            }
          });
          
          users.forEach(user=>{
            if(user.rooms.includes(roomId)){
                user.ws.send(JSON.stringify({
                    type:"chat",
                    message:message,
                    roomId
                }))
            }
          })
        }

    })
})