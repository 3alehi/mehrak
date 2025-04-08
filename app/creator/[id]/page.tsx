"use client";
import ColletionBox from "@/components/Collection/ColletionBox";
import ArrowLeftt from "@/components/icons/ArrowLeftt";
import ArrowRight from "@/components/icons/ArrowRight";
import TextWithReadMore from "@/components/TextWithReadMore";
import { getCreator } from "@/utils/api/getCreator";
import { getCreatorsBook } from "@/utils/api/getCreatorsBook";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "swiper/modules";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
interface Swiper {
  isBeginning: boolean;
  isEnd: boolean;
}
export default function Page() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["creator", id],
    queryFn: () => getCreator(id as string),
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: Book, isLoading: isLoadingBook } = useQuery({
    queryKey: ["book", id, 1],
    queryFn: () => getCreatorsBook(id as string, 1),
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

  if (isLoading || isLoadingBook || loadingBookData) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="mb-[153px] overflow-x-hidden">
      {/* بنر بالای صفحه */}
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
              {data?.data.name}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 max-md:mt-0  gap-8">
              <div>
                <p className="mt-8 px-4 mr-4 max-md:mr-0 max-md:px-0  max-md:mt-0 text-customGray text-sm sm:text-lg font-extralight max-md:w-full max-md:flex max-md:justify-center">
                  متولد: <span className="ml-3">{data?.data.birthday}</span> :
                  تخلص{" "}
                  <span>
                    {data?.data.nickname != null
                      ? data.data.nickname
                      : "ندارد"}
                  </span>
                </p>
                <div className="mt-2 text-customGray text-sm sm:text-lg leading-8 text-right font-extralight px-4">
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
              {data?.data.awards.length ? (
                <div className="bg-lightBlueGray rounded-lg py-12 pr-10 text-customGray sm:h-[280px]">
                  <p className="text-lg font-medium">افتخارات و جوایز</p>
                  <ul className="mt-2">
                    {data?.data.awards.map(
                      (item: { title: string; media_files: MediaFile[] }, index: number) => (
                        <div key={index} className="flex items-center mt-2">
                          <img
                            className="h-7 w-7 rounded-full ml-2"
                            src={item.media_files[0].main_link}
                            alt="Award"
                          />
                          <p className="text-sm sm:text-lg font-extralight">
                            {item.title}
                          </p>
                        </div>
                      )
                    )}
                    {data?.data.awards.length > 3 && (
                      <li className="text-sm sm:text-lg font-extralight text-aquaBlue">
                        موارد بیشتر
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
      <div className={`mb-[157px] max-md:mb-10 ${isExpanded ? "mt-[600px]" : "mt-[400px] max-md:mt-[400px]" } pr-[157px] max-md:px-4`}>
        <div className="flex justify-between w-full">
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
                  // اقدام خاصی برای فلش چپ
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
                  // اقدام خاصی برای فلش راست
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
        <div className="grid grid-cols-4">
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
        </div>
            </Swiper>
          ) : (
            <p className="text-center text-gray-500">در حال بارگذاری...</p>
          )}
        </div>
      </div>
    </div>
  );
}

