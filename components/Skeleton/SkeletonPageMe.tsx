import React from 'react';

const SkeletonPageMe: React.FC = () => {
    return (
        <div
        className="flex flex-row border-lightGrayBlue2 rounded-2xl border py-3 px-5 max-md:px bg-white animate-pulse max-md:flex-col max-md:items-center max-md:gap-3 max-md:py-4 max-md:px-0"
      >
        <div className="w-10 h-10 bg-lightGrayBlue2 rounded-full max-md:mb-3"></div>
        <div className="ml-5 max-md:ml-0 max-md:w-full max-md:text-center lg:mx-4">
          <div className="h-4 bg-lightGrayBlue2 rounded w-20 mb-2 max-md:mx-auto"></div>
          <div className="h-4 bg-lightGrayBlue2 rounded w-20 mb-2 max-md:mx-auto hidden max-md:block"></div>
          <div className="h-4 bg-lightGrayBlue2 rounded w-32 max-md:mx-auto max-md:hidden"></div>
        </div>
      </div>
    );
};

export default SkeletonPageMe;