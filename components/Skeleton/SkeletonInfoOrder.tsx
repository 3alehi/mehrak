import React from "react";

const SkeletonInfoOrder: React.FC = () => {
  return (
    <div className="border border-lightGrayBlue2 rounded-2xl text-darkGray">
      <div className="bg-lightBlueGray rounded-t-lg px-7 py-9">
        <div className="flex justify-between items-center">
          <div className="w-1/2 h-8 bg-gray-300 animate-pulse"></div>
          <div className="w-1/3 h-8 bg-gray-300 animate-pulse"></div>
        </div>
        <div className="flex justify-between items-end mt-6">
          <div className="flex mt-10 text-lg items-center">
            <div className="w-32 h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-32 h-6 bg-gray-300 animate-pulse"></div>
          </div>
          <div className="w-32 h-6 bg-gray-300 animate-pulse"></div>
        </div>
        <hr className="mt-6" />
        <div className="flex mt-10 text-lg items-center">
          <div className="w-32 h-6 bg-gray-300 animate-pulse"></div>
          <div className="w-32 h-6 bg-gray-300 animate-pulse"></div>
        </div>
        <br />
        <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
      </div>
      <div className="px-7 border-lightGrayBlue2 mt-4 border rounded-md mx-7 py-4">
        <div className="w-1/3 h-6 bg-gray-300 animate-pulse"></div>
        <div
          className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
            true ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <hr className="mt-4" />
          <div className="w-full h-6 bg-gray-300 animate-pulse mt-4"></div>
          <div className="w-full h-6 bg-gray-300 animate-pulse mt-4"></div>
        </div>
      </div>
      <div className="px-7 mt-7">
        <div className="flex gap-2 flex-col">
          <div className="w-full h-16 bg-gray-300 animate-pulse mt-4"></div>
          <div className="w-full h-16 bg-gray-300 animate-pulse mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonInfoOrder;
