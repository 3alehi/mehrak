import React from 'react'
import SummeryIcons from '../icons/SummeryIcons'
import { Button } from '../ui/button'

type SummaryProps = {
  des: string;
  descriptionRef: React.RefObject<HTMLDivElement | null>;
};

export default function Summary({ des, descriptionRef }: SummaryProps) {
  return (
    <div className='w-full bg-lightBlueGray rounded-tl-[45px] rounded-lg rounded-br-[45px] px-4 py-4 max-md:hidden'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-center justify-between ml-4'>
          <SummeryIcons />
        </div>
        <div className='text-customGray font-light line-clamp-2 w-[100%] leading-9' dangerouslySetInnerHTML={{ __html: des }} />
        <Button
          onClick={(e) => {
            e.preventDefault();
            const yOffset = -160; 
            if (descriptionRef.current) {
              const y = descriptionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className='py-3 px-4 mr-3 mt-4 text-customRed bg-transparent border hover:bg-red-200 border-customRed'
        >
          ادامه توضیحات
        </Button>
      </div>
    </div>
  );
}
