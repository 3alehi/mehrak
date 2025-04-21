import { getHome } from "@/utils/api/getHome";
import Slider from "@/components/Home/Slider";
import Special from "@/components/Home/Special";
import BookCategory from "@/components/Home/BookCategory";
import Suggest from "@/components/Home/Suggest";
import SuggestBooke from "@/components/Home/SuggestBooke";
import CollectionListBox from "@/components/CollectionListBox";
import AllPublisher from "@/components/Home/AllPublisher";
import Writer from "@/components/Home/Writer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "اینطوریاس",
    template: "%s | فروشگاه آنلاین من",
  },
  description: "بهترین محصولات با قیمت مناسب و ارسال سریع در فروشگاه ما.",
  keywords: "فروشگاه آنلاین, خرید آسان, محصولات باکیفیت, ارسال سریع",
  openGraph: {
    title: "فروشگاه آنلاین من",
    description: "خرید آسان و سریع با بهترین قیمت‌ها",
    url: "https://yourwebsite.com",
    type: "website",
    locale: "fa_IR",
  },
};
const Page = async () => {
  const data = await getHome(); 
console.log(data);

  return (
    <div className="mb-[100px] max-md:mb-10">
      <div className="w-full">
        <Slider data={data} />
      </div>
      <div className="mt-12 px-[70px]  max-md:px-0 max-md:mt-0">
      <Special data={data} />

      </div>
      <div className="mt-12  container mx-auto max-md:mt-0">
        <div className="max-md:px-4">
          <BookCategory
            data={data.data["categories[0]"]}
            title={"دسته بندی کتاب ها"}
          />
        </div>
        <div className="mt-12 max-md:px-4 max-md:mt-10">
          <Suggest data={data.data["collections[0]"][0]} dark={false} />
        </div>
        <div className="mt-12">
          <SuggestBooke data={data.data["collections[3]"][0]} />
        </div>
        <div className="max-md:px-4">
          <BookCategory
            data={data.data["categories[1]"]}
            title={"دسته بندی لوازم التحریر ، خنزل - پنزل و اسباب بازی"}
          />
          <div className="grid grid-cols-3 mt-12 gap-4 border p-2 rounded-2xl overflow-hidden max-md:grid-cols-1">
            {data.data["collections[2]"].slice(0, 4).map((item: CollectionData) => (
              <CollectionListBox key={item.id} data={item} />
            ))}
          </div>
          <div className="mt-16 max-md:mt-11 grid grid-cols-2 gap-5 max-md:gap-2 max-md:grid-cols-1 ">
            {data.data["banners[2]"]?.map(
              (item: { id: number; media_files: MediaFile[]; title: string ; url:string}) => (
                <Link href={item.url} key={item.id}>
                  <img
                    className="w-full h-[321px] max-md:h-[167px] rounded-2xl"
                    src={item.media_files[0].main_link}
                    alt={item.title}
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <div className="mt-16 bg-[#101010] max-md:mt-11">
        <div className="container mx-auto max-md:px-4">
          <Suggest data={data.data["collections[1]"][0]} dark={true} />
        </div>
      </div>
      <div className="container mx-auto mt-27 max-md:mt-11">
        <div className="mt-16 max-md:mt-11">
          <Writer data={data.data.authors} />
        </div>
        <div className="mt-[100px] max-md:mt-11">
          <AllPublisher data={data.data.publishers} />
        </div>
      </div>
    </div>
  );
};

export default Page;
