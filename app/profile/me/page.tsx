"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MyOrderBox from "@/components/Profile/MyOrderBox";
import { useQuery } from "@tanstack/react-query";
import { getStatus } from "@/utils/api/status";
import SkeletonPageMe from "@/components/Skeleton/SkeletonPageMe";

const Page: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["status", "getOrdersStatus"],
    queryFn: getStatus,
  });

  return (
    <div>
      <div className="flex mb-3 max-md:mb-0 relative max-md:bg-lightBlueGray max-md:pt-0  max-md:border-b">
        <div className="relative">
          <p className={`px-5 cursor-pointer mb-2  text-customGray`}>
            فعالیت‌ها
          </p>
          <motion.div
            layoutId="underline"
            className="absolute rounded-2xl bottom-0 left-0 w-full mt-2"
            style={{
              height: "3px",
              backgroundColor: "#36BABB",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </div>
      <div className="flex items-baseline justify-between max-md:px-4">
        <p className="text-lg text-customGray mt-9 mb-2 max-md:text-sm font-medium">
          سفارشات من
        </p>
        <Link
          href={"/profile/order"}
          className="text-aquaBlue text-lg max-md:text-xs	"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="border w-full px-5 max-md:px-4 py-6 max-md:py-4 md:rounded-2xl bg-lightBlueGray border-lightGrayBlue2 grid grid-cols-3 gap-7 max-md:gap-4">
        {isLoading && (
          <>
            {[...Array(3)].map((_, index) => (
              <SkeletonPageMe key={index} />
            ))}
          </>
        )}

        {data?.data?.length === 0 ? (
          <>
            <MyOrderBox data={{ title: "جاری", count: 0, key: "active" }} />
            <MyOrderBox
              data={{ title: "تحویل شده", count: 0, key: "delivered" }}
            />
            <MyOrderBox
              data={{ title: "لغو شده", count: 0, key: "cancelled" }}
            />
          </>
        ) : (
          data?.data?.map(
            (item: {
              id: string;
              title: string;
              count: number;
              key: string;
            }) => <MyOrderBox key={item.id} data={item} />
          )
        )}
      </div>
      <div className="flex items-baseline justify-between max-md:px-4">
        <p className="text-lg text-customGray mt-9 mb-2 max-md:text-sm font-medium">
          لیست و اطلاع رسانی‌ها
        </p>
        <Link
          href={"/profile/wishlists"}
          className="text-aquaBlue text-lg max-md:text-xs	"
        >
          مشاهده همه{" "}
        </Link>
      </div>

      <div className="border ronded-2xl w-full px-5 py-6 max-md:py-4 max-md:px-4 md:rounded-2xl bg-lightBlueGray border-lightGrayBlue2 grid grid-flow-col gap-7 max-md:gap-3">
        <MyOrderBox
          data={{ title: "لیست های من", count: 0, key: "my-lists" }}
        />
        <MyOrderBox data={{ title: "ذخیره شده", count: 0, key: "favorites" }} />
        <MyOrderBox
          data={{ title: "اطلاع رسانی", count: 0, key: "notifications" }}
        />
      </div>
      {/* <div >
<LastSeen/>

  
  </div>       */}
    </div>
  );
};

export default Page;
