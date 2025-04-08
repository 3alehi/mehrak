import Link from "next/link";
import React from "react";

interface MediaFile {
  main_link: string;
}

interface Gallery {
  media_files: MediaFile[];
}

interface AllPublisherProps {
  data: Gallery[];
}

export default function AllPublisher({ data }: AllPublisherProps) {
  return (
    <div>
      <div className="w-full flex items-center justify-between max-md:px-4">
        <p className="text-2xl font-bold text-customGray max-md:text-base">
          ناشرین منتخب
        </p>
        <Link
          href={"/publishers/list"}
          className="text-customGray font-light text-xl max-md:text-xs flex items-center"
        >
          مشاهده همه{" "}
          <span className="mr-1  text-aquaBlue">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9609 8.5C17.9609 9.04688 17.5312 9.47656 17.0234 9.47656H3.74219L8.9375 14.3984C9.32812 14.75 9.32812 15.375 8.97656 15.7266C8.625 16.1172 8.03906 16.1172 7.64844 15.7656L0.773438 9.20312C0.578125 9.00781 0.5 8.77344 0.5 8.5C0.5 8.26562 0.578125 8.03125 0.773438 7.83594L7.64844 1.27344C8.03906 0.921875 8.625 0.921875 8.97656 1.3125C9.32812 1.66406 9.32812 2.28906 8.9375 2.64062L3.74219 7.5625H17.0234C17.5703 7.5625 17.9609 7.99219 17.9609 8.5Z"
                fill="#36BABB"
              />
            </svg>
          </span>
        </Link>
      </div>
      <div className="flex justify-between  max-md:grid max-md:grid-cols-4">
        {data.slice(0, 8).map((item: Gallery) => (
          <img
            key={item.media_files[0].main_link} // Add a unique key prop
            className="w-[133px] h-[133px] max-md:w-[86px] max-md:h-[86px]"
            src={item.media_files[0].main_link}
            alt="Publisher"
          />
        ))}
      </div>
    </div>
  );
}
