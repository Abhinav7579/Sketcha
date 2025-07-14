"use client"
import React from 'react';
import { Sparkles} from 'lucide-react';

export const Hero = () => {
  return (
    <section className="mt-[-70px] pb-20 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <div className="relative inline-block mb-4">
              <span className="hidden lg:inline-flex bg-indigo-100 text-indigo-800 text-sm font-medium py-1 px-3 rounded-full items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                 <span>Reimagined Whiteboarding</span>
                  </span>

            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Bring Your Ideas to Life with{' '}
              <span className="text-white relative">
                Sketcha
                <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-200 -z-10 transform -rotate-1"></span>
              </span>
            </h1>
            
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              Create beautiful hand-drawn diagrams, wireframes, and illustrations with our intuitive 
              drawing tool. Perfect for brainstorming, teaching, and collaborative work.
            </p>
            
            
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <img 
                src="https://images.pexels.com/photos/6804605/pexels-photo-6804605.jpeg" 
                alt="Excelidraw in action" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
           
          </div>
        </div>
      </div>
    </section>
  );
};
