"use client";
import BoxProduct from "@/components/BoxProduct";
import ColletionBox from "@/components/Collection/ColletionBox";
import Pagination from "@/components/Pagination";
import { getSpecial } from "@/utils/api/getSpecial";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import {
  Swiper as SwiperComponent,
  SwiperSlide,
  SwiperRef,
} from "swiper/react";
import { Swiper } from "swiper/types";

// Define the product interface
interface MediaFile {
  main_link: string;
  conversion_links?: {
    thumbnail_192_192?: string;
    large_thumbnail_260_260?: string;
  };
  collection_name?: string;
}

interface Product {
  id: number;
  media_files: MediaFile[];
  title: string;
  main_price_formatted: string;
  price_formatted: string;
  price: number;
  main_price: number;
}

// Define the API response interface

export default function ClientPage() {
  const [page, setPage] = useState<number>(1);
  const [firstPageData, setFirstPageData] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["Book", page],
    queryFn: () => getSpecial("1", page),
  });

  useEffect(() => {
    if (isLoading == false && data && page === 1) {
      setFirstPageData(data.data);
    }
  }, [data, isLoading]);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleNext = (): void => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = (): void => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper: Swiper): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-16 max-md:mt-5 max-md:px-4">
        <div className="h-[671px]  w-full max-md:h-[336px]">
          <div className="h-[671px] w-full bg-cover bg-center container mx-auto py-8 max-md:px-4">
            {/* اسکلتون لودینگ برای اسلایدر محصولات */}
            <div className="flex mt-7 max-md:mt-2">
              <SwiperComponent
                ref={swiperRef}
                modules={[Navigation, Autoplay]}
                slidesPerView={4}
                pagination={{ clickable: true }}
                onSlideChange={handleSlideChange}
                breakpoints={{
                  320: { slidesPerView: 2.5 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
              >
                {[...Array(4)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="border rounded-lg py-1 px-4 bg-white animate-pulse">
                      <div className="w-full flex justify-center">
                        {/* اسکلتون لودینگ برای تصویر */}
                        <div className="h-[250px] w-[250px] max-md:w-[133px] bg-gray-300"></div>
                      </div>
                      <div className="mt-4">
                        {/* اسکلتون لودینگ برای عنوان */}
                        <div className="h-4 bg-gray-300 animate-pulse w-3/4 mb-2"></div>
                        {/* اسکلتون لودینگ برای قیمت */}
                        <div className="h-4 bg-gray-300 animate-pulse w-1/2 mb-4"></div>
                        <div className="flex items-center justify-between">
                          {/* اسکلتون لودینگ برای ستاره */}
                          <div className="h-4 bg-gray-300 animate-pulse w-12"></div>
                          {/* اسکلتون لودینگ برای قیمت اصلی */}
                          <div className="h-4 bg-gray-300 animate-pulse w-16"></div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </SwiperComponent>
            </div>
          </div>
        </div>

        {/* اسکلتون لودینگ برای محصولات */}
        <div className="grid grid-cols-4 max-md:grid-cols-1 max-md:gap-y-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="border rounded-lg py-1 px-4 bg-white animate-pulse"
            >
              <div className="w-full flex justify-center">
                {/* اسکلتون لودینگ برای تصویر */}
                <div className="h-[250px] w-[250px] max-md:w-[133px] bg-gray-300"></div>
              </div>
              <div className="mt-4">
                {/* اسکلتون لودینگ برای عنوان */}
                <div className="h-4 bg-gray-300 animate-pulse w-3/4 mb-2"></div>
                {/* اسکلتون لودینگ برای قیمت */}
                <div className="h-4 bg-gray-300 animate-pulse w-1/2 mb-4"></div>
                <div className="flex items-center justify-between">
                  {/* اسکلتون لودینگ برای ستاره */}
                  <div className="h-4 bg-gray-300 animate-pulse w-12"></div>
                  {/* اسکلتون لودینگ برای قیمت اصلی */}
                  <div className="h-4 bg-gray-300 animate-pulse w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* اسکلتون لودینگ برای صفحه بندی */}
        <div className="my-19 max-md:mt-8">
          <div className="h-8 w-24 bg-gray-300 animate-pulse mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="h-[671px] bg-[#CC2229] w-full max-md:h-[336px]">
        <div
          className="h-[671px] w-full bg-cover bg-center container mx-auto py-8 max-md:px-4"
          style={{ backgroundImage: "url('Rectangle 146128.png')" }}
        >
          <h1 className="text-white font-black text-5xl max-md:text-2xl max-md:w-full max-md:flex max-md:justify-center">
            فروش ویژه
          </h1>
          <div className="w-full flex justify-between mt-10 max-md:mt-5 items-center">
            <p className="font-black text-2xl max-md:font-medium max-md:text-base text-white">
              ویژه‌های رو به اتمام
            </p>
            <div className="flex items-center gap-3 max-md:hidden">
              <button
                className={`px-4 py-2 bg-white rounded-2xl ${
                  isBeginning
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={handlePrev}
                disabled={isBeginning}
              >
                <svg
                  width="12"
                  height="22"
                  viewBox="0 0 12 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1094 10.7656C11.25 10.9062 11.25 11.1406 11.1094 11.2812L0.984375 21.4062C0.84375 21.5469 0.609375 21.5469 0.46875 21.4062C0.328125 21.2656 0.328125 21.0312 0.46875 20.8906L10.3125 11L0.46875 1.15625C0.328125 1.01562 0.328125 0.78125 0.46875 0.640625C0.609375 0.5 0.84375 0.5 0.984375 0.640625L11.1094 10.7656Z"
                    fill="#515869"
                  />
                </svg>
              </button>
              <button
                className={`px-4 py-2 bg-white rounded-2xl ${
                  isEnd ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handleNext}
                disabled={isEnd}
              >
                <svg
                  width="12"
                  height="22"
                  viewBox="0 0 12 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.84375 10.7656L10.9688 0.640625C11.1094 0.5 11.3438 0.5 11.4844 0.640625C11.625 0.78125 11.625 1.01562 11.4844 1.15625L1.64062 11L11.4844 20.8906C11.625 21.0312 11.625 21.2656 11.4844 21.4062C11.3438 21.5469 11.1094 21.5469 10.9688 21.4062L0.84375 11.2812C0.703125 11.1406 0.703125 10.9062 0.84375 10.7656Z"
                    fill="#515869"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex mt-7 max-md:mt-2">
            <SwiperComponent
              ref={swiperRef}
              modules={[Navigation, Autoplay]}
              slidesPerView={4}
              pagination={{ clickable: true }}
              onSlideChange={handleSlideChange}
              breakpoints={{
                320: { slidesPerView: 2.5 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {firstPageData?.map((item: Product, index: number) => (
                <SwiperSlide key={index}>
                  <BoxProduct
                    key={index}
                    id={item.id}
                    src={item.media_files.map((file, fileIndex) => ({
                      main_link: file.main_link,
                      conversion_links: {
                        large_thumbnail_260_260:
                          file.conversion_links?.large_thumbnail_260_260 ||
                          file.conversion_links?.thumbnail_192_192 ||
                          file.main_link,
                        thumbnail_192_192:
                          file.conversion_links?.thumbnail_192_192,
                      },
                      collection_name:
                        file.collection_name ||
                        (fileIndex === 0
                          ? "normal_product_main_image"
                          : "normal_product_gallery_image"), // تخصیص پیش‌فرض
                    }))}
                    title={item.title}
                    main_price_formatted={item.main_price_formatted}
                    price_formatted={item.price_formatted}
                    price={item.price}
                    main_price={item.main_price}
                    page={1}
                  />
                </SwiperSlide>
              ))}
            </SwiperComponent>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-16 max-md:mt-5 max-md:px-4">
        <div className="grid grid-cols-4 max-md:grid-cols-1 max-md:gap-y-2">
          {data?.data.map((item: Product, index: number) => (
            <ColletionBox
              key={index}
              counter={index}
              id={item.id}
              src={item.media_files}
              title={item.title}
              main_price_formatted={item.main_price_formatted}
              price_formatted={item.price_formatted}
              price={item.price}
              main_price={item.main_price}
              page={1}
            />
          ))}
        </div>
      </div>

      <div className="my-19 max-md:mt-8">
        {data && data.meta && data.meta.last_page > 1 && (
          <Pagination
            totalPages={data.meta.last_page}
            currentPage2={data.meta.current_page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}
