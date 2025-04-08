'use client'
import React from "react";
import { Button } from "../ui/button";
import Delete from "../icons/Delete";
import Shop from "../icons/Shop";
import Image from "next/image";
interface LastSeenProps{
  item : ItemForBuy;
}
const LastVisite: React.FC<LastSeenProps> = ({item}) => {
  
  return (
    <div className="w-full border px-4  py-4 bg-lightBlueGray rounded-md">
      <div className="flex">
        {/* <img
          className="w-36 h-48 max-md:h-[113px] max-md:w-[113px] "
          alt=""
        /> */}
        <Image
          className="w-36 h-48 max-md:h-[113px] max-md:w-[113px] object-contain "
          alt="mehra-logo"
          src={item.media_files[0].main_link}
          width={163}
          height={57}
          unoptimized 
          onLoadingComplete={(e) => e.classList.remove("blur-sm")}
          loading="lazy"


        />
      <div className="w-full flex  justify-between">
      <div className="flex justify-between w-full ">
          <div className="mr-10 flex flex-col">
            <p className="text-customGray text-2xl max-md:text-sm line-clamp-2 font-bold	">
             {item.title}
            </p>
            <p className="text-dark-gray font-light mt-3 max-md:mt-1	">{item.structure_title}</p>
            <p className="text-dark-gray font-light mt-3 max-md:mt-1	">انتشارات مهرک</p>
            <p className="text-customRed font-medium mt-3	text-sm	 max-md:mt-1 invisible">25 تومان تخفیف</p>
            <p className="text-dark-gray   text-lg max-md:text-sm font-medium	">
              {item.price_formatted}
            </p>
          </div>
          <div className="mt-14 ml-5 flex gap-4 max-md:mt-2 max-md:hidden">
            <Button className="py-1 px-4 border bg-white text-CloudGray hover:bg-CloudGray hover:text-white">
              {" "}
              <i>
                <Delete />
              </i>{" "}
              حذف
            </Button>
            <Button className="py-1 px-4 text-customRed border font-medium	 border-customRed bg-white hover:bg-red-500 hover:text-white transition-all">
              {" "}
              <i>
                <Shop />{" "}
              </i>{" "}
              انتقال به سبد خرید{" "}
            </Button>
          </div>
        </div>
      
      </div>
      </div>
      <div className="mt-14 ml-5 hidden gap-4 max-md:mt-2 max-md:flex w-full">
            <Button className="py-1 font-normal	 px-4 border bg-white text-CloudGray hover:bg-CloudGray hover:text-white">
              {" "}
              <i>
                <Delete />
              </i>{" "}
              حذف
            </Button>
            <Button className="py-1 px-4 text-customRed border border-customRed bg-white hover:bg-red-500 hover:text-white transition-all">
              {" "}
              <i>
                <Shop />{" "}
              </i>{" "}
              انتقال به سبد خرید{" "}
            </Button>
          </div>
    </div>
  );
};

export default LastVisite;
