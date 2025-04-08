"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getState } from "@/utils/api/getState";
type Item = {
  id: string;
  title: string;
  value: string;
};

const Skeleton = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-9 bg-gray-300 rounded-md"></div>
    <div className="space-y-1">
      <div className="h-8 bg-gray-200 rounded-md"></div>
      <div className="h-8 bg-gray-200 rounded-md"></div>
      <div className="h-8 bg-gray-200 rounded-md"></div>
    </div>
  </div>
);

interface ComboboxDemoProps {
  value: string;
  setValue: (value: string) => void;
  setid: (value: string) => void;
}

const ComboboxDemo: React.FC<ComboboxDemoProps> = ({
  setValue,
  value,
  setid,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["Address"],
    queryFn: getState,
  });

  const [open, setOpen] = React.useState(false);

  // حالت بارگذاری
  if (isLoading) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] max-md:w-full justify-between border bg-gray-100 "
          >
            <Skeleton /> {/* نمایش اسکلتون به جای دکمه */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 border bg-white ">
          <Skeleton /> {/* نمایش اسکلتون به جای لیست آیتم‌ها */}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] max-md:w-full justify-between border bg-white hover:bg-gray-50"
        >
          {value
            ? data?.data?.find((item:Item) => item.title === value)?.title
            : "انتخاب"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border bg-white">
        <Command>
          <CommandInput
            placeholder="جستوجو..."
            className="h-9 border-b border-gray-200 px-2"
          />
          <CommandList>
            <CommandEmpty className="font-vazirmatn">موردی یافت نشد.</CommandEmpty>
            <CommandGroup className="font-vazirmatn">
            {data?.data?.map((item: Item) => (
                <CommandItem
                  key={item.id}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setid(item.id);
                    setOpen(false);
                  }}
                >
                  {item.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxDemo;
