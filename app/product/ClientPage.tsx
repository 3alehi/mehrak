"use client";
import Gallery from "@/components/Product/Gallery";
import Summary from "@/components/Product/Summary";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import {
  getquantityById,
  getTotalquantity,
  increasequantityById,
  MinesquantityById,
  saveObject,
} from "@/utils/helper/setProductBuy";
import React, { useEffect, useRef, useState } from "react";
import ArrowRight from "@/components/icons/ArrowRight";
import ArrowLeftt from "@/components/icons/ArrowLeftt";
import Creators from "@/components/Product/Creators";
import { getProduct } from "@/utils/api/getProduct";
import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "@/utils/api/getCollectionsList";
import Link from "next/link";
import CollectionListBox from "@/components/CollectionListBox";
import { useParams } from "next/navigation";
import AddToCart from "@/components/Product/AddToCart";
import { addToCart } from "@/utils/api/addToCart";
import toast from "react-hot-toast";
import { useTotalItems } from "@/app/context/ContextCartShop";
import { removeToCart } from "@/utils/api/removeToCart";
import Share from "@/components/icons/Share";
import Save from "@/components/icons/Save";
import { likeProduct } from "@/utils/api/addProductLike";
import { DeleteProduct } from "@/utils/api/deleteLikeProduct";
import Card from "@/components/icons/Card";
import Delete from "@/components/icons/Delete";
import AddProduct from "@/utils/helper/LastSeen";
import ProductSkeleton from "@/components/Skeleton/ProductSkeleton";
import LastSean from "@/components/LastSean";
import BoxProduct from "@/components/BoxProduct";
import { getTokenFromCookie } from "@/utils/helper/getCooki";
import Alert from "@/components/icons/Alert";
import calculatePriceDrop from "@/utils/helper/Offer";
import Breadcrumb from "@/components/Breadcrumb";

import { SendCommentPopUp } from "@/components/Product/SendCommentPopUp";
interface Collection {
  id: string;
  title: string;
  media_files: MediaFile[];
}

interface ProductDetail {
  title: string;
  value: string;
}

