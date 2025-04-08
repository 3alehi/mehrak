'use client'
import React, { useRef } from "react";
import BookIcon from "../icons/BookIcon";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CategoryBox from "./CategortBox";
interface MediaFile {
  main_link: string;
}

interface Category {
  id: string;
  title: string;
  media_files: MediaFile[];
}

interface BookCategoryProps {
  data: Category[];
  title: string;
}

export default function BookCategory({ data, title }: BookCategoryProps) {
  const swiperRef = useRef<SwiperRef | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className={`${title === "دسته بندی کتاب ها" ? "mt-72" : "mt-12"} max-md:mt-[45px]`}>
      <div className="w-full flex justify-between items-center">
        <p className="flex items-center">
          <BookIcon />
          <span className="text-2xl max-md:text-[14px] font-bold text-customGray mr-4">
            {title}
          </span>
        </p>

      <div className="max-md:hidden"> 
      {data.length > 9 && (
          <div className="flex items-center gap-3 max-md:hidden">
            <button
              className="px-4 py-2  w-[45px] h-[45px] bg-white border rounded-2xl cursor-pointer"
              onClick={handlePrev}
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
              className="px-4 py-2  w-[45px] h-[45px] bg-white border rounded-2xl cursor-pointer"
              onClick={handleNext}
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
        )}
      </div>
      </div>
<div className="max-md:hidden mt-7">
  
<Swiper
        ref={swiperRef}
        spaceBetween={10}
        slidesPerView={5}
        loop={false}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={false}
        onSlideChange={() => {}}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 9 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <CategoryBox
              title={item.title}
              icon={item.media_files[0].main_link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
</div>
<div>


<div className="max-md:grid grid-cols-4 gap-2 hidden mt-6 max-md:mt-3 ">
{data.map((item) => (
            <CategoryBox
            key={item.id}
              title={item.title}
              icon={item.media_files[0].main_link}
            />
        ))}
</div>

</div>
    </div>
  );
}
