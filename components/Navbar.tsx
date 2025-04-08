"use client";
import Image from "next/image";
import React, { useState } from "react";
import Card from "./icons/Card";
import Login from "./icons/Login";
import Link from "next/link";
import Category from "./Category";
import { useUserContext } from "@/app/context/UserContext";
import ProfileIcons from "./icons/ProfileIcons";
import HambergerMenu from "./icons/HambergerMenu";
import { usePathname } from "next/navigation";
import { useTotalItems } from "@/app/context/ContextCartShop";
import HambergerMenuComponnent from "./HambergerMenu";
import SearchComponnent from "./SearchComponnent";

const Navbar: React.FC = () => {
  const { mobile } = useUserContext();
  const rout = usePathname();
  const [hambergerMenuShow , setHambergerMenuShow] = useState<boolean>(false)
  const { totalItems } = useTotalItems();
  return (
    <div
      className={`w-full md:pt-4  font-vazirmatn  sticky top-0 max-md:static bg-white z-10 max-md:px-4 max-md:border-b max-md:border-aquaBlue max-md:py-2 ${
        (rout === "/profile/me" ||
          rout === "/profile/address/new" ||
          rout.includes("/profile/order/info")) &&
        "max-md:hidden"
      }`}
    >
      <div className="container mx-auto py-2 max-md:py-0 max-md:pt-3  ">
        <div className="flex justify-between w-full">
          <div className="flex items-center w-[60%]">
            <i className="ml-4 hidden max-md:block cursor-pointer" onClick={()=>{
              setHambergerMenuShow(true)
            }}>
              <HambergerMenu />
            </i>
            <Link href={"/"}>
              <Image
                alt="logo-mehra"
                src={"/logo.svg"}
                width={92}
                height={40}
                unoptimized
                className="w-[92px] h-[40] max-md:w-[92px] max-md:h-9 ml-10"
                onLoadingComplete={(e) => e.classList.remove("blur-sm")}
                loading="lazy"
              />
            </Link>

<SearchComponnent setShow={()=>{}} show={false}/>
          </div>
          <div className="flex items-center w-[30%] justify-end">
            {mobile ? (
              <>
                <Link href={"/profile/me"} className="cursor-pointer">
                  <ProfileIcons />
                </Link>
              </>
            ) : (
              <Link
                href={"/login"}
                className="flex border rounded-lg py-3 px-3 max-md:px-1 max-md:py-1 items-center cursor-pointer text-slate-custom font-medium"
                aria-label="Login/Register"
              >
                <Login />
                <span className="mr-4 max-md:hidden">ورود / ثبت نام</span>
              </Link>
            )}
            <Link href="/cart#BUYCART" className="cursor-pointer mr-6 relative">
              <Card />
              {totalItems != 0 && (
                <p className="absolute -top-3 -right-3 w-5 h-5 bg-customRed text-white text-xs flex items-center justify-center rounded-full">
                  {totalItems}
                </p>
              )}
            </Link>
          </div>
        </div>
      </div>
      <Category />
      {hambergerMenuShow && <HambergerMenuComponnent setShow={setHambergerMenuShow} />}
    </div>
  );
};

export default Navbar;
