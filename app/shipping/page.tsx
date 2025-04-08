"use client";
import ArrowLeft from "@/components/icons/ArrowLeft";
import NewAddress from "@/components/icons/NewAddress";
import BoxAddress from "@/components/Shippping/BoxAddress";
import CreateAddress from "@/components/Shippping/CreateAddress";
import EditAddress from "@/components/Shippping/editAddress";
import OrderHowShipping from "@/components/Shippping/OrderHowShiping";
import PopupSelectAddress from "@/components/Shippping/PopupSelectAddress";
import Step from "@/components/Shippping/Step";
import NextBuy from "@/components/Skeleton/NextBuy";
import SkeletonStep from "@/components/Skeleton/SkeletonStep";
import { getDefaultAddress } from "@/utils/api/DefualtAddress";
import { getCart } from "@/utils/api/getCart";
import { getShipping } from "@/utils/api/shipping";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showEditpopup, setshowEdit] = useState<boolean>(false);
  const [Addressid, setAddressId] = useState<string>("");
  const [showCreateAddress, setShowCreateAddress] = useState<boolean>(false);
  const [isShippingDataLoaded, setIsShippingDataLoaded] = useState(false); // جدید: وضعیت بارگذاری shipping
  const [isAddressDataLoaded, setIsAddressDataLoaded] = useState(false); // جدید: وضعیت بارگذاری آدرس
  const rout = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const {
    data: shipping,
    isLoading: loadinShipping,
    refetch: refetchShipping,
  } = useQuery({
    queryKey: ["shipping"],
    queryFn: getShipping,
  });

  useEffect(() => {
    if (!loadinShipping && shipping?.data?.[0]?.id) {
      getDefaultAddress(shipping.data[0].id)
        .then(() => {
          setIsAddressDataLoaded(true); // وضعیت بارگذاری آدرس به true تغییر می‌کند
        })
        .catch(() => {
          setIsAddressDataLoaded(true); // حتی اگر خطا باشد، وضعیت به پایان می‌رسد
        })
        .finally(() => {
          setIsShippingDataLoaded(true); // وضعیت بارگذاری shipping به true تغییر می‌کند
        });
    }
  }, [shipping, loadinShipping]);

  useEffect(() => {
    if (data?.data.items.length === 0 && !isLoading) {
      rout.push("/cart");
    }
  }, [data, isLoading]);

  if (
    isLoading ||
    loadinShipping ||
    !isShippingDataLoaded ||
    !isAddressDataLoaded
  ) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-32  max-md:mt-0 pb-8 max-md:pb-0">
        <div className="max-md:hidden">
          <div className="mt-20 max-md:mt-0 flex justify-center animate-pulse">
            <div className="w-[163px] h-[57px] bg-gray-300 rounded"></div>
          </div>
          <SkeletonStep />
        </div>
        <div className="mt-14 max-md:mt-0 border max-md:border-0 rounded-2xl w-full max-w-[1294px] py-9 px-6 grid grid-cols-1 lg:grid-cols-[auto_306px] pb-40">
          <div className="pl-0 lg:pl-4">
            <div className="hidden items-center  text-customGray mb-8 max-md:hidden">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="mr-4 w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>

            <p className="mt-8 w-24 h-6 bg-gray-300 rounded animate-pulse"></p>
            <div className="mt-2 bg-lightBlueGray rounded-2xl border  py-8 px-9 flex flex-col md:flex-row justify-between items-start md:items-center animate-pulse">
              <div className="w-48 h-6 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded mt-2 md:mt-0"></div>
            </div>

            <p className="mt-8 w-24 h-6 bg-gray-300 rounded animate-pulse"></p>
            <div className="mt-2 bg-lightBlueGray rounded-2xl border border-[#76D7D7] py-8 px-9 flex flex-col md:flex-row justify-between items-start md:items-center animate-pulse">
              <div className="w-48 h-6 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded mt-2 md:mt-0"></div>
            </div>

            <div className="mt-16 max-md:mt-5">
              <div className="w-full flex justify-between items-center">
                <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="mt-2 rounded-2xl py-5 px-4 bg-lightBlueGray grid grid-cols-6  gap-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className=" p-9 h-16 bg-gray-300 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <NextBuy />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-center mt-32 max-md:mt-4 pb-8">
      {/* لوگو */}
      <Link href={"/"}>
        <Image
          className="mt-20 hidden lg:block"
          alt="mehra-logo"
          src={"/logo.svg"}
          width={163}
          height={57}
        />
      </Link>

      <Step currentStep={1} />

      <div className="mt-14 max-md:mt-0 border rounded-2xl max-md:border-0 w-full max-w-[1294px] py-9 max-md:py-0 px-6 grid grid-cols-1 lg:grid-cols-[auto_306px] pb-40  max-md:pb-4 gap-8">
        <div className="pl-0 lg:pl-4">
          <div
            className="hidden items-center  max-md:flex text-customGray mb-8"
            onClick={() => {
              rout.push("/cart");
            }}
          >
            <ArrowRight />
            <p className="mr-4 text-sm">آدرس و ارسال</p>
          </div>
          {data.data.address ? (
            <>
              <div className="flex justify-between mt-[71px] max-md:mt-0">
                <p className="font-medium text-lg text-charcoal max-md:text-sm">
                  آدرس{" "}
                </p>
                <p
                  className="text-lg text-aquaBlue font-medium cursor-pointer max-md:text-sm"
                  onClick={() => {
                    setShowPopup(true);
                  }}
                >
                  تغییر یا ویرایش
                </p>
              </div>

              <BoxAddress data={data.data.address} />
            </>
          ) : (
            <>
              <p className="mt-8 font-medium text-lg text-charcoal max-md:text-sm">
                آدرس تحویل سفارش
              </p>
              <div
                onClick={() => setShowPopup(true)}
                className="w-full lg:w-[50%] bg-lightBlueGray py-3 px-5 mt-8 rounded-xl flex justify-between cursor-pointer"
              >
                <p className="flex">
                  <NewAddress />
                  <span className="mr-4 text-xl font-medium text-customGray max-md:text-sm">
                    ثبت آدرس
                  </span>
                </p>
                <ArrowLeft />
              </div>
            </>
          )}

          <p className="mt-8 text-customGray text-lg font-medium max-md:text-sm">
            نحوه ارسال
          </p>
          <div className="mt-2 bg-lightBlueGray rounded-2xl border border-[#76D7D7] py-8 px-9 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer">
            <p className="text-customGray text-2xl font-light max-md:text-base max-md:font-medium">
              {shipping.data[0].title}
            </p>
            <p className="text-customGray font-light max-md:text-xs">
              {shipping.data[0].description}
            </p>
          </div>
          <div className="mt-16 max-md:mt-5">
            <div className="w-full flex justify-between items-center text-customGray">
              <p className="text-lg font-medium max-md:text-sm">اقلام سبد</p>
              <Link
                href={"/cart"}
                className="text-lg font-extralight max-md:text-xs"
              >
                اصلاح سبد
              </Link>
            </div>
            <div className="mt-2 rounded-2xl py-5 px-4 bg-lightBlueGray overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                {data.data?.items?.map((item: OrderItems, index: number) => (
                  <OrderHowShipping key={index} items={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lightBlueGray py-8 px-4 rounded-2xl flex flex-col text-customGray h-fit top-2 sticky">
          <div className="flex justify-between font-extralight">
            {`قیمت محصول${data.data.old_total_items > 1 ? "ات" : ""} (${
              data.data.old_total_items
            })`}{" "}
            <p>{data?.data?.total_main_price?.toLocaleString()} تومان</p>
          </div>
          <div className="flex justify-between mt-1 font-medium">
            <p>جمع سبد خرید </p>
            <p>{data.data.old_total_price_formatted}</p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between mt-1 font-light text-sm">
            <p> هزینه ارسال( {data.data.old_total_items} مرسوله) </p>
            <p>{data.data.shipping_price_formatted}</p>
          </div>
          <p className="mt-4 text-sm text-charcoal font-extralight leading-9">
            هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه شده
          </p>
          <hr className="my-6" />
          <div className=" justify-between mt-1 font-medium text-lg max-md:block hidden	">
            <p>قابل پرداخت</p>
            <p>{data.data.old_total_price_formatted}</p>
          </div>
          <div className="w-full justify-center flex mt-8 lg:mt-24 max-md:hidden">
            <button
              className="bg-customRed rounded-2xl px-10 lg:px-27 py-3 text-white text-lg font-bold hover:bg-red-800 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => {
                if (!data.data.address_id) {
                  toast.error("انتخاب ادرس الزامی میباشد");
                } else {
                  rout.push("/payment");
                }
              }}
            >
              ادامه
            </button>
          </div>

          {showPopup && (
            <PopupSelectAddress
              setAddressId={setAddressId}
              showEditpopup={showEditpopup}
              setshowEdit={setshowEdit}
              setShowPopup={setShowPopup}
              address_id={data.data.address_id}
              shippingId={shipping?.data[0]?.id}
              refectShipping={refetchShipping}
              refetch={refetch}
              setShowCreateAddress={setShowCreateAddress}
            />
          )}
          {showEditpopup && (
            <EditAddress
              setShowPopup={setShowPopup}
              setshowEdit={setshowEdit}
              id={Addressid}
              refectShipping={refetchShipping}
              refetch={refetch}
            />
          )}
          {showCreateAddress && (
            <CreateAddress
              refectShipping={refetchShipping}
              refetch={refetch}
              setShowCreateAddress={setShowCreateAddress}
            />
          )}
        </div>
      </div>

      <div className="hidden max-md:block fixed bottom-0 py-2 px-4 bg-light-gray w-full shadow-2xl">
        <div className="flex justify-between">
          <button
            className="bg-customRed text-sm font-bold px-16 py-3 text-white rounded-lg"
            onClick={() => {
              if (!data.data.address_id) {
                toast.error("انتخاب ادرس الزامی میباشد");
              } else {
                rout.push("/payment");
              }
            }}
          >
            ادامه
          </button>
          <div className="flex flex-col">
            <p className="text-[10px] font-light text-customGray 	">
              مبلغ قابل پرداخت
            </p>
            <p className="text-xs font-medium	text-darkGray">
              {data.data.total_price_formatted}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
