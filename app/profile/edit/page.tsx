"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Camera from "@/components/icons/Camera";
import Women from "@/components/icons/Women";
import Man from "@/components/icons/Man";
import ShowPass from "@/components/icons/ShowPass";
import UnShowPass from "@/components/icons/UnShowPass";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/app/context/UserContext";
import updateUser from "@/utils/api/UpdateMe";
import toast from "react-hot-toast";
import Link from "next/link";
import Back from "@/components/icons/Back";
import { motion } from "framer-motion";
interface UserData {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  current_password?: string;
  password?: string;
  confirm?: string;
}

const Page: React.FC = () => {
  const { email, mobile, gender_num, firstName, lastName, refetchUserData } =
    useUserContext();

  const [initialState, setInitialState] = useState<{
    email: string | null;
    mobile: string;
    gender: string;
    firstName: string | null;
    lastName: string | null;
    
  }>({
    email: "",
    mobile: "",
    gender: "0",
    firstName: "",
    lastName: "",
  });

  const [formState, setFormState] = useState({
    gender: "",
    password: "",
    password1: "",
    oldPassword: "",
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
    showPassword: false,
    emailError: null as string | null,
    passwordError: null as string | null,
    isFormChanged: false,
  });

  useEffect(() => {
    const initialData = {
      email: email || "",
      mobile: mobile || "",
      gender: gender_num || "0",
      firstName: firstName || "",
      lastName: lastName || "",
    };

    setInitialState(initialData);

    setFormState((prevState) => ({
      ...prevState,
      ...(initialData as { email: string }),
    }));
  }, [email, mobile, gender_num, firstName, lastName]);


  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePasswords = (password: string, password1: string) => {
    return password === password1;
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
  
    const userData: UserData = {
      first_name: formState.firstName,
      last_name: formState.lastName,
      gender: formState.gender,
      email: formState.email,
    };
  
    if (formState.password.length > 0) {
      userData.current_password = formState.oldPassword;
      userData.password = formState.password;
      userData.confirm = formState.password1;
    }
  
    try {
      await updateUser(userData).then((res) => {
        if (res.success === true) {
          toast.success(res.data.message);
          refetchUserData();
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const isChanged =
      formState.email !== initialState.email ||
      formState.mobile !== initialState.mobile ||
      formState.gender !== initialState.gender ||
      formState.firstName !== initialState.firstName ||
      formState.lastName !== initialState.lastName ||
      formState.password !== "" ||
      formState.password1 !== "";

    setFormState((prevState) => ({
      ...prevState,
      isFormChanged: isChanged,
    }));
  }, [
    formState.email,
    formState.mobile,
    formState.gender,
    formState.firstName,
    formState.lastName,
    formState.password,
    formState.password1,
    initialState,
  ]);

  useEffect(() => {
    const { email, password, password1 } = formState;

    setFormState((prevState) => ({
      ...prevState,
      emailError:
        email && !validateEmail(email) ? "ایمیل وارد شده معتبر نیست" : null,
      passwordError:
        password && password1 && !validatePasswords(password, password1)
          ? "رمز عبور و تکرار آن مطابقت ندارند"
          : null,
    }));
  }, [formState.email, formState.password, formState.password1]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  return (
    <div>
      <Link href={"/profile/me"} className="hidden max-md:block mt-7 px-4">
        <p className="text-text-sm flex text-customGray items-center	">
          <Back />
          <span className="mr-4"> اطلاعات کاربری</span>
        </p>
      </Link>
      <div className="flex relative pr-10 max-md:pr-0 max-md:mt-8 ">
        <div className="relative ">
          <p className="px-5 cursor-pointer mb-2 text-turquoise">
            اطلاعات کاربری
          </p>
          <motion.div
            layoutId="underline"
            className="absolute rounded-2xl bottom-0 left-0 w-full mt-2"
            style={{
              height: "3px",
              backgroundColor: "#36BABB",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </div>
      <div className="border max-md:rounded-none rounded-2xl w-full flex-col flex items-center justify-center py-20 max-md:py-9">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <div className="flex max-md:hidden flex-col items-center border border-dashed h-fit px-9 py-10 rounded-2xl max-md:flex-row">
            <Camera />
            <p className="text-customGray mt-2">انتخاب تصویر</p>
          </div>

          <div className="w-full sm:w-auto">
            <div>
              <p className="mb-2 text-customGray">نام </p>
              <Input
                className="text-customGray w-full max-md:text-base sm:w-[413px]"
                dir="rtl"
                placeholder="نوشتن نام"
                value={formState?.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>
            <div className="mt-4">
              <p className="mb-2 text-customGray">نام خانوادگی</p>
              <Input
                className="text-customGray w-full sm:w-[413px] max-md:text-base"
                dir="rtl"
                placeholder="نوشتن نام خانوادگی"
                value={formState?.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
            <div>
              <p className="mb-2 mt-4 text-customGray">تلفن همراه</p>
              <Input
                disabled
                className="text-customGray w-full max-md:text-lg sm:w-[413px] disabled:bg-light-gray disabled:text-customGray border border-lightGrayBlue2"
                type="number"
                dir="ltr"
                value={formState?.mobile}
              />
            </div>

            <div className="mt-4">
              <p className="mb-2 text-customGray">جنسیت</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 px-2 sm:px-0 justify-evenly border rounded-2xl py-2">
                <p
                  className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all duration-300 ${formState?.gender === "2"
                    ? "bg-customBlue text-aquaBlue border border-aquaBlue scale-105"
                    : "bg-white text-customGray scale-95"
                    }`}
                  onClick={() => handleChange("gender", "2")}
                >
                  <Women />
                  <span className="mr-2">زن</span>
                </p>
                <p
                  className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all duration-300 mx-2 ${formState?.gender === "1"
                    ? "bg-customBlue text-aquaBlue border border-aquaBlue scale-105"
                    : "bg-white text-customGray scale-95"
                    }`}
                  onClick={() => handleChange("gender", "1")}
                >
                  <Man />
                  <span className="mr-2">مرد</span>
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 mt-4 text-customGray">ایمیل</p>
              <Input
                className="text-customGray w-full sm:w-[413px] max-md:text-base"
                value={formState?.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="نوشتن ایمیل"
              />
              {formState.emailError && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.emailError}
                </p>
              )}
            </div>

            <div className="mt-4">
              <p className="text-lg text-darkGray"> رمز عبور قبلی </p>
              <div className="bg-white flex items-center justify-center mt-4 border max-md: rounded-2xl flex-row-reverse">
                {!formState.showPassword ? (
                  <i
                    onClick={() => handleChange("showPassword", true)}
                    className="cursor-pointer ml-4"
                  >
                    <ShowPass />
                  </i>
                ) : (
                  <i
                    className="cursor-pointer ml-4"
                    onClick={() => handleChange("showPassword", false)}
                  >
                    <UnShowPass />
                  </i>
                )}
                <Input
                  value={formState.oldPassword}
                  onChange={(e) => handleChange("oldPassword", e.target.value)}
                  type={!formState.showPassword ? "password" : "text"}
                  className="text-2xl l w-[90%] border-none rounded-2xl"
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-lg text-darkGray">  رمز عبور جدید</p>
              <div className="bg-white flex items-center justify-center mt-4 border rounded-2xl flex-row-reverse">
                {!formState.showPassword ? (
                  <i
                    onClick={() => handleChange("showPassword", true)}
                    className="cursor-pointer ml-4"
                  >
                    <ShowPass />
                  </i>
                ) : (
                  <i
                    className="cursor-pointer ml-4"
                    onClick={() => handleChange("showPassword", false)}
                  >
                    <UnShowPass />
                  </i>
                )}
                <Input
                  value={formState.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  type={!formState.showPassword ? "password" : "text"}
                  className="text-2xl l w-[90%] border-none rounded-2xl"
                />
              </div>
              {formState.passwordError && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.passwordError}
                </p>
              )}
            </div>
            <div className="mt-4">
              <p className="text-lg text-darkGray">تکرار رمز عبور</p>
              <div className="bg-white flex items-center justify-center mt-4 border rounded-2xl flex-row-reverse">
                {!formState.showPassword ? (
                  <i
                    onClick={() => handleChange("showPassword", true)}
                    className="cursor-pointer ml-4"
                  >
                    <ShowPass />
                  </i>
                ) : (
                  <i
                    className="cursor-pointer ml-4"
                    onClick={() => handleChange("showPassword", false)}
                  >
                    <UnShowPass />
                  </i>
                )}
                <Input
                  value={formState.password1}
                  onChange={(e) => handleChange("password1", e.target.value)}
                  type={!formState.showPassword ? "password" : "text"}
                  className="text-2xl l w-[90%] border-none rounded-2xl"
                />
              </div>
              {formState.passwordError && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.passwordError}
                </p>
              )}
            </div>
            <div className="mt-4 w-full flex justify-end max-md:justify-start">
              <Button
                onClick={handleSubmit}
                disabled={
                  !formState.isFormChanged ||
                  !!formState.emailError ||
                  !!formState.passwordError ||
                  (!!formState.password && !formState.password1)
                }
                className="bg-aquaBlue hover:bg-teal-500 mb-12 max-md:mb-0 w-[70%] mt-16 max-md:mt-4 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin border-t-2 border-b-2 border-white border-solid w-6 h-6 rounded-full"></div>
                    <span>در حال بارگذاری...</span>
                  </div>
                ) : (
                  "ذخیره تغییرات"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

