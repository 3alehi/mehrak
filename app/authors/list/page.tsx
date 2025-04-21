import Breadcrumb from "@/components/Breadcrumb";
import ListPublisherBox from "@/components/ListPublisherBox";
import PublisherBox from "@/components/PublisherBox";
import { getListPublisher } from "@/utils/api/getListPublisher";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: 'نویسندگان مطرح امروز',
  description: '...',
}
export default async function Page() {
  const data = await getListPublisher();

  return (
    <div className="mb-[95px] max-md:mb-[77px]">
      <Breadcrumb
        items={[
          { label: "اینطوریاس", href: "/" },
          { label: "پدیدآورندگان", href: "" },
        ]}
      />

      <div
        className="w-full h-[159px] mb-16 max-md:mb-4 mt-4 max-md:h-[177px] px-10 flex flex-row items-center max-md:justify-center relative bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url('/Baner.png')" }}
      >
        <h1 className="font-black text-4xl text-customGray max-md:text-xl">
          نویسندگان
        </h1>
      </div>
      <p className="w-full hidden max-md:flex justify-center mb-12 font-black text-customGray">
        {" "}
        پدیدآورندگان مطرح امروز
      </p>
      <div className="grid grid-cols-[410px_auto] max-md:grid-cols-1 gap-x-5 max-md:">
        <div className="w-full max-md:hidden h-[159px]  bg-light-gray rounded-r-2xl py-8 px-11 flex flex-col justify-center items-start text-center">
          <p className="text-customGray font-black text-2xl">
            نویسندگان مطرح امروز
          </p>
        </div>

        <ListPublisherBox data={data} />
      </div>
      <div className="mt-14 grid grid-cols-6 max-md:grid-cols-2 w-full gap-[1px] rounded-xl overflow-hidden max-md:px-4">
        {data.data.map(
          (
            item: {
              name: string;
              id:string;
              books_count: number;
              media_files: MediaFile[];
            },
            key: number
          ) => (
            <PublisherBox key={key} item={item} />
          )
        )}
      </div>
    </div>
  );
}
