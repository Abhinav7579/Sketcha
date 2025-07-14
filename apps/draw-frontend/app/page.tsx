"use client"
import React from 'react';

import {Button} from "@repo/ui/button"
import {Hero} from "@repo/ui/Hero"
import {Footer} from "@repo/ui/Footer"
import { useRouter } from 'next/navigation';

function App() {
  const router=useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-800">
      <div className=' text-blue-200  text-6xl md:text-8xl lg:text-9xl  pl-[180px] font-bold pt-[15px] mb-[-130px]'>
        Sketcha
      </div>
      <main>
        
        <button className=" bg-yellow-400 font-bold shadow-red-700  mt-[70px] mb-[50px]  w-[200px] h-[50px] hover:bg-red-300 text-2 text-black  cursor-pointer  ml-[1220px]  py-2 px-10 rounded-lg transition-colors "
        onClick={()=>{router.push("/signin")}}>
              Try Now
            </button>
            
        <div className='mt-[30px] lg:mt-[5px]'>
        <Hero />
        </div>
       <div className=" lg:hidden flex justify-center mb-[80px]  ">
  <button
    className="bg-yellow-400 text-black shadow-red-700 px-8 text-xl  py-4 rounded-lg shadow-md hover:bg-red-200 transition  duration-300 font-bold"
    onClick={() => router.push("/signin")}
  >
    Try Now
  </button>
</div>
      </main>
      <div>
         <Footer />

      </div>
       
     
    </div>
  );
}

export default App;