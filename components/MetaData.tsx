// app/components/MetadataComponent.tsx
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "عنوان صفحه",
    description: "توضیح مختصر درباره این صفحه",
    openGraph: {
      title: "عنوان برای اشتراک‌گذاری",
      description: "توضیحات Open Graph",
      images: ["/og-image.jpg"],
    },
  };
};

export default function MetadataComponent() {
  return null; // این کامپوننت چیزی رندر نمی‌کنه، فقط برای متادیتا هست.
}
