"use client";
import React, { useState } from "react";
import Star from "../icons/Star";
import calculatePriceDrop from "@/utils/helper/Offer";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface MediaFile {
  main_link: string;
  conversion_links?: {
    thumbnail_192_192?: string;
    large_thumbnail_260_260?: string;
  };
  collection_name?: string;
}

interface ColletionBoxProps {
  counter: number;
  id: number;
  src: MediaFile[];
  title: string;
  main_price_formatted: string;
  price_formatted: string;
  price: number;
  main_price: number;
  page: number;
}

const ColletionBox: React.FC<ColletionBoxProps> = ({
  id,
  title,
  main_price_formatted,
  price_formatted,
  price,
  main_price,
  src,
  page,
  counter,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // پیدا کردن تصاویر
  const frontImage = src.find((image) => image.collection_name === "book_front_image");
  const backImage = src.find((image) => image.collection_name === "book_back_image");
  const normalProductImage = src.find((image) => image.collection_name === "normal_product_main_image");
  const fallbackImage = src[0]; // اولین تصویر معتبر به‌عنوان فال‌بک

  // تعیین تصویر بر اساس هاور
  const imageSrc = isHovered && backImage
    ? backImage.conversion_links?.large_thumbnail_260_260 || backImage.conversion_links?.thumbnail_192_192 || backImage.main_link
    : frontImage
    ? frontImage.conversion_links?.large_thumbnail_260_260 || frontImage.conversion_links?.thumbnail_192_192 || frontImage.main_link
    : normalProductImage
    ? normalProductImage.conversion_links?.large_thumbnail_260_260 || normalProductImage.conversion_links?.thumbnail_192_192 || normalProductImage.main_link
    : fallbackImage
    ? fallbackImage.conversion_links?.large_thumbnail_260_260 || fallbackImage.conversion_links?.thumbnail_192_192 || fallbackImage.main_link
    : "/default-image.jpg"; // تصویر پیش‌فرض در صورت نبود هیچ تصویر معتبر

  const rout = usePathname();
  const booknum = (page - 1) * 12 + 1;

  return (
    <Link href={`/product/${id}`}>
      <div
        className={`border rounded-lg ${
          rout.includes("/special") ? "border-customRed" : "border-lightGrayBlue"
        } py-1 px-4 max-md:px-1 max-md:py-3 relative max-md:grid max-md:grid-cols-[118px_auto] h-[434px] max-md:h-auto`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <div className="w-full flex justify-center">
            <div className="h-[250px] w-[250px] max-md:h-[113px] max-md:w-[113px]">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={title}
                  className="object-contain transition-opacity duration-700 ease-in-out w-full h-full"
                  loading="lazy" // بهبود عملکرد بارگذاری
                />
              )}
            </div>
          </div>

          {!rout.includes("/search") &&
            !rout.includes("/special") &&
            !rout.includes("/publisher") &&
            !rout.includes("/creator") &&
            !rout.includes("/category") &&
            !rout.includes("/award") &&
            !rout.includes("/product") && (
              <div className="absolute top-0 right-0 p-4">
                <p className="bg-light-gray text-turquoise text-2xl max-md:text-xl font-medium px-5 py-2 max-md:py-1 max-md:px-3 rounded-bl-3xl rounded-lg left-4">
                  {booknum + counter}
                </p>
              </div>
            )}
        </div>

        <div className="max-md:mr-2">
          <p className="mt-1 text-charcoal text-lg font-light max-md:mt-0 max-md:text-xs max-md:font-bold line-clamp-2 sm:h-[78px]">
            {title}
          </p>
          <p className="text-dark-gray text-sm font-normal invisible max-md:mt-12 max-md:text-xs max-md:font-extralight">
            مجموعه شعر
          </p>
          <div className="mt- font-extralight flex justify-between items-center max-md:mt-0">
            <p className="flex text-customGray">
              <Star />
              <span className="text-sm max-md:text-xs max-md:font-extralight">4.3</span>
            </p>
            {price_formatted !== main_price_formatted && (
              <p className="line-through text-CloudGray max-md:text-[10px] max-md:font-light">
                {main_price_formatted}
              </p>
            )}
          </div>
          <div className="flex items-center mt-3 font-medium text-xl justify-between max-md:mt-1">
            <p
              className={`text-customRed max-md:text-xs max-md:font-medium ${
                price === main_price && "invisible"
              }`}
            >
              {calculatePriceDrop(main_price, price)}
            </p>
            <p className="text-dark-gray max-md:text-sm max-md:font-medium">
              {price_formatted}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ColletionBox;