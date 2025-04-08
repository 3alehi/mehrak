import React from "react";
import CollectionSkeleton from "./CollectionSkeleton";

export default function ProductSkeleton() {
  return (
<>

<div className="max-md:px-4 mb-11 max-md:hidden">
      <p className="mt-11 text-4xl max-md:text-base font-bold text-customGray">
        <span className="block w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></span>
      </p>
      <div className="flex flex-row-reverse sm:flex-row-reverse justify-between gap-12 mt-5">
        {/* اسکلتون برای اطلاعات محصول */}
        <div className="order-2 sm:order-1 w-full px-4">
          <div className="h-6 bg-gray-300 animate-pulse w-1/2 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 text-customGray mt-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="h-4 bg-gray-300 animate-pulse w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse w-1/2"></div>
              </div>
            ))}
            <div className="h-4 bg-gray-300 animate-pulse w-1/3 mt-4"></div>
          </div>

          {/* اسکلتون توضیحات */}
          <div className="mt-10">
            <div className="h-6 bg-gray-300 animate-pulse w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 animate-pulse w-full mb-4"></div>
          </div>

          {/* اسکلتون قیمت */}
          <div className="w-full mt-6 p-2 flex flex-col items-center sm:items-end">
            <div className="w-full sm:w-[70%]">
              <div className="w-full flex justify-between text-customGray font-light mb-4">
                <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
                <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
              </div>
              <div className="w-full flex justify-between text-customGray font-medium cursor-pointer">
                <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
                <div className="h-8 bg-gray-300 animate-pulse w-1/4"></div>
              </div>
            </div>
          </div>

          {/* اسکلتون دکمه خرید */}
          <div className="w-full flex justify-center sm:justify-end mt-6">
            <button
              disabled
              className="flex items-center justify-center gap-2 bg-gray-400 text-white font-bold text-xl py-4 px-12 rounded-full transition"
            >
              <div className="h-6 w-44 bg-gray-300 animate-pulse"></div>
            </button>
          </div>
        </div>

        {/* اسکلتون برای تصویر محصول */}
        <div className="mt-3">
          <div className="grid grid-cols-[auto_98px] max-md:grid-cols-1 flex-row-reverse gap-5">
            <div className="border h-[548px] w-[548px] max-md:h-[360px] max-md:w-full border-lightGrayBlue rounded-lg animate-pulse bg-gray-300"></div>

            {/* اسکلتون برای تصاویر جانبی */}
            <div className="flex gap-2 flex-col max-md:flex-row">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-[85px] w-[85px] border rounded-2xl animate-pulse bg-gray-300"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* اسکلتون برای کتاب های مرتبط */}
      <div className="mt-16">
        <div className="flex justify-between items-center">
          <p className="text-customGray font-bold text-2xl">
            <span className="block w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></span>
          </p>{" "}
          <div className="flex gap-3">
            <p className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer opacity-50  custom-prev">
              {/* آیکون راست */}
              <span className="block h-6 w-6 bg-gray-300 animate-pulse"></span>
            </p>
            <p className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer opacity-50  custom-next">
              {/* آیکون چپ */}
              <span className="block h-6 w-6 bg-gray-300 animate-pulse"></span>
            </p>
          </div>
        </div>
        <div className="flex mt-7">
          <div className="swiper-container grid grid-cols-4 gap-6">
            {/* اسکلتون برای هر کتاب مرتبط */}
            {[...Array(4)].map((_) => (
              <CollectionSkeleton key={_} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex mt-10 justify-between gap-x-[231px]">
        <div className="w-[746px]">
          <p className="text-customGray text-2xl font-bold">
            <span className="block w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></span>
          </p>
          <div className="text-justify leading-9 text-base lg:text-lg text-customGray font-extralight mt-4">
            <div className="h-6 bg-gray-300 animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-300 animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-300 animate-pulse mb-4"></div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex justify-between items-center">
          <p className="text-customGray font-bold text-2xl">
            <span className="block w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></span>
          </p>{" "}
          <div className="flex gap-3">
            <p className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer opacity-50  custom-prev">
              {/* آیکون راست */}
              <span className="block h-6 w-6 bg-gray-300 animate-pulse"></span>
            </p>
            <p className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer opacity-50  custom-next">
              {/* آیکون چپ */}
              <span className="block h-6 w-6 bg-gray-300 animate-pulse"></span>
            </p>
          </div>
        </div>
        <div className="flex mt-7">
          <div className="swiper-container grid grid-cols-4 gap-6">
            {/* اسکلتون برای هر کتاب مرتبط */}
            {[...Array(4)].map((_) => (
              <CollectionSkeleton key={_} />
            ))}
          </div>
        </div>
      </div>
    </div>

        <div className="px-4 max-md:px-2 mb-11 hidden max-md:block overflow-hidden">
          <p className="mt-11 text-4xl max-md:text-lg font-bold text-customGray">
            <span className="block w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></span>
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-12 mt-5">
            {/* اسکلتون برای اطلاعات محصول */}
            <div className="order-2 sm:order-1 w-full px-4">
              <div className="h-6 bg-gray-300 animate-pulse w-1/2 mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 text-customGray mt-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-300 animate-pulse w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-300 animate-pulse w-1/2"></div>
                  </div>
                ))}
                <div className="h-4 bg-gray-300 animate-pulse w-1/3 mt-4"></div>
              </div>
    
              {/* اسکلتون توضیحات */}
              <div className="mt-10">
                <div className="h-6 bg-gray-300 animate-pulse w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 animate-pulse w-full mb-4"></div>
              </div>
    
              {/* اسکلتون قیمت */}
              <div className="w-full mt-6 p-2 flex flex-col items-center sm:items-end">
                <div className="w-full sm:w-[70%]">
                  <div className="w-full flex justify-between text-customGray font-light mb-4">
                    <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
                    <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
                  </div>
                  <div className="w-full flex justify-between text-customGray font-medium cursor-pointer">
                    <div className="h-6 bg-gray-300 animate-pulse w-1/4"></div>
                    <div className="h-8 bg-gray-300 animate-pulse w-1/4"></div>
                  </div>
                </div>
              </div>
    
              {/* اسکلتون دکمه خرید */}
              <div className="w-full flex justify-center sm:justify-end mt-6">
                <button
                  disabled
                  className="flex items-center justify-center gap-2 bg-gray-400 text-white font-bold text-xl py-4 px-12 rounded-full transition"
                >
                  <div className="h-6 w-44 bg-gray-300 animate-pulse"></div>
                </button>
              </div>
            </div>
    
            {/* اسکلتون برای تصویر محصول */}
            <div className="mt-3">
              <div className="grid grid-cols-[auto_98px] max-md:grid-cols-1 flex-row-reverse gap-5">
                <div className="border h-[548px] w-[548px] max-md:h-[360px] max-md:w-full border-lightGrayBlue rounded-lg animate-pulse bg-gray-300"></div>
    
                {/* اسکلتون برای تصاویر جانبی */}
                <div className="flex gap-2 flex-row ">
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="h-[85px] w-[85px] border rounded-2xl animate-pulse bg-gray-300"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    
          {/* اسکلتون برای کتاب های مرتبط */}
          <div className="mt-16">
            <div className="flex justify-between items-center">
              <p className="text-customGray font-bold text-2xl">
                <span className="block w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></span>
              </p>
              <div className="flex gap-3">
                <p className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer opacity-50  custom-prev">
                  {/* آیکون راست */}
                  <span className="block h-6 w-6 bg-gray-300 animate-pulse"></span>
                </p>
                <p className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer opacity-50  custom-next">
                  {/* آیکون چپ */}
                  <span className="block h-6 w-6 bg-gray-300 animate-pulse"></span>
                </p>
              </div>
            </div>
            <div className="flex mt-7">
              <div className="swiper-container grid grid-cols-4 gap-6">
                {/* اسکلتون برای هر کتاب مرتبط */}
                {[...Array(4)].map((_) => (
                  <CollectionSkeleton key={_} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex mt-10 justify-between gap-x-[231px]">
            <div className="w-full sm:w-[746px]">
              <p className="text-customGray text-2xl font-bold">
                <span className="block w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></span>
              </p>
              <div className="text-justify leading-9 text-base lg:text-lg text-customGray font-extralight mt-4">
                <div className="h-6 bg-gray-300 animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-300 animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-300 animate-pulse mb-4"></div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <div className="flex justify-between items-center">
              <p className="text-customGray font-bold text-2xl">
                <span className="block w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></span>
              </p>
              <div className="flex gap-3">
                <p className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer opacity-50  custom-prev">
                  {/* آیکون راست */}
                  <span className="block h-6 w-6 bg-gray-300 animate-pulse"></span>
                </p>
                <p className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer opacity-50  custom-next">
                  {/* آیکون چپ */}
                  <span className="block h-6 w-6 bg-gray-300 animate-pulse"></span>
                </p>
              </div>
            </div>
            <div className="flex mt-7">
              <div className="swiper-container grid grid-cols-4 gap-6">
                {/* اسکلتون برای هر کتاب مرتبط */}
                {[...Array(1)].map((_) => (
                  <CollectionSkeleton key={_} />
                ))}
              </div>
            </div>
          </div>
        </div>
</>
      
  
    
  );
}
