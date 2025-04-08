import React from "react";
import Star from "../icons/Star";
import { Button } from "../ui/button";
import calculatePriceDrop from "@/utils/helper/Offer";
import Link from "next/link";
import Delete from "../icons/Delete";
import Card from "@/components/icons/Card";
import { getTokenFromCookie } from "@/utils/helper/getCooki";

type AddToCartProps = {
  data: AddToCartData;
  quantity: number;
  handleAddToCart: () => void;
  loadingProduct: boolean;
  handleRomeveProduct: () => void;
  loadingRemove: boolean;
  LocalBuy: number;
};

export default function AddToCart({
  data,
  quantity,
  handleAddToCart,
  loadingProduct,
  handleRomeveProduct,
  loadingRemove,
  LocalBuy,
}: AddToCartProps) {
  const mainImage = data.data.media_files.find(
    (image: { main_link: string; collection_name?: string }) =>
      image.collection_name === "book_front_image"
  );

  const displayImage = mainImage || data.data.media_files[0];

  return (
    <div className="border border-lightGrayBlue rounded-md px-4 h-fit sticky top-[168px] w-[320px] max-md:hidden">
      <div className="w-full flex justify-center">
        <div className="w-[250px] h-[250px]">
          <img
            className="w-full h-full object-contain"
            src={displayImage.main_link}
            alt={data.data.title}
          />
        </div>
      </div>
      <p className="text-charcoal text-lg font-light mt-1 mb-19">
        {data.data.title}
      </p>
      <div className="flex justify-between">
        <p className="flex">
          <Star />
          <span className="text-xs text-customGray font-extralight">4.3</span>
        </p>
        {data.data.price_formatted !== data.data.main_price_formatted && (
          <p className="text-CloudGray line-through font-extralight">
            {data.data.main_price_formatted}
          </p>
        )}
      </div>
      <div className="flex justify-between mt-5 text-customGray font-medium text-xl">
        <p className="text-customRed">
          { data.data.main_price != data.data.price  && calculatePriceDrop(data.data.main_price, data.data.price)}
        </p>
        <p>{data.data.price_formatted}</p>
      </div>

      <div className="mb-4">
        {data.data.in_stock_count !== 0 ? (
          <>
            {quantity == 0 && !LocalBuy ? (
              <Button
                disabled={loadingProduct}
                className="w-full mt-2 disabled:cursor-pointer py-4 text-white bg-customRed flex font-bold text-xl mb-4 h-[63px] rounded-full"
                onClick={handleAddToCart}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {loadingProduct && (
                    <div className="w-5 h-5 border-4 border-t-transparent border-dotted border-white rounded-full animate-spin mx-auto"></div>
                  )}
                </div>
                <Card/>
                <span className="mr-2">افزودن به سبد خرید</span>
              </Button>
            ) : (
              <>
                <div className="w-full flex items-center mt-5 rounded-full border border-lightGrayBlue py-3 px-4 justify-around">
                  <div className="flex items-center gap-4">
                    <button
                      disabled={loadingProduct || loadingRemove}
                      className="text-xl font-bold text-customGrayd disabled:cursor-not-allowed cursor-pointer min-w-[20px] flex justify-center items-center"
                      onClick={() => {
                        handleAddToCart();
                      }}
                    >
                      {loadingProduct ? (
                        <div className="w-4 h-4 border-2 border-t-transparent border-customGray rounded-full animate-spin cursor-not-allowed "></div>
                      ) : (
                        "+"
                      )}
                    </button>
                    <span className="text-2xl font-light text-customGray">
                      {getTokenFromCookie() ? quantity : LocalBuy}
                    </span>
                    <button
                      disabled={loadingProduct || loadingRemove}
                      className="text-customGray disabled:cursor-not-allowed cursor-pointer min-w-[20px] flex justify-center items-center"
                      onClick={handleRomeveProduct}
                    >
                      {loadingRemove ? (
                        <div className="w-4 h-4 border-2 cursor-not-allowed border-t-transparent border-customGray rounded-full animate-spin"></div>
                      ) : quantity == 1 || LocalBuy == 1 ? (
                        <span className="text-customRed">
                          {" "}
                          <Delete />
                        </span>
                      ) : (
                        "-"
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-customGray font-light items-end">
                    <p className="text-sm">در سبد شما قرار گرفت</p>
                    <Link
                      href={"/cart#BUYCART"}
                      className="text-aquaBlue text-xs"
                    >
                      مشاهده سبد خرید
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <p className="w-full flex justify-center text-customGray font-medium text-xl mt-4">
            محصول موجود نمیباشد
          </p>
        )}
      </div>
    </div>
  );
}
