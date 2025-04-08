"use client";

import Arrow from "@/components/icons/Arrow";
import Back from "@/components/icons/Back";
import Factore from "@/components/icons/Factore";
import Rotate from "@/components/icons/Rotate";
import Tick from "@/components/icons/Tick";
import ByProduct from "@/components/Profile/ByProduct";
import Pay from "@/components/Profile/Pay";
import SkeletonInfoOrder from "@/components/Skeleton/SkeletonInfoOrder";
import getOrderByID from "@/utils/api/getOrderByID";
import { convertDateToPersianFormat } from "@/utils/helper/ConvertDate";
import { formatPhoneNumber } from "@/utils/helper/FormatPhone";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
interface PayItem {
  id: string;
  is_paid: boolean;
  amount: number;
  created_at: string;
  gateway: string;
  transaction_id: string;
}

interface ByProductProps {
  id: string;

  line_item_type: string;
  media_files: { main_link: string }[];
  title: string;
  sub_title: string;
  price_formatted: string;
  discount: string;
  total_formatted: string;
}
const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["Address", id],
    queryFn: () => getOrderByID(id as string),
  });

  if (isLoading) {
    return <SkeletonInfoOrder />;
  }

  return (
    <>
      <div className="hidden w-full justify-between items-center max-md:flex py-4 px-3 max-md:px-6 text-customGray">
        <p className="text-sm flex items-center">
          <i className="cursor-pointer ml-3" onClick={() => router.back()}>
            <Back />
          </i>
          جزئیات سفارش
        </p>
        <Link href={`/factor/${data.id}`} className="flex mx-6 max-md:mx-0 cursor-pointer text-sm 	">
          <span className="ml-3">
            <Factore />
          </span>
          دریافت فاکتور
        </Link>
      </div>
      <div className="border  mb-10 border-lightGrayBlue2 pb-6 max-md:rounded-none max-md:border-none rounded-2xl text-darkGray">
        <div className="bg-lightBlueGray rounded-t-2xl max-md:rounded-none px-7 max-md-px-4 py-5">
          <div className="flex max-md:hidden justify-between items-center">
            <p className="text-2xl flex items-center font-normal">
              <i className="cursor-pointer mx-3" onClick={() => router.back()}>
                <Back />
              </i>
              جزئیات سفارش
            </p>
            {data.status_formatted != "لغو شده توسط سیستم" && (
              <Link href={`/factor/${data.id}`}  className="flex mx-6 cursor-pointer font-extralight">
                دریافت فاکتور
                <span className="mr-2">
                  <Arrow />
                </span>
              </Link>
            )}
          </div>
          <div className="flex justify-between items-end">
            <div className="flex mt-10 text-lg items-center max-md:hidden">
              <p className="mx-5">
                <span className=" font-extralight"> کد سفارش </span>{" "}
                <span className="mx-3 font-normal">{data.id}</span>
              </p>
              <p className="">
                {" "}
                <span className="font-extralight">تاریخ ثبت سفارش </span>{" "}
                <span className="mx-3 font-normal">
                  {convertDateToPersianFormat(data.date)}
                </span>
              </p>
            </div>
            <div className="hidden max-md:flex justify-between w-full">
              <div  className="text-sm font-light">
                <p>کد سفارش</p>
                <p className="mt-3">تاریخ ثبت سفارش</p>
              </div>
              <div className="text-left">
                <p>{data.id}</p>
                <p className="mt-3">{data.date}</p>
              </div>
            </div>
            <p
              className={`flex items-center py-1 px-2 max-md:hidden ${
                data.status_formatted === "لغو شده توسط سیستم"
                  ? "text-customRed"
                  : "text-emeraldGreen"
              }  bg-light-gray rounded-full`}
            >
              <i className="mx-2">
                {data.status_formatted != "لغو شده توسط سیستم" && <Tick />}
              </i>
              {data.status_formatted}
            </p>
          </div>
          <hr className="mt-6" />
          <div className="flex mt-10 text-lg items-center max-md:hidden">
            <p className="mx-5">
              <span className="font-extralight text-end	">تحویل گیرنده </span>
              <span className="mx-3">
                {data.address.first_name} {data.address.last_name}
              </span>
            </p>
            <p>
              <span className="font-extralight text-end"> شماره تلفن همراه</span>
              <span className="mx-3">
                {formatPhoneNumber(data.address.mobile)}
              </span>
            </p>
          </div>
          <div className="hidden max-md:flex justify-between w-full mt-5">
            <div>
              <p className="font-extralight">تحویل گیرنده</p>
              <p className="mt-3">شماره تلفن همراه</p>
            </div>
            <div>
              <p>
                {" "}
                {data.address.first_name} {data.address.last_name}
              </p>
              <p className="mt-3">{formatPhoneNumber(data.address.mobile)}</p>
            </div>
          </div>
          <br />
          <p className="mx-5 max-md:mx-0">
            <span className="font-extralight"> آدرس </span> <br />
            <span className="">{data.address.full_address}</span>
          </p>
        </div>
        <div className="px-7 max-md:px-0 border-lightGrayBlue2 mt-4 border rounded-2xl mx-7 max-md:mx-4 pt-4">
          <div className="flex justify-between items-center max-md:px-3">
            <p className="ml-5 max-md:text-sm font-extralight">
              مبلغ سفارش{" "}
              <span className="mx-3 font-medium">
                {data.total_final_price_formatted}
              </span>
            </p>
            <p
              className="flex items-center cursor-pointer max-md:text-xs font-extralight"
              onClick={toggleDropdown}
            >
              تراکنش‌ها
              <i
                className={`mx-2 max-md:mx-1 transform transition-transform text-aquaBlue  duration-300 ${
                  isOpen ? "rotate-0" : "rotate-180"
                }`}
              >
                <Rotate />
              </i>
            </p>
          </div>
          <div
            className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out max-md:px-4 ${
              isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <hr className="" />
            {data.profit ? (
              <div className="flex justify-between  items-center mt-5 max-md:hidden">
                <p className="text-customRed max-md:text-xs line-clamp-1 font-extralight ">
                  مبلغ تخفیف
                  <span className="mx-3 max-md:text-sm font-normal	">
                    {data.profit_formatted}
                  </span>
                </p>
                <p className="font-extralight">
                  {" "}
                  سود شما از این خرید
                  <span className="mx-3 max-md:text-sm font-normal">
                    {data.profit_formatted}
                  </span>
                </p>
              </div>
            ) : (
              ""
            )}
            {data.profit ? (
              <div className="hidden justify-between  items-center mt-5 max-md:block">
                <div className="w-full flex justify-between">
                  <p className="text-customRed max-md:text-xs font-extralight line-clamp-1  ">
                    مبلغ تخفیف
                  </p>
                  <span className="mx-3 max-md:text-XS font-medium text-customRed ">
                    {data.profit_formatted}
                  </span>
                </div>
                <div className="w-full flex justify-between mt-3">
                  <p className="text-xs font-extralight"> سود شما از این خرید</p>
                  <span className="mx-3 max-md:text-xs font-medium">
                    {data.profit_formatted}
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="mt-8 flex flex-col gap-4">
              {data.payments.map((items: PayItem, i: number) => (
                <Pay items={items} key={`${items.id}-${i}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="px-7 mt-7  max-md:px-4">
          <div className="flex gap-2 flex-col ">
            {data.items.map((items: ByProductProps, i: number) => (
              <>
              <ByProduct items={items} key={`${items.id}-${i}`} />
    
              
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
