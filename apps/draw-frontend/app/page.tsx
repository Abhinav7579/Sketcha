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
      <div className=' text-blue-200 text-9xl pl-[180px] font-bold pt-[50px] mb-[-130px]'>
        Sketcha
      </div>
      <main>
        <button className="bg-blue-300 mt-[50px] mb-[50px]  w-[200px] h-[50px] hover:bg-blue-700 text-2 text-black  cursor-pointer  ml-[1220px] font-medium py-2 px-10 rounded-lg transition-colors "
        onClick={()=>{router.push("/signin")}}>
              Try Now
            </button>
        
        <Hero />
      </main>
       
      <Footer />
    </div>
  );
}

export default App;