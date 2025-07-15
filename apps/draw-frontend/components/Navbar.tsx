"use client"
import {Pencil} from "lucide-react"
import { useRouter } from "next/navigation"
export default function Navbar(){
    const router=useRouter();
    return(
        <div className=" fixed top-0 w-full  h-[60px]  shadow-4xl bg-gradient-to-r from-purple-800 to-purple-900 flex justify-between">
            <div className="text-3xl font-bold flex text-white p-2 cursor-pointer " onClick={()=>{router.push("/main")}}>
                <Pencil className="relative h-8 w-8 text-white p-1 mt-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300"/>
                <div className="pl-2" >Sketcha</div>
            </div>
            <div className="flex ">
            <div className="text-white text p-4 pr-[30px] hover:bg-purple-800  cursor-pointer" onClick={()=>{router.push("/contactus")}}>
                Contact us
            </div>
            <div className="text-white text p-4 pr-[30px] hover:bg-purple-800  cursor-pointer" onClick={()=>{router.push("/aboutus")}}>
                About Us
            </div>
            <div className="text-white text mr-[30px] rounded-4xl p-4  hover:bg-purple-800  cursor-pointer">
                Me
            </div>
            </div>

        </div>
    )
}