import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropDown from "../icons/DropDown";
import { deleteAddress } from "@/utils/api/deleteAddress";
import toast from "react-hot-toast";
import DeleteAddress from "../icons/DeleteAddress";
import Link from "next/link";
import { formatPhoneNumber } from "@/utils/helper/FormatPhone";

interface AddressBoxProps {
  idAddress: number;
  state: string;
  city: string;
  last_name: string;
  first_name: string;
  postal_code: string;
  mobile: string;
  full_address: string;
  refetch: () => void;
}

const AddressBox: React.FC<AddressBoxProps> = ({
  idAddress,
  state,
  city,
  last_name,
  first_name,
  postal_code,
  mobile,
  full_address,
  refetch,
}) => {
  const handleSetDefaultAddress = () => {
    toast.success("آدرس به عنوان پیش‌فرض تنظیم شد.");
  };

  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(idAddress);
      toast.success("آدرس با موفقیت حذف شد.");
      refetch();
    } catch {
      toast.error("خطایی در حذف آدرس رخ داد.");
    }
  };

  return (
    <div className="pb-4 px-4 bg-light-gray border border-lightGrayBlue2 rounded-2xl relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-charcoal text-lg font-light max-md:text-sm	">
          {full_address}
        </h3>
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-transparent border-none p-0"
            >
              <DropDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-lightGray w-fit rounded-md shadow-2xl text-sm font-light	font-vazirmatn	 text-customGray absolute left-2 top-[-48px] mt-2 z-50"
            style={{ minWidth: "150px", maxWidth: "300px" }}
          >
            <DropdownMenuItem
              onClick={handleSetDefaultAddress}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full whitespace-nowrap"
            >
              تبدیل به آدرس پیش‌فرض
            </DropdownMenuItem>
            <Link href={`/profile/address/edit/${idAddress}`}>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full whitespace-nowrap">
                ویرایش{" "}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={handleDeleteAddress}
              className="cursor-pointer text-red-600 hover:bg-gray-200 p-2 rounded-md whitespace-nowrap"
            >
              حذف آدرس <DeleteAddress />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-charcoal text-sm font-extralight	 mt-3 space-y-1 max-md:text-xs max-md:mt-2">
        <p>
          {state} - {city}
        </p>
        <p>کدپستی: {postal_code}</p>
        <p>تلفن: {formatPhoneNumber(mobile)}</p>
        <p>
          تحویل گیرنده: {last_name} {first_name}
        </p>
      </div>
    </div>
  );
};

export default AddressBox;
