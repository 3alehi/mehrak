import Link from 'next/link';
import React from 'react';



type CreatorsProps = {
  data: CreatorData;
};

export default function Creators({ data }: CreatorsProps) {

  return (
   <Link href={`/creator/${data.id}`}>
    <div className='border w-[216px] max-md:h-[46px] h-[62px] max-md:w-[145px] flex rounded-full border-lightGrayBlue bg-lightBlueGray px-2 py-1'>
      <img className='h-[50px] w-[50px] max-md:w-[33px] max-md:h-[33px] rounded-full ' src={data?.media_files[0]?.main_link} alt="" />
      <div className='mr-3 text-customGray font-light text-lg max-md:text-xs max-md:font-light' >
        <p>{data.name}</p>
        <p className='text-base font-extralight max-md:font-light max-md:text-[10px]'>{data.role}</p>
      </div>
    </div>
   </Link>

  );
}
