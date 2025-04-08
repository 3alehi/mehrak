"use client";
import { getCart } from "@/utils/api/getCart";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DropDown from "../icons/DropDown";
import BoxBuyProduct from "./BoxBuyProduct";
import NextBuy from "../Skeleton/NextBuy";
import BoxBuyProductSkeleton from "../Skeleton/BoxBuyProductSkeleton";
import Link from "next/link";
import DeleteProduct from "../icons/DeleteProduct";
import ChangeToNextBuy from "../icons/ChangeToNextBuy";
import { emptyCart } from "@/utils/api/exptyCart";
import toast from "react-hot-toast";
import { getTokenFromCookie } from "@/utils/helper/getCooki";
import { getAllProducts, getTotalPrice } from "@/utils/helper/setProductBuy";
import { useTotalItems } from "@/app/context/ContextCartShop";

const CartShop: React.FC = () => {
  const [loacalProduct, setLocalProduct] = useState([]);
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    setLocalProduct(getAllProducts());
  }, []);

  function getProduct() {
    setLocalProduct(getAllProducts());
  }
  useEffect(() => {
    getProduct();
  }, []);

  const {
    data = { data: { items: [] } },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    
  });

  const { setTotalItems, totalItems } = useTotalItems();
  useEffect(() => {
    if (!isLoading) {
      setStatus(hasStockIssue);
    }
  }, [isLoading, data]);

  if (getTokenFromCookie()) {
    if (isLoading) {
      return (
        <div className="grid grid-cols-[auto_340px] max-md:grid-cols-1">
          <div className="py-6 px-6 flex gap-4 flex-col">
            <div className="flex my-4">
              <div className="h-6 bg-gray-300 rounded w-32 animate-pulse ml-6"></div>
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse ml-2"></div>
            </div>
            <BoxBuyProductSkeleton />
            <BoxBuyProductSkeleton />
            <BoxBuyProductSkeleton />
          </div>

          <NextBuy />
        </div>
      );
    }
  }

  if (getTokenFromCookie()) {
    if (!isLoading && !data?.data?.items?.length) {
      return <EmptyCart />;
    }
  } else if (loacalProduct.length == 0) {
    return <EmptyCart />;
  }

  function hasStockIssue(): boolean {
    return data.data.items.some(
      (item: { quantity: number; in_stock_count: number }) =>
        item.quantity > item.in_stock_count
    );
  }

  return (
    <>
      {getTokenFromCookie() ? (
        <>
          <div className="grid grid-cols-[auto_340px] max-md:grid-cols-1">
            <div className="py-6 px-6 max-md:py-3">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <p className="text-customGray ml-6 font-medium	 ">
                    سبد خرید شما
                  </p>
                  <p className="text-customGray  font-light	">
                    {data.data.old_total_items} محصول
                  </p>
                </div>
                <DropdownMenu dir="rtl">
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-transparent border-none p-0"
                    >
                      <DropDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-lightGray w-fit rounded-md shadow-2xl text-sm font-light	font-vazirmatn	 text-customGray absolute left-2 top-[-48px] mt-2 z-50"
                    style={{ minWidth: "150px", maxWidth: "300px" }}
                  >
                    <DropdownMenuItem className="cursor-pointer p-2 rounded-md w-full whitespace-nowrap">
                      <ChangeToNextBuy />
                      انتقال به خرید بعدی
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer  p-2 rounded-md w-full whitespace-nowrap hover:text-customRed"
                      onClick={() => {
                        emptyCart().then((res) => {
                          if (res.success) {
                            refetch();
                            toast.success("محصولات با موفقیت حذف شدند");
                          }
                        });
                      }}
                    >
                      <DeleteProduct />
                      حدف همه از سید خرید
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-5 max-md:mt-3 flex flex-col gap-4">
                {data.data.items.map((item: ItemForBuy) => (
                  <div key={item.id}>
                    <BoxBuyProduct
                      getProduct={() => {}}
                      setTotalItems={() => {}}
                      item={item}
                      refetch={refetch}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="py-4 pr-5 pl-3 border-r border-lightGrayBlue max-md:hidden">
              <div className="bg-lightBlueGray py-7 rounded-2xl px-4 text-charcoal">
                <div className="flex justify-between ">
                  <div className="">
                    <p className="text-sm font-light">
                      {`قیمت محصول${
                        data.data.old_total_items > 1 ? "ات" : ""
                      } (${data.data.old_total_items})`}
                    </p>
                    <p className="text-lg font-medium mt-2	">جمع سبد خرید</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-light">
                      {data.data.total_main_price.toLocaleString()}تومان
                    </p>
                    <p className="text-lg font-medium	  mt-2">
                      {data.data.old_total_price_formatted}
                    </p>
                  </div>
                </div>
                <p className="my-5 h-1 w-full border-t border-lightGrayBlue border-3"></p>
                {data.data.profit > 0 && (
                  <div className="flex justify-between text-customRed text-base font-medium">
                    <p>سود شما از خرید</p>
                    <p>
                      {`(${(
                        (data.data.profit / data.data.total_main_price) *
                        100
                      ).toFixed(0)}٪)`}{" "}
                      {data.data.profit_formatted}
                    </p>
                  </div>
                )}

                <div className="w-full justify-center flex items-center mt-9">
                  <Link
                    href={
                      getTokenFromCookie()
                        ? "/shipping"
                        : "/login?redirect=true"
                    }
                    className={`bg-customRed rounded-lg text-white py-3 px-27 hover:bg-red-800 hover:text-gray-200 transition duration-300 ${
                      status ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    ادامه
                  </Link>
                </div>
              </div>
              <p className="mt-5 text-sm font-extralight	text-charcoal leading-9">
                مبلغ سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از
                سبد حذف می‌شوند.
              </p>
            </div>
            <div className="hidden max-md:block fixed bottom-0 py-2 px-4 bg-light-gray w-full shadow-2xl">
              <div className="flex justify-between">
                <Link
                  href={
                    getTokenFromCookie() ? "/shipping" : "/login?redirect=true"
                  }
                  className="bg-customRed  text-white text-sm font-bold px-16 py-3 rounded-lg"
                >
                  پرداخت
                </Link>
                <div className="flex flex-col">
                  <p className="text-[10px] font-light text-customGray 	">
                    مبلغ قابل پرداخت
                  </p>
                  <p className="text-xs font-medium	text-darkGray">
                    {data.data.total_price_formatted}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-[auto_340px] max-md:grid-cols-1">
          <div className="py-6 px-6 max-md:py-3">
            <div className="flex justify-between items-center">
              <div className="flex">
                <p className="text-customGray ml-6 font-medium	 ">
                  سبد خرید شما
                </p>
                <p className="text-customGray  font-light	">
                  {totalItems} محصول
                </p>
              </div>
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-none p-0"
                  >
                    <DropDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-lightGray w-fit rounded-md shadow-2xl text-sm font-light	font-vazirmatn	 text-customGray absolute left-2 top-[-48px] mt-2 z-50"
                  style={{ minWidth: "150px", maxWidth: "300px" }}
                >
                  <DropdownMenuItem className="cursor-pointer p-2 rounded-md w-full whitespace-nowrap">
                    <ChangeToNextBuy />
                    انتقال به خرید بعدی
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer  p-2 rounded-md w-full whitespace-nowrap hover:text-customRed"
                    onClick={() => {
                      if (getTokenFromCookie()) {
                        emptyCart().then((res) => {
                          if (res.success) {
                            refetch();
                            toast.success("محصولات با موفقیت حذف شدند");
                          }
                        });
                      } else {
                        localStorage.removeItem("buyProduct");
                        getProduct();
                        setTotalItems(0);
                      }
                    }}
                  >
                    <DeleteProduct />
                    حدف همه از سید خرید
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-5 max-md:mt-3 flex flex-col gap-4">
              {loacalProduct.map((item: ItemForBuy) => (
                <div key={item.id}>
                  <BoxBuyProduct
                    item={item}
                    refetch={refetch}
                    getProduct={getProduct}
                    setTotalItems={setTotalItems}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="py-4 pr-5 pl-3 border-r border-lightGrayBlue max-md:hidden">
            <div className="bg-lightBlueGray py-7 rounded-2xl px-4 text-charcoal">
              <div className="flex justify-between ">
                <div className="">
                  <p className="text-sm font-light">
                    {`قیمت محصول${totalItems > 1 ? "ات" : ""} (${totalItems})`}
                  </p>
                  <p className="text-lg font-medium mt-2	">جمع سبد خرید</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-light">
                    {getTotalPrice().toLocaleString()}تومان
                  </p>
                  <p className="text-lg font-medium	  mt-2">
                    {getTotalPrice().toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="my-5 h-1 w-full border-t border-lightGrayBlue border-3"></p>
              {false && (
                <div className="flex justify-between text-customRed text-base font-medium">
                  <p>سود شما از خرید</p>
                  <p>
                    {/* {`(${(
              (loacaProduct.profit / loacaProduct.total_main_price) *
              100
            ).toFixed(0)}٪)`}{" "}
            {loacaProduct.profit_formatted} */}
                    asfdsaf
                  </p>
                </div>
              )}

              <div className="w-full justify-center flex items-center mt-9">
                <Link
                  href={
                    getTokenFromCookie() ? "/shipping" : "/login?redirect=true"
                  }
                  className="bg-customRed rounded-lg text-white py-3 px-27 hover:bg-red-800 hover:text-gray-200 transition duration-300"
                >
                  ادامه
                </Link>
              </div>
            </div>
            <p className="mt-5 text-sm font-extralight	text-charcoal leading-9">
              مبلغ سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد
              حذف می‌شوند.
            </p>
          </div>
          <div className="hidden max-md:block fixed bottom-0 py-2 px-4 bg-light-gray w-full shadow-2xl">
            <div className="flex justify-between">
              <Link
                href={
                  getTokenFromCookie() ? "/shipping" : "/login?redirect=true"
                }
                className="bg-customRed  text-white text-sm font-bold px-16 py-3 rounded-lg"
              >
                پرداخت
              </Link>
              <div className="flex flex-col">
                <p className="text-[10px] font-light text-customGray 	">
                  مبلغ قابل پرداخت
                </p>
                <p className="text-xs font-medium	text-darkGray">
                  {getTotalPrice()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartShop;
