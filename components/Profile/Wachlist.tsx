import React from "react";
import { Button } from "../ui/button";
import DropDown from "../icons/DropDown";
import { getWachList } from "@/utils/api/getWachlist";
import { useQuery } from "@tanstack/react-query";
import Save from "../icons/Save";
import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface MediaFile {
  main_link: string;
}

interface WachlistItem {
  id: number;
  media_files: MediaFile[];
  title: string;
}

const Wachlist: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["status"],
    queryFn: getWachList,
  });

  const isMobile = useIsMobile();
  const placeholderCount = isMobile ? 3 : 5;

  if (isLoading) {
    return (
      <div className="bg-lightBlueGray border rounded-md">
        <div className="flex justify-between text-customGray p-4">
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="font-medium	 text-sm">هدایایی برای اعضای خانواده</p>
              <span className="mr-1">
                <ArrowLeft />
              </span>
            </div>
            <p className="text-sm font-light	">لیست خصوصی</p>
          </div>
          <Button
            variant="outline"
            className="bg-transparent border-none outline-none"
          >
            <DropDown />
          </Button>
        </div>
        <div className="flex gap-1">
          {[...Array(placeholderCount)].map((_, index) => (
            <div
              key={index}
              className="w-[148px] h-[148px]  max-md:h-[79px] max-md:w-[79px] bg-lightGrayBlue2 rounded-md animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (data?.data?.length === 0) {
    return (
      <div className="w-full h-[426px]">
        <div className="flex justify-center items-center flex-col h-full">
          <div className="flex justify-center items-center flex-col">
            <p className="px-5 py-5 bg-lightBlueGray rounded-full text-aquaBlue">
              <Save />
            </p>
            <p className="text-lg text-customGray mt-4">
              لیست ایجاد نکرده اید!
            </p>
            <p className="text-aquaBlue cursor-pointer">ایجاد لیست</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-lightBlueGray border rounded-md">
      <div className="flex justify-between text-customGray p-4 max-md:pl-0">
        <div className="flex flex-col">
          <div className="flex items-center">
            <p className="font-medium	 text-sm ">هدایایی برای اعضای خانواده</p>
            <span className="mr-1 text-aquaBlue">
              <ArrowLeft />
            </span>
          </div>{" "}
          <p className="max-md:text-xs text-sm font-light	">لیست خصوصی</p>
        </div>
        <Button
          variant="outline"
          className="bg-transparent border-none outline-none"
        >
          <DropDown />
        </Button>
      </div>
      <div className="flex gap-1">
        {data?.data?.slice(0, isMobile ? 3 : 5).map((item: WachlistItem) => (
          <Image
            key={item.id}
            alt="product image"
            src={item.media_files?.[0]?.main_link || "fallback-image-url"}
            className="w-[148px] h-[148px] max-md:h-[79px] max-md:w-[79px] object-cover "
            loading="lazy"
            width={148}
            height={148}
            unoptimized
            onLoadingComplete={(e) => e.classList.remove("blur-sm")}
          />
        ))}

        <div className="w-[148px]  text-customGray h-[148px] max-md:text-xs	   max-md:h-[79px] max-md:w-[79px] flex items-center justify-center">
          {data?.data?.length || 0}
          <br />
          محصول
        </div>
      </div>
    </div>
  );
};

export default Wachlist;
