"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Save from "@/components/icons/Save";
import Wachlist from "@/components/Profile/Wachlist";
import Favorites from "@/components/Profile/Favorites";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/utils/api/getCollections";
import Link from "next/link";
import Back from "@/components/icons/Back";

interface Collection {
  id: number;
  products: Product[];
  title: string;
}

const items = [
  { id: 1, title: "لیست های من", hash: "#my-lists" },
  { id: 2, title: "لیست‌های موردعلاقه", hash: "#favorites" },
  { id: 3, title: "اطلاع‌رسانی‌های من", hash: "#notifications" },
];

const Page: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number>(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["collection"],
    queryFn: getCollections,
  });

  useEffect(() => {
    const updateActiveItem = () => {
      const currentHash = window.location.hash || "#my-lists";
      const foundItem = items.find((item) => item.hash === currentHash);
      setActiveItem(foundItem ? foundItem.id : 1);
    };

    updateActiveItem();
    window.addEventListener("hashchange", updateActiveItem);

    return () => {
      window.removeEventListener("hashchange", updateActiveItem);
    };
  }, []);

  const handleTabClick = (id: number, hash: string) => {
    setActiveItem(id);
    window.location.hash = hash;
  };

  return (
    <div className="">
      <Link href={"/profile/me"} className="hidden max-md:block mt-7 px-4">
        <p className="text-text-sm flex text-customGray items-center">
          <Back />
          <span className="mr-4">لیست‌ها و اطلاع رسانی‌ها</span>
        </p>
      </Link>
      <div className="flex justify-between pr-10 max-md:mt-8 max-md:pr-3 max-md:border-b">
        <div className="flex relative items-end overflow-x-auto whitespace-nowrap max-md:pr-4 scrollbar-hide ">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative"
              onClick={() => handleTabClick(item.id, item.hash)}
            >
              <p
                className={`px-5 max-md:text-base cursor-pointer mb-2  ${
                  activeItem === item.id
                    ? "text-turquoise font-medium"
                    : "text-customGray font-light"
                }`}
              >
                {item.title}
              </p>
              {activeItem === item.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute rounded-2xl bottom-0 left-0 w-full mt-2"
                  style={{
                    height: "3px",
                    backgroundColor: "#36BABB",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
        <button className="flex max-md:hidden items-center text-aquaBlue border rounded-2xl py-3 px-8 cursor-pointer mb-2 transform transition-all duration-300 hover:bg-aquaBlue hover:text-white hover:scale-105 active:scale-95">
          <i className="ml-2">
            <Save />
          </i>
          ایجاد لیست جدید
        </button>
      </div>

      <div className="border max-md:border-none rounded-2xl border-lightGrayBlue2 py-6 px-4">
        {activeItem === 1 && <Wachlist />}
        <div className="flex gap-2 flex-col">
          {activeItem === 2 &&
            (isLoading ? (
              <div className="flex gap-4 flex-wrap">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="w-[148px] h-[148px] max-md:h-[79px] max-md:w-[79px] bg-lightGrayBlue2 rounded-md animate-pulse"
                  />
                ))}
              </div>
            ) : data?.data?.length === 0 ? (
              <div className="w-full h-[426px]">
                <div className="flex justify-center items-center flex-col h-full">
                  <div className="flex justify-center items-center flex-col">
                    <p className="px-5 py-5 bg-lightBlueGray rounded-full text-aquaBlue">
                      <Save />
                    </p>
                    <p className="text-lg text-customGray mt-4">
                      لیستی ذخیره نکرده‌اید{" "}
                    </p>
                    <p className="text-aquaBlue">مشاهده لیست‌ها</p>
                  </div>
                </div>
              </div>
            ) : (
              data?.data?.map((item: Collection) => (
                <Favorites key={item.id} item={item} refetch={refetch} />
              ))
            ))}
        </div>
        {activeItem === 3 && (
          <p className="text-4xl text-aquaBlue font-black	">به زودی...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
