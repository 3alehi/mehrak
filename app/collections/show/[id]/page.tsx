"use client";
import Breadcrumb from "@/components/Breadcrumb";
import ColletionBox from "@/components/Collection/ColletionBox";
import Filter from "@/components/filter/Filter";
import DeleteProduct from "@/components/icons/DeleteProduct";
import Save from "@/components/icons/Save";
import Share from "@/components/icons/Share";
import Pagination from "@/components/Pagination";
import CollectionSkeleton from "@/components/Skeleton/CollectionSkeleton";
import FilterSkeleton from "@/components/Skeleton/FilterSkeleton";
import HeaderCollectionSkeleton from "@/components/Skeleton/HeaderCollectionSkeleton";
import { likeCollection } from "@/utils/api/addLike";
import { unlikeCollection } from "@/utils/api/deleteLike";
import { fetchBooks } from "@/utils/api/getBookCollection";
import { getProfileCollections } from "@/utils/api/getCollection";
import { getCollectionById } from "@/utils/api/getColletion";
import { getTokenFromCookie } from "@/utils/helper/getCooki";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page: React.FC = () => {
  const { id } = useParams();
  const [save, setSave] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const [unlike, setUnLike] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => getCollectionById(id as string),
  });
  const hasToken = getTokenFromCookie();
  const rout = useRouter();
  const {
    data: allData,
    isLoading: isLoadingAll,
    refetch: refetchAllData,
  } = useQuery({
    queryKey: ["collection"],
    queryFn: getProfileCollections,
  });
  const { data: bookData, isLoading: isLoadingBook } = useQuery({
    queryKey: ["book", id, page],
    queryFn: () => fetchBooks(id as string, page),
  });

  useEffect(() => {
    if (hasToken) {
      if (!isLoadingAll && allData?.data) {
        const check = allData.data.find(
          (item: { id: string }) => item.id == id
        );
        setSave(!!check);
      }
    }
  }, [allData, id, isLoadingAll]);

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

  if (isLoading || isLoadingAll || isLoadingBook) {
    return (
      <div className="pb-5">
        <HeaderCollectionSkeleton />

        <FilterSkeleton />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5">
          {new Array(11).fill(1).map((_, index) => (
            <CollectionSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-5 max-md:px-4">
      <Breadcrumb
        items={[
          { label: "اینطوریاس", href: "/" },
          { label: "لیست ها", href: "collections/list" },
          { label: data?.data.title, href: "" },
        ]}
      />
      <div
        className="w-full mt-3 max-md:rounded-none rounded-3xl h-[268px] border-b-[3px]  max-md:h-[171px] border-turquoise flex flex-col justify-between relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${data?.data.media_files[1].main_link})`,
        }}
      >
        <div className="w-full flex justify-end px-5 py-4">
          <p
            className="py-3 px-5 bg-lightBlueGray border-2 border-white b w-fit rounded-lg cursor-pointer"
            onClick={handelCopy}
          >
            <Share />
          </p>
        </div>

        <div className="pl-5 pr-5 md:pl-36 md:pr-[360px] pb-8 flex flex-col md:flex-row justify-between items-center max-md:hidden">
          <p className="text-2xl md:text-4xl font-black text-white text-center md:text-left">
            {data?.data.title}
          </p>
          <div className="z-10">
            {!save ? (
              <button
                onClick={() => {
                  if (hasToken) {
                    setLike(true);
                    likeCollection(id as string)
                      .then((res) => {
                        toast.success(res.data.message);
                        refetchAllData();
                        setSave(true);
                      })
                      .finally(() => {
                        setLike(false);
                      });
                  } else {
                    rout.push("/login");
                  }
                }}
                disabled={like}
                className={`text-turquoise border font-medium border-lightGrayBlue rounded-lg py-3 px-10 md:px-16 flex items-center bg-white ${
                  like ? " cursor-not-allowed" : ""
                }`}
              >
                {like ? (
                  <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-turquoise"></div>
                ) : (
                  <span className="pl-2">
                    <Save />
                  </span>
                )}
                ذخیره
              </button>
            ) : (
              <button
                onClick={() => {
                  if (hasToken) {
                    setUnLike(true);
                    unlikeCollection(id as string)
                      .then((res) => {
                        if (hasToken) {
                          refetchAllData();
                          toast.success(res.data.message);
                          setSave(false);
                        }
                      })
                      .catch(() => {
                        toast.error("مشکلی رخ داد.");
                      })
                      .finally(() => {
                        setUnLike(false);
                      });
                  } else {
                    rout.push("/login");
                  }
                }}
                disabled={unlike}
                className={`text-turquoise border font-medium border-lightGrayBlue rounded-lg py-3 px-10 md:px-16 flex items-center bg-white ${
                  unlike ? "cursor-not-allowed" : ""
                }`}
              >
                {unlike ? (
                  <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-turquoise"></div>
                ) : (
                  <span className="pl-2">
                    <DeleteProduct />
                  </span>
                )}
                حذف
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-[-60px] md:bottom-[-100px] right-0 md:right-0 pr-5 md:pr-36 flex md:block justify-center w-full">
          <div className="w-[120px] h-[120px] md:w-[192px] md:h-[192px] rounded-full overflow-hidden border-white border-[3px]">
            <img src="/logo.svg" alt="logo" className="w-full h-full" />
          </div>
        </div>
      </div>

      <div
        className="pr-[360px] text-customGray text-base md:text-lg font-extralight mt-3 max-md:hidden"
        dangerouslySetInnerHTML={{ __html: data?.data.description }}
      />
      <div className="pl-5 pr-5 hidden max-md:flex md:pl-36 md:pr-[360px] pb-8  flex-col md:flex-row justify-between items-center max-md: mt-16">
        <p className="text-2xl md:text-xl max-md:font-black font-black text-customGray text-center md:text-left">
          {data?.data.title}
        </p>
        <div className="mt-3 hidden max-md:block">
          {!save ? (
            <button
              onClick={() => {
                setLike(true);
                likeCollection(id as string)
                  .then((res) => {
                    toast.success(res.data.message);
                    refetchAllData();
                    setSave(true);
                  })
                  .finally(() => {
                    setLike(false);
                  });
              }}
              disabled={like}
              className={`text-turquoise border font-medium border-lightGrayBlue rounded-lg py-3 px-10 md:px-16 flex items-center bg-white ${
                like ? " cursor-not-allowed" : ""
              }`}
            >
              {like ? (
                <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-turquoise"></div>
              ) : (
                <span className="pl-2">
                  <Save />
                </span>
              )}
              ذخیره
            </button>
          ) : (
            <button
              onClick={() => {
                setUnLike(true);
                unlikeCollection(id as string)
                  .then((res) => {
                    refetchAllData();
                    toast.success(res.data.message);
                    setSave(false);
                  })
                  .catch(() => {
                    toast.error("مشکلی رخ داد.");
                  })
                  .finally(() => {
                    setUnLike(false);
                  });
              }}
              disabled={unlike}
              className={`text-turquoise border font-medium border-lightGrayBlue  rounded-lg py-3 px-10 md:px-16 flex items-center bg-white ${
                unlike ? "cursor-not-allowed" : ""
              }`}
            >
              {unlike ? (
                <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-turquoise"></div>
              ) : (
                <span className="pl-2">
                  <DeleteProduct />
                </span>
              )}
              حذف
            </button>
          )}
        </div>
      </div>
      <div
        className="px-5  text-customGray text-base md:text-lg font-extralight mt-3 max-md:block hidden"
        dangerouslySetInnerHTML={{ __html: data?.data.description }}
      />

      <div className="mt-24  w-full max-md:mt-6">
        <Filter setSort={() => {}} />
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {bookData?.data?.map((item: BookItem, _: number) => (
          <ColletionBox
            key={_}
            id={item.id}
            src={item.media_files}
            title={item.title}
            main_price_formatted={item.main_price_formatted}
            price_formatted={item.price_formatted}
            price={item.price}
            main_price={item.main_price}
            page={page}
          />
        ))}
      </div>
      <div className="my-[119px]">
        {bookData && bookData.meta && bookData.meta.last_page > 1 && (
          <Pagination
            totalPages={bookData.meta.last_page}
            currentPage2={bookData.meta.current_page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
