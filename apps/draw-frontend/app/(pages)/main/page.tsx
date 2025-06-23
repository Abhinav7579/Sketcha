import { Footer } from "@repo/ui/Footer"
import Navbar from "@/components/Navbar"
import SketchaQualities from "@/components/Qualities"
export default function Main(){
    return(
        <div>
        <div>
            <div>
        <div className=" mt-[40px] bg-gradient-to-b from-blue-900 to-purple-800">
            <div>
                <Navbar/>
            </div>
            <div >
                <div className="text-6xl p-4 pt-[40px] bg-gradient-to-b from-blue-200 to-purple-600 bg-clip-text text-transparent font-bold">
                    Welcome Buddy !!
                </div>
                <div className="bg-gradient-to-b from-blue-200 to-purple-100 bg-clip-text text-transparent text-3xl pl-4 font-bold ">
                     Sketch. Share. Create.
                </div>
               
            </div>
            <div className="flex">
            
            <div className="h-[500px] w-[700px] rounded-4xl border-2 shadow-amber-100 shadow-xl border-white mt-[50px] bg-white m-4">
                <img src="https://offbyone.us/img/excalidraw/dark-mode.png" className="h-[495px] rounded-4xl"></img>
            </div>

            <div className="flex flex-col justify-between items-center bg-gradient-to-b from-blue-800 to-purple-400 border-1 border-white shadow-amber-100 shadow-xl mt-[50px] rounded-4xl ml-[200px] h-[500px] w-[700px]">
                 <div className=" cursor-pointer shadow-amber-300 shadow-xl hover:shadow-amber-700 bg-gradient-to-b from-orange-100 to-purple-500 w-[500px] rounded-2xl h-[70px] bg-white mt-[70px]  p-3 pl-[100px] m-4 ">
                    <p className=" text-4xl  text-black font-bold">New Canvas/Room</p>
                 </div>
                 
                 <div className="shadow-amber-300 shadow-xl hover:shadow-amber-700 cursor-pointer bg-gradient-to-b from-orange-100 to-purple-500 w-[500px] rounded-2xl h-[70px] bg-white  p-3 pl-[170px] m-4">
                     <p className="text-4xl text-black font-bold">Join Room</p>
                 </div>
                 <div className="mb-[70px] shadow-amber-300 hover:shadow-amber-700 cursor-pointer shadow-xl bg-gradient-to-b from-orange-100 to-purple-500 w-[500px] rounded-2xl h-[70px] bg-white  p-3 pl-[150px] m-4">
                   <p className="text-4xl text-black font-bold"> Saved Canvas</p>
                 </div>
            </div>
           
            </div>
            <div className="mt-[60px]">
             <SketchaQualities/>
             </div>
            </div>

            
        
        </div>
        
        </div>
        <div>
            <Footer/>
        </div>
        </div>

    )
}