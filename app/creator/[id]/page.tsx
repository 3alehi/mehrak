import Breadcrumb from "@/components/Breadcrumb";
import ColletionBox from "@/components/Collection/ColletionBox";
import TextWithReadMore from "@/components/TextWithReadMore";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
interface BookItem {
  id: number;
  title: string;
  media_files: {
    main_link: string;
    conversion_links?: {
      thumbnail_192_192: string;
    };
  }[];
  price: number;
  main_price: number;
  price_formatted: string;
  main_price_formatted: string;
}



interface Creator {
  name: string;
  birthday?: string;
  nickname?: string;
  description?: string;
  media_files: {
    conversion_links: {
      thumbnail_192_192: string;
    };
  }[];
  awards: {
    title: string;
    link?: string;
  id:string;

    media_files: {
      conversion_links: {
        thumbnail_192_192: string;
      };
    }[];
  }[];
}


interface CreatorApiResponse {
  data: Creator;
}

interface BooksApiResponse {
  data: BookItem[];
}

async function getCreatorsBook(id: string, page: number): Promise<BookItem[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/books`);
  url.searchParams.append("page", String(page));
  url.searchParams.append("filter[creators.id]", id);

  const res = await fetch(url.toString(), {
    next: { revalidate: 21600 },
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.statusText}`);
  }

  const { data }: BooksApiResponse = await res.json();
  return data;
}

// Define the props type for the page and metadata
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params; // Await the params Promise to get { id: string }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators/${id}`);
  const { data }: CreatorApiResponse = await res.json();

  return {
    title: `${data.name} | اینطوریاس`,
    description: data.description || "توضیحات پیش‌فرض",
  };
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params; // Await the params Promise to get { id: string }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creators/${id}`, {
    next: { revalidate: 21600 },
  });
  const { data }: CreatorApiResponse = await res.json();
  const books = await getCreatorsBook(id, 1);

  return (
    <div className="mb-[150px] max-md:mb-[78px]">
      <div
        className="h-[268px] relative max-md:h-[177px] bg-cover"
        style={{ backgroundImage: "url('/Baner.png')" }}
      >
        <Breadcrumb
          showMobile={false}
          items={[
            { label: "اینطوریاس", href: "/" },
            { label: "پدیدآورندگان", href: "" },
            { label: "نویسندگان", href: "" },
            { label: data.name, href: "" },
          ]}
        />

        <div className="absolute -bottom-[96px] max-md:-bottom-[61px] mr-[154px] max-md:mr-0 max-md:justify-center max-md:w-full w-fit flex flex-col items-center">
          <Image
            className="w-[192px] max-md:w-[122px] max-md:h-[122px] h-[192px] rounded-full bg-black border-2 border-white"
            width={192}
            height={192}
            src={data.media_files[0]?.conversion_links.thumbnail_192_192}
            alt="Creator"
          />
        </div>
        <p className="text-customGray font-black text-4xl mr-[373px] absolute bottom-5 max-md:hidden">
          {data.name}
        </p>
      </div>

      <p className="text-customGray font-black text-xl hidden mt-19 mx-auto w-full max-md:flex justify-center">
        {data.name}
      </p>

      <div className="max-md:px-4">
        <div className="mt-4 grid grid-cols-2 mr-[373px] max-md:mr-0 max-md:grid-cols-1 gap-8">
          <div className="text-customGray text-lg font-extralight max-md:text-sm max-md:font-light">
            <p>
              متولد: {data.birthday} تخلص <span>{data.nickname || "ندارد"}</span>
            </p>
            <TextWithReadMore htmlContent={data.description || ""} />
          </div>

          {data.awards?.length > 0 && (
            <div className="bg-light-gray py-12 max-md:py-4 pr-10 max-md:pr-5 rounded-md leading-9 h-fit">
              <p className="text-lg text-customGray font-medium">افتخارات و جوایز</p>
              {data.awards.map((award: Creator["awards"][0], index: number) => (
  <Link
    key={index}
    className="flex items-center text-customGray font-extralight text-lg max-md:text-sm mt-3"
    href={`/award/${award.id}` || "/award"}
  >
    <Image
      className="rounded-full"
      alt=""
      width={28}
      height={28}
      src={award.media_files[0]?.conversion_links.thumbnail_192_192}
    />
    <p className="mr-2">{award.title}</p>
  </Link>
))}

            </div>
          )}
        </div>

        <div className="mt-19 max-md:mt-12">
          <div className="grid grid-cols-4 max-md:grid-cols-1 max-md:gap-2">
            {books.map((item: BookItem , index:number) => (
              <ColletionBox
              counter={index}

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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}