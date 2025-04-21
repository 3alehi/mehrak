'use client';
import ColletionBox from '@/components/Collection/ColletionBox';
import CollectionListBox from '@/components/CollectionListBox';
import FilterCategory from '@/components/filter/FilterCategory';
import Pagination from '@/components/Pagination';
import CategorySkeleton from '@/components/Skeleton/CategorySkeleton';
import CollectionSkeleton from '@/components/Skeleton/CollectionSkeleton';
import FilterSkeleton from '@/components/Skeleton/FilterSkeleton';
import { getBooksCategory } from '@/utils/api/getBooksCategory';
import { getCategory } from '@/utils/api/getCategory';
import { fetchCollections } from '@/utils/api/getCollectionsList';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import LastSean from '@/components/LastSean';
import useIsMobile from '@/hooks/useIsMobile';
import Breadcrumb from '@/components/Breadcrumb';
import FilterBooks from '@/components/filter/FilterBooks';

export default function ClientCategory() {
  const { id } = useParams();
const searchParams = useSearchParams()
const sort = searchParams.get("sort") || 'id'
const keys = ["awards", "categories", "creators", "producers", "collections"];

const [award, related, creators, producers, collections] = keys.map(key =>
  searchParams.get(key)
);




  console.log(award);

  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });
  const { data: collection } = useQuery({
    queryKey: ['collection', 1],
    queryFn: () => fetchCollections(1),
  });

  const [page, setPage] = useState<number>(1);
  const { data: bookData, isLoading: isLoadingBook } = useQuery({
    queryKey: ['book', id, page , sort ,award,related,creators ,producers , collections],
    queryFn: () => getBooksCategory(id as string, page , sort,award as string,related as string ,creators as string,producers as string,collections as string ),
  });

  const [showAll, setShowAll] = useState(false);

  const findId = data?.data?.findIndex((item: { id: string }) => item.id == id);
  const categories = data?.data[findId]?.children || [];
  const visibleCategories = showAll ? categories : categories.slice(0, 7);
  const isMobile = useIsMobile();

  if (isLoading && isLoadingBook) {
    return (
      <div className="mb-20">
        <div className="mt-5 grid grid-cols-8 gap-2 max-md:grid-cols-2">
          {!isMobile ? (
            Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="element">
                  <CategorySkeleton />
                </div>
              ))
          ) : (
            Array(2)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="element">
                  <CategorySkeleton />
                </div>
              ))
          )}
        </div>
        <div className="mt-14 max-md:mt-9">
          <FilterSkeleton />
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5">
          {new Array(11).fill(1).map((_, index) => (
            <CollectionSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-[104px] max-md:mb-11 max-md:px-4 overflow-hidden">
      <Breadcrumb
        items={[
          { label: 'اینطوریاس', href: '/' },
          { label: 'کتاب', href: '' },
        ]}
      />
      <p className="mt-6 text-2xl max-md:text-base max-md:font-bold font-normal text-customGray">
        دسته‌بندی‌ها
      </p>
      <div className="mt-5 grid grid-cols-8 max-md:grid-cols-4 gap-2 max-md:mt-2">
        {visibleCategories.map(
          (
            category: { title: string; media_files: { main_link: string }[] },
            index: number
          ) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center transition-colors duration-300 hover:bg-gray-100 px-2 max-md:px-0 py-2 rounded-2xl group"
            >
              <img
                src={category.media_files[0].main_link}
                className="w-[140px] h-[140px] max-md:w-[79px] max-md:h-[79px] rounded-full border border-CloudGray object-cover"
              />
              <p className="mt-3 line-clamp-1 max-md:text-xs font-extralight text-customGray duration-500 group-hover:font-medium transition-all group-hover:text-customRed">
                {category.title}
              </p>
            </div>
          )
        )}

        {!showAll && categories.length > 7 && (
          <div
            onClick={() => setShowAll(true)}
            className="flex flex-col mt-4 items-center justify-center py-2 px-2 max-md:px-0 w-[140px] h-[140px] max-md:w-[79px] max-md:h-[79px] rounded-full border border-CloudGray text-center col-span-1"
          >
            <p className="text-customGray text-lg font-extralight max-md:text-sm">
              <span className="text-4xl font-medium max-md:text-lg">
                {categories.length - 7} <br />
              </span>
              دسته دیگر
            </p>
          </div>
        )}
      </div>

      <div className="mt-14 max-md:mt-9">
        {id == '7' ? <FilterBooks /> : <FilterCategory />}
      </div>

      {isLoadingBook ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5">
          {new Array(11).fill(1).map((_, index) => (
            <CollectionSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="mt-19 max-md:mt-5">
          <div className="mt-8 max-md:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-md:gap-2 mb-24">
            {bookData?.data?.map((item: BookItem, index: number) => (
              <ColletionBox
                counter={index}
                key={index}
                id={item.id}
                src={item.media_files}
                title={item.title}
                main_price_formatted={item.main_price_formatted}
                price_formatted={item.price_formatted}
                price={item.price}
                main_price={item.main_price}
                page={1}
              />
            ))}
          </div>

          {bookData && bookData.meta && bookData.meta.last_page > 1 && (
            <Pagination
              totalPages={bookData.meta.last_page}
              currentPage2={bookData.meta.current_page}
              setPage={setPage}
            />
          )}
        </div>
      )}

      <div className="mt-36">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
          <div>
            <p className="text-2xl font-bold text-customGray">
              لیست‌هایی برای ایده گرفتن
            </p>
            <p className="mt-2 font-light text-customGray">
              لیست شده با ❤️ توسط مهرا
            </p>
          </div>

          <Link
            href={'/collections/list'}
            className="text-lg text-customRed font-medium border flex cursor-pointer bg-light-gray items-center justify-evenly border-customRed rounded-full py-2 px-8"
          >
            مشاهده همه لیست‌ها
          </Link>
        </div>
        <div className="mt-9 max-md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-5 mb-20">
          {collection?.data?.slice(0, 4).map((item: CollectionData) => (
            <CollectionListBox key={item.id} data={item} />
          ))}
        </div>
      </div>
      <LastSean />
    </div>
  );
}