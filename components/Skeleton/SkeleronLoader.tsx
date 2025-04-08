import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="pb-5">
      {/* Skeleton for Header Section */}
      <div
        className="w-full max-md:rounded-none rounded-3xl h-[268px] border-b-[3px] max-md:border-b-[2px]  max-md:h-[171px] border-turquoise flex flex-col justify-between relative bg-lightBlueGray animate-pulse"
      >
        <div className="w-full flex justify-end px-5 py-4"></div>
        <div className="pl-5 pr-5 md:pl-36 md:pr-[360px] pb-8 flex flex-col md:flex-row justify-between items-center max-md:hidden">
          <div className="w-1/2 h-8 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        <div className="absolute bottom-[-60px] md:bottom-[-100px] right-0 md:right-0 pr-5 md:pr-36 flex md:block justify-center w-full">
          <div className="w-[120px] h-[120px] md:w-[192px] md:h-[192px] rounded-full overflow-hidden border-white bg-lightBlueGray border-[3px] flex justify-center items-center animate-pulse"></div>
        </div>
      </div>

      <div className="mt-24 px-5 w-full max-md:mt-6 flex justify-end">
        <div className="flex items-center border rounded-xl px-4 py-2 animate-pulse">
          <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      <div className="mt-28 max-md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-5 mb-20 animate-pulse">
        {new Array(4).fill(1).map((_, index) => (
          <div key={index} className="pt-3 border border-lightGrayBlue max-md:border-none max-md:rounded-none rounded-2xl h-[346px] overflow-hidden bg-gray-300 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
