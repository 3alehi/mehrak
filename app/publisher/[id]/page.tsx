"use client";
import ColletionBox from "@/components/Collection/ColletionBox";
import ArrowLeftt from "@/components/icons/ArrowLeftt";
import ArrowRight from "@/components/icons/ArrowRight";
import TextWithReadMore from "@/components/TextWithReadMore";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "swiper/modules";
import { useParams } from "next/navigation";
import { getProducers } from "@/utils/api/getProducers";
import React, { useEffect, useState } from "react";
import Paginations from "@/components/Pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { getBooksPublisher } from "@/utils/api/getBooksPublisher";
import Filter from "@/components/filter/Filter";
import { getAward } from "@/utils/api/getAward";
interface Swiper {
  isBeginning: boolean;
  isEnd: boolean;
}
export default function Page() {
  const [page, setPage] = useState<number>(1);

  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["creator", id],
    queryFn: () => getProducers(id as string),
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: Book, isLoading: isLoadingBook } = useQuery({
    queryKey: ["book", id, page],
    queryFn: () => getBooksPublisher(id as string, page),
  });
  const { data: Award, isLoading: isLoadingAward } = useQuery({
    queryKey: ["Award"],
    queryFn: () => getAward(),
  });
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSlideChange = (swiper: Swiper) => {
    setIsFirstSlide(swiper.isBeginning);
    setIsLastSlide(swiper.isEnd);
  };
  const [loadingBookData, setLoadingBookData] = useState(true);

  useEffect(() => {
    if (Book?.data) {
      setLoadingBookData(false);
    }
  }, [Book?.data]);
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const awardsToShow = showAll ? Award?.data : Award?.data.slice(0, 4);
  if (isLoading && isLoadingBook && loadingBookData &&isLoadingAward ) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="mb-[153px] max-md:mb-24 overflow-x-hidden">
      <div
        className="w-full h-[268px] max-md:h-[177px] relative bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url('/Baner.png')" }}
      >
        <div className="flex flex-col sm:flex-row sm:mr-40 absolute top-40 max-md:top-[120px] w-full">
          <div className="flex justify-center items-center h-fit w-fit flex-col sm:w-[192px] sm:h-[192px] max-md:w-full">
            <div className="w-full h-full sm:w-[192px] sm:h-[192px] max-md:w-[122px] max-md:h-[122px] rounded-full">
              <img
                className="w-full h-full rounded-full"
                src={data?.data.media_files[0].main_link}
                alt="Creator Image"
              />
            </div>
          </div>
          <div className="pt-6 sm:pt-0 sm:ml-7 sm:w-full">
            <p className="pb-7 mt-10 px-4 mr-4 max-md:mr-0 max-md:px-0 max-md:mt-0 max-md:pb-3 text-2xl sm:text-4xl font-black text-customGray max-md:w-full max-md:flex max-md:justify-center">
              {data?.data.title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 max-md:mt-0 max-md:px-4  gap-8">
              <div>
               
                <div className="text-customGray text-sm sm:text-lg  text-right font-extralight max-md:px-0 px-4">
                  <div className="p-4">
                    <TextWithReadMore
                      isExpanded={isExpanded}
                      setIsExpanded={setIsExpanded}
                      htmlContent={data?.data.description}
                    />
                  </div>
                </div>
                {/* <div className="mt-12">
                  <p className="text-customGray font-medium text-sm sm:text-lg">
                    ژانرها و موضوعات فعال
                  </p>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Genre title="تخیلی" />
                    <Genre title="کودک" />
                    <Genre title="بزرگسال" />
                  </div>
                </div> */}
              </div>
              {Award?.data.length ? (
    <div className="bg-lightBlueGray rounded-lg py-12 pr-10 text-customGray h-fit w-[400px] max-md:px-4 max-md:w-full ">
      <p className="text-lg font-medium">افتخارات و جوایز</p>
      <ul className="mt-2">
        {awardsToShow.map(
          (item: { title: string; media_files: MediaFile[] }, index: number) => (
            <div key={index} className="flex items-center mt-2">
              <img
                className="h-7 w-7 rounded-full ml-2"
                src={item.media_files[0].main_link}
                alt="Award"
              />
              <p className="text-sm sm:text-lg font-extralight line-clamp-1 pl-4">{item.title}</p>
            </div>
          )
        )}
        {Award?.data.length > 4 && !showAll && (
          <li
            className="text-sm sm:text-lg font-extralight text-aquaBlue cursor-pointer"
            onClick={handleShowMore}
          >
            موارد بیشتر
          </li>
        )}
          {showAll && (
          <li
            className="text-sm sm:text-lg font-extralight text-aquaBlue cursor-pointer"
            onClick={handleShowMore}
          >
            موارد کمتر
          </li>
        )}
      </ul>
    </div>
  ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* بخش کتاب‌های برگزیده */}
      <div className={`]  max-md:mb-10  pr-[157px] max-md:px-4  ${isExpanded? "mt-[700px] max-md:mt-[1550px]" : "mt-[400px] max-md:mt-[400px]" } max-md:mt-[690px]`}>
        <div className={`flex justify-between w-full ${showAll ? 'mt-[600px]' : 'mt-[400px]' }`}>
          <p className="text-2xl sm:text-3xl font-normal text-customGray">
            کتاب های برگزیده
          </p>
          <div className="flex gap-3">
            <p
              className={`py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer custom-prev ${
                isFirstSlide ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={(e) => {
                if (!isFirstSlide) {
                  e.preventDefault();
                }
              }}
            >
              <ArrowRight />
            </p>
            <p
              className={`py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer custom-next ${
                isLastSlide ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={(e) => {
                if (!isLastSlide) {
                  e.preventDefault();
                }
              }}
            >
              <ArrowLeftt />
            </p>
          </div>
        </div>
        <div className="flex mt-7">
          {Book?.data && Book?.data.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              
              pagination={{ clickable: true }}
              allowTouchMove={Book?.data?.length > 4}
              centeredSlides={false}
              initialSlide={0}
              centerInsufficientSlides={false}
              watchOverflow={true}
              spaceBetween={0}
              onSlideChange={handleSlideChange} 
              breakpoints={{
                320: { slidesPerView: Math.min(Book?.data?.length, 1) },
                640: { slidesPerView: Math.min(Book?.data?.length, 2) },
                1024: { slidesPerView: Math.min(Book?.data?.length, 3) },
                1280: { slidesPerView: Math.min(Book?.data?.length, 4) },
              }}
              style={{ width: "100%" }}
            >
              {Book?.data.map((item: BookItem, index: number) => (
                <SwiperSlide key={index}>
                  <ColletionBox
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
            </Swiper>
          ) : (
            <p className="text-center text-gray-500">در حال بارگذاری...</p>
          )}
        </div>
        <div className="mt-28 max-md:mt-12">
            <Filter setSort={()=>{}}/>
            <div className="mt-7 max-md:gap-2 grid grid-cols-4 max-md:grid-cols-1">
            {Book?.data.map((item: BookItem, index: number) => (
                  <ColletionBox
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
                ))}
            </div>
        </div>
               <div className="mt-20">
               {Book && Book.meta && Book.meta.last_page > 1 && (
                  <Paginations
                    totalPages={Book.meta.last_page}
                    currentPage2={Book.meta.current_page}
                    setPage={setPage}
                  />
                )}
               </div>
      </div>
    </div>
  );
}

