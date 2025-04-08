"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Back from "@/components/icons/Back";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { sendAddressData } from "@/utils/api/createAddress";
import toast from "react-hot-toast";
import City from "@/components/Profile/ChooseCity";
import ComboboxDemo from "@/components/Profile/ChooseState";
import { useUserContext } from "@/app/context/UserContext";
import { fetchAddress } from "@/utils/api/getAddressWithId";
import { useQuery } from "@tanstack/react-query";
import { updateAddress } from "@/utils/api/updateAddress";
import SekeletonAddress from "@/components/Skeleton/SekeletonAddress";
interface Errors {
  address: string;
  phone: string;
  postalCode: string;
}

const Page: React.FC = () => {
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["Address", slug],
    queryFn: () => fetchAddress(slug as string),
  });

  const [ostan, setOstan] = useState("");
  const [city, setCity] = useState("");
  const [ostanid, setOstanid] = useState("");
  const [cityid, setCityid] = useState("");
  const rout = useRouter();
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  // const [plate, setPlate] = useState<string>("");
  // const [unit, setUnit] = useState<string>("");
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverLastName, setReceiverLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { mobile, lastName, firstName } = useUserContext();
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
      for_me: gender === '1' ? true : false,
    };
    setLoading(true);

    try {
     await updateAddress(slug as string, addressData);
toast.success("آدرس با موفقیت ویراش گردید")
rout.back()
    } catch (error) {
      console.error("Error updating address:", error);
    } finally {
      setLoading(false);
    }
    
  };

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

  if (isLoading) {
return <SekeletonAddress/>    
  
  }

  return (
    <div className="max-md:px-4">
      <>
        <div className="flex relative px-7">
          <div className="max-md:flex max-md:items-end ">
            <i
              className="cursor-pointer max-md:mt-4 text-customGray"
              onClick={() => {
                rout.back();
              }}
            >
              <span >
                <Back/>
              </span>
            </i>
            <span className="max-md:block hidden text-customGray mr-4">
              {" "}
              ویرایش آدرس{" "}
            </span>
          </div>
          <div className="relative max-md:hidden">
            <p className="px-5 cursor-pointer mb-2 text-turquoise">
              ویرایش آدرس{" "}
            </p>
            <motion.div
              layoutId="underline"
              className="absolute rounded-2xl bottom-0 left-0 w-full mt-2"
              style={{ height: "3px", backgroundColor: "#36BABB" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
        <div className="border text-customGray rounded-2xl max-md:border-none border-lightGrayBlue2 max-md:py-0 py-6 px-4 w-full flex justify-center">
          <div className="mt-9 w-[40%] max-md:w-full">
            <div className="grid gap-x-4 grid-cols-2 grid-rows-2"></div>

            <div className="flex gap-x-4 max-md:flex-col">
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
            {/* <div className="grid grid-cols-2 grid-rows-2 mt-6 gap-x-5">
              <p>پلاک</p>
              <p>شماره واحد</p>
              <Input
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="نوشتن پلاک"
                className="max-md:text-xs"
                type="number"
              />
              <Input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="نوشتن شماره واحد"
                className="max-md:text-xs"
                type="number"
              />
            </div> */}
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
                        ? "bg-blush text-customRed border border-customRed scale-105"
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
            {lastName && firstName && gender != "1" && (
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

            {gender != "1" && (
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
      </>
    </div>
  );
};

export default Page;
