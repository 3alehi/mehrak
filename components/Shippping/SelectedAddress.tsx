import { formatPhoneNumber } from "@/utils/helper/FormatPhone";
import React from "react";
import SlecetedAddress from "../icons/SlecetedAddress";
import { ArrowLeft } from "lucide-react";
import { fetchCartAddress } from "@/utils/api/cartAddress";
import toast from "react-hot-toast";

interface SelectedAddressProps {
  address: Address;
  address_id: number;
  shippingId: number;
  refectShipping: () => void;
  refetch: () => void;
  showEditpopup: boolean;
  setshowEdit: (showEditpopup: boolean) => void;
  setShowPopup: (show: boolean) => void;
  setAddressId : (AddresId: string) => void;
}
const SelectedAddress: React.FC<SelectedAddressProps> = ({
  address,
  address_id,
  shippingId,
  refectShipping,
  refetch,
  setShowPopup,
  setshowEdit,
  setAddressId
}) => {
  return (
    <div
      className={`py-3 px-4 border rounded-lg text-[#393939] ${
        address_id === address.id
          ? "bg-white border-aquaBlue"
          : "bg-light-gray border-lightGrayBlue cursor-pointer"
      }`}

    >
 <div       onClick={() => {
        if (address.id != address_id) {
          fetchCartAddress(address.id, shippingId).then((res) => {
            if (res.success) {
              toast.success("آدرس با موفقیت تغییر کرد")
              refetch();
              refectShipping();
              setShowPopup(false)
            }
          });
        }
      }}>
 <p className="text-sm font-light max-md:line-clamp-1">{address.full_address}</p>
      <div className="flex justify-between items-center">
        <div className="text-[10px] font-extralight mt-4">
          <p>آدرس - آدرس</p>
          <p>کد پسیتی : {address.postal_code}</p>
          <p>تلفن : {formatPhoneNumber(address.mobile)}</p>
          <p>
            تحویل گیرنده :{address.first_name} {address.last_name}
          </p>
        </div>

        {address_id === address.id && <SlecetedAddress />}
      </div>
 </div>
      <p className="mt-2 text-aquaBlue flex text-[10px] items-center font-extralight cursor-pointer z-50" onClick={()=>{
        setAddressId(address.id.toString())
        setShowPopup(false)
        setshowEdit(true)
      }}>
        <span>ویرایش</span>
        <ArrowLeft size={12} />
      </p>

    </div>
  );
};

export default SelectedAddress;
