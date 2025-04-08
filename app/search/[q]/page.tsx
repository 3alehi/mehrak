'use client'

import ColletionBox from '@/components/Collection/ColletionBox';
import Filter from '@/components/filter/Filter';
import Surprise from '@/components/icons/Surprise';
import CollectionSkeleton from '@/components/Skeleton/CollectionSkeleton';
import FilterSkeleton from '@/components/Skeleton/FilterSkeleton';
import { fetchBooksSearch } from '@/utils/api/getBookSearch';
import { search } from '@/utils/api/searchQuery';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

export default function Page() {
    const {q} = useParams();
    const page = 1;
    const [sort , setSort] = useState('id')
    const { data: bookData, isLoading: isLoadingBook } = useQuery({
        queryKey: [page, q, sort], 
        queryFn: () => fetchBooksSearch(q as string, page, sort), 
    });
    

    const { data, isLoading } = useQuery({
        queryKey: ['search', q],
        queryFn: () => search(decodeURIComponent(q as string)),
    });


    if (isLoading ||  isLoadingBook) {
        return (
          <div className="pb-5 mt-24">
    
    <FilterSkeleton/>
    
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5">
        {new Array(11).fill(1).map((_, index) => (
      <CollectionSkeleton key={index} />
    ))}
          </div>
          </div>
       
        );
      }
    return (
        <div>
            <p className='w-full flex items-center justify-center text-customGray text-xl font-bold mt-24'>
                نتایج جستجو برای {decodeURIComponent(q as string)}
            </p>

            <div className='mt-27'>
                <Filter setSort={setSort} />
            </div>

            <div className='flex w-full justify-center'>
                {data?.data?.products?.length === 0 && data?.data?.categories?.length === 0 && (
                    <div className='my-24 border rounded-lg py-4 px-3'>
                        <div className='flex items-center'>
                            <span className='text-[#FF9E0F] ml-2'>
                                <Surprise />
                            </span>
                            <p className='font-medium text-customGray text-xl'>کالایی با این مشخصات پیدا نکردیم</p>
                        </div>
                        <p className='mt-1 text-customGray font-extralight text-base mr-2'>
                            پیشنهاد می‌کنیم فیلترها را تغییر دهید.
                        </p>
                    </div>
                )}

                {data?.data?.message === "گزینه q باید حداقل 2 کاراکتر باشد" && (
                    <p className='my-24 text-customGray text-2xl font-medium'>
                        برای جستجو باید حداقل دو کلمه بنویسید
                    </p>
                )}
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 mb-24">
        {bookData?.data?.map((item:BookItem, _: number) => (
          <ColletionBox
            key={_}
            id={item.id}
            src={item.media_files}
            title={item.title}
            main_price_formatted={item.main_price_formatted}
            price_formatted={item.price_formatted}
            price={item.price}
            main_price={item.main_price}
            page={page}
          />
        ))}
      </div>
        </div>
    );
}
