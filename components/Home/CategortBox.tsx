import React from 'react';

interface CategoryBoxProps {
  title: string;
  icon: string;  // Assuming the `icon` is a URL string
}

export default function CategoryBox({ title, icon }: CategoryBoxProps) {
  return (
    <div className="bg-[#F7F7F7] w-[133px] h-[133px] max-md:w-[76px] max-md:h-[76px] rounded-lg flex items-center justify-center flex-col">
      <img 
        className="w-[96px] h-[96px] max-md:w-[48px] max-md:h-[48px] object-cover bg-transparent" 
        src={icon}  // Using the `icon` prop here for dynamic image URL
        alt={title}  // Using `title` as the alt text for better accessibility
      />
      <p className='-mt-4 mb-2 text-lg text-customGray font-normal max-md:text-[10px] max-md:mt-1'>{title}</p>
    </div>
  );
}
