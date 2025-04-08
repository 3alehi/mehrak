// app/layout.tsx
import ClientWrapper from "./ClientWrapper";
import "./globals.css";
import type { Metadata } from "next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}