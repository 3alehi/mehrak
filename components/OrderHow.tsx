import Image from "next/image";
import React from "react";

interface OrderNowProps {
  items: OrderItem;
}

const OrderHow: React.FC<OrderNowProps> = ({ items }) => {

  return (
    <>
      {items.line_item_type === "product" && (
        <div className="border rounded-2xl max-md:rounded-sm w-fit p-1 px-1 max-md:p-0">
          <div className="relative">
            {/* <img
              alt="product image"
              src={items.media_files?.[0]?.main_link || "fallback-image-url"}
              className="w-[75px] h-[75px] max-md:w-[46px] max-md:h-[46px] rounded-2xl max-md:rounded-sm"
            /> */}
            <Image
              alt="product image"
              src={items.media_files?.[0]?.main_link || "fallback-image-url"}
              className="w-[75px] h-[75px] max-md:w-[46px] object-cover max-md:h-[46px] rounded-2xl max-md:rounded-sm transition-all duration-500 ease-in-out blur-sm"
              loading="lazy"
              width={75}
              height={75}
              unoptimized 
              onLoadingComplete={(e) => e.classList.remove("blur-sm")}
            />

<p className="absolute bottom-1 left-1 bg-lightGray px-1 max-md:text-[10px] pt-1 rounded text-customGray w-5 h-5 flex items-center justify-center">
    {items.number}
</p>

          </div>
          <p className="text-[9px] w-full justify-center text-center mt-1 max-md:hidden text-customGray">
            {items.total_formatted}
          </p>
        </div>
      )}
    </>
  );
};

export default OrderHow;
