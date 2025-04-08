"use client";
import useIsMobile from "@/hooks/useIsMobile";
import Link from "next/link";
import React from "react";
interface WriterItem {
  title: string;
  media_files: {
    main_link: string; // Assuming the main_link is a string URL
  }[];
}

interface WriterProps {
  data: WriterItem[]; // Array of WriterItem objects
}

export default function Writer({ data }: WriterProps) {
  
  return (
    <>
      <div className="mb-10 px-4 w-full max-md:flex hidden justify-center items-center flex-col">
        <p className="text-customGray font-black">نویسندگان مطرح امروز</p>
        <Link
          href={"/authors/list"}
          className="mt-2 flex items-center text-customGray text-[10px] font-light"
        >
          مشاهده همه{" "}
          <span className="mr-1">
            <svg
              width="9"
              height="19"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9609 8.5C17.9609 9.04688 17.5312 9.47656 17.0234 9.47656H3.74219L8.9375 14.3984C9.32812 14.75 9.32812 15.375 8.97656 15.7266C8.625 16.1172 8.03906 16.1172 7.64844 15.7656L0.773438 9.20312C0.578125 9.00781 0.5 8.77344 0.5 8.5C0.5 8.26562 0.578125 8.03125 0.773438 7.83594L7.64844 1.27344C8.03906 0.921875 8.625 0.921875 8.97656 1.3125C9.32812 1.66406 9.32812 2.28906 8.9375 2.64062L3.74219 7.5625H17.0234C17.5703 7.5625 17.9609 7.99219 17.9609 8.5Z"
                fill="#36BABB"
              />
            </svg>
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-[410px_auto] max-md:grid-cols-1 gap-x-5 max-md:">
        <div className="w-full max-md:hidden h-[159px]  bg-light-gray rounded-r-2xl py-8 px-11 flex flex-col justify-center items-start text-center">
          <p className="text-customGray font-black text-2xl">
            نویسندگان مطرح امروز
          </p>
          <Link
            href={"/authors/list"}
            className="mt-2 text-xl font-light text-customGray flex cursor-pointer items-center"
          >
            مشاهده همه{" "}
            <span className="mr-3">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9609 8.5C17.9609 9.04688 17.5312 9.47656 17.0234 9.47656H3.74219L8.9375 14.3984C9.32812 14.75 9.32812 15.375 8.97656 15.7266C8.625 16.1172 8.03906 16.1172 7.64844 15.7656L0.773438 9.20312C0.578125 9.00781 0.5 8.77344 0.5 8.5C0.5 8.26562 0.578125 8.03125 0.773438 7.83594L7.64844 1.27344C8.03906 0.921875 8.625 0.921875 8.97656 1.3125C9.32812 1.66406 9.32812 2.28906 8.9375 2.64062L3.74219 7.5625H17.0234C17.5703 7.5625 17.9609 7.99219 17.9609 8.5Z"
                  fill="#36BABB"
                />
              </svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-4 max-md:grid-cols-3 gap-x-5  max-md:gap-x-2 max-md:px-4">
          {data.slice(0, useIsMobile() ? 3 : 4).map((item, _) => (
            <div
              key={_}
              className="w-[203px] h-[159px] max-md:w-full max-md:h-[85px] bg-light-gray rounded-2xl border border-lightGrayBlue relative flex justify-center"
            >
              <div className="h-[128px] w-[128px] max-md:w-[67px] max-md:h-[67px] rounded-full bg-red-50 absolute border-8 max-md:border-4 border-[#F2F3F5] top-[-64px] max-md:top-[-32px] left-1/2 transform -translate-x-1/2">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={item.media_files[0].main_link}
                  alt="امیرحسین"
                />
              </div>

              <div className="mt-20 w-full px-3 max-md:mt-9">
                <p className="w-full flex justify-center text-customGray text-xl font-light max-md:text-[10px]">
                  {item.title}
                </p>
                <div className="w-full flex justify-between mt-4 max-md:mt-0 text-customGray text-sm font-extralight">
                  <p className=" max-md:text-[8px]">25 کتاب </p>
                  <p className="cursor-pointer max-md:text-[8px]">
                    مشاهده آثار
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
