"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [dashes, setDashes] = useState("");

  const adjustDashes = () => {
    if (window.innerWidth < 768) {
      setDashes("------------------------------------");
    } else {
      setDashes("------------------------------");
    }
  };

  useEffect(() => {
    adjustDashes();
    window.addEventListener("resize", adjustDashes);
    return () => {
      window.removeEventListener("resize", adjustDashes);
    };
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center mt-40 max-md:mt-9">
        <p className="text-customGray text-4xl font-normal max-md:text-2xl">
          تماس با ما
        </p>
      </div>

      <div className="bg-light-gray mt-11 rounded-t-lg py-11 flex flex-col md:flex-row justify-around gap-x-16 px-4">
        <div className="mb-8 md:mb-0">
          <p className="text-customGray text-lg font-extralight max-md:text-sm max-md:font-light">
            آدرس:{" "}
            <span className="font-medium max-md:font-light leading-9">
              {" "}
              تهران - خیابان حافظ – خیابان <br className="max-md:hidden" />
              رشت –شرکت انتشارات سوره
              <br className="max-md:hidden" /> مهر(مهرک) – پلاک 23
            </span>
          </p>
        </div>
        <div className="leading-9 max-md:leading-9">
          <p className="text-customGray text-lg max-md:text-sm max-md:font-light font-medium">
            <span className="font-extralight max-md:font-light">
              شماره تماس:
            </span>{" "}
            {dashes} 02161942
          </p>
          <p className="text-customGray text-lg max-md:text-sm max-md:font-light font-medium">
            <span className="font-extralight max-md:font-light">
              شماره پیامک:
            </span>{" "}
            {dashes} 30005319
          </p>
          <p className="text-customGray text-lg max-md:text-sm max-md:font-light font-medium">
            <span className="font-extralight max-md:font-light">ایمیل:</span>{" "}
            {dashes} sore@gail.com
          </p>
        </div>
      </div>

      <div>
        <img src="/address.png" className="w-full rounded-b-lg max-md:h-[398px] max-md:object-cover" alt="" />
      </div>

      <div className="mt-16 w-full flex justify-center">
        <div className="w-full md:w-[50%] px-4">
          <p className="text-xl font-bold text-aquaBlue max-md:w-full max-md:mx-auto">
            ارسال پیام
          </p>
          <div className="mt-1">
            <p className="text-lg text-customGray font-extralight">متن پیام</p>
            <textarea
              name=""
              id=""
              className="w-full md:w-[635px] h-[153px] resize-none border text-customGray rounded-lg outline-none mt-2 px-3 py-4"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4 max-md:grid-cols-1">
            <div>
              <p className="text-customGray font-light mb-3">نام و نام خانوادگی</p>
              <Input
                placeholder="نوشتن نام و نام خانوادگی"
                className="placeholder:font-light  placeholder:text-CloudGray max-md:placeholder:opacity-0"
              />
            </div>
            <div>
              <p className="text-customGray font-light mb-3">ایمیل</p>

              <Input
                placeholder="نوشتن ایمیل"
                className="placeholder:font-light  placeholder:text-CloudGray max-md:placeholder:opacity-0"
              />
            </div>
          </div>
          <div className="w-full mt-8 flex max-md:justify-center justify-end mb-44">
            <button className=" px-16 md:px-32 max-md:px-0 max-md:w-[288px] py-3 text-white bg-aquaBlue text-lg font-bold rounded-lg">
              ارسال
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
