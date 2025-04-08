"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CartShop from "@/components/Cart/CartShop";
import NextBuy from "@/components/Cart/NextBuy";
import { useTotalItems } from "../context/ContextCartShop";
import Breadcrumb from "@/components/Breadcrumb";

const Index: React.FC = () => {
  const { totalItems } = useTotalItems();
  const [isClient, setIsClient] = useState(false);
  const [activeItem, setActiveItem] = useState<number>(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const items = [
    { id: 1, title: "سبد خرید", hash: "BUYCART", how: totalItems },
    { id: 2, title: "خرید بعدی", hash: "NEXTBUY", how: 0 },
  ];

  useEffect(() => {
    if (!isClient) return; // جلوگیری از اجرا در سمت سرور

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const foundItem = items.find((item) => item.hash === hash);
      if (foundItem) {
        setActiveItem(foundItem.id);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isClient]);

  const handleMenuClick = (item: { id: number; hash: string }) => {
    if (isClient) {
      window.location.hash = item.hash;
    }
    setActiveItem(item.id);
  };

  // تا زمانی که کلاینت آماده نشود، چیزی رندر نکن
  if (!isClient) return null;

  return (
 <>
 
 <Breadcrumb showMobile={false}
    items={[
      { label: "اینطوریاس", href: "/" },
      { label: 'سبد خرید', href: "collections/list" },
    ]}
  />
    <div className="mt-24 pb-4 max-md:mt-8">
      
      <div className="flex relative pr-6 max-md:border-b max-md:mt-9 max-md:justify-evenly">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative"
            onClick={() => handleMenuClick(item)}
          >
            <p
              className={`px-5 text-base cursor-pointer mb-2 py-1 ${
                activeItem === item.id
                  ? "text-turquoise font-black"
                  : "text-customGray font-light"
              }`}
            >
              {item.title}

              {item.how ? (
                <span
                  className={`mr-2 ${
                    activeItem === item.id
                      ? "bg-turquoise text-white"
                      : "text-customGray bg-lightGrayBlue"
                  } px-2 rounded-md text-sm`}
                >
                  {item.how}
                </span>
              ) : (
                ""
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

      <div className="border border-lightGrayBlue max-md:border-0 rounded-2xl">
        {activeItem === 1 ? <CartShop /> : <NextBuy />}
      </div>
    </div>
 
 </>
  );
};

export default Index;
