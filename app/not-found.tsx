// pages/404.js
import NotFound from '@/components/icons/NotFound'
import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
  return (
    <div className='w-full mx-auto flex justify-around gap-4 my-[188px] max-md:my-[63px] max-md:px-8 max-md:grid max-md:grid-cols-1'>
      <div className='max-md:order-2'>
        <p className='text-lg max-md:text-base text-[#EE787D] font-medium max-md:w-full max-md:flex max-md:justify-center'>صفحه‌ای که دنبال آن بودید پیدا نشد!</p>
        <div className='mt-10 max-md:mt-6 max-md:text-sm text-customGray font-light'>
        <ul className="list-none pl-0">
  <div className="flex items-center">
    <span className="w-[10px] h-[10px] bg-lightGrayBlue rounded-full ml-3"></span>
    <li>آدرسی را که وارد کردید بررسی کنید</li>
  </div>
  <div className="flex items-center mt-3">
    <span className="w-[10px] h-[10px] bg-lightGrayBlue rounded-full ml-3"></span>
    <li>ممکن است صفحه موردنظر حذف شده باشد</li>
  </div>
</ul>


      
          <Link href="/" className="w-full block bg-aquaBlue mt-10 text-white text-center py-2 text-lg font-bold rounded-[15px]">
  برو به صفحه اصلی
</Link>

        </div>
      </div>
      <div className='max-md:order-1 max-md:w-full max-md:flex max-md:justify-center'>
        <NotFound />
      </div>
    </div>
  )
}
