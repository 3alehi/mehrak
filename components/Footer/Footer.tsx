"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import LinkedIn from "../icons/LinkedIn";
import X from "../icons/X";
import Instagram from "../icons/Instagram";
import Telegram from "../icons/Telegram";
import Link from "next/link";

const Footer: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const sections = [
    {
      title: "اطلاعات",
      items: [
        <Link href="/faq" key="faq">
          پاسخ به پرسش‌های رایج
        </Link>,
        <Link href="/policy" key="policy">
          شرایط استفاده
        </Link>,
        "حریم خصوصی",
        "گزارش اشکال",
      ],
    },
    {
      title: "راهنمای خرید",
      items: [
        "راهنمای ثبت سفارش",
        "رویه ارسال سفارش",
        "شیوه‌های پرداخت",
        <Link href="/return" key="return">
          {" "}
          رویه مرجوع کردن کالا و مبلغ
        </Link>,
      ],
    },
    {
      title: "با مهرا",
      items: [
        <Link href="/about" key="about">
          {" "}
          درباره مهرا
        </Link>,

        ,
        <Link href="/contact-us" key="contact-us">
          {" "}
          تماس با ما
        </Link>,

        "فرصت‌های شغلی",
        "مجله مهرا",
      ],
    },
  ];

  return (
    <div className="font-vazirmatn">
      <div className="py-3 bg-lightBlueGray flex w-full justify-center items-center font-light text-lg text-customGray max-md:px-4 max-md:flex-col max-md:text-center">
        <Image
          alt="logo-mehra"
          src="/logo.svg"
          width={92}
          height={36}
          unoptimized
          className="w-[92px] h-[36px] max-md:w-[72px] max-md:h-[28px] mb-2 max-md:mb-1"
          onLoadingComplete={(e) => e.classList.remove("blur-sm")}
          loading="lazy"
        />
        <p className="mr-4 max-md:mr-0 max-md:text-sm max-md:mt-4">
          تلفن پشتیبانی: 25810100 - 025 | ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
        </p>
      </div>

      <div className="py-7 bg-light-gray">
        <div className="container mx-auto">
          {/* نمایش دسکتاپ */}
          <div className="grid grid-cols-4 max-md:hidden">
            {sections.map((section) => (
              <ul
                key={section.title}
                className="text-customGray font-extralight"
              >
                <p className="text-lg text-customGray font-medium mb-4">
                  {section.title}
                </p>
                {section.items.map((item, index) => (
                  <li key={index} className="mt-2">
                    {item}
                  </li>
                ))}
              </ul>
            ))}
            <div>
              <p className="font-black text-lg text-customGray">
                از تخفیف‌های جدید مهرا با خبر شوید..
              </p>
              <div className="mt-4 border rounded-lg flex justify-between items-center py-2 px-4 text-lg font-extralight">
                <Input
                  className="bg-transparent w-[90%] border-none"
                  placeholder="آدرس ایمیل شما"
                />
                <p className="cursor-pointer text-customGray text-lg font-extralight">
                  ثبت
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                <span className="ml-4">
                  <LinkedIn />
                </span>
                <span className="ml-4">
                  <X />
                </span>
                <span className="ml-4">
                  <Instagram />
                </span>
                <span>
                  <Telegram />
                </span>
              </div>
            </div>
          </div>

          {/* نمایش موبایل */}
          <div className="hidden max-md:block px-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="border-b border-lightGrayBlue py-6"
              >
                <div
                  className="w-full flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(section.title)}
                >
                  <p className="text-customGray text-sm font-medium">
                    {section.title}
                  </p>
                  <span
                    className={`transform transition-transform ${
                      openSection === section.title ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.67188 0.949219C5.83594 0.785156 6.13672 0.785156 6.30078 0.949219L11.5508 6.19922C11.7148 6.36328 11.7148 6.66406 11.5508 6.82812C11.3867 6.99219 11.0859 6.99219 10.9219 6.82812L6 1.87891L1.05078 6.82812C0.886719 6.99219 0.585938 6.99219 0.421875 6.82812C0.257812 6.66406 0.257812 6.36328 0.421875 6.19922L5.67188 0.949219Z"
                        fill="#515869"
                      />
                    </svg>
                  </span>
                </div>
                {openSection === section.title && (
                  <ul className="text-customGray font-extralight mt-4">
                    {section.items.map((item, index) => (
                      <li key={index} className="mt-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="  py-6 mt-6 text-center">
              <p className="font-black max-md:font-bold max-md:ml-6 text-lg text-customGray max-md:text-base max-md:w-full max-md:flex max-md:justify-start">
                از تخفیف‌های جدید مهرا با خبر شوید..
              </p>
              <div className="mt-4 border rounded-2xl flex justify-between items-center py-2 px-4 text-lg font-extralight">
                <Input
                  className="bg-transparent w-[90%] border-none max-md:placeholder:text-base"
                  placeholder="آدرس ایمیل شما"
                />
                <p className="cursor-pointer text-customGray text-lg max-md:text-base font-extralight">
                  ثبت
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <span className="ml-4 max-md:ml-6">
                  <LinkedIn />
                </span>
                <span className="ml-4 max-md:ml-6">
                  <X />
                </span>
                <span className="ml-4 max-md:ml-6">
                  <Instagram />
                </span>
                <span>
                  <Telegram />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-11 grid grid-cols-[59%_auto] gap-x-20 max-md:grid-cols-1 max-md:gapx-x-10 max-md:px-4">
        <div>
          <p className="text-customGray text-lg font-medium max-md:text-sm">
            فروشگاه اینترنتی مهرا پنجره ای نو به کتاب
          </p>
          <p className="mt-1 text-customGray font-extralight leading-9 max-md:text-justify max-md:text-xs max-md:leading-6">
            یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی
            متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست
            مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که
            فروشگاه اینترنتی
          </p>
        </div>
        <div className="flex gap-3 max-md:mt-8">
          <a
            className="border p-3 rounded-lg"
            href="https://trustseal.enamad.ir/?id=482080&Code=VZmsW2ccQre36k12JbZGqH6Qh8CKNuUv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={114}
              height={114}
              className="w-[114px] h-[114px] max-md:w-[93px] max-md:h-[93px] object-contain"
              src="/ENAMADpng.parspng.com_.png"
              alt="نماد اعتماد الکترونیکی"
            />
          </a>

          <a
            className="border p-3 rounded-lg"
            href="https://samandehi.ir/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={114}
              height={114}
              className="w-[114px] h-[114px] max-md:w-[93px] max-md:h-[93px] object-contain"
              src="/samandehi.png"
              alt="ساماندهی"
            />
          </a>

          <a
            className="border p-3 rounded-lg"
            href="https://example.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={114}
              height={114}
              className="w-[114px] h-[114px] max-md:w-[93px] max-md:h-[93px] object-contain"
              src="/namad.png"
              alt="نماد"
            />
          </a>
        </div>
      </div>
      <div className="w-full flex justify-center text-customGray text-lg font-extralight mb-6 max-md:text-sm">
        <p>کلیه حقوق برای مهرا محفوظ است.</p>
      </div>
    </div>
  );
};

export default Footer;
