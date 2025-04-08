"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import BoxOrder from "@/components/BoxOrder";
import { getOrdersStatus } from "@/utils/api/getOrderStatus";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/utils/api/getOrder";
import { SkeletonOrder } from "@/components/Skeleton/SkeletonOrder";
import Shop from "@/components/icons/Shop";
import Link from "next/link";
import Back from "@/components/icons/Back";
import Pagination from "@/components/Pagination";

interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

interface OrderItem {
  id: string;
  line_item_type: string;
  media_files: { main_link: string }[];
  number: number;
  total_formatted: string;
}

interface Order {
  id: string;
  status_formatted: string;
  total_final_price_formatted: string;
  total_final_price:string;
  date: string;
  items: OrderItem[];
}

interface OrdersResponse {
  data: Order[];
  meta: Meta;
}

interface OrderStatus {
  id: number;
  title: string;
  count: number;
}

const Page: React.FC = () => {
  const items = [
    { id: 1, title: "جاری", hash: "RECENT" },
    { id: 2, title: "تحویل شده", hash: "DELIVERED" },
    { id: 3, title: "لغو شده", hash: "CANCELED" },
  ];

  const [activeItem, setActiveItem] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const foundItem = items.find((item) => item.hash === hash);
      setPage(1);
      if (foundItem) {
        setActiveItem(foundItem.id);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const { data: statusData, isLoading: statusLoading } = useQuery<{
    data: OrderStatus[];
  }>({
    queryKey: ["status", "getOrdersStatus"],
    queryFn: getOrdersStatus,
  });
  const { data: ordersData, isLoading: ordersLoading } =
    useQuery<OrdersResponse>({
      queryKey: ["status", "fetchOrders", page, activeItem],
      queryFn: () => fetchOrders(page, activeItem),
    });

  const handleMenuClick = (item: { id: number; hash: string }) => {
    window.location.hash = item.hash; 
    setActiveItem(item.id);
  };


  return (
    <div className="pb-5">
      <Link href={"/profile/me"} className="hidden max-md:block mt-7 px-4">
        <p className="text-text-sm flex text-customGray items-center text-sm font-light">
          <Back />
          <span className="mr-4"> سفارشات من</span>
        </p>
      </Link>
      <div className="flex relative pr-10 max-md:border-b max-md:mt-9">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative"
            onClick={() => handleMenuClick(item)}
          >
            <p
              className={`px-5 max-md:text-xs cursor-pointer mb-2 py-1 ${
                activeItem === item.id ? "text-turquoise" : "text-customGray"
              }`}
            >
              {item.title}
              {statusData?.data.find((status) => status.id === item.id)
                ?.count  && (
                <span className={`mr-2 text-lg px-2 rounded-md ${ activeItem === item.id ? "bg-aquaBlue text-white" : "bg-lightGray "}`}>
                  {
                    statusData?.data.find((status) => status.id === item.id)
                      ?.count
                  }
                </span>
              )}
            </p>
            {activeItem === item.id && (
              <motion.div
                layoutId="underline"
                className="absolute rounded-2xl bottom-0 left-0 w-full mt-2"
                style={{ height: "3px", backgroundColor: "#36BABB" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="border max-md:border-none rounded-2xl border-lightGrayBlue2 py-6 px-4">
        {statusLoading || ordersLoading ? (
          <>
            <SkeletonOrder />
            <SkeletonOrder />
            <SkeletonOrder />
          </>
        ) : ordersData?.data.length === 0 ? (
          <div className="w-full h-[426px]">
            <div className="flex justify-center items-center flex-col h-full">
              <div className="flex justify-center items-center flex-col">
                <p className="px-5 py-5 bg-lightBlueGray rounded-full text-aquaBlue">
                  <Shop />
                </p>
                <p className="text-lg text-customGray mt-4">
                  هنوز سفارشی ثبت نکرده‌اید{" "}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {ordersData?.data.map((order: Order) => (
              <BoxOrder key={order.id} data={order} wich={activeItem} />
            ))}
          </div>
        )}
        {ordersData && ordersData.meta && ordersData.meta.last_page > 1 && (
          <Pagination
            totalPages={ordersData.meta.last_page}
            currentPage2={ordersData.meta.current_page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
