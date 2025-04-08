import useIsMobile from '@/hooks/useIsMobile'
import React from 'react'

export default function SpecialSkeleton() {
  return (
    <div className="h-[250px] w-full bg-cover bg-center bg-gray-300 rounded-2xl max-md:rounded-none py-8 max-md:py-3 px-[70px] max-md:px-4 animate-pulse">
    <div className="mt-6 max-md:mt-0 flex justify-between items-center">
      <div className="flex max-md:w-full max-md:justify-between items-center mr-[138px] max-md:mr-0 max-md:px-0">
        <div className="w-32 h-6 bg-gray-400 rounded-md animate-pulse"></div>
        <div className="w-24 h-4 bg-gray-400 rounded-md animate-pulse"></div>
      </div>
      <div className="flex items-center gap-3 max-md:hidden">
        <div className="w-[45px] h-[45px] bg-gray-400 rounded-2xl animate-pulse"></div>
        <div className="w-[45px] h-[45px] bg-gray-400 rounded-2xl animate-pulse"></div>
      </div>
    </div>
    <div className="flex mt-7 max-md:mt-2 gap-4 overflow-hidden">
      {[...Array(useIsMobile() ? 3 : 4)].map((_, index) => (
        <div key={index} className="w-40 h-56 bg-gray-400 rounded-lg animate-pulse"></div>
      ))}
    </div>
  </div>  )
}
