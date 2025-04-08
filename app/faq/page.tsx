'use client'
import Search from '@/components/icons/Search'
import Questions from '@/components/Questions'
import Topics from '@/components/Topics'
import React from 'react'

export default function Page() {

  return (
    <div className='mt-28 max-md:mt-6 w-full flex flex-col items-center px-4 sm:px-6'>
      <p className='text-customGray font-light text-4xl text-center max-md:text-xl max-md:font-extralight'>
        پاسخ به پرسش‌های رایج
      </p>
      <div className='mt-16 text-start block max-md:hidden'>
        <p className='font-normal text-[#9F9F9F] mr-6'>موضوع موردنظرتان را جستجو کرده یا از دسته‌بندی زیر انتخاب کنید
        </p>
        <div className='w-[720px] bg-light-gray px-7 py-4 rounded-full flex justify-between'>
          <input type="text" className='w-[95%] text-[#9F9F9F] font-normal bg-transparent h-full border-none outline-none' placeholder='جستوجوی موضوع' />
          <Search />
        </div>


      </div>

      <div className='mt-16 hidden max-md:flex flex-col max-md:mt-5 w-full  justify-center items-center'>
    <p className='font-normal text-[#9F9F9F] max-md:text-xs max-md:font-light max-md:mb-3 text-right'>
        موضوع موردنظرتان را جستجو کرده یا از دسته‌بندی زیر انتخاب کنید
    </p>
    <div className='w-full sm:w-[720px] bg-light-gray px-7 py-4 rounded-full h-[46px] flex justify-between'>
        <input 
            type="text" 
            className='w-[95%] mt-1 max-md:w-full text-[#9F9F9F] max-md:text-sm max-md:font-light font-normal bg-transparent h-full border-none outline-none' 
            placeholder='جستوجوی موضوع'
        />
        <Search />
    </div>
</div>


      <div className='mt-8 max-md:mt-7 sm:mt-12 w-full sm:w-[70%] text-start'>
        <p className='text-customGray font-bold max-md:text-base  text-3xl'>دسته‌بندی موضوعات</p>
        <div className='mt-6'>
          <Topics />
        </div>
        <div className='mt-8 sm:mt-12'>
          <Questions />
        </div>
      </div>
    </div>
  )
}