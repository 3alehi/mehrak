import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="py-5 px-4 bg-light-gray border border-lightGrayBlue2 rounded-2xl animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-300 w-32 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <div className="text-charcoal text-sm mt-4 space-y-2">
        <div className="h-4 bg-gray-300 w-24 rounded"></div>
        <div className="h-4 bg-gray-300 w-32 rounded"></div>
        <div className="h-4 bg-gray-300 w-24 rounded"></div>
        <div className="h-4 bg-gray-300 w-40 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
