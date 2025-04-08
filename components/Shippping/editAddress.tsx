"use client";
import React, { useEffect, useState } from "react";
import Back from "../icons/Back";
import ComboboxDemo from "../Profile/ChooseState";
import City from "@/components/Profile/ChooseCity";
import { useUserContext } from "@/app/context/UserContext";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "@/utils/api/getAddressWithId";
import toast from "react-hot-toast";
import { updateAddress } from "@/utils/api/updateAddress";
import SekeletonAddress from "../Skeleton/SekeletonAddress";

interface Errors {
  address: string;
  phone: string;
  postalCode: string;
}
interface EditAddressProps {
  id: string;
  setshowEdit: (showEditpopup: boolean) => void;
  refectShipping: () => void;

  refetch: () => void;

  setShowPopup: (show: boolean) => void;
}
const EditAddress: React.FC<EditAddressProps> = ({
  id,
  setshowEdit,
  setShowPopup,
  refectShipping,
  refetch,
}) => {
  const [ostan, setOstan] = useState("");
  const [city, setCity] = useState("");
  const [ostanid, setOstanid] = useState("");
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverLastName, setReceiverLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { mobile, lastName, firstName } = useUserContext();
  const [cityid, setCityid] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["Address", id],
    queryFn: () => fetchAddress(id),
  });

  useEffect(() => {
    if (!isLoading) {
      const res = data.data;
      setPostalCode(res.postal_code);
      setPhone(res.phone);
      setGender(res.for_me === "0" ? "2" : "1");
      setAddress(res.address);
      setOstan(res.state);
      setCity(res.city);
      setReceiverName(res.first_name);
      setReceiverLastName(res.last_name);
      setOstanid(res.state_id.toString());
      setCityid(res.city_id.toString());
    }
  }, [data]);
  const [errors, setErrors] = useState<Errors>({
    address: "",
    phone: "",
    postalCode: "",
  });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePostalCode = (postalCode: string) => {
    return postalCode.length === 10 && !isNaN(Number(postalCode));
  };

  const validateAddress = (address: string) => {
    return address.length >= 10;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = e.target.value;
    switch (field) {
      case "address":
        setAddress(value);
        if (!validateAddress(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            address: "آدرس باید حداقل 10 کاراکتر باشد.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
        }
        break;
      case "phone":
        setPhone(value);
        if (!validatePhone(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: "لطفاً یک شماره موبایل معتبر وارد کنید.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
        }
        break;
      case "postalCode":
        setPostalCode(value);
        if (!validatePostalCode(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            postalCode: "کدپستی باید 10 رقم باشد.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, postalCode: "" }));
        }
        break;
      default:
        break;
    }
  };

  const isFormValid =
    !isLoading && // اطمینان از اینکه دیتا لود شده باشد
    ((gender === "1" &&
      ((ostan && ostan !== data?.data.state) ||
        (address && address !== data?.data.address) ||
        (postalCode && postalCode !== data?.data.postal_code) ||
        (city && city !== data?.data.city))) ||
      (gender === "2" &&
        ((ostan && ostan !== data?.data.state) ||
          (city && city !== data?.data.city) ||
          (address && address !== data?.data.address) ||
          (receiverName && receiverName !== data?.data.first_name) ||
          (receiverLastName && receiverLastName !== data?.data.last_name) ||
          (phone && phone !== data?.data.phone) ||
          (postalCode && postalCode !== data?.data.postal_code))));

  const handleSubmit = async () => {
    setLoading(true);
    const addressData = {
      first_name: gender === "1" ? firstName : receiverName,
      last_name: gender === "1" ? lastName : receiverLastName,
      address: address,
      state_id: ostanid,
      city_id: cityid,
      postal_code: postalCode,
      mobile: gender === "1" ? mobile : phone,
      phone: phone,
      for_me: gender === "1" ? true : false,
    };

    try {
      await updateAddress(id, addressData).then(() => {
        refectShipping()
        refetch()
        toast.success("آدرس با موفقیت ویراش گردید");
        setshowEdit(false)
      });
    } catch (error) {
      console.error("Error updating address:", error);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) {
    return <SekeletonAddress />;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-md:px-4">
      <div className="bg-white p-7 shadow-lg w-[468px] max-h-[80vh] overflow-y-auto rounded-lg">
        <p
          className="flex items-center"
          onClick={() => {
            setShowPopup(true);
            setshowEdit(false);
          }}
        >
          <span className="cursor-pointer border py-2 px-2 rounded-2xl border-lightGrayBlue w-fit ">
            <Back />
          </span>
          <span className="mr-3 text-customGray text-xl">
            ویرایش یا ثبت آدرس
          </span>
        </p>
        <div className="flex gap-4 mt-4">
          <div>
            <p>استان</p>
            <ComboboxDemo
              value={ostan}
              setValue={setOstan}
              setid={setOstanid}
            />
          </div>
          {ostan && (
            <div className="max-md:mt-3">
              <p className="visible">شهر</p>
              <City
                value={city}
                setValue={setCity}
                setid={setCityid}
                id={ostanid}
              />
            </div>
          )}
        </div>
        <div className="mt-9">
          <p>آدرس</p>
          <Textarea
            value={address}
            onChange={(e) => handleChange(e, "address")}
            placeholder=" آدرس کامل"
            className="resize-none mt-2 border border-lightGrayBlue2 rounded-md py-3 px-4 outline-none "
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address}</p>
          )}
        </div>
        <div className="grid grid-cols-1 grid-rows-2 mt-6 gap-x-5">
          <p>کدپستی</p>
          <Input
            value={postalCode}
            onChange={(e) => handleChange(e, "postalCode")}
            type="number"
            placeholder="نوشتن کدپستی"
            className="max-md:text-xs"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-xs">{errors.postalCode}</p>
          )}
        </div>
        <div className="mt-6">
          <p>تحویل گیرنده</p>
          <div className="mt-4">
            <div className="grid px-2 grid-cols-2 justify-evenly border rounded-md py-2">
              <p
                className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all duration-300 ${
                  gender === "1"
                  ? "bg-customBlue text-aquaBlue  border border-aquaBlue scale-105"
                  : "bg-white text-customGray scale-95"
                }`}
                onClick={() => setGender("1")}
              >
                <span className="mr-2"> خودم </span>
              </p>
              <p
                className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all duration-300 mx-2 ${
                  gender === "2"
                    ? "bg-customBlue text-aquaBlue  border border-aquaBlue scale-105"
                    : "bg-white text-customGray scale-95"
                }`}
                onClick={() => setGender("2")}
              >
                <span className="mr-2"> دیگری </span>
              </p>
            </div>
          </div>
        </div>
        {lastName && firstName && gender !== "1" && (
          <div className="grid grid-cols-2 grid-rows-2 mt-6 gap-x-5">
            <p>نام</p>
            <p>نام خانوادگی</p>
            <Input
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder=" نوشتن نام"
              className="max-md:text-xs"
            />
            <Input
              value={receiverLastName}
              onChange={(e) => setReceiverLastName(e.target.value)}
              placeholder="نوشتن نام خانوادگی"
              className="max-md:text-xs"
            />
          </div>
        )}

        {gender !== "1" && (
          <div className="grid grid-cols-1 grid-rows-2 mt-6 gap-x-5">
            <p>تلفن همراه تحویل گیرنده</p>
            <Input
              value={phone}
              onChange={(e) => handleChange(e, "phone")}
              type="number"
              placeholder="نوشتن تلفن همراه تحویل گیرنده"
              className="max-md:text-xs"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>
        )}
        <div className="flex justify-end">
          <Button
            className="bg-aquaBlue hover:bg-teal-500 mb-12 w-[70%] mt-6 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95"
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="animate-spin border-t-2 border-b-2 border-white border-solid w-6 h-6 rounded-full"></div>
                <span>در حال بارگذاری...</span>
              </div>
            ) : (
              "ویرایش آدرس"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
