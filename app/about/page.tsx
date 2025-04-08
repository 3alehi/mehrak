'use client'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='w-full  max-md:px-4 mb-[330px] max-md:mb-[107px] mx-auto flex flex-col items-center max-md:mt-9 mt-40'>
      <p className='text-4xl font-light text-customGray max-md:text-xl  '>درباره ما</p>
      <Link href={'/'}>
      <img
  src="/logo.svg"
  alt="logo-mehra"
  width="163"
  height="57"
  loading="lazy"
  className="mt-20 max-md:mt-9 max-md:w-[92px] max-md:h-[36px]"
/>

      </Link>
      <p className='w-[635px] max-md:w-[328px] leading-9 max-md:leading-7 mt-9 max-md:mt-7 max-md:text-sm  font-extralight text-customGray text-lg text-justify'>
  با افتخار، فروشگاه اینترنتی اینطوریاس، به عنوان یک مقصد جامع برای تأمین نیازهای فرهنگی، کتاب، لوازم التحریر، وسایل بازی و کمک‌های آموزشی، آماده خدمت‌رسانی به شما عزیزان می‌باشد.
  <br />
  در فروشگاه اینترنتی اینطوریاس، ما با آرمانی از دسترسی آسان به محصولات با کیفیت و متنوع، به مشتریان عزیزمان خدمت می‌دهیم. ما به دنبال ارائه‌ی تجربه‌ی خریدی منحصر به فرد و رضایت مشتریان بوده‌ و هستیم.
  <br />
  فروشگاه اینترنتی اینطوریاس، محصولات متنوعی را با کیفیت بالا و قیمت مناسب ارائه می‌دهد. از جمله کتاب‌هایی در حوزه‌های مختلف ادبیات، علمی، و هنری، تا لوازم التحریر با طراحی‌های جذاب و کمک‌های آموزشی برای تقویت مهارت‌های شما و عزیزان شما.
  <br />
  ما برآنیم با ارائه‌ی محصولات با کیفیت، خدمات مشتریان بی‌نظیر، و ارسال سریع و مطمئن، به عنوان یکی از بهترین فروشگاه‌های اینترنتی در ایران شناخته شویم.
  <br />
  <a href="https://intorias.com/" className='font-extralight'>
    در آدرس اینترنتی ما به آدرس https://intorias.com/ فهرست کامل محصولات و استفاده از خدمات ما را تجربه کنید.
  </a>
  <br />
  خدمت به شما عزیزان هدف ماست.
  <br />
  با اینطوریاس، در سفری پر از دانش، سرگرمی و خرید لذت‌بخش همراه ما باشید.
</p>


    </div>
  )
}
