import Link from "next/link";
import React from "react";

interface MediaFile {
  collection_name: string; // اضافه کردن ویژگی collection_name
  conversion_links: {
    large_thumbnail_260_260: string;
    thumbnail_192_192: string;
  };
}

interface SuggestBookeProps {
  data: {
    id: number;
    title: string;
    items: {
      id: number;
      media_files: MediaFile[];
    }[];
  };
}

export default function SuggestBooke({ data }: SuggestBookeProps) {
  return (
    <div className="h-[245px] max-md:hidden bg-lightBlueGray border border-lightGrayBlue rounded-2xl p-6 flex justify-between items-center">
      <div>
        <p className="text-charcoal font-light">پیشنهاد اینطوریاس</p>
        <p className="text-customGray font-bold text-2xl">{data.title}</p>
        <Link
          href={`/collections/show/${data.id}`}
          className="flex items-center mt-3 text-charcoal font-light text-xl cursor-pointer"
        >
          مشاهده همه
          <span className="mr-3">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.914062 9.20312C0.71875 9.00781 0.640625 8.77344 0.640625 8.5C0.640625 8.26562 0.71875 8.03125 0.914062 7.83594L7.78906 1.27344C8.17969 0.921875 8.76562 0.921875 9.11719 1.3125C9.46875 1.66406 9.46875 2.28906 9.07812 2.64062L3.88281 7.5625H17.2031C17.7109 7.5625 18.1406 7.99219 18.1406 8.5C18.1406 9.04688 17.7109 9.4375 17.2031 9.4375H3.88281L9.07812 14.3984C9.46875 14.75 9.46875 15.3359 9.11719 15.7266C8.76562 16.1172 8.17969 16.1172 7.78906 15.7656L0.914062 9.20312Z"
                fill="#36BABB"
              />
            </svg>
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        {data.items.slice(0, 4).map((item, _) => {
          const frontImage = item.media_files.find(
            (media) => media.collection_name === "book_front_image"
          )?.conversion_links.large_thumbnail_260_260;

          return (
            <Link
              key={_}
              href={`/collections/show/${data.id}`}
              className="h-[197px] w-[197px] object-cover"
            >
              {frontImage && (
                <img
                  key={_}
                  className="w-full h-full object-cover rounded-md border-2"
                  src={frontImage}
                  alt={`Front Image of ${data.title}`}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
