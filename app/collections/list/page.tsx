"use client";
import CollectionListBox from "@/components/CollectionListBox";
import List from "@/components/icons/ListIcons";
import Sorting from "@/components/icons/Sorting";
import SkeletonLoader from "@/components/Skeleton/SkeleronLoader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchCollections } from "@/utils/api/getCollectionsList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Page: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("جدیدترین");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };
  const page = 1;
  const { data, isLoading } = useQuery({
    queryKey: ["collection", page],
    queryFn: () => fetchCollections(page),
  });
  //   if (isLoading || isLoadingAll || isLoadingBook) {
  //     return (
  //       <div className="pb-5">
  // <HeaderCollectionSkeleton/>

  // <FilterSkeleton/>

  //     <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5">
  //     {new Array(11).fill(1).map((_, index) => (
  //   <CollectionSkeleton key={index} />
  // ))}
  //       </div>
  //       </div>

  //     );
  //   }
  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="pb-5">
      <div
        className="w-full max-md:rounded-none rounded-3xl h-[268px] border-b-[3px] max-md:border-b-[2px]  max-md:h-[171px] border-turquoise flex flex-col justify-between relative bg-cover bg-center"
        style={{
          backgroundImage: `url(/colbg.png)`,
        }}
      >
        <div className="w-full flex justify-end px-5 py-4"></div>

        <div className="pl-5 pr-5 md:pl-36 md:pr-[360px] pb-8 flex flex-col md:flex-row justify-between items-center max-md:hidden">
          <p className="text-2xl md:text-4xl font-black text-white text-center md:text-left">
            لیست ها{" "}
          </p>
        </div>
        <div className="absolute bottom-[-60px] md:bottom-[-100px] right-0 md:right-0 pr-5 md:pr-36 flex md:block justify-center w-full">
          <div className="w-[120px] h-[120px] md:w-[192px] md:h-[192px] rounded-full overflow-hidden border-white bg-lightBlueGray border-[3px] flex justify-center items-center">
            <List />
          </div>
        </div>
      </div>

      <p className="pr-[360px] text-customGray text-base md:text-lg font-extralight mt-3 max-md:hidden">
        محصولاتی که توسط مدیران سایت یا کاربران و خریداران برای خرید توصیه شده
        اند
      </p>
      <div className="pl-5 pr-5 hidden max-md:flex md:pl-36 md:pr-[360px] pb-8  flex-col md:flex-row justify-between items-center max-md: mt-16">
        <p className="text-2xl max-md:mt-4 md:text-xl max-md:font-black font-black text-customGray text-center md:text-left">
          لیست ها{" "}
        </p>
      </div>
      <p className="px-5  text-customGray text-base md:text-lg font-extralight max-md:block hidden">
        محصولاتی که توسط مدیران سایت یا کاربران و خریداران برای خرید توصیه شده
        اند
      </p>

      <div className="mt-24 px-5 w-full max-md:mt-6 flex justify-end">
      <div className="flex items-center relative">
  <Sorting />
  <p className="mr-4 text-customGray max-md:hidden max-md:text-sm">مرتب سازی:</p>
  <div className="relative">
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-customGray font-extralight text-[16px] font-vazirmatn">
          {selectedOption}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-lightGray w-fit rounded-md shadow-2xl text-sm font-light font-vazirmatn text-customGray absolute left-2 top-[-48px] mt-2"
        style={{ minWidth: "150px", maxWidth: "300px" }}
      >
        {[
          "جدیدترین",
          "پربازدیدترین",
          "پرفروش‌ترین",
          "بیشترین تخفیف",
          "ارزان‌ترین",
          "گران‌ترین",
          "پیشنهاد خریداران",
        ].map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleOptionClick(option)}
            className="cursor-pointer p-2 rounded-md w-full whitespace-nowrap"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>

      </div>

      <div className="mt-28 max-md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-5 mb-20">
        {data?.data?.map((item: BookItem) => (
          <CollectionListBox key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