type ProductAttributes = {
  [key: string]: ProductDetail[];
};
export default function ClientPage() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [quantityProduct, setquantityProduct] = useState<number>(0);
  const [showPopUpComment , setShowPopUpComment] = useState<boolean>(false)
  const {
    data: dataCart,
    setTotalItems,
  } = useTotalItems();
  const { id } = useParams();
  const [showDetailes, setshowDetailes] = useState<boolean>(false);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  const [quantity, setquantity] = useState<number>(0);
  const [loadingRemove, setLoadingRemove] = useState(false);
  // const [loadingLike , setLoadingLike] = useState<boolean>(false)

  const { data, isLoading } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: () => getProduct(id as string),
    gcTime: 0, // غیرفعال کردن کش برای این query
  });
  
  const { data: collection } = useQuery({
    queryKey: ["collection", 1],
    queryFn: () => fetchCollections(1),
  });

  useEffect(() => {
    if (data) {
      AddProduct(data.data);
    }
  }, [data, isLoading]);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  const specsRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef(null);
  /////// start Like and unLike Product ////////

  const [hasF, setHasF] = useState<boolean>(false);

  const [LocalBuy, setLocalBuy] = useState(0);
  useEffect(() => {
    setLocalBuy(getquantityById(id));
  }, [id, LocalBuy]);

  function addLocalBuy() {
    increasequantityById(id);
    setLocalBuy((prev) => prev + 1);
  }
  function minesLocalBuy() {
    MinesquantityById(id);
    setLocalBuy((prev) => prev - 1);
    setTotalItems(getTotalquantity());
  }
  // const scrollContainer = useRef(null);

  // const scrollLeft = () => {
  //   if (scrollContainer.current) {
  //     scrollContainer.current.scrollBy({ left: -500, behavior: "smooth" });
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollContainer.current) {
  //     scrollContainer.current.scrollBy({ left: 500, behavior: "smooth" });
  //   }
  // };

  function LikeProduct() {
    // setLoadingLike(true);

    likeProduct(id as string)
      .then((res) => {
        if (res.success) {
          toast.success("محصول با موفقیت ذخیره شد");
          setHasF(true);
        } else {
          toast.error("مشکلی پیش آمد");
        }
      })
      .finally(() => {
        // setLoadingLike(false);
      });
  }

  useEffect(() => {
    if (!isLoading) {
      setHasF(data?.data?.is_liked);
      if (quantity > 0) {
        const productQ = data?.data?.in_stock_count - quantity;

        setquantityProduct(productQ);
      } else {
        setquantityProduct(data?.data?.in_stock_count);
      }
    }
  }, [data, isLoading]);

  function UnLikeProduct() {
    // setLoadingLike(true)
    DeleteProduct(id as string)
      .then(() => {
        setHasF(false);
        toast.success("محصول با موفقیت از لیست ذخیره حذف شد");
      })
      .finally(() => {
        // setLoadingLike(false);
      });
  }
  const Token = getTokenFromCookie();
  /////// end Like and unLike Product ////////

  useEffect(() => {
    const foundItem = dataCart?.items.find((item) => item.id == Number(id));
    const qu = foundItem ? foundItem.quantity : 0;
    setquantity(qu);
  }, [id, dataCart]);

  const handleAddToCart = () => {
    if (!getTokenFromCookie()) {
      if (!LocalBuy) {
        setLocalBuy(1);
      }
      if (LocalBuy) {
        addLocalBuy();
      } else {
        saveObject(data.data);
      }
      setTotalItems(getTotalquantity());
    } else {
      setLoadingProduct(true);

      addToCart(data.data.id, 1)
        .then((res) => {
          if (res.success) {
            setTotalItems(res.data.total_items);
            setquantityProduct((prev) => prev - 1);
            toast.success("محصول با موفقیت اضافه شد");
            res.data.items.some((item: { id: number; quantity: number }) => {
              if (item.id === Number(id)) {
                setquantity(item.quantity);
                return true;
              }
              return false;
            });
          } else {
            toast.error("مشکلی پیش آمد");
          }
        })
        .finally(() => {
          setLoadingProduct(false);
        });
    }
  };
  const handleRomeveProduct = () => {
    if (Token) {
      setLoadingRemove(true);
      removeToCart(Number(id), 1)
        .then((res) => {
          if (res.success) {
            if (quantity == 1) {
              setquantity(0);
            }
            toast.success("محصول با موفقیت حذف شد");
            setquantityProduct((prev) => prev + 1);

            setTotalItems(res.data.total_items);
            res.data.items.some((item: { id: number; quantity: number }) => {
              if (item.id === Number(id)) {
                setquantity(item.quantity);
                return true;
              }
              return false;
            });
          }
        })
        .finally(() => {
          setLoadingRemove(false);
        });
    } else {
      minesLocalBuy();
    }
  };

  // useEffect(() => {

  //   dataCart?.data?.items.some((item: { id: number; quantity: number }) => {
  //     if (item.id === Number(id)) {
  //       setquantity(item.quantity);
  //       return true;
  //     }
  //     return false;
  //   });
  // }, [id]);isLoading || isLoadingCart || isLoadingCol
  if (isLoading ) {
    return <ProductSkeleton />;
  }

  const productAttributes: ProductAttributes = data?.data?.attributes || {};
  const attributeCount = Object.keys(productAttributes).length;
  const gridClass =
    attributeCount >= 4
      ? "grid-cols-4"
      : attributeCount === 3
      ? "grid-cols-3"
      : attributeCount === 2
      ? "grid-cols-2"
      : "grid-cols-1";

  return (
    <>
      <div className="max-md:px-4">
        <Breadcrumb
          items={[
            { label: "اینطوریاس", href: "/" },
            { label: data.data.title, href: "" },
          ]}
        />
        <h1 className="mt-11 max-md:mt-4 text-4xl max-md:text-base font-bold text-customGray max-md:hidden">
          {data.data.title}
        </h1>

        <div className="flex flex-col sm:flex-row justify-between gap-12 max-md:gap-0 mt-5">
          {/* تصویر محصول در بالای موبایل */}
          <div className="order-1 sm:order-2 w-full text-center ">
            <div className="grid grid-cols-[auto_20px] max-md:flex max-md:flex-col-reverse max-md:space-y-4">
              <Gallery data={data.data.media_files} title={data.data.title} />

              <div className="flex flex-col  text-customGray mt-4 max-md:order-1 max-md:flex-row-reverse max-md:items-center max-md:justify-start">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    toast.success("متن با موفقیت کپی شد");
                  }}
                >
                  <Share />
                </span>
                <span
                  className={`mt-7 max-md:mt-0 max-md:ml-4 cursor-pointer ${
                    hasF ? "text-aquaBlue" : "text-customGray"
                  }`}
                  onClick={() => {
                    if (getTokenFromCookie()) {
                      if (hasF) {
                        UnLikeProduct();
                      } else {
                        LikeProduct();
                      }
                    } else {
                      location.href = "/login";
                    }
                  }}
                >
                  <Save />
                </span>
              </div>
            </div>
          </div>

          {/* اطلاعات محصول */}
          <div className="order-2 sm:order-1 w-full px-4 max-md:px-0">
            <p className="text-customGray text-xl max-md:mt-2 max-md:text-sm max-md:font-extralight">
              {data.data.type_title}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-customGray mt-6 max-md:hidden">
              {Object.entries(productAttributes)
                .slice(0, 3)
                .map(([key, details]) => (
                  <div key={key}>
                    {details.map((detail, index) => (
                      <p key={index} className="font-extralight">
                        {detail.title}.............{" "}
                        <span className="font-medium">{detail.value}</span>
                      </p>
                    ))}
                  </div>
                ))}
              {Object.entries(productAttributes).length > 3 && (
                <a
                  href="#"
                  className="text-customRed"
                  onClick={(e) => {
                    setshowDetailes(!showDetailes);
                    e.preventDefault();
                    if (specsRef.current) {
                      const yOffset = -100;
                      const y =
                        specsRef.current.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                >
                  نمایش بیشتر
                </a>
              )}
            </div>

            {/* توضیحات */}
            <div className="mt-10">
              <Summary
                des={data.data.description}
                descriptionRef={descriptionRef}
              />
            </div>

            {/* نمایش قیمت */}
            {quantityProduct != 0 ? (
              <div className="w-full mt-6 p-2 flex flex-col items-center sm:items-end max-md:hidden">
                <div className="w-full sm:w-[70%]">
                  <div className="w-full flex justify-between text-customGray font-light max-md:hidden">
                    <p>قیمت</p>
                    <div className="flex items-center">
                      <p
                        className={`${
                          data.data.main_price_formatted !==
                            data.data.price_formatted && "line-through"
                        }`}
                      >
                        {data.data.main_price_formatted}
                      </p>{" "}
                      {!calculatePriceDrop(
                        data.data.main_price,
                        data.data.price
                      ) && (
                        <p className="mr-2 text-customRed text-[10px] font-medium">
                          {calculatePriceDrop(
                            data.data.main_price,
                            data.data.price
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  {data.data.main_price_formatted !=
                    data.data.price_formatted && (
                    <div className="w-full flex justify-between text-customGray font-medium cursor-pointer">
                      <p>قیمت با تخفیف </p>
                      <p className="text-2xl">{data.data.price_formatted}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center mt-10 text-customGray max-md:hidden">
                <p className="text-2xl font-normal">اتمام موجودی!</p>
                <p className="mt-2 text-lg font-medium">
                  این محصول به اتمام رسیده است. می‌توانید زنگوله را بزنید تا به
                  محض موجود شدن، به شما خبر دهیم
                </p>
              </div>
            )}

            {/* دکمه خرید */}
            {quantityProduct != 0 ? (
              <>
                <div className="w-full flex justify-center sm:justify-end mt-6 max-md:hidden">
                  <div className="w-[60%]">
                    {/* <p className="text-customRed flex items-center">
                
               
                تنها {quantityProduct} عدد در انبار  باقی مانده
                
              </p> */}
                  </div>
                </div>
                <div className="w-full flex justify-center sm:justify-end mt-2 max-md:hidden ">
                  {quantity == 0 && !LocalBuy ? (
                    <>
                      <button
                        onClick={() => handleAddToCart()}
                        disabled={loadingProduct}
                        className={`flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          loadingProduct ? "bg-customRed" : "bg-customRed"
                        } text-white font-bold text-xl py-4 px-12 rounded-full transition`}
                        aria-label="افزودن به سبد خرید"
                      >
                        <div className="w-6 h-6 flex items-center justify-center">
                          {loadingProduct && (
                            <div className="w-5 h-5 border-4 border-t-transparent border-dotted border-white rounded-full animate-spin mx-auto"></div>
                          )}
                        </div>
                        <Card aria-hidden="true" />{" "}
                        {/* صفحه‌خوان این کامپوننت را نادیده بگیرد */}
                        <span>افزودن به سبد خرید</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between border rounded-full py-4  text-customGray px-12">
                        <div className="flex font-light items-center">
                          <button
                            disabled={loadingProduct || loadingRemove}
                            className="ml-4 font-light disabled:cursor-not-allowed text-xl cursor-pointer "
                            onClick={() => {
                              handleAddToCart();
                            }}
                          >
                            +
                          </button>
                          <p className="text-2xl flex items-center justify-center">
                            {loadingProduct || loadingRemove ? (
                              <span className="w-6 h-6 border-4 border-customGray border-t-transparent rounded-full animate-spin"></span>
                            ) : !Token ? (
                              LocalBuy
                            ) : (
                              quantity
                            )}
                          </p>

                          {quantity == 1 || LocalBuy == 1 ? (
                            <button
                              disabled={loadingProduct || loadingRemove}
                              className="text-customRed disabled:cursor-not-allowed mr-4 cursor-pointer"
                              onClick={() => {
                                handleRomeveProduct();
                              }}
                            >
                              <Delete />
                            </button>
                          ) : (
                            <button
                              disabled={loadingProduct || loadingRemove}
                              className="mr-4 disabled:cursor-not-allowed text-xl cursor-pointer "
                              onClick={() => {
                                handleRomeveProduct();
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div className="w-[149px] mr-11 text- font-light text-sm text-customGray">
                          <p>در سبد شما قرارگرفت</p>
                          <Link
                            href={"/cart"}
                            className="text-aquaBlue cursor-pointer"
                          >
                            مشاهده سبد خرید
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex justify-center sm:justify-end mt-2 max-md:hidden ">
                  <button className="bg-customRed text-lg font-bold items-center text-white py-1 w-full flex justify-center rounded-lg">
                    <Alert />

                    <p className="mr-3">خبرم کنید</p>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {data.data.related != 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center">
              <p className="text-customGray font-bold text-2xl">
                کتاب های مرتبط
              </p>
              <div className="flex gap-3">
                <p
                  className={`py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer ${
                    isBeginning ? "opacity-50 cursor-not-allowed" : ""
                  } custom-prev`}
                >
                  <ArrowRight />
                </p>
                <p
                  className={`py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer ${
                    isEnd ? "opacity-50 cursor-not-allowed" : ""
                  } custom-next`}
                >
                  <ArrowLeftt />
                </p>
              </div>
            </div>
            <div className="flex mt-7">
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={4}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                breakpoints={{
                  320: { slidesPerView: 2.5 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
              >
                {data.data.related.map((item: BookItem, index: number) => (
                  <SwiperSlide key={index}>
                    <BoxProduct
                      key={index}
                      id={item.id}
                      src={item.media_files}
                      title={item.title}
                      main_price_formatted={item.main_price_formatted}
                      price_formatted={item.price_formatted}
                      price={item.price}
                      main_price={item.main_price}
                      page={1}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        <div className="flex mt-10 justify-between gap-x-[231px]">
          <div className="w-[746px] ">
            <p className="text-customGray text-2xl font-bold">توضیحات</p>
            <div>
              <div
                className={`text-justify leading-9 text-base lg:text-lg text-customGray font-extralight ${
                  !isExpanded ? "line-clamp-6" : ""
                }`}
                ref={descriptionRef}
                dangerouslySetInnerHTML={{ __html: data.data.description }}
              />
              {data.data.description.length > 200 && (
                <>
                  {!isExpanded && (
                    <button
                      onClick={toggleDescription}
                      className="text-customRed text-sm font-light"
                    >
                      مشاهده بیشتر
                    </button>
                  )}
                  {isExpanded && (
                    <button
                      onClick={toggleDescription}
                      className="text-customRed text-sm font-light"
                    >
                      مشاهده کمتر
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="mt-19 max-md:mt-9 " ref={specsRef}>
              <p className="text-customGray text-2xl font-bold max-md:text-base max-md:font-medium">مشخصات فنی</p>

              <div
                className={`mt-5 w-fit border rounded-lg grid ${gridClass} max-md:hidden`}
              >
                {Object.entries(productAttributes)
                  .slice(0, 3)
                  .map(([key, details]) => (
                    <div key={key}>
                      {details.slice(0, 1).map((detail, index) => (
                        <div key={index} className="font-extralight">
                          <div className="border-l py-2 max-md:py-1 px-6 flex">
      
                            <div className="flex flex-col mr-4 text-customGray">
                              <span className="font-extralight text-sm line-clamp-1">
                                {detail.value}
                              </span>
                              <span className="font-light line-clamp-1">
                                {detail.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                {Object.entries(productAttributes).length > 3 && (
                  <div
                    className="flex justify-center items-center text-lg font-light
                                     text-customRed bg-light-gray cursor-pointer"
                    onClick={() => setshowDetailes(!showDetailes)}
                  >
                    {" "}
                    {!showDetailes ? "سایر مشخصات" : "بستن مشخصات"}
                  </div>
                )}
              </div>
              {Object.entries(productAttributes)
                .slice(0, 3)
                .map(([key, details]) => (
                  <div key={key}>
                    {details.map((detail, index) => (
                      <div
                        key={index}
                        className="font-extralight hidden max-md:block"
                      >
                        <div className="border-l  py-2 flex ">
                          <div className="flex flex-row mr-4 text-customGray items-center">
                            <span className="font-extralight text-xs line-clamp-1">
                              {detail.value}
                            </span>
                            <span>................</span>
                            <span className="font-light line-clamp-1">
                              {detail.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  showDetailes
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                } grid grid-cols-1 gap-3 text-customGray mt-6`}
              >
                {Object.entries(productAttributes).map(([key, details]) => (
                  <div key={key}>
                    {details.map((detail, index) => (
                      <p key={index} className="font-extralight">
                        {detail.title}: ....................{" "}
                        <span className="font-medium">{detail.value}</span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {data.data.collections != 0 && (
              <>
                <p className="text-xl mt-14 max-md:mt-8 max-md:text-base max-md:font-medium  font-normal text-customGray">
                  لیست‌هایی که این محصول در آنها است
                </p>
                {data.data.collections.map((item: Collection) => (
                  <p key={item.id} className="mt-2 flex items-end">
                    {/* <img
                    className="h-[30px] w-[30px] rounded-full ml-3"
                    src={item.media_files[0].main_link}
                    alt={item.title}
                  /> */}
                    <Link
                      href={`/collections/show/${item.id}`}
                      className="hover:text-aquaBlue text-lg max-md:text-sm max-md:font-extralight  mt-2 text-customGray font-extralight transition-colors delay-150"
                    >
                      {item.title}
                    </Link>
                  </p>
                ))}
              </>
            )}
            {data.data.creators.length != 0 && (
              <div className="mt-14">
                <p className="text-customGray text-2xl font-bold max-md:text-base max-md:font-medium">
                  پدیدآورندگان
                </p>
                <div className="mt-5 flex gap-3 ">
                  {data.data.creators.map((item: CreatorData) => (
                    <Creators key={item.id} data={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <AddToCart
            LocalBuy={LocalBuy}
            data={data}
            quantity={quantity}
            handleAddToCart={handleAddToCart}
            loadingProduct={loadingProduct}
            handleRomeveProduct={handleRomeveProduct}
            loadingRemove={loadingRemove}
          />
        </div>
       {/* {
         <div className="mt-14">
         <div className="w-full flex justify-between items-center">
           <p className="text-2xl font-semibold text-aquaBlue">
             نظرات و امتیازات
           </p>
           <p className="text-customGray text-sm font-light">
             20 نفر (100% از خریداران) ، خرید این کتاب را توصیه کرده اند
           </p>
         </div>
         <hr className="mt-6" />
         <div className="mt-14">
           <div className="flex justify-end">
             <p className="flex items-center cursor-pointer text-customGray font-extralight"
             onClick={()=> setShowPopUpComment(true)}>
               <span className="ml-2">
                 <SendComment />{" "}
               </span>{" "}
               ثبت نظر
             </p>
           </div>
         </div>
         <div className="relative">
     {/* دکمه چپ */}
     {/* <button
       onClick={scrollLeft}
       className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10"
     >
       <ChevronLeft className="w-6 h-6 text-gray-600" />
     </button> */}

     {/* لیست اسکرول‌شونده */}
     {/* <div
       ref={scrollContainer}
       className="mt-6 overflow-x-auto gap-7 flex flex-nowrap hide-scrollbar scroll-smooth px-12"
     >
       {Array.from({ length: 20 }).map((_, index) => (
         <Comment key={index} />
       ))}
     </div> */}

     {/* دکمه راست */}
     {/* <button
       onClick={scrollRight}
       className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10"
     >
       <ChevronRight className="w-6 h-6 text-gray-600" />
     </button>
   </div> */}



       {/* </div> */}

        {data.data.upsell != 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center">
              <p className="text-customGray font-bold text-2xl">
                پیشنهاد فروشندگان
              </p>
              <div className="flex gap-3">
                <p
                  className={`py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer ${
                    isBeginning ? "opacity-50 cursor-not-allowed" : ""
                  } custom-prev`}
                >
                  <ArrowRight />
                </p>
                <p
                  className={`py-1 px-4 border border-lightGrayBlue rounded-2xl cursor-pointer ${
                    isEnd ? "opacity-50 cursor-not-allowed" : ""
                  } custom-next`}
                >
                  <ArrowLeftt />
                </p>
              </div>
            </div>
            <div className="flex mt-7">
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={4}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                breakpoints={{
                  320: { slidesPerView: 2.5 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
              >
                {data.data.upsell.map((item: BookItem, index: number) => (
                  <SwiperSlide key={index}>
                    <BoxProduct
                      key={index}
                      id={item.id}
                      src={item.media_files}
                      title={item.title}
                      main_price_formatted={item.main_price_formatted}
                      price_formatted={item.price_formatted}
                      price={item.price}
                      main_price={item.main_price}
                      page={1}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        <div className="mt-36 max-md:mt-14 max-md:border  max-md:py-3  rounded-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
            <div>
              <p className="text-2xl font-bold text-customGray">
                لیست‌هایی برای ایده گرفتن
              </p>
              <p className="mt-2 font-light text-customGray">
                لیست شده با ❤️ توسط مهرا
              </p>
            </div>

            <Link
              href={"/collections/list"}
              className="text-lg  text-customRed font-medium border flex  cursor-pointer bg-light-gray items-center justify-evenly border-customRed rounded-full py-2 px-8"
            >
              مشاهده همه لیست‌ها
            </Link>
          </div>
          <div className="mt-9  max-md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 px-5 max-md:mb-0 mb-20">
            {collection?.data?.slice(0, 4).map((item: BookItem) => (
              <CollectionListBox key={item.id} data={item} />
            ))}
          </div>
        </div>
        <div className="max-md:mt-8">
        <LastSean />

        </div>
      </div>
      <div className="fixed bottom-0 text-white w-full  z-[66] hidden max-md:block">
        <div className="px-3 py-2 shadow-lg w-full bg-light-gray grid grid-cols-2 items-center  rounded-lg">
          <div className="flex flex-col items-center">
            {quantity === 0 && !LocalBuy ? (
              <button
                onClick={handleAddToCart}
                disabled={loadingProduct}
                className="flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 bg-customRed text-white font-bold text-sm rounded-md transition px-4 py-2 w-full"
              >
                {loadingProduct && (
                  <div className="w-5 h-5 border-4 border-t-transparent border-dotted border-white rounded-full animate-spin"></div>
                )}
                افزودن به سبد خرید
              </button>
            ) : (
              <div className="flex justify-between border rounded-full py-2 px-4 text-customGray w-full min-h-[50px] items-center">
                <button
                  disabled={loadingProduct || loadingRemove}
                  className="text-xl cursor-pointer disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                >
                  +
                </button>
                <p className="text-2xl flex items-center justify-center min-w-[30px]">
                  {loadingProduct || loadingRemove ? (
                    <span className="w-6 h-6 border-4 border-customGray border-t-transparent rounded-full animate-spin"></span>
                  ) : !Token ? (
                    LocalBuy
                  ) : (
                    quantity
                  )}
                </p>
                {quantity === 1 || LocalBuy === 1 ? (
                  <button
                    disabled={loadingProduct || loadingRemove}
                    className="text-customRed cursor-pointer disabled:cursor-not-allowed"
                    onClick={handleRomeveProduct}
                  >
                    <Delete />
                  </button>
                ) : (
                  <button
                    disabled={loadingProduct || loadingRemove}
                    className="text-xl cursor-pointer disabled:cursor-not-allowed"
                    onClick={handleRomeveProduct}
                  >
                    -
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end mt-4">
            {data?.data?.price_formatted !=
              data?.data?.main_price_formatted && (
              <div className="flex items-center">
                <span className="text-customRed ml-1 font-medium text-[10px]">
                  {data.data.main_price != data.data.price &&
                    calculatePriceDrop(data.data.main_price, data.data.price)}
                </span>
                <p className="text-CloudGray text-[10px] font-light line-through ">
                  {data?.data?.main_price_formatted}
                </p>
              </div>
            )}
            <p className="text-customGray text-xs font-medium">
              {data?.data?.price_formatted}
            </p>
          </div>
        </div>
      </div>
      {showPopUpComment && <SendCommentPopUp src={data?.data?.media_files[0].main_link} title ={data?.data?.title} setShow={setShowPopUpComment}/>}
    </>
  );
}
