"use client"
import {SubHeading} from "@repo/ui/Subheading"
import  {Button}  from "@repo/ui/button"
import {Heading} from "@repo/ui/Heading"
import {Inputbox} from "@repo/ui/Inputbox"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"

export default function Signup() {    
const routerr=useRouter();

    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const router=useRouter();  

    async function handleSignin(){
        try{
        const response=await axios.post("http://localhost:3001/api/v1/user/signin",{
            username:username,
            password:password
        })

        if(response.status==200){
           routerr.push("/main")
        }
        else{
            alert(response.data.message || "signin failed")
        }
    }
    catch (e) {
      alert("Something went wrong");
    }
}

    return (
     
    <div className="bg-gradient-to-b from-blue-900 to-purple-800 h-screen">
      <div>
         <div className=" pt-[50px] text-6xl  text-yellow-400 font-bold lg:text-7xl flex justify-center">
             Sketcha
            </div>
      </div>

    <div className=" mt-[80px] flex justify-center"> 
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        
        <Inputbox label={"Email"} placeholder={"abhi@gmail.com"}   onChange={(e)=>{setusername(e.target.value)}} />
        <Inputbox label={"Password"}  placeholder="123456"   onChange={(e)=>{setpassword(e.target.value)}} />
        <div className="pt-4">
          <Button children={"Sign in"} onClick={handleSignin} className={" text-white bg-blue-900 p-2 rounded-2xl font-bold hover:bg-blue-700 cursor-pointer"}/>
        </div>
        <div className="mt-3 text-blue-800">
            New to Sketchy??<button onClick={()=>{router.push("/signup")}} className="text-black font-bold p-1 cursor-pointer">Sign up</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  
  )
}