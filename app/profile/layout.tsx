"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Navbar from "@/components/Profile/Navbar";
import UserProfile from "@/components/Profile/UserProfile";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const route = usePathname();

  return (
    <div>
      {/* {if this is tewst } */}
      <Breadcrumb
        showMobile={false}
        items={[
          { label: "اینطوریاس", href: "/" },
          { label: "ناحیه کاربری", href: "/" },
          {
            label: route.includes("/order/info")
              ? "جزئیات سفارش"
              : route.includes("order")
              ? "سفارشات من"
              : route.includes("address")
              ? "آدرس"
              : route.includes("/wishlists")
              ? "علاقه‌مندی‌های من"
              : route === "/profile/me"
              ? ""
              : route.includes("/edit")
              ? "اطلاعات کاربری"
              : route.includes("/recents")
              ? "بازدید های اخیر"
              : route.includes("/message")
              ? "پیغام های من"
              : "",
            href: "",
          },
        ]}
      />
      <div className="lg:grid grid-cols-[300px_auto]  gap-7 mt-12 max-md:mt-0  max-md:flex-col max-md:grid-rows-3 ">
        <div>
          <UserProfile />
          <div className="max-md:hidden">
            <Navbar />
          </div>
        </div>

        <div className="h-fit ">{children}</div>
        <div className="max-md:block hidden">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
