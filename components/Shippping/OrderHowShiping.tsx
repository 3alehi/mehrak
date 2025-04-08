import React from "react";



interface OrderNowProps {
  items: OrderItems;
}

const OrderHowShipping: React.FC<OrderNowProps> = ({ items }) => {
  return (
    <div className="border rounded-lg max-md:rounded-sm w-fit p-1 px-1 max-md:p-0">
      <div className="relative mb-3">
      <img
  alt="product image"
  src={items.media_files?.[0]?.main_link || "fallback-image-url"}
  className="w-[75px] h-[75px] rounded-2xl max-md:w-[70px] max-md:h-[70px] transition-all duration-500 ease-in-out blur-sm"
  loading="lazy"
  width={75}
  height={75}
  onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
/>

    <p className="absolute bottom-1 left-1 bg-lightGray px-1 max-md:text-[10px] pt-1 rounded text-customGray w-5 h-5 flex items-center justify-center">
    {items.quantity}
</p>

      </div>
      <div className="flex justify-center items-center w-full">
        <p className=" text-customGray flex justify-between font-bold text-[10px]">{items.price_formatted}</p>
      </div>
    </div>
  );
};

export default OrderHowShipping;
