import React from "react";
import NowOrder from "../icons/NowOrder";
import Notifictions from "../icons/Notifictions";
import Saved from "../icons/Saved";
import Backed from "../icons/Backed";
import Link from "next/link";

interface MyOrderBoxProps {
  data: {
    title: string;
    count: number;
    key: string;
  };
}

const MyOrderBox: React.FC<MyOrderBoxProps> = ({ data }) => {
  return (
    <Link
      href={
        data.key === "RECENT"
          ? `/profile/order/#RECENT`
          : data.key === "DELIVERED"
          ? `/profile/order/#DELIVERED`
          : data.key === "CANCELED"
          ? `/profile/order/#CANCELED`
          : `/profile/wishlists/#${data.key}`
      }
      className="flex flex-row items-center border-lightGrayBlue2 rounded-2xl border max-md:relative max-md:text-xs py-3 px-5 max-md:px-0 max-md:py-4 bg-white max-md:flex-col max-md:items-center max-md:w-[102px] max-md:gap-3"
    >
      <div className="relative">
        {data.title === "اطلاع رسانی" && <Notifictions />}
        {(data.title === "ذخیره شده" || data.title === "لیست های من") && <Saved />}
        {data.title === "جاری" && <NowOrder color="#A3A3A3" />}
        {data.title === "تحویل شده" && <NowOrder color="#36BABB" />}
        {data.title === "لغو شده" && <Backed />}

        {data.count > 0 && (
          <span className="absolute -bottom-2 max-md:flex hidden -left-5 border text-customGray text-xs font-medium w-5 h-5  items-center justify-center rounded-full">
            {data.count}
          </span>
        )}
      </div>

      <div>
        <div className="mx-5 max-md:mx-0 text-customGray">
          <p className="max-md:hidden font-medium">
            {(() => {
              if (data.title === "ذخیره شده" || data.title === "لیست های من") {
                return "1 لیست";
              } else if (data.title === "اطلاع رسانی") {
                return "1 محصول";
              } else {
                return `${data.count} سفارش`;
              }
            })()}
          </p>
          <p className="font-light text-xs mt-1">{data.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default MyOrderBox;
