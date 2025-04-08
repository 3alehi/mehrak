import React from "react";

const HeaderCollectionSkeleton: React.FC = () => {
  return (
    <div>
      <div className="w-full max-md:rounded-none rounded-3xl h-[268px] max-md:h-[171px] flex flex-col justify-between relative bg-gray-200 animate-pulse">
        <div className="w-full flex justify-end px-5 py-4">
          <div className="py-3 px-5 bg-lightBlueGray border-2 border-white w-fit rounded-lg cursor-pointer">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="pl-5 pr-5 md:pl-36 md:pr-[360px] pb-8 flex flex-col md:flex-row justify-between items-center max-md:hidden">
          <div className="w-32 h-6 bg-gray-300 rounded-lg mb-4"></div>
          <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
        </div>

        <div className="absolute bottom-[-60px] md:bottom-[-100px] right-0 md:right-0 pr-5 md:pr-36 flex md:block justify-center w-full">
          <div className="w-[120px] h-[120px] md:w-[192px] md:h-[192px] rounded-full overflow-hidden border-white border-[3px]">
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div
        className="pr-[360px] text-customGray text-base md:text-lg font-extralight mt-3 max-md:hidden"
        dangerouslySetInnerHTML={{
          __html: '<div class="h-4 bg-gray-300 animate-pulse"></div>',
        }}
      />
      <div className="pl-5 pr-5 hidden max-md:flex md:pl-36 md:pr-[360px] pb-8 flex-col md:flex-row justify-between items-center max-md: mt-16">
        <div className="w-32 h-6 bg-gray-300 rounded-lg mb-4"></div>
        <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
      </div>

      <div
        className="px-5 text-customGray text-base md:text-lg font-extralight mt-3 max-md:block hidden"
        dangerouslySetInnerHTML={{
          __html: '<div class="h-4 bg-gray-300 animate-pulse"></div>',
        }}
      />
    </div>
  );
};

export default HeaderCollectionSkeleton;
