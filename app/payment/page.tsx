"use client";
import Add from "@/components/icons/Add";
import CartBank from "@/components/icons/CartBank";
import IconSend from "@/components/icons/IconSend";
import Surprise from "@/components/icons/Surprise";
import OrderHowShipping from "@/components/Shippping/OrderHowShiping";
import Step from "@/components/Shippping/Step";
import NextBuy from "@/components/Skeleton/NextBuy";
import SkeletonStep from "@/components/Skeleton/SkeletonStep";
import { createCheckoutSession } from "@/utils/api/checkout";
import { applyDiscount } from "@/utils/api/discount";
import { getCart } from "@/utils/api/getCart";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page: React.FC = () => {
  const [off, setOff] = useState<boolean>(false);
  const rout = useRouter();
  const [offValue, setOffValue] = useState<string>("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  useEffect(() => {
    if (data?.data.items.length ==0 && !isLoading) {
      
      rout.push("/cart");
    }
    
  }, [data, isLoading]);
  

  function discount() {
    applyDiscount(offValue).then((res) => {

      if (!res.success) {
        toast.error(res.data.message);
      } else {
        toast.success("تخفیف باموفقیت اعمال شد");
        refetch();
      }
    });
  }
  const handlePayment = async () => {
      const res = await createCheckoutSession(); 
      if (res.success && res.data?.action) {
        window.location.href = res.data.action;
      } else {
        
      }
    } 
  
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-32  max-md:mt-0 pb-8 max-md:pb-0">
        <div className="max-md:hidden">
          <div className="mt-20 max-md:mt-0 flex justify-center animate-pulse">
            <div className="w-[163px] h-[57px] bg-gray-300 rounded"></div>
          </div>
          <SkeletonStep />
        </div>
        <div className="mt-14 max-md:mt-0 border max-md:border-0 rounded-2xl w-full max-w-[1294px] py-9 px-6 grid grid-cols-1 lg:grid-cols-[auto_306px] pb-40">
        <div className="text-customGray pl-4">
  <div className="mb-2 w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
  <div className="bg-lightBlueGray rounded-2xl py-8 px-7 flex items-center gap-3">
    <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
    <div className="w-64 h-5 bg-gray-300 rounded animate-pulse"></div>
  </div>

  <div className="mt-4 w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
  <div className="mt-2 bg-lightBlueGray rounded-2xl p-7">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
      <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
      <div className="w-6 h-5 bg-gray-300 rounded animate-pulse mx-3"></div>
      <div className="w-40 h-5 bg-gray-300 rounded animate-pulse"></div>
    </div>

    <div className="mt-10 w-48 h-5 bg-gray-300 rounded animate-pulse"></div>
    <div className="mt-2 rounded-2xl py-5 px-4 bg-lightBlueGray flex gap-4">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full h-16 bg-gray-300 rounded-xl animate-pulse"
          ></div>
        ))}
    </div>
  </div>

  <div className="mt-4 bg-lightBlueGray rounded-2xl py-7 px-12 flex justify-between items-center">
    <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
    <div className="w-20 h-5 bg-gray-300 rounded animate-pulse"></div>
  </div>

  <div className="mt-4 bg-lightBlueGray rounded-2xl py-7 px-12">
    <div className="flex justify-between items-center">
      <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div className="w-20 h-5 bg-gray-300 rounded animate-pulse"></div>
    </div>
    <div className="mt-4 w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
  </div>

  <div className="px-9 py-7 rounded-2xl border mt-4 flex items-center">
    <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
    <div className="ml-3 w-64 h-5 bg-gray-300 rounded animate-pulse"></div>
  </div>
