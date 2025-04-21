'use client'
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface CollectionListBoxProps {
  data: CollectionData;
}
interface Item {
  media_files: MediaFile[];
  main_price_formatted?: string; // اختیاری چون فقط در بعضی شرایط استفاده می‌شود
  price_formatted?: string;      // اختیاری چون فقط در بعضی شرایط استفاده می‌شود
  // اگر فیلدهای دیگری هم وجود دارند می‌توانید اضافه کنید
}
export default function CollectionListBox({ data }: CollectionListBoxProps) {
  
  const maxImages = 4;
  const itemsToShow = data.items.slice(0, maxImages);
  const placeholdersNeeded = maxImages - itemsToShow.length;
  const pathname = usePathname();

  return (
    <Link href={`/collections/show/${data.id}`} className={`pt-3 ${pathname == '/' ? "" : "border border-lightGrayBlue max-md:border-none max-md:rounded-none rounded-2xl "} overflow-hidden`}>
      <div className="px-4 flex justify-between items-center">
        <div className="flex items-center text-customGray text-sm font-medium cursor-pointer">
          <span className="line-clamp-1 max-w-[175px]">
            {data.title}
          </span>
          <span className="text-aquaBlue ml-1 text-xs">
            <ArrowLeft />
          </span>
        </div>
        <p className="text-sm font-light text-customGray">{data.items.length} کالا</p>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1">
        {itemsToShow.map((item: Item , index: number) => (
          <div key={index} className="relative">
            <Image
              src={item.media_files[1]?.main_link ?? item.media_files[0]?.main_link}
              alt=""
              width={148}
              height={148}
              className={`${pathname === '/' ? 'w-[202.7px] h-[202.7px]': 'w-[148px] h-[148px]'} max-md:w-[157px] max-md:h-[157px] object-cover`}
            />
            {/* div جدید روی هر عکس */}
        {pathname === "/" &&(
            <div className="absolute bottom-2 hidden max-md:block text-[10px]  left-2 bg-white px-2 rounded-lg opacity-95 shadow-md z-10">
            {item.main_price_formatted != item.price_formatted &&
            <p className=" text-[#3C4043] font-light w-full text-left line-through">{item.main_price_formatted}</p>
          }
            <p className=" text-customGray font-medium text-xs">{item.price_formatted}</p>


          </div>
        )}
          
          </div>
        ))}

        {placeholdersNeeded > 0 && [...Array(placeholdersNeeded)].map((_, index) => (
          <div key={`placeholder-${index}`} className="w-full h-[148px] bg-lightBlueGray flex justify-center items-center">
            <svg width="60" height="42" viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.71875 2.15625L2.625 9.9375C2.25 10.7812 2.71875 11.7188 3.65625 11.9062L19.3125 16.0312C20.25 16.3125 21.1875 15.9375 21.75 15.0938L28.6875 4.875L6.5625 1.6875C6.1875 1.6875 5.8125 1.875 5.71875 2.15625ZM6.75 0.1875L30 3.5625L53.1562 0.1875C54.1875 0.09375 55.2188 0.65625 55.5938 1.59375L58.6875 9.375C59.3438 11.0625 58.4062 12.9375 56.7188 13.4062L40.9688 17.5312C39.375 17.9062 37.7812 17.25 36.9375 15.9375L30 5.625L23.0625 15.9375C22.125 17.25 20.5312 17.9062 18.9375 17.5312L3.28125 13.4062C1.5 12.9375 0.5625 11.0625 1.21875 9.375L4.3125 1.59375C4.6875 0.65625 5.71875 0.09375 6.75 0.1875ZM52.5 17.3438L54 16.875V32.5312C54 34.5938 52.5938 36.375 50.5312 36.9375L31.0312 41.8125C30.375 41.9062 29.625 41.9062 28.875 41.8125L9.375 36.9375C7.40625 36.375 6 34.5938 6 32.5312V16.875L7.5 17.3438V32.5312C7.5 33.9375 8.4375 35.0625 9.75 35.4375L29.25 40.3125V15.75C29.25 15.375 29.5312 15 30 15C30.375 15 30.75 15.375 30.75 15.75V40.3125L50.1562 35.4375C51.5625 35.0625 52.5 33.9375 52.5 32.5312V17.3438ZM53.4375 1.6875L31.2188 4.875L38.1562 15.0938C38.7188 15.9375 39.6562 16.3125 40.5938 16.0312L56.3438 11.9062C57.1875 11.7188 57.6562 10.7812 57.2812 9.9375L54.1875 2.15625C54.0938 1.875 53.7188 1.6875 53.4375 1.6875Z" fill="#E0E0E2"/>
            </svg>
          </div>
        ))}
      </div>
    </Link>
  );
}