import React from "react";
import Shield from "./icons/Shield";
import Repeat from "./icons/Repeat";
import Truck from "./icons/Truck";
import Briefcase from "./icons/Briefcase";
import Users from "./icons/Users";
import Gift from "./icons/Gift";
import Invite from "./icons/Invite";
import CreditCard from "./icons/CreditCard";

export default function Topics() {
  const categories = [
    { title: "روند ثبت اسناد", icon: <Briefcase /> },
    { title: "پیگیری ارسال سفارش", icon: <Truck /> },
    { title: "بازگرداندن کالا", icon: <Repeat /> },
    { title: "شفافیت", icon: <Shield /> },
    { title: "ورود و ثبت نام", icon: <Users /> },
    { title: "کد تخفیف و کارت هدیه", icon: <Gift /> },
    { title: "دعوت از دوستان", icon: <Invite /> },
    { title: "اعتبارات", icon: <CreditCard /> },
  ];

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-0">
      {categories.map((items, index) => (
        <div
          key={index}
          className="w-full max-w-[156px] sm:max-w-[180px] md:max-w-[204px] h-[74px] sm:h-[100px] md:h-[136px] bg-lightBlueGray rounded-xl sm:rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
        >
          <span className="mb-2 sm:mb-3 md:mb-5">{items.icon}</span>
          <p className="text-customGray font-light text-xs sm:text-sm md:text-base text-center px-2">
            {items.title}
          </p>
        </div>
      ))}
    </div>
  );
}