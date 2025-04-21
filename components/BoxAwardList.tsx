import Link from "next/link";
import React from "react";

// Define the types for the props
interface MediaFile {
  conversion_links: {
    thumbnail_192_192: string;
  };
}

export interface AwardData {
  id: number;
  title: string;
  description?: string; // اختیاری
  link?: string;
  media_files: MediaFile[];
}

interface BoxAwardListProps {
  data: AwardData;
}

export default function BoxAwardList({ data }: BoxAwardListProps) {

  return (
    <Link href={"/"} className="rounded-2xl py-5 px-2 border flex gap-4 max-md:rounded-sm ">
      {/* بخش تصویر */}
      <div className="h-full flex justify-center flex-col">
        <div className="rounded-full w-[162px] h-[162px] max-md:w-[92px] max-md:h-[92px] flex-shrink-0">
          <img
            className="w-full h-full rounded-full object-cover"
            src={data.media_files[1].conversion_links.thumbnail_192_192}
            alt="جایزه ادبی"
          />
        </div>
      </div>

      {/* بخش متن */}
      <div className="flex-1 min-w-0">
        <p className="text-customGray font-medium text-lg mb-2 max-md:text-sm">
          {data.title}
        </p>
        <div
          className="text-customGray text-sm line-clamp-3 mt-4 max-md:mt-2 font-extralight max-md:text-xs "
          dangerouslySetInnerHTML={{ __html: data.description  || ""}}
        />
      </div>
    </Link>
  );
}
