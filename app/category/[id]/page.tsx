import React from 'react'
import ClientCategory from './ClientCategory'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: {
    default: "دسته بندی ها",
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
export default function page() {
  return (

    <ClientCategory/>
  )
}
