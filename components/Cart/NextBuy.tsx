import React from "react";

import CartSoon from "../icons/CartSoon";
import { Button } from "../ui/button";
import Develop from "../icons/Develop";

const NextBuy: React.FC = () => {
  return (
    <div className="grid grid-cols-[75%_auto] py-5 px-5 max-md:grid-cols-1 relative ">
      <div  className=" right-0  absolute  left-0 top-0 bottom-0  rounded-xl max-md:rounded-none  opacity-80 lg:opacity-60 lg:bg-gradient-to-r bg-gradient-to-t from-slate-400 to-teal-300"></div>
      <div className="w-full flex justify-center items-center h-full flex-col">
        <Develop />
        <p className="text-4xl font-bold mt-4 text-aquaBlue"> به زودی ...</p>
      </div>
      <div className="max-md:mt-8">
        <div className="border rounded-lg py-16 px-16 bg-lightGray">
          <span className="w-full flex items-center justify-center">
            <CartSoon />
          </span>
        </div>
        <h1 className="text-lg font-black w-full mt-3 text-customGray">
          لیست خرید بعدی چیست؟
        </h1>
        <p className="text-customGray text-justify">
          {" "}
          شما می‌توانید محصولاتی که به سبد خرید خود افزوده‌اید و فعلا قصد خرید
          آن‌ها را ندارید، در لیست خرید بعدی قرار داده و هر زمان مایل بودید
          آن‌ها را به سبد خرید اضافه کرده و خرید آن‌ها را تکمیل کنید.{" "}
        </p>

        <div className="mt-4 border rounded-2xl px-2 py-4 max-md:border-0">
          <Button className="px-4 py-6 w-full bg-aquaBlue font-bold text-lg">
            انتقال همه به سبد خرید
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NextBuy;
