import React from "react";
import { Button } from "../ui/button";
import DropDown from "../icons/DropDown";
import Save from "../icons/Save";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteCollection } from "@/utils/api/deleteCollection";
import toast from "react-hot-toast";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

interface Collection {
  item: {
    title: string;
    products: Product[];
    id: number;
  };
  refetch: () => void;
}
const Favorites: React.FC<Collection> = ({ item, refetch }) => {
  const isMobile = useIsMobile()
  return (
    <div className="bg-lightBlueGray border rounded-md">
      <div className="flex justify-between text-customGray p-4">
        <div className="flex flex-col">
          <p className="max-md:text-xs text-sm font-med">{item.title}</p>
          <div className="flex">
            <p className="max-md:text-xs text-sm font-light">لیست عمومی</p>
            <span className="flex mx-7 items-center max-md:mx-2 max-md:text-xs">
              <i className="text-aquaBlue">
                <Save />
              </i>
              <i className="mx-1">{item?.products?.length}</i>
            </span>
          </div>
        </div>
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {" "}
              <DropDown />{" "}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              onClick={() => {
                deleteCollection(item.id).then((res) => {
                  if (res.success) {
                    toast.success("با موفقیت حذف شد");

                    refetch();
                  } else {
                    toast.error("مشکلی پیش آمد لطفا مجدد تلاش کنید");
                  }
                });
              }}
            >
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-1">
        {item?.products?.slice(0, isMobile ? 3 : 6).map((data , _) => (
    

          <Image
          key={_}
            alt="product image"
            src={data.media_files[0].main_link || "fallback-image-url"}
            className="w-36 h-48 max-md:w-[113px] max-md:h-[113px]"
            loading="lazy"
            width={148}
            height={148}
            unoptimized 
            onLoadingComplete={(e) => e.classList.remove("blur-sm")}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
