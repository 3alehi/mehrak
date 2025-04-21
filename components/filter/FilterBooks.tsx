"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useTransition,
  useDeferredValue,
} from "react";
import Sorting from "../icons/Sorting";
import DeleteFilterParamsIcon from "../icons/DeleteFilterParamsIcon";
import { useRouter, useSearchParams } from "next/navigation";
import DropDownFilter from "../icons/DropDownFilter";
import DropUp from "../icons/DropUp";

interface FilterOption {
  id: string | number;
  title: string;
}

interface Filter {
  name: string;
  title: string;
  value: FilterOption[];
  multiple: boolean;
}

interface Filters {
  [key: string]: string[];
}

export async function getFilterData(): Promise<Filter[]> {
  const res = await fetch("https://mehra.liara.run/api/v1/filters/products", {
    next: { revalidate: 3 * 24 * 60 * 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch filters: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.data;
}

const sortOptions = [
  "جدیدترین",
  "پربازدیدترین",
  "پرفروش‌ترین",
  "بیشترین تخفیف",
  "ارزان‌ترین",
  "گران‌ترین",
  "پیشنهاد خریداران",
];

const sortMap: { [key: string]: string } = {
  جدیدترین: "id",
  پربازدیدترین: "views",
  پرفروش‌ترین: "sales",
  "بیشترین تخفیف": "-discount",
  ارزان‌ترین: "sale_price",
  گران‌ترین: "-sale_price",
  "پیشنهاد خریداران": "recommended",
};

const FilterBooks: React.FC = () => {
  const [filterData, setFilterData] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({});
  const [selectedSort, setSelectedSort] = useState("جدیدترین");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});

  const deferredFilters = useDeferredValue(selectedFilters);
  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFilterData();
        setFilterData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filterData.length === 0) return;

    const filtersFromURL: Filters = {};
    filterData.forEach((filter) => {
      const raw = searchParams.get(filter.name);
      if (raw) filtersFromURL[filter.name] = raw.split(",");
    });

    const sort = searchParams.get("sort");
    if (sort && Object.values(sortMap).includes(sort)) {
      const sortLabel = Object.keys(sortMap).find(
        (key) => sortMap[key] === sort
      );
      if (sortLabel) setSelectedSort(sortLabel);
    }

    setSelectedFilters(filtersFromURL);
  }, [filterData, searchParams]);

  const updateURLParams = (filters: Filters, sort: string) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","));
      }
    });
    params.set("sort", sortMap[sort] || "id");
    router.replace("?" + params.toString(), { scroll: false });
  };

  const toggleFilter = (filterName: string, option: string | number) => {
    const current = selectedFilters[filterName] || [];
    const optionStr = String(option);
    const updated = current.includes(optionStr)
      ? current.filter((v) => v !== optionStr)
      : [...current, optionStr];

    const newFilters = {
      ...selectedFilters,
      [filterName]: updated,
    };

    startTransition(() => {
      setSelectedFilters(newFilters);
      updateURLParams(newFilters, selectedSort);
    });
  };

  const removeFilter = (filterName: string, value: string) => {
    const newFilters = {
      ...selectedFilters,
      [filterName]:
        selectedFilters[filterName]?.filter((v) => v !== value) || [],
    };

    startTransition(() => {
      setSelectedFilters(newFilters);
      updateURLParams(newFilters, selectedSort);
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setOpenDropdown(null);
      setSearchTerms({}); // ریست کردن عبارت‌های جستجو هنگام بستن دراپ‌داون
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (filterName: string, value: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <div>
      <div
        ref={wrapperRef}
        className="w-full border text-customGray font-extralight py-4 px-6 rounded-2xl flex flex-wrap gap-4 items-center justify-between font-vazirmatn bg-white  relative"
      >
        <div className="flex flex-wrap gap-5 items-center">
          {filterData.map((filter) =>
            filter.value.length ? (
              <div key={filter.name} className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === filter.name ? null : filter.name
                    )
                  }
                  className=" rounded-lg bg-white w-full max-w-[200px] truncate flex items-center"
                >
                <p className="ml-2">                  {openDropdown === filter.name ? <DropUp /> :                   <DropDownFilter/>                  }
                </p>
                  {filter.title}
                </button>

                {openDropdown === filter.name && (
                  <div className="absolute z-[1] mt-2 right-0 bg-white border rounded-lg shadow-lg p-3 w-48 flex flex-col gap-2 max-h-72 overflow-y-auto text-right scrollbar-thin scrollbar-thumb-gray-300">
                    {filter.value.length > 7 && (
                      <input
                        type="text"
                        placeholder="جستجو..."
                        value={searchTerms[filter.name] || ""}
                        onChange={(e) =>
                          handleSearchChange(filter.name, e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    )}
                    {filter.value
                      .filter((option) =>
                        searchTerms[filter.name]
                          ? option.title
                              .toLowerCase()
                              .includes(
                                searchTerms[filter.name].toLowerCase()
                              )
                          : true
                      )
                      .map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <span className="relative w-5 h-5">
                            <input
                              type={filter.multiple ? "checkbox" : "radio"}
                              name={filter.name}
                              checked={
                                !!deferredFilters[filter.name]?.includes(
                                  String(option.id)
                                )
                              }
                              onChange={() =>
                                toggleFilter(filter.name, option.id)
                              }
                              className="peer opacity-0 absolute w-5 h-5 cursor-pointer"
                            />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-md group-hover:border-gray-400 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors duration-150">
                              {filter.multiple && (
                                <svg
                                  className="w-3 h-3 text-white hidden peer-checked:block"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4lach 12" />
                                </svg>
                              )}
                            </div>
                          </span>
                          <span className="text-sm text-gray-800 truncate">
                            {option.title}
                          </span>
                        </label>
                      ))}
                  </div>
                )}
              </div>
            ) : null
          )}
        </div>

        <div className="relative">
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "sort" ? null : "sort")
            }
            className="px-4 py-2 bg-white flex items-center gap-2"
          >
            <Sorting />
            مرتب‌سازی: {selectedSort}
          </button>

          {openDropdown === "sort" && (
            <div className="absolute z-20 mt-2 right-0 bg-white border rounded-lg shadow-lg p-3 w-52 flex flex-col gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    startTransition(() => {
                      setSelectedSort(option);
                      updateURLParams(selectedFilters, option);
                      setOpenDropdown(null);
                    });
                  }}
                  className={`text-right px-2 py-1 rounded-md transition-all ${
                    selectedSort === option
                      ? "bg-gray-100 text-primary font-semibold"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-2 flex flex-wrap gap-2 px-6 text-sm text-gray-700">
        {Object.entries(deferredFilters).map(([key, values]) =>
          values.map((val) => {
            const filterTitle =
              filterData
                .find((f) => f.name === key)
                ?.value.find((v) => String(v.id) === val)?.title || val;

            return (
              <div
                key={`${key}-${val}`}
                className="px-5 py-3 rounded-lg flex items-center text-customGray text-sm bg-[#F8F9FB]"
              >
                <span
                  className="ml-2 cursor-pointer"
                  onClick={() => removeFilter(key, val)}
                >
                  <DeleteFilterParamsIcon />
                </span>
                <span>{filterTitle}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FilterBooks;