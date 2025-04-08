import React from 'react';

const FilterSkeleton: React.FC = () => {
    return (
        <div>

<div className="mt-24 px-5 w-full max-md:mt-6">
<div className="w-full border text-customGray font-extralight rounded-xl py-3 px-5 flex items-center justify-between bg-gray-200 animate-pulse">
      <div className="flex">
        <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
      </div>

      <div className="flex items-center">
        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-24 h-4 bg-gray-300 rounded-md mx-4"></div> 
      </div>
    </div>      </div>
        </div>
    );
};

export default FilterSkeleton;