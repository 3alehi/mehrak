// BookPage.tsx یا page.tsx

import AwardList from "@/components/AwardList";
import Breadcrumb from "@/components/Breadcrumb";
import ColletionBox from "@/components/Collection/ColletionBox";
import TextWithReadMore from "@/components/TextWithReadMore";
import { Metadata } from "next";
import Image from "next/image";

export interface BookItem {
  id: number;
  title: string;
  media_files: {
    conversion_links: {
      thumbnail_192_192: string;
    };
  }[];
  price: number;
  main_price: number;
  price_formatted: string;
  main_price_formatted: string;
}

export interface Creator {
  id: number;
  title: string;
  name?: string;
  birthday?: string;
  nickname?: string;
  description?: string;
  media_files: {
    conversion_links: {
      thumbnail_192_192: string;
    };
  }[];
  awards: {
    id: number;
    title: string;
    link?: string;
    media_files: {
      conversion_links: {
        thumbnail_192_192: string;
      };
    }[];
  }[];
}

export interface CreatorApiResponse {
  data: Creator;
}

export interface BooksApiResponse {
  data: BookItem[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

interface Award {
  id: string;
  title: string;
  link?: string;
  media_files: {
    conversion_links: {
      thumbnail_192_192: string;
    };
  }[];
}

interface AwardsApiResponse {
  data: Award[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getDataAwards(): Promise<AwardsApiResponse> {
  const res = await fetch(`https://mehra.liara.run/api/v1/awards?page=1`, {
    next: { revalidate: 21600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch awards: ${res.statusText}`);
  }

  return res.json();
}

async function getBooksPublisher( page: number): Promise<BooksApiResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/books`);
  url.searchParams.append("page", String(page));
  // url.searchParams.append("filter[producers.id]",1);

  const res = await fetch(url.toString(), {
    next: { revalidate: 21600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch books: ${res.statusText}`);
  }

  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/producers/${id}`, {
    next: { revalidate: 21600 },
  });

  if (!res.ok) {
    return {
      title: "خطا | اینطوریاس",
      description: "خطا در بارگذاری اطلاعات ناشر",
    };
  }

  const { data }: CreatorApiResponse = await res.json();

  return {
    title: data.title ? `${data.title} | اینطوریاس` : "ناشر | اینطوریاس",
    description: data.description || "توضیحات پیش‌فرض",
  };
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;


  // Fetch producer data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/producers/${id}`, {
    next: { revalidate: 21600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch producer: ${res.statusText}`);
  }

  const { data }: CreatorApiResponse = await res.json();

  const awards = await getDataAwards();

  let books: BookItem[] = [];

  try {
    const booksResponse = await getBooksPublisher(1);
    books = booksResponse.data;

    
  } catch (err) {
    console.error("Error fetching books:", err); // 👈 لاگ ارور
  }

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
            { label: "ناشران", href: "" },
            { label: data.title || "ناشر", href: "" },
          ]}
        />

        <div className="absolute -bottom-[96px] max-md:-bottom-[61px] mr-[154px] max-md:mr-0 max-md:justify-center max-md:w-full w-fit flex flex-col items-center">
          <Image
            className="w-[192px] max-md:w-[122px] max-md:h-[122px] h-[192px] rounded-full bg-black border-2 border-white"
            width={192}
            height={192}
            src={data.media_files?.[0]?.conversion_links.thumbnail_192_192 || "/fallback-image.jpg"}
            alt={data.title || "Producer"}
          />
        </div>
        <p className="text-customGray font-black text-4xl mr-[373px] absolute bottom-5 max-md:hidden">
          {data.title || "ناشر"}
        </p>
      </div>

      <p className="text-customGray font-black text-xl hidden mt-19 mx-auto w-full max-md:flex justify-center">
        {data.title || "ناشر"}
      </p>

      <div className="max-md:px-4">
        <div className="mt-4 grid grid-cols-2 mr-[373px] max-md:mr-0 max-md:grid-cols-1 gap-8">
          <div className="text-customGray text-lg font-extralight max-md:text-sm max-md:font-light">
            <TextWithReadMore htmlContent={data.description || "بدون توضیحات"} />
          </div>

          {awards.data?.length > 0 && <AwardList awards={awards.data} />}
        </div>

        <div className="mt-19 max-md:mt-12">
          <div className="grid grid-cols-4 max-md:grid-cols-1 max-md:gap-2">
            {books.map((item: BookItem,index:number) => (
              <ColletionBox
                key={index}
                counter={index}

                id={item.id}
                src={item.media_files.map((file) => ({
                  main_link: file.conversion_links.thumbnail_192_192,
                }))}
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
