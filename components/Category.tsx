"use client";
import React from "react";
import Book from "./icons/Book";
import Stationery from "./icons/Stationery";
import Stuf from "./icons/Stuf";
import Toy from "./icons/Toy";
import Blog from "./icons/Blog";
import Link from "next/link";

const Category: React.FC = () => {
  const category = [
    { id: 7, title: "کتاب", icon: <Book /> },
    { id: 20, title: "لوازم التحریر", icon: <Stationery /> },
    { id: 18, title: "خنزل ، پنزل", icon: <Stuf></Stuf> },
    { id: 19, title: "اسباب بازی", icon: <Toy /> },
    { id: 5, title: "مجله مهرا", icon: <Blog /> },
  ];

  return (
    <div className="w-full h-[52px] bg-lightBlueGray max-md:hidden shadow-lg">
      <div className="container mx-auto h-full border-t border-t-lightGrayBlue border-b border-b-aquaBlue">
        <ul className="flex items-center h-full">
          {category.map((item, index) => (
            <Link
              href={item.id !== 5 ? `/category/${item.id}` : "/blog"}
              key={item.id}
              className={`px-6 text-charcoal text-sm font-light border-lightGrayBlue2 z-[500] cursor-pointer flex items-center transform transition-all duration-300 ease-in-out hover:text-aquaBlue hover:scale-105 hover:border-aquaBlue ${
                index !== category.length - 1 ? "border-l" : ""
              }`}
            >
              <i className="ml-2">{item.icon}</i>
              {item.title}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
