'use client'
import Share from "@/components/icons/Share";
import React from "react";
import toast from "react-hot-toast";
import Filter from "./filter/Filter";
import BoxAwardList from "./BoxAwardList";
import Pagination from "@/components/Pagination";

// Define the MediaFile, AwardData, AwardsResponse, and ClientAwardProps types
interface MediaFile {
  conversion_links: {
    thumbnail_192_192: string;
  };
}

export interface AwardData {
  id: number;
  title: string;
  description?: string; // این را اختیاری کن

  link?: string;
  media_files: MediaFile[];
}

export interface AwardsResponse {
  data: AwardData[];
  
  meta: {
    current_page: number;
    last_page: number;
  };
}

interface ClientAwardProps {
  awards: AwardsResponse;
}


const ClientAward: React.FC<ClientAwardProps> = ({ awards }) => {

  const handelCopy = () => {
    const textToCopy = "Your text here";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("متن با موفقیت کپی شد");
      })
      .catch(() => {
        toast.error("مشکلی در کپی پیش آمد");
      });
  };

  return (
    <div className="mb-[109px] max-md:mb-16">
      <div
        className="w-full mt-3 max-md:rounded-none rounded-3xl h-[268px] border-b-[3px]  max-md:h-[171px] border-turquoise flex flex-col justify-between relative bg-cover bg-center"
        style={{
          backgroundImage: `url(https://s3-alpha-sig.figma.com/img/f396/1857/6917184566ca1dac51c04476456392fc?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tUnG7WE53dCSKBpMZkZ45NueJfXzBbS2UW~T7nzBqjsYzDd3j6TYe-z2RkLjtBGv~KHJSQagLtnXtEj4d6S7YTHw4wZKLV927SNflw7KsDLORH3QOVYCCZBNELepWDiPWzlcIsXZ94BQVTu5jCLzOt0DcQpyNAtUy0Nl2XQ3kiZgjLmUwB8DmHoN2IBnwJbiBD4bjmOCDDIWSpRw5bANUtiDLsvLzfi1F11~OSKeHBXfsyN1XIVF7EeXgDluEPRwzDgXCRC6GDuZJNm~v2k6lrhTkncxqSAOx0fQse7XR1CAQZd6j-54I2DoS0rHoPWBHk9XFFREfqIMFKFgY7kyWw__)`,
        }}
      >
        <div className="w-full flex justify-end px-5 py-4"></div>

        <div className="pl-5 pr-5 md:pl-36 md:pr-[360px] pb-8 flex flex-col md:flex-row justify-between items-center max-md:hidden">
          <p className="text-2xl md:text-4xl font-black text-white text-center md:text-left">
            جوایز ادبی
          </p>
          <div className="z-1">
            <button
              onClick={handelCopy}
              className="bg-white py-3 px-5 font-extralight text-customGray flex items-center rounded-md cursor-pointer z-[332134]"
              style={{ position: "relative", zIndex: 999 }}
            >
              <Share />
              <span className="mr-2">اشتراک گذاری</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-[-60px] md:bottom-[-100px] right-0 md:right-0 pr-5 md:pr-36 flex md:block justify-center w-full">
          <div className="w-[120px] h-[120px] md:w-[192px] md:h-[192px] rounded-full overflow-hidden border-white border-[3px]">
            <p className="w-full h-full bg-lightBlueGray flex justify-center items-center">
              <svg
                width="70"
                height="64"
                viewBox="0 0 70 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M68.75 10.75C68.625 9.25 67.375 8 65.75 8H54.875C55 6.875 54.875 5.875 54.875 4.875C54.875 2.25 52.625 0 49.875 0H20C17.25 0 15 2.25 15 4.875C15 5.875 15 6.875 15 8H4.125C2.5 8 1.25 9.25 1.125 10.75C0.375 18.25 0.625 43.25 34 49.875V50V53.5C34 54.625 33.25 55.75 32.25 56.25L19.5 62.125C19.125 62.375 18.875 62.875 19 63.25C19.125 63.75 19.5 64 20 64H49.875C50.25 64 50.75 63.75 50.75 63.25C50.875 62.875 50.625 62.375 50.25 62.125L37.5 56.25C36.625 55.75 36 54.625 36 53.5V50C36 50 35.875 50 35.875 49.875C69.25 43.25 69.5 18.25 68.75 10.75ZM3.125 10.875C3.125 10.375 3.625 10 4.125 10H15C15.25 20.875 17.625 37.75 28.375 46.375C2.625 38.5 2.5 17.625 3.125 10.875ZM36.875 58L45.375 62H24.5L33 58C33.875 57.625 34.5 57.125 35 56.5C35.375 57.125 36 57.625 36.875 58ZM35 48C17.875 41 16.75 15.625 17 5C17 3.375 18.375 2 20 2H49.875C51.5 2 52.875 3.375 52.75 5C53.125 15.625 52 41 35 48ZM54.875 10H65.75C66.25 10 66.75 10.375 66.75 10.875C67.5 17.625 67.25 38.5 41.5 46.375C52.25 37.75 54.625 20.875 54.875 10ZM45.875 19C46.375 18.625 46.5 17.875 46.375 17.25C46.125 16.5 45.625 16.125 44.875 16L39.125 15.125L36.625 10C36 8.75 34 8.75 33.375 10L30.75 15.125L25 16C24.375 16.125 23.75 16.5 23.625 17.25C23.375 17.875 23.5 18.625 24 19.125L28.125 23.125L27.25 28.875C27.125 29.5 27.375 30.25 27.875 30.625C28.5 31 29.25 31 29.875 30.75L35 28L40.125 30.75C40.375 30.875 40.625 31 40.875 31C41.25 31 41.625 30.875 42 30.625C42.5 30.25 42.875 29.5 42.75 28.875L41.75 23.125L45.875 19ZM40.625 28.75L35 25.75L29.25 28.75L30.375 22.375L25.75 17.875L32.125 17L35 11.25L37.875 17L44.25 17.875L39.625 22.375L40.625 28.75Z"
                  fill="#515869"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 max-md:px-4 max-md:mt-4">
        <p className="text-customGray font-bold text-2xl max-md:hidden">عناوین جوایز</p>
        <div className="mt-5">
          <Filter setSort={() => {}} />
            <div className="mt-10 grid grid-cols-2 gap-7 max-md:grid-cols-1 max-md:gap-0 max-md:mt-3">
                {awards.data.map((item , index) =>(
                <BoxAwardList data={item} key={index}/>
                ))}
            </div>
        </div>
      </div>
      {awards && awards.meta && awards.meta.last_page > 1 && (
        <Pagination
          totalPages={awards.meta.last_page}
          currentPage2={awards.meta.current_page}
          setPage={() => {}}
        />
      )}
    </div>
  );
};

export default ClientAward;
