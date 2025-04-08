import React from "react";
import ArrowLeftBread from "./icons/ArrowLeftBread";

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showMobile?: boolean;
}

export default function Breadcrumb({ items, showMobile = true }: BreadcrumbProps) {
  return (
    <div className={`${!showMobile && 'max-md:hidden'}`}>
        <nav className="mt-6 flex items-center font-light text-sm text-customGray">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {item.href ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span className="text-gray-500">{item.label}</span>
              )}
              {index < items.length - 1 && <ArrowLeftBread />}
            </div>
          ))}
        </nav>
      
    </div>
  );
}
