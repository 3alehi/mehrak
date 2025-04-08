
// import React from 'react'
// import ClientPage from '../ClientPage'

// export default function page() {
//   return (
//     <div>
//       <ClientPage/>
//     </div>
//   )
// }


import type { Metadata, NextPage } from 'next';
import ClientPage from '../ClientPage';

type PageParams = {
  id: string;
}

type PageProps = {
  params: Promise<PageParams>;
}

export async function generateMetadata(
  { params }: { params: Promise<PageParams> }
): Promise<Metadata> {
  const { id } = await params;
  const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`).then((res) => res.json());

  return {
    title: `${product?.data?.title} | اینطوریاس`,
    description: product?.data?.description || "توضیحات پیش‌فرض",
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  await params;
  return (
    <div>
      <ClientPage />
    </div>
  );
};

export default Page;