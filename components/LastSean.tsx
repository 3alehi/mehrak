"use client";
import React, { useState, useRef, MouseEvent } from "react";
import { clearProducts, getProducts } from "@/utils/helper/LastSeen";
import BoxProduct from "./BoxProduct";
import ArrowRight from "./icons/ArrowRight";
import ArrowLeftt from "./icons/ArrowLeftt";


export default function LastSeen() {
  const [lastSeen, setLastSeen] = useState(getProducts());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true;
    startXRef.current = e.clientX;
    if (scrollContainerRef.current) {
      scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current || !scrollContainerRef.current) return;
    const walk = (e.clientX - startXRef.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    isMouseDownRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {lastSeen.length > 0 && (
        <div className="mb-44 max-md:mb-20 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <p className="ml-7 font-bold text-2xl text-customGray">
                بازدیدهای قبلی
              </p>
              <span
                onClick={() => {
                  setLastSeen([]);
                  clearProducts();
                }}
                className="text-customRed font-extralight cursor-pointer"
              >
                پاک کردن
              </span>
            </div>
            <div>
              <div className="flex gap-3 max-md:hidden">
                <p
                  onClick={scrollRight}
                  className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer custom-prev"
                >
                  <ArrowRight />
                </p>
                <p
                  onClick={scrollLeft}
                  className="py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer custom-next"
                >
                  <ArrowLeftt />
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-5">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto whitespace-nowrap cursor-grab hide-scrollbar"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {lastSeen.map((item) => (
                <div key={item.id} className="inline-block ">
                  <BoxProduct
                  key={item.id}
                    id={item.id}
                    src={item.media_files}
                    title={item.title}
                    main_price_formatted={item.main_price_formatted}
                    price_formatted={item.price_formatted}
                    price={item.price}
                    main_price={item.main_price}
                    page={1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
