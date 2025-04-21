import Link from "next/link";
import React from "react";

interface MediaFile {
  conversion_links?: {
    medium_548_548?: string;
  };
}

interface Item {
  id: string;
  media_files: MediaFile[];
  main_price_formatted?: string;
  price_formatted?: string;
}

interface SuggestProps {
  data: {
    id: string;
    title: string;
    items: Item[];
  };
  dark: boolean;
}

export default function Suggest({ data, dark }: SuggestProps) {
  const getImages = () => {
    const availableImages = data.items
      .map((item) => {
        const firstImage = item.media_files.find(
          (media) => media.conversion_links?.medium_548_548
        );
        return firstImage?.conversion_links?.medium_548_548 || null;
      })
      .filter((link) => link); // فیلتر کردن موارد null

    return availableImages.length > 0 ? availableImages.slice(0, 6) : []; // حداکثر ۶ تصویر
  };

  const images = getImages();

  return (
    <div
      className={`w-full rounded-2xl p-4 ${
        dark ? "bg-[#101010]" : "bg-white border border-lightGrayBlue2 "
      }`}
    >
      <div className="w-full justify-center flex-col items-center mb-5 hidden max-md:flex">
        <p
          className={`${
            dark ? "text-white" : "text-charcoal"
          } text-[10px] font-light`}
        >
          پیشنهاد مهرا
        </p>
        <p
          className={`${
            dark ? "text-white" : "text-customGray"
          } font-black mt-1`}
        >
          دیگه وقتشه زبان یاد بگیری!
        </p>
      </div>
      <div className="grid grid-cols-[auto_414px] gap-4 max-md:grid-cols-1">
        <div className="grid grid-cols-4 gap-4 max-md:gap-2 max-md:grid-cols-3">
          <div className="col-span-2 flex flex-col justify-center max-md:hidden h-full">
            <p
              className={`${
                dark ? "text-CloudGray" : "text-charcoal"
              } font-light`}
            >
              پیشنهاد اینطوریاس
            </p>
            <p
              className={`${
                !dark ? "text-customGray" : "text-white"
              } font-bold text-2xl`}
            >
              {data.title}
            </p>
            <Link
              href={`/collections/show/${data.id}`}
              className={`flex items-center mt-3 ${
                dark ? "text-[#C4C4C4]" : "text-charcoal"
              } font-light text-xl cursor-pointer`}
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
          {images.map((image, index) => {
            const price = data.items[index]?.main_price_formatted;
            const main_price_formatted = data.items[index]?.price_formatted;
            const productId = data.items[index]?.id;

            return (
              <Link key={index} href={`/collections/show/${data.id}`}>
                <div
                  className={`group relative rounded-lg w-[197px] h-[197px] max-md:w-[98px] max-md:h-[98px] ${
                    dark
                      ? "border-none"
                      : "border rounded-lg max-md:border-none"
                  } p-2 max-md:p-0`}
                >
                  <img
                    src={image || undefined}
                    alt={`Product ${productId}`}
                    className="w-full h-full  max-md:w-[98px] max-md:h-[98px] object-cover rounded-lg"
                  />
                  <div
                    className={`absolute bottom-2 left-4 text-sm text-left  px-1 rounded-md ${
                      dark
                        ? "text-white bg-[#202125B2] bottom-4"
                        : "text-customGray bg-[#e3e3e6b2] "
                    } font-bold max-md:hidden opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    <p className="  line-through text-[10px]"> {price}</p>
                    <p>
                      {" "}
                      {price ? `${main_price_formatted}` : "قیمت موجود نیست"}
                    </p>
                  </div>
                  <div
                    className={`hidden   max-md:block absolute bottom-2 left-3 max-md:bottom-1 max-md:left-1 line-clamp-1 text-customGray opacity-80 text-[10px] font-normal p-1 rounded-[4px] max-md:h-[28px]
                    ${
                      dark
                        ? "text-white bg-[#202125B2] bottom-4"
                        : "text-customGray bg-[#e3e3e6b2] "
                    }`}
                  >
                    <p className="  line-through text-[8px] text-left ">
                      {" "}
                      {main_price_formatted}
                    </p>

                    {price ? `${price}` : "قیمت موجود نیست"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="hidden max-md:flex w-full items-center justify-center mt-5">
          <Link
            href={"/"}
            className={`flex items-center ${
              dark ? "text-white" : "text-customGray"
            } text-xs font-light`}
          >
            مشاهده همه
            <span className={`mr-1 ${dark ? "text-white" : "text-aquaBlue"}`}>
              <svg
                width="9"
                height="19"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9609 8.5C17.9609 9.04688 17.5312 9.47656 17.0234 9.47656H3.74219L8.9375 14.3984C9.32812 14.75 9.32812 15.375 8.97656 15.7266C8.625 16.1172 8.03906 16.1172 7.64844 15.7656L0.773438 9.20312C0.578125 9.00781 0.5 8.77344 0.5 8.5C0.5 8.26562 0.578125 8.03125 0.773438 7.83594L7.64844 1.27344C8.03906 0.921875 8.625 0.921875 8.97656 1.3125C9.32812 1.66406 9.32812 2.28906 8.9375 2.64062L3.74219 7.5625H17.0234C17.5703 7.5625 17.9609 7.99219 17.9609 8.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </Link>
        </div>
        <div
          className={`group relative h-[416px] rounded-lg max-md:hidden ${
            dark ? "border-none" : "border rounded-lg"
          } p-2`}
        >
          <Link href={`/collections/show/${data.id}`}>
            <img
              src={images[2] || undefined}
              alt="Random Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
          <div
            className={`absolute bottom-2 left-4 text-sm px-1 rounded-md text-left ${
              dark
                ? "text-white bg-[#202125B2] bottom-4"
                : "text-customGray bg-[#e3e3e6b2] "
            } font-bold opacity-0 group-hover:opacity-100 transition-opacity max-md:hidden`}
          >
            <p>
              <p className="  line-through text-[10px]">
                {" "}
                {data.items[2]?.main_price_formatted}
              </p>
            </p>
            {data.items[2]?.main_price_formatted
              ? `${data.items[2]?.price_formatted}`
              : "قیمت موجود نیست"}
          </div>
          <div className="hidden max-md:block absolute bottom-2 left-2 opacity-50 bg-white">
            {data.items[2]?.main_price_formatted
              ? `${data.items[2]?.main_price_formatted}`
              : "قیمت موجود نیست"}
          </div>
        </div>
      </div>
    </div>
  );
}
