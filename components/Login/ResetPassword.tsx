"use client";
import React, { useState } from "react";
import Back from "../icons/Back";
import { Input } from "../ui/input";
import ShowPass from "../icons/ShowPass";
import UnShowPass from "../icons/UnShowPass";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { resetPassword } from "@/utils/api/ResetePass";

interface PasswordProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  phoneNumber: string;
}

const ResetPassword: React.FC<PasswordProps> = ({ setStep }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>("border-gray-300");
  const Token: string = localStorage.getItem("temporary_token_Foreget_Password") ?? "";

  // مدیریت تغییر مقادیر ورودی
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: "password" | "confirm") => {
    const value = e.target.value;
    if (type === "password") {
      setPassword(value);
    } else {
      setConfirmPassword(value);
    }

    // چک کردن تطابق رمزها در لحظه تایپ
    if (type === "confirm" && value !== password) {
      setBorderColor("border-red-500"); // تغییر به قرمز
      setError("رمز عبور و تکرار آن یکسان نیستند.");
    } else {
      setBorderColor("border-gray-300"); // بازگرداندن به حالت عادی
      setError("");
    }
  };

  // مدیریت ارسال فرم
  const handleSubmit = () => {
    if (password.length < 4) {
      setError("رمز عبور باید حداقل ۴ کاراکتر باشد.");
      return;
    }
    if (password !== confirmPassword) {
      setBorderColor("border-red-500");
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }
    setError("");
    setLoading(true);

    resetPassword(password, confirmPassword, Token)
    .then(res => {
      if (res.success) {
        toast.success(res.data.message);
        setStep(1)
      } else {
        toast.error(res.data.message);
      }
    })
    .finally(() => setLoading(false)); 
  
  };

  return (
    <div className="px-14 max-md:px-4">
      <div className="mt-8 flex items-center w-[60%] justify-between">
        <i className="cursor-pointer" onClick={() => setStep(3)}>
          <Back />
        </i>
        <p className="text-darkGray text-2xl">تغییر رمز عبور</p>
      </div>
      
      <p className="text-lg text-darkGray mt-24 max-md:mt-9">رمز عبور جدید خود را وارد کنید</p>
      <div className={`bg-white flex items-center mt-4 border rounded-2xl px-4 ${borderColor} focus-within:border-vibrantOrange transition-all duration-300`}>
        <i onClick={() => setShow(!show)} className="cursor-pointer">
          {show ? <UnShowPass /> : <ShowPass />}
        </i>
        <Input
          autoFocus
          value={password}
          dir="ltr"
          onChange={(e) => handleInputChange(e, "password")}
          type={show ? "text" : "password"}
          className="text-2xl w-[90%] border-none rounded-2xl py-6"
        />
      </div>

      <p className="text-lg text-darkGray mt-4 max-md:mt-9">تکرار رمز عبور</p>
      <div className={`bg-white flex items-center mt-4 border rounded-2xl px-4 ${borderColor} focus-within:border-vibrantOrange transition-all duration-300`}>
        <i onClick={() => setShow(!show)} className="cursor-pointer">
          {show ? <UnShowPass /> : <ShowPass />}
        </i>
        <Input
          value={confirmPassword}
          dir="ltr"
          onChange={(e) => handleInputChange(e, "confirm")}
          type={show ? "text" : "password"}
          className="text-2xl w-[90%] border-none rounded-2xl py-6"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="w-full flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={password.length < 4 || loading}
          className="bg-aquaBlue hover:bg-teal-500 mb-12 px-[135px] py-3 max-md:w-full mt-16 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-t-transparent border-dotted border-white rounded-full animate-spin"></div>
          ) : (
            "تایید"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
