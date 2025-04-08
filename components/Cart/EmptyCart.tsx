import React from "react";
import CartSoon from "../icons/CartSoon";

const EmptyCart: React.FC = () => {
  return (
    <div className="py-32 w-full flex justify-center max-md:py-11   max-md:px-4">
      <div className="flex flex-row max-md:flex-col max-md:items-center">
        <div className="rounded-lg bg-lightBlueGray p-[52px] max-md:p-6 max-md:w-fit justify-center flex">
          <CartSoon />
        </div>
        <div className="mr-14 flex items-center justify-center flex-col max-md:mt-4 max-md:mr-0">

            <p className="text-customGray text-xl font-black max-md:text-sm	">سبد خرید شما خالی است!</p>
            <p className="font-light text-customGray max-md:text-sm">برای انتخاب محصولات به صفحات زیر بروید:</p>
            <div className="flex flex-row justify-between w-full font-medium max-md:text-xs	text-customRed mt-5">
                <p>فروش ویژه</p>
                <span className="text-customGray text-xl	
                ">|</span>
                <p>کتاب‌های پرفروش</p>
                 </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
