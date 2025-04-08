import React from 'react'

export default function SkeletonSlider() {
  return (
    <div className="relative w-full">
      <div className="w-full h-[370px] max-md:h-[225px] bg-gray-200 animate-pulse rounded-lg"></div>
      
      {/* Navigation Buttons Skeleton */}
      <div className="absolute bottom-0 z-30 mb-10 mr-[260px] max-md:hidden flex gap-4">
        <div className="w-[45px] h-[45px] bg-gray-300 rounded-2xl animate-pulse"></div>
        <div className="w-[45px] h-[45px] bg-gray-300 rounded-2xl animate-pulse"></div>
      </div>
    </div>  )
}
