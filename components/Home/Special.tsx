'use client'
import Link from "next/link";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper as SwiperComponent, SwiperSlide, SwiperRef } from "swiper/react";
import { Swiper } from "swiper/types";
import BoxProduct from "../BoxProduct";

// Define the product interface to match BoxProduct requirements
interface Product {
  id: number; // Changed to number only
  media_files: { main_link: string }[]; // Changed to array of objects with main_link
  title: string;
  main_price_formatted: string;
  price_formatted: string;
  price: number;
  main_price: number;
}

// Define props interface
interface SpecialProps {
  data: {
    data: {
      sale: Product[];
    };
  };
}

export default function Special({ data }: SpecialProps) {
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

  return (
    <div className="flex w-full justify-center">
      <div
        className="h-[250px] w-[1441px] max-md:w-full bg-cover bg-center bg-[#CC2229] rounded-2xl max-md:rounded-none py-7 max-md:py-3 px-[70px] max-md:pl-0 max-md:pr-4"
        style={{ backgroundImage: "url('Rectangle 146128.png')" }}
      >
      <div className="max-w-[1300px]">
      <div className=" max-md:mt-0 flex justify-between items-center container mx-auto" >
          <div className="flex max-md:w-full max-md:justify-between items-center  max-md:mr-0 max-md:px-0">
            <p className="text-white text-2xl font-black max-md:text-base">
              فروش ویژه
            </p>
            <Link
              href={"/special"}
              className="mr-4 font-light text-white cursor-pointer max-md:mr-0 max-md:text-[14px]"
            >
              مشاهده همه
            </Link>
          </div>
          <div className="flex items-center gap-3 max-md:hidden">
            <button
              className={`px-4 py-2 w-[45px] h-[45px] bg-white rounded-2xl ${
                isBeginning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
              className={`px-4 py-2 w-[45px] h-[45px] bg-white rounded-2xl ${
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
        <div className="flex mt-7 max-md:mt-2 container mx-auto">
          <SwiperComponent
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={4}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
            breakpoints={{
              320: { slidesPerView: 2.5 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {data?.data.sale.map((item: Product, index: number) => (
              <SwiperSlide key={index}>
                <BoxProduct
                  key={index}
                  id={item.id}
                  src={item.media_files}
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
    </div>
  );
}