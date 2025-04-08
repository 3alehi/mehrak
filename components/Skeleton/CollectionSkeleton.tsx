import React from 'react';

const CollectionSkeleton: React.FC = () => {
    return (
        <div
        className="border rounded-lg border-lightGrayBlue py-1 px-4 max-md:px-1 max-md:py-3 relative max-md:grid max-md:grid-cols-[118px_auto] animate-pulse"
      >
        <div className="w-full flex justify-center">
          <div className="h-[250px] w-[250px] max-md:h-[113px] max-md:w-[113px] bg-gray-300 animate-pulse rounded-md"></div>
        </div>
  
      
  
        <div>
          <div className="mt-1 w-3/4 h-4 bg-gray-300 animate-pulse rounded-md max-md:mt-0 max-md:w-1/2"></div>
          
          <div className="my-2 w-2/4 h-3 bg-gray-300 animate-pulse rounded-md max-md:mt-3 max-md:w-1/3"></div>
  
          <div className="my-4 font-extralight flex justify-between items-center max-md:mt-0">
            <div className="w-20 h-5 bg-gray-300 animate-pulse rounded-md"></div>
  
            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
  
          <div className="flex items-center mt-3 font-medium text-xl justify-between max-md:mt-1">
            <div className="w-20 h-6 bg-gray-300 animate-pulse rounded-md"></div>
  
            <div className="w-24 h-5 bg-gray-300 animate-pulse rounded-md max-md:w-20 max-md:h-4"></div>
          </div>
        </div>
      </div>
    );
};

export default CollectionSkeleton;