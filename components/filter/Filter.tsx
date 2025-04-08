import React, { useState } from 'react';
import Sorting from '../icons/Sorting';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import FilterIcon from '../icons/FilterIcon';


interface FilterProps {
  setSort: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ setSort }) => {
  const [selectedOption, setSelectedOption] = useState<string>('جدیدترین');

  const sortOptions: Record<string, string> = {
    'جدیدترین': 'id',
    'گران‌ترین': '-sale_price',
    'ارزان‌ترین': 'sale_price',
    'تعداد فروش': 'sales_count',
    'بیشترین تخفیف': '-n',
    'پرفروش‌ترین': 'sales_count',
    'پیشنهاد خریداران': 'id', 
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); 
    setSort(sortOptions[option]); 
  };

  return (
    <div className="w-full border text-customGray font-extralight rounded-xl py-3 px-5 flex items-center justify-between">
    <div className="flex max-md:hidden">
      <p className="cursor-pointer">DropDown</p>
    </div>
    <div className='hidden max-md:flex  items-center'>
      <FilterIcon/>
      <p className='text-customGray text-sm font-normal mr-2'> فیلترها</p>

    </div>

    <div className="flex items-center relative">
      <Sorting />
      <p className="mr-4 text-customGray max-md:hidden  max-md:text-sm">مرتب سازی:</p>
      <div className="relative">
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-customGray font-extralight text-[16px] font-vazirmatn">
          {selectedOption}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-lightGray w-fit rounded-md shadow-2xl text-sm font-light font-vazirmatn text-customGray absolute left-2 top-[-48px] mt-2"
        style={{ minWidth: "150px", maxWidth: "300px" }}
      >
        {Object.keys(sortOptions).map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleOptionClick(option)}
            className="cursor-pointer p-2  rounded-md w-full whitespace-nowrap"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    </div>
  </div>
  );
};

export default Filter;
