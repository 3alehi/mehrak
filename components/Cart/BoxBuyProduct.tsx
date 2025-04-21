"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import DropDown from "../icons/DropDown";
import { addToCart } from "@/utils/api/addToCart";
import { removeToCart } from "@/utils/api/removeToCart";
import Image from "next/image";
import ChangeToNextBuy from "../icons/ChangeToNextBuy";
import DeleteProduct from "../icons/DeleteProduct";
// import toast from "react-hot-toast";
import Delete from "../icons/Delete";
import { getTokenFromCookie } from "@/utils/helper/getCooki";
import {
  deleteProductById,
  getquantityById,
  getTotalquantity,
  increasequantityById,
  MinesquantityById,
} from "@/utils/helper/setProductBuy";
// import Warning from "../icons/Warning";
import ReBack from "../icons/ReBack";
import toast from "react-hot-toast";
import { useTotalItems } from "@/app/context/ContextCartShop";
import Link from "next/link";
import calculatePriceDrop from "@/utils/helper/Offer";

interface BoxBuyProductProps {
  item: ItemForBuy;
  
  refetch: () => void;
  getProduct: () => void;
  setTotalItems: (total: number) => void;
}

const BoxBuyProduct: React.FC<BoxBuyProductProps> = ({
  item,
  refetch,
  getProduct,
}) => {
  const isLogin = getTokenFromCookie();
  const { totalItems, setTotalItems } = useTotalItems();

  const [loadingQuantity, setLoadingQuantity] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [LocalBuy, setLocalBuy] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [timer, setTimer] = useState(7);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalBuy(getquantityById(item.id));
  }, [LocalBuy]);

  useEffect(() => {
    if (showDeleteConfirm && timer > 0) {
      const id = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    } else if (timer === 0) {
      handleConfirmDelete();
    }
  }, [showDeleteConfirm, timer]);

  const handleAddToCart = () => {
    if (isLogin) {
      setLoadingQuantity(true);
      setDisabled(true);
      addToCart(item.id, 1)
        .then(() => {
          refetch();
          setTotalItems(totalItems + 1);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingQuantity(false);
            setDisabled(false);
          }, 1000);
        });
    } else {
      addLocalBuy();
      setTotalItems(getTotalquantity());
    }
  };

  const handleRemoveFromCart = () => {
    if (isLogin) {
      setLoadingQuantity(true);
      setDisabled(true);
      removeToCart(item.id, 1)
        .then(() => {
          refetch();
          setTotalItems(totalItems - 1);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingQuantity(false);
            setDisabled(false);
          }, 1000);
        });
    } else if (LocalBuy == 1) {
      deleteProductById(item.id);
      getProduct();
      setTotalItems(getTotalquantity());
    } else {
      minesLocalBuy();
      setTotalItems(getTotalquantity());
    }
  };

  function addLocalBuy() {
    increasequantityById(item.id);
    setLocalBuy((prev) => prev + 1);
  }
  function minesLocalBuy() {
    MinesquantityById(item.id);
    setLocalBuy((prev) => prev - 1);
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
    setTimer(7);
  };

  const handleConfirmDelete = () => {
    if (isLogin) {
      removeToCart(item.id, item.quantity).then((res) => {
        if (res.success) {
          toast.success("محصول با موفقیت حذف شد");
          setTotalItems(totalItems - item.quantity);

          refetch();
        }
      });
    } else {
      deleteProductById(item.id);
      getProduct();
    }
    setShowDeleteConfirm(false);
  };

  // const handleCancelDelete = () => {
  //   setShowDeleteConfirm(false);
  //   setTimer(7);
  // };

  return (
    <div className="w-full relative bg-lightBlueGray border border-lightGrayBlue rounded-lg">
      <div
        className={` grid ${
          showDeleteConfirm ? "grid-cols-1" : "grid-cols-2"
        } p-4 max-md:grid-cols-1`}
      >
        {!showDeleteConfirm && (
          <div className="flex max-md:w-full">
            <div className="flex flex-col max-md:w-[113px] ">
              <div className="w-[193px] h-[193px] max-md:w-full max-md:h-[113px] bg-lightGrayBlue flex items-center justify-center overflow-hidden">
                <Link href={`/product/${item.id}`}>
                  <Image
                    alt="logo-mehra"
                    src={
                      item.media_files[item.media_files.length - 1]
                        .conversion_links.large_thumbnail_260_260
                    }
                    width={193} // هم‌اندازه با کادر
                    height={193} // هم‌اندازه با کادر
                    unoptimized
                    className="object-contain"
                    onLoadingComplete={(e) => e.classList.remove("blur-sm")}
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="bg-white  w-full max-md:px-4 h-[36px] mt-3 hidden max-md:flex rounded-full py-3 text-customGray  items-center justify-between text-sm">
                <button
                  className=" cursor-pointer  disabled:text-gray-200 disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                  disabled={disabled || item.in_stock_count <= item.quantity}
                >
                  +
                </button>

                <span className="">
                  {loadingQuantity ? (
                    <div className=" border-4 border-t-4 border-aquaBlue border-t-transparent rounded-full animate-spin"></div>
                  ) : isLogin ? (
                    item.quantity
                  ) : (
                    LocalBuy
                  )}
                </span>

                <button
                  className=" cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
                  onClick={handleRemoveFromCart}
                  disabled={disabled}
                >
                  {item.quantity == 1 || LocalBuy == 1 ? (
                    <span className="text-customRed">
                      <Delete />
                    </span>
                  ) : (
                    "-"
                  )}
                </button>
              </div>
            </div>
            <div className="mr-4 flex flex-col text-customGray max-md:text-darkGray">
              <p className="font-bold text-2xl text-charcoal line-clamp-1 max-md:line-clamp-2 max-md:font-normal max-md:text-sm max-md:text-customGray max-md:w-36">
                {item.title}
              </p>
              <p className="mt-1 font-light max-md:font-bold max-md:text-xs">
                {item.structure_title}
              </p>
              <p className="mt-3 font-light max-md:font-bold max-md:text-xs">
                انتشارات مهرک
              </p>
              <p className="text-customRed mt-2 text-sm font-medium max-md:font-bold max-md:text-[9px]">
                {/* {(
                  (item.main_price - item.price) *
                  item.quantity
                ).toLocaleString()}{" "} */}
        {calculatePriceDrop(item.main_price , item.price)}تخفیف
              </p>
              <p className="text-lg font-medium mt-1 max-md:text-sm max-md:font-bold">
                {(
                  item.price * (isLogin ? item.quantity : LocalBuy)
                ).toLocaleString()}{" "}
                تومان
              </p>
            </div>
          </div>
        )}

        {!showDeleteConfirm && (
          <div className="w-full">
            <div className="absolute top-0 left-0 px-4">
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-none p-0"
                  >
                    <DropDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-lightGray w-fit rounded-md shadow-2xl text-sm font-light font-vazirmatn text-customGray absolute left-2 top-[-48px] mt-2"
                  style={{ minWidth: "150px", maxWidth: "300px" }}
                >
                  <DropdownMenuItem
                    disabled
                    className="cursor-pointer p-2 rounded-md w-full whitespace-nowrap  disabled:"
                  >
                    <ChangeToNextBuy />
                    انتقال به خرید بعدی
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer p-2 rounded-md w-full whitespace-nowrap hover:text-customRed"
                    onClick={handleDeleteClick}
                  >
                    <DeleteProduct />
                    حدف از سبد خرید
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-center flex-col max-md:items-start w-full h-full z-50">
              <div className="bg-white max-md:hidden rounded-full py-3 text-customGray flex text-2xl">
                <button
                  className="mx-6 cursor-pointer disabled:text-gray-200z disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                  disabled={disabled || item.in_stock_count <= item.quantity}
                >
                  +
                </button>

                <span className="mx-3">
                  {loadingQuantity ? (
                    <div className="w-6 h-6 border-4 border-t-4 border-aquaBlue border-t-transparent rounded-full animate-spin"></div>
                  ) : isLogin ? (
                    item.quantity
                  ) : (
                    LocalBuy
                  )}
                </span>

                <button
                  className="mx-6 cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed"
                  onClick={handleRemoveFromCart}
                  disabled={disabled}
                >
                  {item.quantity == 1 || LocalBuy == 1 ? (
                    <span className="text-customRed">
                      <Delete />
                    </span>
                  ) : (
                    "-"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showDeleteConfirm && (
        <div className="w-full flex justify-center flex-col items-center h-[225px] relative">
          <img
            src={item.media_files[0].main_link}
            className="w-10 h-10 object-fill"
            alt=""
          />
          <p className="text-customGray font-bold mt-2">
            محصول مورد نظر شما حذف شد
          </p>
          <p
            className="flex mt-2 items-center cursor-pointer"
            onClick={() => {
              setShowDeleteConfirm(false);
              setTimer(7);
              if (intervalId) clearInterval(intervalId);
            }}
          >
            <ReBack />
            <span className="mr-3 font-light text-customGray">
              بازگرداندن محصول
            </span>
          </p>

          <div className="absolute bottom-0 right-0 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-100"
              style={{ width: `${(timer / 7) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxBuyProduct;
