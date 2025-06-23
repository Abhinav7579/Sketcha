import express from "express";
import { Request,Response } from "express";
const userRouter= express.Router();
import jwt from "jsonwebtoken"
import {prismaClient} from "@repo/db/client"
import bcrypt from "bcrypt"
import { JWT_PASS } from "@repo/backend-common/config";

import {UserRequiredbody,SigninRequiredbody,RoomRequiredbody} from "@repo/common/types"
import { middleware } from "../middleware";
userRouter.post("/signup",async(req,res)=>{

    const parsed=UserRequiredbody.safeParse(req.body);
    if(!parsed.success){
        res.json({message:"incorrect credentials"})
        return;
    }
    const { name,username, password} = parsed.data;


    const usernameexist = await prismaClient.user.findUnique({
  where: { email: username }
});
    if(usernameexist){
        res.status(411).json({message:"username already taken"})
    }
    else{

    const hashpassword=await bcrypt.hash(password,5);

    try{
    const user=await prismaClient.user.create({
        data:{
        name:name,
        email:username,
        password:hashpassword
        }
    })

    res.status(200).json({
        message:"you are successfully signed up",
        userId:user.id
    })
}
catch(e){
    res.status(411).json({message:"error while signing up"})
}
    }
})

userRouter.post("/signin" , async (req,res)=>{
     const parsed=SigninRequiredbody.safeParse(req.body);
    if(!parsed.success){
        res.json({message:"incorrect credentials"})
        return;
    }

    const{username,password}=parsed.data;

    const existinguser=await prismaClient.user.findUnique({
        where:{email:username}
    })
    
    if (!existinguser || !existinguser.password) {
     res.status(403).json({ message: "User does not exist or password missing" });
  }
        else{
        const passcompare= await bcrypt.compare(password,existinguser.password);
        if(passcompare){
        const token = jwt.sign({ id: existinguser.id }, JWT_PASS);
        res.status(200).json({ token:token });
        }
        else{
            res.status(403).json({ message: "Incorrect credentials" });
        }
    }
})

userRouter.post("/room",middleware,async(req,res)=>{
     const parsedData=RoomRequiredbody.safeParse(req.body);
    if(!parsedData.success){
        res.json({message:"incorrect credentials"})
        return;
    }

    const userId=req.id;
    try{
    const room=await prismaClient.room.create({
        //@ts-ignore
        data:{
            slug:parsedData.data.name,
            adminId:userId
        }
    })
    res.json({
        roomId:room.id
    })
}
catch(e){
    res.status(411).json({
        message:"room already exist"
    })
}
})

userRouter.get("/chats/:roomId",async(req,res)=>{
    const roomId=Number(req.params.roomId);
    const messages=await prismaClient.chat.findMany({
        where:{
            roomId:roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50,// want onl 50 messages
    })
    res.json({
        messages
    })
})

userRouter.get("/room/:slug",async(req,res)=>{
    const slug=req.params.slug;
    const room=await prismaClient.room.findFirst({
        where:{
            slug
        } 
    })
    res.json({
        room
    })
})








export default userRouter;



