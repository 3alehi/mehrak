import React from 'react'

export default function BookCategorySkeleton() {
  return (
    <div className="w-full space-y-4">
    {/* Skeleton for the title */}
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
      <div className="w-1/2 h-6 bg-gray-300 rounded-lg animate-pulse"></div>
    </div>

    {/* Skeleton for the category items */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="h-32 bg-gray-300 rounded-lg animate-pulse"></div>
        ))}
    </div>
  </div>  )
}
