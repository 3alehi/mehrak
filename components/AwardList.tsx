"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface AwardItem {
  title: string;
  id:string;
  link?: string;
  media_files: {
    conversion_links: {
      thumbnail_192_192: string;
    };
  }[];
}

export default function AwardList({ awards }: { awards: AwardItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const MAX = 3;

  const visible = showAll ? awards : awards.slice(0, MAX);

  if (!awards?.length) return null;

  return (
    <div className="bg-light-gray py-12 max-md:py-4 pr-10 max-md:pr-5 rounded-md leading-9 h-fit">
      <p className="text-lg text-customGray font-medium">افتخارات و جوایز</p>
      {visible.map((award, index) => (
        <Link
          key={index}
          className="flex items-center text-customGray font-extralight text-lg max-md:text-sm mt-3"
          href={`/award/${award.id}` || "/"}
        >
          <Image
            className="rounded-full h-7 w-7"
            alt=""
            width={28}
            height={28}
            src={award.media_files[1]?.conversion_links.thumbnail_192_192}
          />
          <p className="mr-2">{award.title}</p>
        </Link>
      ))}
      {awards.length > MAX && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-aquaBlue text-lg font-light"
        >
          {showAll ? "نمایش کمتر" : "نمایش بیشتر"}
        </button>
      )}
    </div>
  );
}
