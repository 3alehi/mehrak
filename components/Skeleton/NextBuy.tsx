import React from 'react';

const NextBuy: React.FC = () => {
    return (
        <div className="py-4 pr-5 pl-3 border-r  max-md:rounded-lg border-lightGrayBlue animate-pulse max-md:mt-6 max-md:border">
        <div className="bg-lightBlueGray py-7 rounded-2xl px-4 text-charcoal">
          <div className="flex justify-between items-end">
          <div className="flex flex-col items-end">
          <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-28 mt-2"></div>
            </div>
            <div className="flex flex-col items-end">
              <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-28 mt-2"></div>
            </div>
          </div>
          <div className="my-5 h-1 w-full bg-gray-300 rounded"></div>
          <div className="flex justify-between text-customRed text-base font-medium">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div className="w-full justify-center flex items-center mt-9">
            <div className="bg-gray-300 h-10 w-40 rounded"></div>
          </div>
        </div>
        <div className="mt-5">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
      
    );
};

export default NextBuy;