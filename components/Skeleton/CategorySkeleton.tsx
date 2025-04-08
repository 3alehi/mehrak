import React from 'react'

export default function CategorySkeleton() {
  return (
<div className="flex flex-col items-center animate-pulse">
              <div className="w-[152px] h-[152px] bg-gray-300 rounded-full"></div>
              <p className="mt-3 w-24 bg-gray-300 h-4 rounded"></p>
            </div>  )
}
