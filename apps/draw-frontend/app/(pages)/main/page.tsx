"use client"
import { Footer } from "@repo/ui/Footer";
import Navbar from "@/components/Navbar";
import SketchaQualities from "@/components/Qualities";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

  const handleNewCanvas = () => {
    router.push("/new-canvas");
  };

  const handleJoinRoom = () => {
    router.push("/join-room");
  };

  const handleSavedCanvas = () => {
    router.push("/saved-canvas");
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-purple-800 min-h-screen text-white">
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-[80px]">
        
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-b from-blue-200 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Buddy !!
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-b from-blue-200 to-purple-100 bg-clip-text text-transparent">
            Sketch. Share. Create.
          </p>
        </div>

        
        <div className="mt-12 flex flex-col lg:flex-row gap-10 items-center">
          
          <div className="w-full lg:w-1/2 shadow-xl border-2 border-white rounded-3xl overflow-hidden bg-white">
            <img
              src="https://offbyone.us/img/excalidraw/dark-mode.png"
              alt="Sketcha Preview"
              className="w-full h-full object-cover"
            />
          </div>

        
          <div className="w-full lg:w-1/2 bg-gradient-to-b from-blue-800 to-purple-400 shadow-xl rounded-3xl p-6 flex flex-col justify-center items-center gap-6">
            <div
              onClick={handleNewCanvas}
              className="cursor-pointer hover:shadow-amber-700 shadow-amber-300 shadow-xl bg-gradient-to-b from-orange-100 to-purple-500 rounded-2xl h-[70px] w-full max-w-[500px] pl-10 sm:pl-24 flex items-center justify-start transition-all"
            >
              <p className="text-2xl sm:text-3xl text-black font-bold">
                New Canvas/Room
              </p>
            </div>

            <div
              onClick={handleJoinRoom}
              className="cursor-pointer hover:shadow-amber-700 shadow-amber-300 shadow-xl bg-gradient-to-b from-orange-100 to-purple-500 rounded-2xl h-[70px] w-full max-w-[500px] pl-24 sm:pl-40 flex items-center justify-start transition-all"
            >
              <p className="text-2xl sm:text-3xl text-black font-bold">
                Join Room
              </p>
            </div>

            <div
              onClick={handleSavedCanvas}
              className="cursor-pointer hover:shadow-amber-700 shadow-amber-300 shadow-xl bg-gradient-to-b from-orange-100 to-purple-500 rounded-2xl h-[70px] w-full max-w-[500px] pl-20 sm:pl-36 flex items-center justify-start transition-all"
            >
              <p className="text-2xl sm:text-3xl text-black font-bold">
                Saved Canvas
              </p>
            </div>
          </div>
        </div>

    <div className="hidden bg-slate-400 shadow-3xl h-[80px]  md:block mt-[50px] rounded-2xl text-center">
  <p className="text-3xl text-black font-bold pt-[20px]">
    Sketcha is a real-time multi-user whiteboard tool.
  </p>
</div>

        {/* Qualities Section */}
        <div className="mt-16">
          <SketchaQualities />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
