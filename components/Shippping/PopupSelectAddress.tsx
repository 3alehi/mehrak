"use client";
import React from "react";
import Close from "../icons/Close";
import NewAddress from "../icons/NewAddress";
import ArrowLeft from "../icons/ArrowLeft";
import { getAddress } from "@/utils/api/getAddress";
import { useQuery } from "@tanstack/react-query";
import SelectedAddress from "./SelectedAddress";
interface PopupSelectAddressProps {
  address_id: number;
  shippingId: number;
  refectShipping: () => void;
  refetch: () => void;
  showEditpopup: boolean;
  setshowEdit: (showEditpopup: boolean) => void;
  setShowPopup: (show: boolean) => void;
  setAddressId: (AddressId: string) => void; 
  setShowCreateAddress:(show : boolean) => void;
}
const PopupSelectAddress: React.FC<PopupSelectAddressProps> = ({
  address_id,
  shippingId,
  refetch,
  refectShipping,
  setShowPopup,
  showEditpopup,
  setshowEdit,
  setAddressId,
  setShowCreateAddress
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAddress"],
    queryFn: getAddress,
  });

  if (isLoading) {
    return "...";
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-md:px-4">
      <div className="bg-white p-7 shadow-lg w-[468px] max-h-[80vh] overflow-y-auto rounded-lg ">
        <div className="flex justify-between items-center">
          <p className="text-xl font-light text-customGray">انتخاب آدرس</p>
          <p
            className="cursor-pointer border py-2 px-3 rounded-2xl border-lightGrayBlue"
            onClick={() => {
              setShowPopup(false);
            }}
          >
            <Close />
          </p>
        </div>
        <div className=" bg-lightBlueGray py-3 px-5 mt-8 rounded-xl flex justify-between cursor-pointer" onClick={()=>{
          setShowCreateAddress(true)
          setShowPopup(false)
        }}>
          <p className="flex">
            <NewAddress />
            <span className="mr-4 text-sm font-medium text-customGray">
              ثبت آدرس
            </span>
          </p>
          <ArrowLeft />
        </div>
        <div className="mt-6 flex flex-col gap-2">
          {data.data.map((item: Address, index: number) => (
            <SelectedAddress
              refetch={refetch}
              refectShipping={refectShipping}
              key={index}
              address={item}
              address_id={address_id}
              shippingId={shippingId}
              setShowPopup={setShowPopup}
              setshowEdit={setshowEdit}
              showEditpopup={showEditpopup}
              setAddressId={setAddressId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupSelectAddress;
