"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";
import React from "react";

interface Publisher {
  name: string;
  books_count: number;
  media_files: MediaFile[];
}

interface ListPublisherBoxProps {
  data: {
    data: Publisher[];
  };
}

export default function ListPublisherBox({ data }: ListPublisherBoxProps) {
  const pathname = usePathname();
  return (
    <div>
      <div className="grid grid-cols-4 max-md:grid-cols-3 gap-x-5  max-md:gap-x-2 max-md:px-4">
        {data.data.slice(5, useIsMobile() ? 8 : 9).map((item, index) => (
          <div
            key={index}
            className="w-[203px] h-[159px] max-md:w-full max-md:h-[85px] bg-light-gray rounded-2xl border border-lightGrayBlue relative flex justify-center"
          >
            <div className="h-[128px] w-[128px] max-md:w-[67px] max-md:h-[67px] rounded-full bg-red-50 absolute border-8 max-md:border-4 border-[#F2F3F5] top-[-64px] max-md:top-[-32px] left-1/2 transform -translate-x-1/2">
              <img
                className="w-full h-full rounded-full object-cover"
                src={item.media_files[0]?.main_link ?? ""}
                alt={item.name}
              />
            </div>

            <div className="mt-20 w-full px-3 max-md:mt-9">
              <p className="w-full flex justify-center text-customGray text-xl font-light max-md:text-[10px]">
                {item.name}
              </p>
              <div className="w-full flex justify-between mt-4 max-md:mt-0 text-customGray text-sm font-extralight">
                <p className="">
                  {!pathname.includes("/publishers/list") && (
                    <>
                      {item.books_count === 0
                        ? "اثری ندارد"
                        : `${item.books_count} اثر`}
                    </>
                  )}
                </p>
                <p className="cursor-pointer max-md:text-[8px]">مشاهده آثار</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
