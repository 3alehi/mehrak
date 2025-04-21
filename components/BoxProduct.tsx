"use client";
import React, { useState } from "react";
import Link from "next/link";
import calculatePriceDrop from "@/utils/helper/Offer";
import Star from "./icons/Star";
import { usePathname } from "next/navigation";

interface CollectionProps {
  id: number;
  title: string;
  main_price_formatted: string;
  price_formatted: string;
  price: number;
  main_price: number;
  src: {
    main_link: string;
    conversion_links?: {
      thumbnail_192_192?: string;
      large_thumbnail_260_260?: string;
    };
    collection_name?: string;
  }[];
  key: number;
  page: number;
}

const BoxProduct: React.FC<CollectionProps> = ({
  id,
  title,
  main_price_formatted,
  price_formatted,
  price,
  main_price,
  src,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // پیدا کردن تصویر جلو و پشت کتاب یا تصویر پیش‌فرض
  const frontImage = src.find((image) => image.collection_name === "book_front_image");
  const backImage = src.find((image) => image.collection_name === "book_back_image");
  const normalProductImage = src.find((image) => image.collection_name === "normal_product_main_image");

  const imageSrc = isHovered && backImage?.conversion_links?.large_thumbnail_260_260
  ? backImage.conversion_links.large_thumbnail_260_260
  : frontImage?.conversion_links?.large_thumbnail_260_260
  ? frontImage.conversion_links.large_thumbnail_260_260
  : normalProductImage?.conversion_links?.large_thumbnail_260_260
  ? normalProductImage.conversion_links.large_thumbnail_260_260
  : "";

  const pathname = usePathname();

  return (
    <Link href={`/product/${id}`}>
      <div
        className={`border  rounded-lg ${
          pathname.includes("/special") || pathname == "/"
            ? "border-customRed"
            : "border-lightGrayBlue"
        } py-1 px-4 bg-white`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <div className="w-full flex justify-center">
            <div
              className={`h-[250px] w-[250px] ${
                pathname.includes("/special")
                  ? "max-md:h-[123px]"
                  : "max-md:h-[133px]"
              } max-md:w-[133px] `}
            >
              {/* اگر تصویر موجود بود، آن را نمایش می‌دهیم */}
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={title}
                  className="object-contain transition-opacity duration-700 ease-in-out w-full h-full "
                />
              )}
            </div>
          </div>
        </div>

        <div>
          {pathname != "/" && (
            <>
              <p
                className={`mt-1 text-charcoal text-lg font-light h-[78px] max-md:text-[10px] ${
                  pathname.includes("/special")
                    ? "max-md:h-0 "
                    : "max-md:h-[41px]"
                }`}
              >
                {title}
              </p>
              <p className="mt-5 max-md:mt-0 text-dark-gray text-sm font-normal invisible ">
                مجموعه شعر
              </p>
            </>
          )}
          <div
            className={` ${
              pathname.includes("/special") ? "mt-0" : "mt-4"
            } font-extralight flex justify-between items-center`}
          >
            <p className="flex text-customGray">
              <Star />
              <span className="text-sm  max-md:text-[9px]"> 4.3</span>
            </p>
            {price_formatted !== main_price_formatted && (
              <p className="line-through text-CloudGray max-md:text-[9px] ">
                {main_price_formatted}
              </p>
            )}
          </div>
          <div
            className={`flex items-center ${
              pathname.includes("/special") ? "mt-0" : "mt-3"
            } font-medium text-xl max-md:text-[10px] justify-between `}
          >
            <p
              className={`text-customRed  ${
                price === main_price && "invisible"
              }`}
            >
              {calculatePriceDrop(main_price, price)}
            </p>
            <p className="text-dark-gray">{price_formatted}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoxProduct;
