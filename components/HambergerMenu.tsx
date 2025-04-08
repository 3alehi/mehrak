import Image from "next/image";
import Link from "next/link";
import React from "react";
import Close from "./icons/Close";
import SearchComponnent from "./SearchComponnent";
import Book from "./icons/Book";
import Stationery from "./icons/Stationery";
import Stuf from "./icons/Stuf";
import Toy from "./icons/Toy";
import Blog from "./icons/Blog";

interface HambergerMenuProps {
  setShow: (value: boolean) => void;
}

const HambergerMenuComponnent: React.FC<HambergerMenuProps> = ({ setShow }) => {
  const category = [
    { id: 7, title: "کتاب", icon: <Book /> },
    { id: 20, title: "لوازم التحریر", icon: <Stationery /> },
    { id: 18, title: "خنزل ، پنزل", icon: <Stuf></Stuf> },
    { id: 19, title: "اسباب بازی", icon: <Toy /> },
    { id: 5, title: "مجله مهرا", icon: <Blog /> },
  ];
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-start justify-center">
      <div className="w-full  flex flex-col px-4 justify-start pt-4">
        <div className="w-full flex justify-between items-center px-4">
   
          <Link href={"/"}>
            <Image
              alt="logo-mehra"
              src={"/logo.svg"}
              width={177}
              height={27}
              unoptimized
              className="w-[167px] max-md:w-[92px] max-md:h-9"
              onLoadingComplete={(e) => e.classList.remove("blur-sm")}
              loading="lazy"
            />
          </Link>
          <button
            onClick={() => setShow(false)}
            className=" py-2 rounded-md"
          >
            <Close/>
          </button>
        </div>
<div className="w-full  mt-5">
<SearchComponnent setShow={setShow} show={true}/>
  
  </div>   
  <div className="mt-5">
    <ul className="gap-y-6 flex flex-col">

    {category.map(item =>(
      <Link  href={ item.id != 5 ? `/category/${item.id}` : '/blog'} onClick={()=>{
        setShow(false)
      }} key={item.id} className="flex text-customGray text-xs"> 
        <span className="ml-4">{item.icon}</span>
        {item.title}
        
      </Link>
    ))}
    </ul>
    </div>    
      </div>
    </div>
  );
};

export default HambergerMenuComponnent;
