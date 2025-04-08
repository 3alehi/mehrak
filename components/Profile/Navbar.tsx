"use client";
import React from "react";
import Profile from "../icons/Profile";
import Address from "../icons/Address";
import Notif from "../icons/Notif";
import Message from "../icons/Message";
import ActiveMessage from "../icons/ActiveMessage"; // آیکون جدید
import LastSeen from "../icons/LastSeen";
import UserDetaile from "../icons/UserDetaile";
import Order from "../icons/Order";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next/client";
import LogOut from "../icons/LogOut";

const Navbar: React.FC = () => {
  const currentPath = usePathname();

  const itemMenu = [
    { id: 1, title: "پروفایل من", icon: <Profile />, path: "/profile/me" },
    { id: 2, title: "سفارشات من", icon: <Order />, path: "/profile/order" },
    { id: 3, title: "آدرس‌های من", icon: <Address />, path: "/profile/address" },
    { id: 9, title: "علاقه‌مندی‌های من", icon: <Address />, path: "/profile/address" },
    {
      id: 4,
      title: "لیست و اطلاع رسانی‌ها",
      icon: <Notif />,
      path: "/profile/wishlists",
    },
    {
      id: 5,
      title: "پیغام‌ها",
      icon: currentPath === "/profile/message" ? <ActiveMessage /> : <Message />, // تغییر آیکون
      path: "/profile/message",
    },
    { id: 6, title: "بازدیدهای اخیر", icon: <LastSeen />, path: "/profile/recents" },
    { id: 7, title: "اطلاعات کاربری", icon: <UserDetaile />, path: "/profile/edit" },
    { id: 8, title: "خروج", icon: <LogOut />, path: "/" },
  ];

  return (
    <div>
      <ul className="mt-7 max-md:hidden">
        {itemMenu.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            onClick={() => {
              if (item.id === 8) {
                deleteCookie("token");
                localStorage.clear();
                window.location.href = "/";
              }
            }}
          >
            <li
              className={`flex mb-6 items-center cursor-pointer transition-all duration-300 hover:text-aquaBlue hover:scale-105 ${
                currentPath === item.path ? "text-aquaBlue font-bold" : "text-darkGray"
              }`}
            >
              <span className="ml-5 flex justify-center">{item.icon}</span>
              <span className="not-italic">{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
      {currentPath === "/profile/me" && (
        <ul className="hidden max-md:block">
          <div className={`w-full flex flex-col`}>
            {itemMenu.map((item) => (
              <Link
                href={item.path}
                key={item.path}
                className={`border-t ${item.id == 1 && 'hidden'} w-full p-1`}
                onClick={() => {
                  if (item.id === 8) {
                    deleteCookie("token");
                    localStorage.clear();
                    window.location.href = "/";
                  }
                }}
              >
                <li className="py-2 px-4 flex text-customGray  text-lg font-extralight">
                  <span className="ml-5 flex justify-center">{item.icon}</span>
                  <span className="not-italic">{item.title}</span>
                </li>
              </Link>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
