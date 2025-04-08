import React from "react";

const SekeletonAddress: React.FC = () => {
  return (
    <div className="max-md:px-4 animate-pulse">
      <div className="flex relative">
        <div className="max-md:flex max-md:items-end">
          <div className="cursor-pointer max-md:mt-4 mx-4 bg-gray-300 rounded-full w-8 h-8"></div>
          <span className="max-md:block hidden bg-gray-300 w-32 h-6 rounded ml-4"></span>
        </div>
        <div className="relative max-md:hidden w-32 h-6 bg-gray-300 rounded"></div>
      </div>

      <div className="border rounded-2xl max-md:border-none border-lightGrayBlue2 max-md:py-0 py-6 px-4 w-full flex justify-center mt-4">
        <div className="mt-9 w-[40%] max-md:w-full">
          <div className="grid gap-x-4 grid-cols-2 grid-rows-2 mb-6">
            <div className="bg-gray-300 h-6 w-full rounded"></div>
            <div className="bg-gray-300 h-6 w-full rounded"></div>
          </div>

          <div className="flex gap-x-4 max-md:flex-col">
            <div className="bg-gray-300 h-10 w-full rounded"></div>
            <div className="max-md:mt-3 bg-gray-300 h-10 w-full rounded"></div>
          </div>

          <div className="mt-9">
            <div className="bg-gray-300 h-6 w-1/3 rounded mb-2"></div>
            <div className="bg-gray-300 h-16 w-full rounded"></div>
          </div>

          <div className="grid grid-cols-1 grid-rows-2 mt-6 gap-x-5">
            <div className="bg-gray-300 h-6 w-1/3 rounded mb-2"></div>
            <div className="bg-gray-300 h-10 w-full rounded"></div>
          </div>

          <div className="mt-6">
            <div className="bg-gray-300 h-6 w-1/3 rounded mb-4"></div>
            <div className="grid px-2 grid-cols-2 justify-evenly border rounded-md py-2">
              <div className="bg-gray-300 h-10 w-full rounded mx-2"></div>
              <div className="bg-gray-300 h-10 w-full rounded mx-2"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 mt-6 gap-x-5">
            <div className="bg-gray-300 h-10 w-full rounded"></div>
            <div className="bg-gray-300 h-10 w-full rounded"></div>
          </div>

          <div className="grid grid-cols-1 grid-rows-2 mt-6 gap-x-5">
            <div className="bg-gray-300 h-6 w-1/3 rounded mb-2"></div>
            <div className="bg-gray-300 h-10 w-full rounded"></div>
          </div>

          <div className="flex justify-end">
            <div className="bg-gray-300 h-12 w-[70%] rounded mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SekeletonAddress;
