"use client";
import React from "react";

import { motion } from "framer-motion";
import Location from "@/components/icons/Location";
import LocationEmpty from "@/components/icons/LocationEmpty";
import { useQuery } from "@tanstack/react-query";
import { getAddress } from "@/utils/api/getAddress";
import AddressBox from "@/components/Profile/AddressBox";
import SkeletonLoader from "@/components/Skeleton/SkeletonLoader";
import { useRouter } from "next/navigation";
import Back from "@/components/icons/Back";
import Link from "next/link";
interface AddressItem {
  id: number;
  city: string;
  first_name: string;
  last_name: string;
  full_address: string;
  mobile: string;
  postal_code: string;
  state: string;
}

const Page: React.FC = () => {
  const rout = useRouter();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Address"],
    queryFn: getAddress,
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div>
      <>
        <div className="flex justify-between items-baseline lg:hidden mt-5 px-4">
          <Link href={"/profile/me"}>
            <p className="text-sm flex text-customGray items-center font-light	">
              <Back />
              <span className="mr-4"> آدرس‌های من</span>
            </p>
          </Link>

          <p
            onClick={() => {
              rout.push("/profile/address/new");
            }}
            className="flex lg:hidden items-center text-aquaBlue border font-medium text-xs max-md:text-xs max-md:h-[42px] max-md:w-[139px]  rounded-lg py-3 px-3 cursor-pointer mb-2 transform transition-all duration-300 hover:bg-aquaBlue hover:text-white hover:scale-105 active:scale-95"
          >
            <Location /> <span className="mr-3">ثبت آدرس جدید</span>
          </p>
        </div>
        <div className="flex items-end justify-between max-md:mt-6 max-md:border-b max-md:px-4">
          <div className="flex relative pr-10 max-md:pr-0 max-md: ">
            <div className="relative ">
              <p className="px-5 cursor-pointer mb-2 text-turquoise">
                آدرس های من
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
          <p
            onClick={() => {
              rout.push("/profile/address/new");
            }}
            className="flex max-md:hidden items-center text-aquaBlue border max-md:text-xss  rounded-2xl py-3 px-8 cursor-pointer mb-2 transform transition-all duration-300 hover:bg-aquaBlue hover:text-white hover:scale-105 active:scale-95"
          >
            <Location /> <span className="mr-3">ثبت آدرس جدید</span>
          </p>
        </div>

        <div className="border rounded-2xl border-lightGrayBlue2 py-6 px-4 max-md:border-none">
          {isLoading && (
            <div className="space-y-4">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          )}

          {!isLoading && (!data || data.data.length === 0) && (
            <div className="w-full h-[426px]">
              <div className="flex justify-center items-center flex-col h-full">
                <div className="flex justify-center items-center flex-col">
                  <p className="px-5 py-5 bg-lightBlueGray rounded-full">
                    <LocationEmpty />
                  </p>
                  <p className="text-lg text-customGray mt-4">
                    هنوز آدرسی ثبت نکرده‌اید
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isLoading && data && data.data.length > 0 && (
            <div className="space-y-2">
              {data.data.map((item: AddressItem) => (
                <AddressBox
                  refetch={refetch}
                  idAddress={item.id}
                  key={item.id}
                  city={item.city}
                  first_name={item.first_name}
                  last_name={item.last_name}
                  full_address={item.full_address}
                  mobile={item.mobile}
                  postal_code={item.postal_code}
                  state={item.state}
                />
              ))}
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Page;
