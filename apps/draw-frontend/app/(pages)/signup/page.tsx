"use client"
import {SubHeading} from "@repo/ui/Subheading"
import  {Button}  from "@repo/ui/button"
import {Heading} from "@repo/ui/Heading"
import {Inputbox} from "@repo/ui/Inputbox"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"

export default function Signup() {  
    const [Name,setName]=useState("")
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const router=useRouter();  

    async function handleSignup(){
        try{
        const response=await axios.post("http://localhost:3001/api/v1/user/signup",{
            name:Name,
            username:username,
            password:password
        })

        if(response.status===200){
             router.push("/signin")
        }
        else{
            alert(response.data.message||"Signup failed")
        }
    }
    catch (e) {
      console.log(e);
      alert("Something went wrong",);
      
    }
}
  
    return(
      <div>
       <div>
         <div className=" bg-slate-300 pt-[100px] text-blue-600 font-bold text-6xl flex justify-center">
             Sketcha
            </div>
      </div>
       <div className="bg-slate-300 mt-[-80px] h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your credentials to create your account"} />
        <Inputbox label={"name"} placeholder={"abhinav"}  onChange={(e)=>{setName(e.target.value)}} />
        <Inputbox label={"Email"} placeholder={"abhi@gmail.com"}  onChange={(e)=>{setusername(e.target.value)}} />
        <Inputbox label={"Password"}  placeholder="123456" onChange={(e)=>{setpassword(e.target.value)}} />
        <div className="pt-4">
          <Button children={"Sign up"} onClick={handleSignup} className={" text-white bg-blue-900 p-2 rounded-2xl font-bold hover:bg-blue-700 cursor-pointer"} />
        </div>
      </div>
    </div>
  </div>
  </div>
    )
}