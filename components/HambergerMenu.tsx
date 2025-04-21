"use client";
import React, { useState } from "react";
import ArrowBackMenu from "./icons/ArrowBackMenu";
import UserPorifile from "./icons/UserPorifile";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/utils/api/getCategory";
import DropDownFilter from "./icons/DropDownFilter";
import DropUp from "./icons/DropUp";
import LogOut from "./icons/LogOut";
import { deleteCookie } from "cookies-next/client";
import ShopCart from "./icons/ShopCart";
import ArrowLEftMenu from "./icons/ArrowLEftMenu";
import { getTokenFromCookie } from "@/utils/helper/getCooki";

interface HambergerMenuProps {
  setShow: (value: boolean) => void;
}

interface ChildCategory {
  id: number;
  title: string;
}

interface CategoryItem {
  id: number;
  title: string;
  children?: ChildCategory[];
}

interface MenuItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  href: string;
}

const HambergerMenuComponnent: React.FC<HambergerMenuProps> = ({ setShow }) => {
  const Token: string | null = getTokenFromCookie();
  const [openItem, setOpenItem] = useState<number | null>(null);

  const { data, isLoading } = useQuery<{ data: CategoryItem[] }>({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  const Menu: MenuItem[] = [
    {
      id: 0,
      title: "ناحیه کاربری",
      icon: <UserPorifile />,
      href: "/profile/me",
    },
    { id: 1, title: "سبد خرید", icon: <ShopCart />, href: "/cart#BUYCART" },
    { id: 2, title: "خروج", icon: <LogOut />, href: "/" },
  ];

  if (isLoading) {
    return "در حال بارگذاری...";
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-start justify-center">
      <div className="w-full py-3 px-4 max-h-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p onClick={() => setShow(false)}>
              <ArrowBackMenu />
            </p>
            <p className="text-lg font-light text-charcoal mr-2">منوی کاربری</p>
          </div>
          <Link href={"/profile/me"} onClick={() => setShow(false)}>
            <UserPorifile />
          </Link>
        </div>

        {/* Category List */}
        <div className="mt-8">
          <div className="mt-3">
            <ul className="flex gap-7 flex-col">
              {data?.data.map((item, index) => (
                <li key={item.id}>
                  <div
                    className="flex w-full justify-between items-center text-lg font-medium text-Gray4 cursor-pointer"
                    onClick={() =>
                      setOpenItem(openItem === index ? null : index)
                    }
                  >
                    {item.title}
                    {openItem === index ? <DropUp /> : <DropDownFilter />}
                  </div>
                  {openItem === index && item.children?.length ? (
  <ul className="pl-4 mt-2 flex flex-col gap-4 font-extralight text-base text-Gray4">
    {item.children.map((child) => (
      <Link
        onClick={() => setShow(false)}
        href={`/category/${item.id}?categories=${child.id}`}
        key={child.id}
      >
        {child.title}
      </Link>
    ))}
  </ul>
) : null}

                </li>
              ))}
            </ul>
          </div>

          <p className="h-[1px] w-full bg-[#E6E6E6] mt-8"></p>

          {/* Menu Items */}
          <div className="mt-10">
            <ul className="flex flex-col gap-7">
              {Menu.map((item) => {
                if (!Token && item.id === 2) return null;

                return (
                  <Link
                    onClick={() => {
                      if (item.id === 2) {
                        deleteCookie("token");
                        localStorage.clear();
                        window.location.href = "/";
                      }
                    }}
                    href={item.href}
                    key={item.id}
                    className="flex items-center text-lg font-medium text-Gray4 w-full justify-between"
                  >
                    <p className="flex items-center">
                      <span className="ml-4">{item.icon}</span> {item.title}
                    </p>
                    <p>
                      <ArrowLEftMenu />
                    </p>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HambergerMenuComponnent;
