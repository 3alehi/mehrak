import React from "react";

const SkeletonMe: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col gap-6 p-4 w-full">
      <div className="flex flex-row gap-6">
        <div className="w-32 h-32 bg-gray-300 rounded-xl"></div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
        </div>
      </div>
      <div className="h-12 bg-gray-300 rounded-md w-full"></div>
      <div className="h-12 bg-gray-300 rounded-md w-full"></div>
      <div className="h-12 bg-gray-300 rounded-md w-full"></div>
      <div className="h-12 bg-gray-300 rounded-md w-full"></div>
    </div>
  );
};

export default SkeletonMe;
