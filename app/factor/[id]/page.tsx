"use client";
import Share from "@/components/icons/Share";
import getOrderByID from "@/utils/api/getOrderByID";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {


  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getOrderByID" , id],
    queryFn : ()=> getOrderByID(id as string),
  });


  const convertPersianDate = (persianDate: string): string => {
    // Split the input string into day, month, and year
    const [day, month, year] = persianDate.split('-');
    
    // Return the date in the desired format: year-month-day
    return `${year}-${month}-${day}`;
  };

    const handlePrint = () => {
      window.print(); // دستور برای باز کردن دیالوگ پرینت
    };
  const items = [
    {
      id: 1,
      code: "۸۲۱۹۷۲",
      description: "حمل و نقل",
      quantity: 1,
      unitPrice: 29548,
      total: 29548,
      tax: 0,
    },
    {
      id: 2,
      code: "۸۲۱۹۷۲",
      description: "محصول قاب علی حبه جنه کد 10",
      quantity: 2,
      unitPrice: 319500,
      total: 639000,
      tax: 0,
    },
  ];
  if(isLoading){
    return "..."
  }
  return (
    <div className="w-full  max-md:px-4 text-[#2C2323] mb-10">
      <div className="mt-[82px] w-full flex justify-between items-center">
        <Link href={"/"}>
          <Image alt="mehra-logo" src={"/logo.svg"} width={147} height={66} />
        </Link>
        <div className="flex items-center">
          <button       onClick={handlePrint}
 className="ml-8 text-2xl font-bold text-white bg-turquoise rounded-2xl w-[306px] h-[60px]">
            پرینت / دانلود
          </button>

          <Share />
        </div>
      </div>
      <div className="mt-5 w-full">
        <p className="flex justify-center font-medium text-xl text-customGray">
          صورتحساب الکترونیکی فروش
        </p>
        <div className="w-full grid grid-cols-[971px_309px]  gap-4 mt-3 h-[209px]">
          <div className="grid grid-rows-2 gap-5">
            <div className="bg-lightBlueGray border border-lightGrayBlue rounded-2xl text-lg  py-3 px-6 flex flex-col font-light  text-[#2C2323] ">
              <div className=" flex items-center w-full ">
                <p className="font-extrabold  ml-[170px] ">
                  خریدار: <span className="font-light">{data.address.first_name}</span>
                </p>
                <p className="ml-[190px]"> شناسه ملی: </p>
                <p className="ml-[76px]"> شماره ثبت: </p>
                <p> شماره اقتصادی: </p>
              </div>
              <div className="flex w-full items-center mt-2">
                <p className=" w-[460px] line-clamp-1">
                  نشانی : {data.address.full_address}{" "}
                </p>
                <p className="ml-[90px]"> کدپستی:{data.address.postal_code} </p>
                <p className="line-clamp-1">شماره تماس: {data.address.phone}</p>
              </div>
            </div>
            <div className="bg-lightBlueGray border border-lightGrayBlue rounded-2xl text-lg  py-3 px-6 flex flex-col font-light  text-[#2C2323] ">
              <div className=" flex items-center w-full ">
                <p className="font-extrabold  ml-[40px] ">
                  فروشنده: <span className="font-light">مهرا</span>
                </p>
                <p className="ml-[40px]"> شناسه ملی:668749876454 </p>
                <p className="ml-[46px]"> شماره ثبت:668749876454 </p>
                <p> شماره اقتصادی:984492112254455 </p>
              </div>
              <div className="flex w-full items-center mt-2">
                <p className="ml-[50px] w-[466px] line-clamp-1">
                  نشانی : تهران ، خیابان حافظ، خیابان رشت، پلاک 23{" "}
                </p>
                <p className="ml-[90px]"> کدپستی: </p>
                <p className="line-clamp-1">شماره تماس: 02161942 داخلی 352</p>
              </div>
            </div>{" "}
          </div>
          <div className="bg-lightBlueGray border border-lightGrayBlue rounded-2xl h-full flex flex-col justify-around px-5 text-[#2C2323] text-lg font-light ">
            <p>شماره فاکتور: ۹۷۵۱۸۰۸ </p>
            <p>تاریخ: {convertPersianDate(data.date)} </p>
            <p>پیگیری: ۱۳۲۷۰۲۱۰۵</p>
          </div>
        </div>
      </div>
      <div className="bg-lightBlueGray border border-lightGrayBlue rounded-2xl p-5 mt-6">
        <div className="overflow-x-auto  p-5">
          <table className="w-full table-auto border-spacing-2 text-xs bg-white rounded-xl">
            <thead>
              <tr className="text-right bg-lightBlueGray">
                <th className="pb-4">ردیف</th>
                <th className="pb-4">شناسه کالا</th>
                <th className="pb-4">شرح کالا</th>
                <th className="pb-4">تعداد</th>
                <th className="pb-4">مبلغ واحد (تومان)</th>
                <th className="pb-4"> مبلغ کل پس از تخفیف (تومان)</th>
                <th className="pb-4">مالیات و عوارض (تومان)</th>
                <th className="pb-4">جمع کل پس از تخفیف و<br />
                مالیات و عوارض (تومان)</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item: {id : number , title:string , number : number , price_formatted : string ,total_formatted:string  },_ : number) => (
                <tr key={item.id} className="border-b text-right">
                  <td className="p-3 border-l">{_ +1}</td>
                  <td className="p-3 border-l">no data</td>
                  <td className="p-3 border-l truncate max-w-[235px]">
                    {item.title}
                  </td>
                  <td className="p-3 border-l">{item.number}</td>
                  <td className="p-3 border-l">
                    {item.price_formatted.toLocaleString()} تومان
                  </td>
                  <td className="p-3 border-l">
                    {item.total_formatted.toLocaleString()} تومان
                  </td>
                  <td className="p-3 border-l">
                    0
                  
                  </td>
                  <td className="p-3">
                    {item.total_formatted.toLocaleString()} تومان
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center bg-white p-4 rounded-b-xl border">
            <p>جمع کل</p>
            <p>
              {items
                .reduce((sum, item) => sum + item.total , 0)
                .toLocaleString()}{" "}
              تومان
            </p>
          </div>
          <div className="flex justify-between items-start text-sm leading-5 mt-5">
            <div className="grid w-full grid-cols-4">
              <p className="text-sm font-normal">مهر و امضای فروشنده:</p>
              <p className="text-sm font-normal">تاریخ و ساعت تحویل:</p>
              <p className="text-sm font-normal">روش‌ پرداخت: درگاه اینترنتی</p>
              <p className="text-sm font-normal">مهر و امضای خریدار:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
