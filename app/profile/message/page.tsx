"use client";
import React from "react";
import { motion } from "framer-motion";
import MessageBox from "@/components/Profile/MessageBox";
import Link from "next/link";
import Back from "@/components/icons/Back";

const Page: React.FC = () => {
  return (
    <div>
      <Link href={"/profile/me"} className="hidden max-md:block mt-7 px-4">
        <p className="text-text-sm flex text-customGray items-center	">
          <Back />
          <span className="mr-4">پیغام‌های من</span>
        </p>
      </Link>
      <div className="flex relative pr-10 max-md:pr-0 max-md:mt-8 max-md:border-b justify-between ">
        <div className="relative">
          <p className={`px-5 cursor-pointer mb-2    text-turquoise`}>
            پیغام‌های من{" "}
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
        <p className="text-lg font-medium text-turquoise ml-6 max-md:font-medium max-md:text-xs">          تبدیل همه به خوانده شده
        </p>
      </div>
      <div className="border max-md:border-none max-md:mt-4 max-md:rounded-none rounded-2xl w-full  items-center p-7 max-md:p-4 ">
        <MessageBox />
      </div>
    </div>
  );
};

export default Page;