</div>

          <NextBuy />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-center mt-32 max-md:mt-4 pb-8">
      {/* لوگو */}
      <Link href={"/"}>
        <Image
          className="mt-20 hidden lg:block"
          alt="mehra-logo"
          src={"/logo.svg"}
          width={163}
          height={57}
        />
      </Link>

      <Step currentStep={2} />
      <div className="mt-14 max-md:mt-0 border rounded-2xl max-md:border-0 w-full max-w-[1294px] py-9 max-md:py-0 px-6 grid grid-cols-1 lg:grid-cols-[auto_306px] pb-4  max-md:pb-4 gap-8">
        <div className="text-customGray">
          <p className="mb-2 font-medium text-lg">روش پرداخت</p>
          <div className="bg-lightBlueGray rounded-2xl py-8 px-7 flex ">
            <CartBank />{" "}
            <p className="text-customGray font-light mr-3">
              پرداخت اینترنتی از طریق شبکه بانکی
            </p>
          </div>
          <p className="text-lg mt-4 font-medium">خلاصه سفارش</p>
          <div className="mt-2 bg-lightBlueGray rounded-2xl p-7">
            <div className="flex">
              <IconSend /> <p className="mr-2"> ارسال بصورت پست پیشتاز </p>{" "}
              <span className="text-aquaBlue text-lg mx-3">|</span>{" "}
              <p>
                هزینه ارسال( {data.data.old_total_items}مرسوله){" "}
                {data.data.shipping_price_formatted}
              </p>
            </div>
            <div className="mt-10">
              <p className="font-light text-base">
                اقلام سبد{" "}
                <span className="font-extralight text-sm">
                  {data.data.old_total_items} محصول
                </span>
              </p>
            </div>
            <div className="mt-2 rounded-2xl py-5 px-4 bg-lightBlueGray flex  gap-4">
              {data.data?.items?.map((item: OrderItems, index: number) => (
                <OrderHowShipping key={index} items={item} />
              ))}
            </div>
          </div>
          <div className="mt-4 bg-lightBlueGray rounded-2xl py-7 px-12 flex justify-between items-center">
            <p className="text-lg font-light">کارت هدیه</p>
            <p className="text-aquaBlue font-light flex cursor-pointer">
              <span className="ml-3">
                <Add />
              </span>
              افزودن کارت
            </p>
          </div>
          <div className="mt-4 bg-lightBlueGray rounded-2xl py-7 px-12 ">
            {!data.data.discount_apply ? (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-light">کد تخفیف</p>
                  {!off && (
                    <p
                      className="text-aquaBlue font-light flex cursor-pointer"
                      onClick={() => {
                        setOff(true);
                      }}
                    >
                      <span className="ml-3">
                        <Add />
                      </span>
                      افزودن کد{" "}
                    </p>
                  )}
                </div>
                {off && (
                  <div className="w-[50%] ">
                    <div className="flex bg-white rounded-lg border px-4 py-2 justify-between">
                      <input
                        type="text"
                        className="outline-none bg-transparent w-[95%]"
                        value={offValue}
                        onChange={(e) => {
                          setOffValue(e.target.value);
                        }}
                      />
                      <p
                        className="flex text-aquaBlue items-center cursor-pointer"
                        onClick={discount}
                      >
                        <span className="text-lg ml-2">ثبت</span>
                        <span className="text-aquaBlue">
                          <ArrowLeft></ArrowLeft>
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-aquaBlue text-lg font-medium">
                  تاثیر در قیمت : {data?.data?.discount_apply?.toLocaleString()}{" "}
                  تومان
                </p>
              </>
            )}
          </div>

      
        </div>
        <div className="bg-lightBlueGray py-8 px-4 rounded-2xl flex flex-col text-customGray h-fit top-2 sticky">
          <div className="flex justify-between font-extralight">
            {`قیمت محصول${data.data.old_total_items > 1 ? "ات" : ""} (${
              data.data.old_total_items
            })`}{" "}
            <p>{data?.data?.total_main_price?.toLocaleString()} تومان</p>
          </div>
          <div className="flex justify-between mt-1 font-medium">
            <p>جمع سبد خرید </p>
            <p>{data.data.old_total_price_formatted}</p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between mt-1 font-light text-sm">
            <p> هزینه ارسال( {data.data.old_total_items} مرسوله) </p>
            <span className={data.data.is_shipping_free ? "line-through" : ""}>
              {data.data.shipping_price_formatted}
            </span>
          </div>
          {data.data.is_shipping_free && (
            <div className="flex justify-end w-full">
              <p className="font-medium text-customRed text-lg">
                {" "}
                ارسال رایگان
              </p>
            </div>
          )}
          <p className="mt-4 text-sm text-charcoal font-extralight leading-9">
            هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه شده
          </p>
          <hr className="my-6" />
          {data.data.profit != 0 && (
            <div className="flex justify-between mt-1 font-medium text-base text-customRed">
              <p>سود شما ازین خرید</p>
              <p>{data?.data?.profit?.toLocaleString()} تومان</p>
            </div>
          )}
          <div className="flex justify-between mt-1 font-medium text-lg">
            <p>قابل پرداخت</p>
            <p>{data.data.old_total_price_formatted}</p>
          </div>
          <div className="w-full justify-center flex mt-8 lg:mt-9 max-md:hidden">
          <p
  className="bg-customRed rounded-2xl px-10 lg:px-27 py-3 text-white text-lg font-bold hover:bg-red-800 cursor-pointer"
  onClick={handlePayment}
>
  پرداخت
</p>

          </div>
        </div>
      </div>
      <div className="hidden max-md:block fixed bottom-0 py-2 px-4 bg-light-gray w-full shadow-2xl">
        <div className="flex justify-between">
          <p className="bg-customRed text-sm font-bold px-16 py-3 text-white rounded-lg" onClick={handlePayment}>
            پرداخت
          </p>
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
      <div className="px-9 py-7 rounded-2xl border mt-4   w-full flex items-center">
            <Surprise />
            <p className="mr-3 text-lg font-light">
              برای دریافت فاکتور، بعد از دریافت سفارش به حساب کاربری و صفحه
              جزئیات سفارش سر بزنید
            </p>
          </div>
    </div>

  );
};

export default Page;
