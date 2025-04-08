"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MediaFile {
  main_link?: string;
}

interface PublisherItem {
  name: string;
  books_count: number;
  media_files: MediaFile[];
}

interface PublisherBoxProps {
  item: PublisherItem;
}

const PublisherBox: React.FC<PublisherBoxProps> = ({ item }) => {
  const defaultImage = "/placeholder 1.jpg";
  const pathname = usePathname();
  return (
    <div className="border px-5">
      <div className="w-full flex flex-col items-center justify-center mt-7 max-md:mt-5">
        <img
          className="w-[128px] max-md:w-[98px] max-md:h-[98px] border-8 border-light-gray h-[128px] rounded-full"
          src={item.media_files[0]?.main_link || defaultImage}
          alt="پروفایل"
        />
        <p className="mt-1 text-xl font-light text-charcoal line-clamp-1">
          {item.name}
        </p>
        <div className="w-full flex justify-between my-3 text-current text-sm font-extralight ">
          <p>
            {!pathname.includes("/publishers/list") && (
              <>
                {item.books_count === 0
                  ? "اثری ندارد"
                  : `${item.books_count} اثر`}
              </>
            )}
          </p>
          <Link href={"/"}>مشاهده آثار</Link>
        </div>
      </div>
    </div>
  );
};
export default PublisherBox;
