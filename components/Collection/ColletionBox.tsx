'use client'
import React, { useState } from "react";
import Star from "../icons/Star";
import calculatePriceDrop from "@/utils/helper/Offer";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface CollectionProps {
  id: number;
  title: string;
  main_price_formatted: string;
  price_formatted: string;
  price: number;
  main_price: number;
  src: { main_link: string }[];
  key: number;
  page : number
}

const ColletionBox: React.FC<CollectionProps> = ({
  id,
  title,
  main_price_formatted,
  price_formatted,
  price,
  main_price,
  src,
  page
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc = src.length > 1
    ? isHovered && src[2]?.main_link
      ? src[2].main_link
      : src[1].main_link
    : src[0]?.main_link;

  const rout = usePathname()
  const booknum = (page - 1) * 12 + 1; 
  

  return (
 <Link href={`/product/${id}`}>
 
 
 
 
 
 <div
      className={`border   rounded-lg ${rout.includes('/special') ? "border-customRed" :"border-lightGrayBlue"} py-1 px-4 max-md:px-1 max-md:py-3 relative max-md:grid max-md:grid-cols-[118px_auto]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="w-full flex justify-center">
          <div className="h-[250px] w-[250px] max-md:h-[113px] max-md:w-[113px]">
          {/* <Image
  quality={100}
  width={100}
  height={100}
  src={imageSrc}
  alt={title}
  className="object-contain transition-opacity duration-700 ease-in-out w-full h-full blur-md opacity-0"
  onLoadingComplete={(e) => {
    e.classList.remove("blur-md", "opacity-0");
    e.classList.add("opacity-100");
  }}
  loading="lazy"
  sizes="(max-width: 600px) 500px, 1000px"
/> */}
<img src={imageSrc} alt={title}

className="object-contain transition-opacity duration-700 ease-in-out w-full h-full "
/>



          </div>
        </div>

        {!rout.includes("/search")&&!rout.includes("/special")&&  !rout.includes('/publisher') && !rout.includes('/creator')&& !rout.includes('/category') && !rout.includes('/product') && (
          <div className="absolute top-0 right-0 p-4">
            <p className="bg-light-gray text-turquoise text-2xl max-md:text-xl  font-medium px-5 py-2 max-md:py-1 max-md:px-3  rounded-bl-3xl rounded-lg left-4">
              {booknum + id}
            </p>
          </div>
        )}
      </div>

      <div className="max-md:mr-2">
      <p className="mt-1 text-charcoal text-lg font-light max-md:mt-0 max-md:text-xs max-md:font-bold line-clamp-2 sm:h-[78px]">
  {title}
</p>
        <p className="mt-5 text-dark-gray text-sm font-normal invisible max-md:mt-12 max-md:text-xs max-md:font-extralight">
          مجموعه شعر
        </p>
        <div className="mt-4 font-extralight flex justify-between items-center max-md:mt-0">
          <p className="flex text-customGray">
            <Star />
            <span className="text-sm max-md:text-xs max-md:font-extralight"> 4.3</span>
          </p>
          {price_formatted !== main_price_formatted && (
            <p className="line-through text-CloudGray max-md:text-[10px] max-md:font-light ">
              {main_price_formatted}
            </p>
          )}
        </div>
        <div className="flex items-center mt-3 font-medium text-xl justify-between max-md:mt-1">
          <p
            className={`text-customRed max-md:text-xs max-md:font-medium ${price === main_price && "invisible"
              }`}
          >
            {calculatePriceDrop(main_price, price)}
          </p>
          <p className="text-dark-gray max-md:text-sm max-md:font-medium">{price_formatted}</p>
        </div>
      </div>
    </div>
 
 
 
 
 </Link>
  );
};

export default ColletionBox;
