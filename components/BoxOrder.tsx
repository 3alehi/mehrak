import React from "react";
import Tick from "./icons/Tick";
import OrderHow from "./OrderHow";
import Arrow from "./icons/Arrow";
import Cancel from "./icons/Cancel";
import Link from "next/link";
import { againPay } from "@/utils/api/againPay";
import { Button } from "./ui/button";

interface OrderItem {
  id: string;
}

interface OrderData {
  id: string;
  status_formatted: string;
  total_final_price: string;
  date: string;
  items: OrderItem[];
}

interface BoxOrderProps {
  wich: number;
  data: OrderData;
}
interface OrderItem {
  id: string;
  line_item_type: string;
  media_files: { main_link: string }[];
  number: number;
  total_formatted: string;
}

interface OrderData {
  id: string;
  status_formatted: string;
  total_final_price_formatted: string;
  date: string;
  items: OrderItem[];
}

const BoxOrder: React.FC<BoxOrderProps> = ({ wich, data }) => {
  return (
    <div className="w-full bg-lightBlueGray rounded-2xl pt-4 pb-3 px-8 max-md:px-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center">
          {wich === 1 && data.status_formatted != "در انتظار پرداخت" && (
            <p className="flex bg-white py-1 px-4 items-center w-fit text-aquaBlue max-md:hidden rounded-2xl">
              <Tick />
              <span className="mr-2">{data.status_formatted}</span>
            </p>
          )}
          {wich === 1 && data.status_formatted == "در انتظار پرداخت" && (
            <p className="flex bg-white py-1 px-4 items-center w-fit text-[#FF932F] max-md:hidden rounded-2xl">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 0C12.9062 0 16.5 3.59375 16.5 8C16.5 12.4375 12.9062 16 8.5 16C4.0625 16 0.5 12.4375 0.5 8C0.5 6.34375 1 4.8125 1.875 3.53125C2.09375 3.1875 2.5625 3.09375 2.90625 3.3125C3.25 3.5625 3.34375 4.03125 3.09375 4.375C2.40625 5.40625 2 6.65625 2 8C2 11.5938 4.90625 14.5 8.5 14.5C12.0625 14.5 15 11.5938 15 8C15 4.6875 12.4688 1.9375 9.25 1.5625V3.25C9.25 3.6875 8.90625 4 8.5 4C8.0625 4 7.75 3.6875 7.75 3.25V0.75C7.75 0.34375 8.0625 0 8.5 0ZM6.53125 4.96875L9.03125 7.46875C9.3125 7.78125 9.3125 8.25 9.03125 8.53125C8.71875 8.84375 8.25 8.84375 7.96875 8.53125L5.46875 6.03125C5.15625 5.75 5.15625 5.28125 5.46875 4.96875C5.75 4.6875 6.21875 4.6875 6.53125 4.96875Z"
                  fill="#FF932F"
                />
              </svg>
              <span className="mr-2">{data.status_formatted}</span>
            </p>
          )}
          {wich === 2 && (
            <p className="flex bg-white py-1 px-4 items-center w-fit text-aquaBlue rounded-2xl max-md:hidden">
              <Tick />
              <span className="mr-2">{data.status_formatted}</span>
            </p>
          )}
          {wich === 3 && (
            <p className="flex bg-white py-1 px-4 items-center w-fit max-md:hidden text-soft-red rounded-2xl">
              <Cancel />
              <span className="mr-2">{data.status_formatted}</span>
            </p>
          )}

          <p className="text-darkGray mx-6 max-md:mx-4 max-md:text-xs	 ">
            کد سفارش {data.id}
          </p>
          <p className="text-darkGray max-md:text-xs	">{data.date}</p>
        </div>
        <div>
          <p className="text-darkGray max-md:text-xs 	">
            {data.total_final_price} <span className="text-[#5C5C5C] text-[10px] font-extralight">تومان</span>
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-4 justify-between  items-end">
        <div className="flex gap-4 w-[100%]">
          {data.items.slice(0, 5).map((item, index) => (
            <OrderHow key={`${item.id}-${index}`} items={item} />
          ))}
          {data.items.length > 4 && (
            <Link
              href={`/profile/order/info/${data.id}`}
              className="items-center text-CloudGray font-extralight text-sm flex"
            >
              {data.items.length - 1} +
            </Link>
          )}
        </div>
        <Link
          href={`/profile/order/info/${data.id}`}
          className=" text-customGray cursor-pointer hidden max-md:flex"
        >
          <span className="mr-2">
            <Arrow />
          </span>
        </Link>{" "}
        <div
          className={`w-full flex justify-end  max-md:hidden ${
            data.status_formatted == "در انتظار پرداخت" &&
            "flex-col justify-end items-end"
          }`}
        >
          {wich != 3 && data.status_formatted != "در انتظار پرداخت" && (
            <Link href={`/factor/${data.id}`} className="flex text-customGray mx-6 cursor-pointer">
              دریافت فاکتور
              <span className="mr-2">
                <Arrow />
              </span>
            </Link>
          )}
          <Link
            href={`/profile/order/info/${data.id}`}
            className="flex text-customGray cursor-pointer"
          >
            جزئیات سفارش{" "}
            <span className="mr-2">
              <Arrow />
            </span>
          </Link>
          {data.status_formatted == "در انتظار پرداخت" && (
            <Button
              className="w-[209px] h-[49px] mt-4 text-lg font-bold rounded-lg bg-customRed"
              onClick={() => {
                againPay(data.id).then((res) => {
                  location.href = res.data.action;
                });
              }}
            >
              پرداخت مجدد
            </Button>
          )}
        </div>
      </div>
      {data.status_formatted == "در انتظار پرداخت" && (
           <Button
           className="w-full py-3 hidden  mt-4 text-lg  max-md:flex font-bold rounded-sm bg-customRed text-center"
           onClick={() => {
             againPay(data.id).then((res) => {
               location.href = res.data.action;
             });
           }}
         >
           پرداخت مجدد
         </Button>
         
          )}
    </div>
  );
};

export default BoxOrder;
// {wich != 3 && (
//   <p className="flex text-customGray mx-6 cursor-pointer">
//     {data.status_formatted === "در انتظار پرداخت" ? (
//       <span  onClick={()=>{
//         againPay(data.id)
//         .then(res=>{
//           location.href = res.data.action
//         })
//       }}>پرداخت مجدد</span>
//     ) : (
//       "دریافت فاکتور"
//     )}
//     <span className="mr-2">
//       <Arrow />
//     </span>
//   </p>
// )}
