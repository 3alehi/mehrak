import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MediaFile {
  main_link: string;
}

interface Item {
  title: string;
  id : number;
  media_files: MediaFile[];
}

interface SearchBoxProps {
  item: Item;
}

export default function SearchBox({ item }: SearchBoxProps) {
  if (!item?.media_files || item.media_files.length === 0) {
    return null; 
  }


  return (
   <Link href={`/product/${item.id}`}>
   
   <div className='py-1 px-2 border border-lightGrayBlue flex items-center rounded-lg bg-lightBlueGray w-[214px]'>
      <div className="relative w-[71px] h-[70px] bg-white overflow-hidden">
        <Image
          alt={item.title || 'Product Image'} 
          src={item.media_files[1].main_link}
          width={71}  
          height={70} 
          unoptimized
          className="object-cover object-center" 
          onLoadingComplete={(e) => e.classList.remove("blur-sm")}
          loading="lazy"
        />
      </div>
      <p className='mx-3 line-clamp-2 text-sm text-charcoal font-light'>{item.title}</p>
    </div>
   </Link>
  );
}