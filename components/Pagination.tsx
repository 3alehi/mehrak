'use client';
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  maxVisiblePagesDesktop?: number;
  maxVisiblePagesMobile?: number; 
  setPage: (page: number) => void; 
  currentPage2 : number
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  maxVisiblePagesDesktop = 5,
  maxVisiblePagesMobile = 3,
  currentPage2,
  setPage,
}) => {
  const [currentPage, setCurrentPage] = useState(currentPage2);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
      setCurrentPage(page);
      setPage(page);
    }
  };

  const getPages = (maxVisiblePages: number) => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(currentPage + halfVisible, totalPages);

    if (currentPage <= halfVisible) {
      endPage = Math.min(maxVisiblePages, totalPages);
    } else if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }
    if (endPage < totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640; 
  const pages = getPages(isMobile ? maxVisiblePagesMobile : maxVisiblePagesDesktop);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        className={`py-2 px-4 ml-2 sm:px-3 sm:py-1 rounded text-customGray ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-lightBlueGray hover:bg-gray-300"
        }`}
        disabled={currentPage === 1}
      >
        <ArrowRight />
      </button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 sm:px-3 sm:py-1 rounded border ${
              currentPage === page
                ? "bg-white border-aquaBlue"
                : "bg-lightBlueGray border-transparent hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1 sm:text-sm">...</span>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        className={`py-2 px-4 sm:px-3 sm:py-1 rounded text-customGray ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-lightBlueGray hover:bg-gray-300"
        }`}
        disabled={currentPage === totalPages}
      >
        <ArrowLeft />
      </button>
    </div>
  );
};

export default Pagination;
