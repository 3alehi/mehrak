'use client'
import React, { useState, useRef, useEffect } from 'react';
import Search from './icons/Search';
import Delete from './icons/Delete';
import LastSearch from './icons/LastSearch';
import Close from './icons/Close';
import DeleteSerach from './icons/DeleteSerach';
import HotSearch from './icons/HotSearch';
import { useQuery } from '@tanstack/react-query';
import { getSearch } from '@/utils/api/search';
import { search } from '@/utils/api/searchQuery';
import SearchBox from './SearchBox';
import { SearchIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Show {
  show: boolean;
  setShow:(show: boolean) => void;
}
interface MediaFile {
  main_link: string;
}
const SearchComponnent: React.FC<Show> = ({ show ,setShow }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };
  const { data, isLoading, } = useQuery({
    queryKey: ["search"],
    queryFn: getSearch,
  });
  const [searchValue, setSearchValue] = useState<string>('')

  const { data: searchQuery, isLoading: isLoadingQuery } = useQuery(
    {
      queryKey: ['search', searchValue],
      queryFn: () => search(searchValue),
    }
  );
  const rout = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const toggleSearch = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current && !searchRef.current.contains(event.target as Node) &&
        panelRef.current && !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <div className="relative">
      <div
        ref={searchRef}
        className={`border h-[48px] lightGrayBlue2 rounded-3xl w-full max-w-[573px] px-4 py-3 flex items-center justify-between text-customGray
        ${show ? 'max-md:flex' : 'max-md:hidden'} md:w-[400px] lg:w-[500px] xl:w-[573px] cursor-pointer`}
      >
        <input
          onClick={toggleSearch}

          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              rout.push(`/search/${searchValue}`);
              setIsOpen(false);
              setShow(false)
              setSearchValue('')
              
            }

          }}
          type="text"
          className="w-full border-none h- outline-none text-lg max-md:text-xs bg-transparent placeholder-gray-500"
          placeholder="جستجوی محصول، تولیدکننده و..."
        />
        {searchValue.length > 1 && (<span className='ml-2' onClick={() => {
          setSearchValue('')
        }}>        <Close />
        </span>)}
        <span className='z-50' onClick={() => {
          if (searchValue.length > 1) {
            rout.push(`/search/${searchValue}`);
            setIsOpen(false);
            setShow(false)
            setSearchValue('')
          } else {
            toast.error("برای جستوجو باید حداقل دو کلمه بنویسید");
          }
        }}>
          <Search />
        </span>

      </div>

      {isLoading && isOpen && (
        <div
          ref={panelRef}
          className="absolute z-[900] top-full left-0 w-full bg-white shadow-lg rounded-lg p-4 mt-3"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-customGray flex items-center mb-4">
                <h3 className="w-1/4 h-4 bg-gray-300 animate-pulse rounded-md"></h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {[...Array(3)].map((_, index) => (
                  <li key={index} className="flex items-center text-customGray text-base font-medium space-x-4">
                    <span className="w-6 h-6 ml-4 bg-gray-300 animate-pulse rounded-full"></span>
                    <span className="w-1/2 h-4 bg-gray-300 animate-pulse rounded-md"></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-customGray flex items-center mb-4">
                <h3 className="w-1/4 h-4 bg-gray-300 animate-pulse rounded-md"></h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                {[...Array(3)].map((_, index) => (
                  <li key={index} className="flex items-center text-customGray text-base font-medium space-x-4">
                    <span className="w-6 h-6 ml-4 bg-gray-300 animate-pulse rounded-full"></span>
                    <span className="w-1/2 h-4 bg-gray-300 animate-pulse rounded-md"></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}  {!isLoading && (
        <div
          ref={panelRef}
          className={`absolute ${isOpen &&   'z-[900]'} top-full left-0 w-full bg-white shadow-lg rounded-lg p-4 mt-3 transition-all duration-500 ease-out 
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
        `}
        >
          <div className="space-y-4">
            {!searchValue && searchQuery?.data?.message === "گزینه q باید تنها شامل حروف باشد" && (
              <div>
            {data.data.search_histories.length != 0 &&(
                <div className='text-customGray flex justify-between items-center mb-4'>
                  <h3 className="font-light ">آخرین جستجوهای شما</h3>
                  <span className='cursor-pointer'><Delete /></span>
                </div>

            )}
                <ul className="  text-gray-600">
                  {data.data.search_histories.map((item: { title: string }, _: number) => (
                    <div key={_} className='flex justify-between items-center'>
                      <Link href={`/search/${item.title}`} onClick={()=>{
                        setIsOpen(false)
                        setShow(false)
                        setSearchValue('')
                      }} className='flex items-center cursor-pointer mb-2 text-customGray text-base font-medium'>
                        <LastSearch />
                        <span className='mr-4'>
                          {item.title}
                        </span>
                      </Link>
                      <span className='cursor-pointer'>
                        <DeleteSerach />

                      </span>
                    </div>
                  ))}
                </ul>
              </div>
            )}
            {searchValue.trim().split(' ').length < 2 && searchValue.length < 2 && searchQuery?.data?.message !== "گزینه q باید تنها شامل حروف باشد" &&
              (
                <div className='w-full flex justify-center text-customGray font-medium'>
                  لطفاً حداقل دو کلمه وارد کنید.
                </div>
              )}
            {!isLoadingQuery && searchValue.length !== 0 && searchQuery?.data?.products?.length === 0 && searchQuery?.data?.categories?.length === 0 && (
              <div className='w-full flex justify-center text-customGray font-medium'>
                موردی برای  {searchValue}  یافت نشد !!!  </div>
            )}

            {isLoadingQuery && searchValue.length > 2 && (
              <div className="flex items-center justify-center text-lg">
                <p className='text-lg font-bold text-customGray'>درحال جستوجو ...</p>
              </div>
            )}
            {!isLoadingQuery && searchQuery?.data?.message !== "گزینه q باید تنها شامل حروف باشد" && searchQuery?.data?.products?.length > 0 && (
              <div>
                <div className="relative">
                  <div
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10 bg-[#D9D9D9] p-2 rounded-lg"
                    onClick={handleScrollLeft}
                  >
                    <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.339844 10.7656L10.4648 0.640625C10.6055 0.5 10.8398 0.5 10.9805 0.640625C11.1211 0.78125 11.1211 1.01562 10.9805 1.15625L1.13672 11L10.9805 20.8906C11.1211 21.0312 11.1211 21.2656 10.9805 21.4062C10.8398 21.5469 10.6055 21.5469 10.4648 21.4062L0.339844 11.2812C0.199219 11.1406 0.199219 10.9062 0.339844 10.7656Z" fill="#515869" />
                    </svg>

                  </div>

                  <div
                    ref={scrollRef}
                    className="flex gap-x-2 overflow-x-auto py-2 scrollbar-hide"
                  >
                    {searchQuery.data.products.map((item: {
                      title: string;
                      id:number;
                      media_files: MediaFile[];
                    }, index: number) => (
                      <div key={index} className="flex-shrink-0">
                        <SearchBox item={item} />
                      </div>
                    ))}
                  </div>

                  <div
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10 bg-[#D9D9D9] p-2 rounded-lg"
                    onClick={handleScrollRight}
                  >
                    <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4766 10.7656C11.6172 10.9062 11.6172 11.1406 11.4766 11.2812L1.35156 21.4062C1.21094 21.5469 0.976562 21.5469 0.835938 21.4062C0.695312 21.2656 0.695312 21.0312 0.835938 20.8906L10.6797 11L0.835938 1.15625C0.695312 1.01562 0.695312 0.78125 0.835938 0.640625C0.976562 0.5 1.21094 0.5 1.35156 0.640625L11.4766 10.7656Z" fill="#515869" />
                    </svg>
                  </div>
                </div>


              </div>
            )}
            {!isLoadingQuery && searchQuery?.data?.message !== "گزینه q باید تنها شامل حروف باشد" && searchQuery?.data?.categories?.length > 0 && (
              <div>
                {searchQuery?.data?.categories.map((item: { title: string }, _: number) => (
                  <div key={_} className='flex items-center'>
                    <span className='text-customGray'>
                      <SearchIcon />

                    </span>
                    <p className='text-customGray mr-4'>
                      {item.title}

                    </p>
                  </div>

                ))}
                <p className='text-customGray mt-2'>در دسته  <span className='text-aquaBlue'>محصول</span></p>
              </div>
            )}
      
      {!searchQuery?.data?.products && !searchQuery?.data?.products?.length &&(
             <div>
             <div className='text-customGray flex justify-between items-center mb-4'>
               <h3 className="font-light ">جستجوهای پرطرفدار</h3>
             </div>
             <ul className="space-y-2 text-sm text-gray-600">
               {data.data.popular_searches.map((item: { title: string }, _: number) => (
       
       
                 <Link href={`/search/${item.title}`} onClick={()=>{
                   setIsOpen(false)
                   setSearchValue('')
                   setShow(false)
       
                 }} key={_} className='flex items-center cursor-pointer  mb-2 text-customGray text-base font-medium '>
                   <HotSearch />
                   <span className='mr-4'>{item.title}</span>
                 </Link>
               ))}
       
             </ul>
           </div>
      )}
      
           
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponnent;
