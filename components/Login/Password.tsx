"use client";
import React, { useState } from "react";
import Back from "../icons/Back";
import { Input } from "../ui/input";
import ShowPass from "../icons/ShowPass";
import UnShowPass from "../icons/UnShowPass";
import Arrow from "../icons/Arrow";
import { Button } from "../ui/button";
import { sendOtpForce } from "@/utils/api/otpforce";
import { VerifyPass } from "@/utils/api/VerifyPass";
import { useUserContext } from "@/app/context/UserContext";
import { setToken } from "@/utils/helper/setToken";
import { SendOtpForgetPass } from "@/utils/api/SendOtpForgetPass";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { onSyncCart } from "@/utils/api/postDataLocal";

interface PasswordProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  phoneNumber: string;
}

const Password: React.FC<PasswordProps> = ({ setStep, phoneNumber }) => {
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const Token: string = localStorage.getItem("temporary_token") ?? "";
  const router = useRouter();
  const searchParams = useSearchParams();
  const shipping = searchParams.get('redirect')
  
  const { setUserData } = useUserContext();

  const checkPass = () => {
    setLoading(true);
    setError(""); 
    VerifyPass(password, Token)
      .then((res) => {
        if (res.success) {
          setToken(res.data.token);
        if(shipping === 'true'){
          router.push('/shipping')
          onSyncCart()

        }else{
          router.back();

        }
          toast.success("باموفقیت وارد شدید")
          setUserData(res.data.user);
        } else {
          setError(res.data.message || "رمز نامعتبر است");
        }
      })
      .catch(() => {
        setError("مشکلی پیش آمد");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(""); // مخفی کردن پیام خطا هنگام تایپ
  };

  const sendOtpForced = (id:number) => {
if(id === 1){
  sendOtpForce(phoneNumber, Token).then((res) => {
    if (res.success) {
      setStep(2);
    }
  });
}
if (id === 2 )  {
  SendOtpForgetPass(phoneNumber)
  .then(res =>{
    if(res.success){
      setStep(4)
      localStorage.setItem('temporary_token_Foreget_Password', res.data.temporary_token);
      toast.success("کد با موفقیت ارسال شد")


    }
    
  })
}
  };

  return (
    <div className="px-14 max-md:px-4  relative">
      
      <div className="mt-8 max-md:mt-2 flex items-center w-[60%] max-md:w-full justify-between ">
        <i className="cursor-pointer max-md:invisible" onClick={() => setStep(0)}>
          <Back />
        </i>
      
        <p className="text-darkGray text-2xl max-md:text-base max-md:font-normal max-md:w-full max-md:flex max-md:justify-center">رمز عبور</p>
      </div>
      <div>
        <p className="text-lg text-darkGray mt-24 max-md:mt-9  max-md:text-base max-md:font-normal">رمز عبور خود را وارد کنید</p>
        <div className="bg-white flex items-center justify-center mt-4 border rounded-2xl px-4 border-vibrantOrange">
          {!show ? (
            <i onClick={() => setShow(true)} className="cursor-pointer">
              <ShowPass />
            </i>
          ) : (
            <i onClick={() => setShow(false)} className="cursor-pointer">
              <UnShowPass />
            </i>
          )}
          <Input
          autoFocus
            value={password}
            dir="ltr"
            onChange={handleInputChange}
            type={!show ? "password" : "text"}
            className="text-2xl w-[90%] border-none rounded-2xl py-6"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <ul className="mt-8">
          <li
            className="my-4 text-customGray  max-md:text-base max-md:font-normal text-lg flex items-center cursor-pointer"
            onClick={() => {
              sendOtpForced(1);
            }}
          >
            ورود با رمز یکبار مصرف
            <i className="mx-2">
              <Arrow />
            </i>
          </li>
          <li
            className="text-customGray text-lg flex items-center  max-md:text-base max-md:font-normal cursor-pointer"
            onClick={() => {
              sendOtpForced(2);
            }}
          >
            فراموشی رمز عبور
            <i className="mx-2">
              <Arrow />
            </i>
          </li>
        </ul>
        <div className="w-full flex justify-center">
          <Button
            onClick={() => {
              checkPass();
            }}
            disabled={password.length < 4 || loading}
            className="bg-aquaBlue hover:bg-teal-500 h-[48px] max-md:h-[44px] w-[299px] mb-12 px-[135px] py-3max-md:w-full mt-16 rounded-md transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-t-transparent border-dotted border-white rounded-full animate-spin"></div>
            ) : (
              "ورود"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Password;
