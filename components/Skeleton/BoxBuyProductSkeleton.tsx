import React from "react";

const BoxBuyProductSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-lightBlueGray border border-lightGrayBlue rounded-lg grid grid-cols-1 sm:grid-cols-2 p-4 gap-4">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-[193px] h-[193px] bg-lightGrayBlue animate-pulse">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
        <div className="mr-0 sm:mr-10 flex flex-col text-customGray w-full mt-4 sm:mt-0">
          <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse mb-3"></div>
        </div>
      </div>
      <div className="w-full max-md:hidden">
        <div className="w-full flex justify-end">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center justify-center flex-col mt-4 sm:mt-0">
          <div className="w-24 sm:w-32 h-12 bg-gray-300 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default BoxBuyProductSkeleton;
