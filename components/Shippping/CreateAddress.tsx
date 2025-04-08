"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendAddressData } from "@/utils/api/createAddress";
import toast from "react-hot-toast";
import City from "@/components/Profile/ChooseCity";
import ComboboxDemo from "@/components/Profile/ChooseState";
import { useUserContext } from "@/app/context/UserContext";
import Back from "../icons/Back";
interface Pops{
    refectShipping: () => void;
    setShowCreateAddress: (show: boolean) => void;
    refetch: () => void;
}

const CreateAddress: React.FC<Pops> = ({refectShipping , refetch,setShowCreateAddress}) => {
    interface Errors {
        address: string;
        phone: string;
        postalCode: string;
        
        
      }
      const [ostan, setOstan] = useState("");
      const [city, setCity] = useState("");
      const [ostanid, setOstanid] = useState("");
      const [cityid, setCityid] = useState("");
     const [gender, setGender] = useState<string>("1");
      const [address, setAddress] = useState<string>("");
      const [plate, setPlate] = useState<string>("");
      const [unit, setUnit] = useState<string>("");
      const [receiverName, setReceiverName] = useState<string>("");
      const [receiverLastName, setReceiverLastName] = useState<string>("");
      const [phone, setPhone] = useState<string>("");
      const [postalCode, setPostalCode] = useState<string>("");
      const [loading, setLoading] = useState(false);
      const { mobile, lastName, firstName } = useUserContext();
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
          await sendAddressData(addressData).then((res) => {
            if (!res.success) {
              if (res.data.message === "تکمیل گزینه postal code الزامی است") {
                toast.error("تکمیل گزینه کد پسیتی اجباری می باشد");
              } else if (res.data.message == "postal code معتبر نمی باشد.") {
                toast.error("کد پستی معتبر نمی باشد");
              } else {
                toast.error(res.data.message);
              }
            }
            if (res.success) {
              toast.success("آدرس با موفقیت ثبت گردید");
              refectShipping()
              refetch()
              setShowCreateAddress(false)
              
            }
          });
        } catch (error: unknown) {
          console.error("Error submitting address data:", error);
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
    
      const isFormValid =
        (gender === "1" &&
          ostan &&
          address &&
          plate &&
          unit &&
          postalCode &&
          !errors.postalCode &&
          !errors.address &&
          city) ||
        (gender === "2" &&
          city &&
          ostan &&
          address &&
          plate &&
          unit &&
          receiverName &&
          receiverLastName &&
          phone &&
          postalCode &&
          !errors.address &&
          !errors.phone &&
          !errors.postalCode);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-md:px-4">
      <div className="bg-white p-7 shadow-lg w-[468px] max-h-[80vh] overflow-y-auto rounded-lg">
      <div className=" ">
      <>
      <p
          className="flex items-center"
          onClick={() => {
            setShowCreateAddress(false)
          }}
        >
          <span className="cursor-pointer border py-2 px-2 rounded-2xl border-lightGrayBlue w-fit ">
            <Back />
          </span>
          <span className="mr-3 text-customGray text-xl">
            ثبت آدرس
          </span>
        </p>
        <div className=" text-customGray rounded-2xl max-md:border-none border-lightGrayBlue2 max-md:py-0 py-6 w-full flex justify-center">
          <div className=" max-md:w-full">
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
            <div className="grid grid-cols-2 grid-rows-2 mt-6 gap-x-5">
              <p>پلاک</p>
              <p>شماره واحد</p>
              <Input
                value={plate}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setPlate(value);
                  }
                }}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="نوشتن پلاک"
                className="max-md:text-xs"
              />

              <Input
                value={unit}
                placeholder="نوشتن شماره واحد"
                className="max-md:text-xs"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setUnit(value);
                  }
                }}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className="grid grid-cols-1 grid-rows-2 mt-6 gap-x-5">
              <p>کدپستی</p>
              <Input
                value={postalCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleChange(e, "postalCode");
                  }
                }}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="نوشتن کدپستی"
                className="max-md:text-xs"
                maxLength={10}
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
                className="bg-aquaBlue hover:bg-teal-500 w-[70%] mt-6 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                disabled={!isFormValid || loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin border-t-2 border-b-2 border-white border-solid w-6 h-6 rounded-full"></div>
                    <span>در حال بارگذاری...</span>
                  </div>
                ) : (
                  "ثبت آدرس"
                )}
              </Button>
            </div>
          </div>
        </div>
      </>
    </div>
        </div>
        </div>
    );
};

export default CreateAddress;