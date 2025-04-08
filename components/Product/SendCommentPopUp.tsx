import React, { useState } from "react";
import Close from "../icons/Close";
import DisLike from "../icons/DisLike";
import LikeSuges from "../icons/LikeSuges";
import AddComment from "../icons/AddComment";
import PluseIcon from "../icons/PluseIcon";
import Delete from "../icons/Delete";

interface SendCommentPopUpProps {
  setShow: (show: boolean) => void;
  title:string;
  src:string
}

export const SendCommentPopUp: React.FC<SendCommentPopUpProps> = ({
  setShow,
  title,
  src
}) => {
  const [i_suggest, setI_suggest] = useState<string>("");
  const [rating, setRating] = useState("0");
  const ratings = [
    { value: "1", label: "بد", color: "bg-yellow-500" },
    { value: "2", label: "معمولی", color: "bg-orange-500" },
    { value: "3", label: "خوب", color: "bg-blue-500" },
    { value: "4", label: "فوق العاده", color: "bg-green-500" },
  ];
  const [desc, setDesc] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);

  const handleDeleteComment = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };
  const handleAddComment = () => {
    if (inputValue.trim() !== "") {
      setComments([...comments, inputValue]);
      setInputValue("");
    }
  };
  const [inputValueM, setInputValueM] = useState<string>(""); // استیت برای ورودی
  const [commentsM, setCommentsM] = useState<string[]>([]); // استیت برای ذخیره نقاط ضعف

  const handleDeleteCommentM = (index: number) => {
    const updatedComments = commentsM.filter((_, i) => i !== index); // استفاده از commentsM
    setCommentsM(updatedComments); // آپدیت کردن استیت
  };

  const handleAddCommentM = () => {
    if (inputValueM.trim() !== "") {
      setCommentsM([...commentsM, inputValueM]); // اضافه کردن نظر جدید
      setInputValueM(""); // پاک کردن فیلد ورودی بعد از اضافه کردن
    }
  };
  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    setShow(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white text-customGray py-3 px-4 rounded-lg w-[459px] max-h-[80vh] overflow-y-scroll"
        onClick={handlePopupClick}
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            <img
              src={src}
              className="w-8 h-8 object-cover"
              alt=""
            />

            <div className="text-customGray mr-2">
              <p className="font-light">ثبت نظر شما</p>
              <p className="text-[10px]">
                {title}
              </p>
            </div>

            <div></div>
          </div>
          <p className="border  rounded-2xl py-2 px-3 border-lightGrayBlue w-fit cursor-pointer" onClick={()=>{
            setShow(false)
          }}>
            <Close />
          </p>
        </div>
        <div className="mt-4 font-light">
          <p>مطالعه این کتاب را به دیگران پیشنهاد می دهید؟</p>
          <div className="mt-4">
            <div className="grid px-2 grid-cols-2 justify-evenly border rounded-md py-2">
              <p
                className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all mx-2 duration-300 ${
                  i_suggest == "0"
                    ? "bg-[#FFF0F1] text-customRed border border-customRed scale-105"
                    : "bg-white text-customGray scale-95"
                }`}
                onClick={() => setI_suggest("0")}
              >
                <p className="mr-2 flex items-center">
                  {" "}
                  <span className="ml-2">
                    <DisLike />
                  </span>{" "}
                  پیشنهاد نمی‌کنم{" "}
                </p>
              </p>
              <p
                className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all duration-300 mx-2 ${
                  i_suggest == "1"
                    ? "bg-[#E9F5F5] text-aquaBlue  border border-aquaBlue scale-105"
                    : "bg-white text-customGray scale-95"
                }`}
                onClick={() => setI_suggest("1")}
              >
                <p className="mr-2  flex items-center ">
                  {" "}
                  <span className="ml-2">
                    <LikeSuges />
                  </span>{" "}
                  پیشنهاد می‌کنم{" "}
                </p>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-medium">سازگاری عنوان کتاب با متن کتاب </p>

          <div className="mt-4">
            <div className="grid px-2 grid-cols-4 justify-evenly border rounded-md py-2">
              {ratings.map(({ value, label }) => (
                <p
                  key={value}
                  className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all mx-2 duration-300 ${
                    rating === value
                      ? "bg-[#FFF0F1] text-customRed border border-customRed scale-105"
                      : "bg-white text-customGray scale-95"
                  }`}
                  onClick={() => setRating(value)}
                >
                  <p className="mr-2 flex items-center">{label}</p>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-medium"> صفحه آرایی کتاب </p>

          <div className="mt-4">
            <div className="grid px-2 grid-cols-4 justify-evenly border rounded-md py-2">
              {ratings.map(({ value, label }) => (
                <p
                  key={value}
                  className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all mx-2 duration-300 ${
                    rating === value
                      ? "bg-[#FFF0F1] text-customRed border border-customRed scale-105"
                      : "bg-white text-customGray scale-95"
                  }`}
                  onClick={() => setRating(value)}
                >
                  <p className="mr-2 flex items-center">{label}</p>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-medium"> خوانایی قلم متن </p>

          <div className="mt-4">
            <div className="grid px-2 grid-cols-4 justify-evenly border rounded-md py-2">
              {ratings.map(({ value, label }) => (
                <p
                  key={value}
                  className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all mx-2 duration-300 ${
                    rating === value
                      ? "bg-[#FFF0F1] text-customRed border border-customRed scale-105"
                      : "bg-white text-customGray scale-95"
                  }`}
                  onClick={() => setRating(value)}
                >
                  <p className="mr-2 flex items-center">{label}</p>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-medium">تصویرگری صفحات</p>

          <div className="mt-4">
            <div className="grid px-2 grid-cols-4 justify-evenly border rounded-md py-2">
              {ratings.map(({ value, label }) => (
                <p
                  key={value}
                  className={`cursor-pointer flex justify-center items-center text-center py-2 rounded-xl transition-all mx-2 duration-300 ${
                    rating === value
                      ? "bg-[#FFF0F1] text-customRed border border-customRed scale-105"
                      : "bg-white text-customGray scale-95"
                  }`}
                  onClick={() => setRating(value)}
                >
                  <p className="mr-2 flex items-center">{label}</p>
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-6">
            <div className="mt-1">
              <p className="font-medium text-customGray text-base">نقاط قوت</p>
              <div className="w-full border px-3 py-3 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-[95%] h-full border-none outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <span className="cursor-pointer" onClick={handleAddComment}>
                  <AddComment />
                </span>
              </div>
            </div>
            <div className="mt-1">
              <p className="font-medium text-customGray text-base">نقاط ضعف</p>
              <div className="w-full border px-3 py-3 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-[95%] h-full border-none outline-none"
                  value={inputValueM}
                  onChange={(e) => setInputValueM(e.target.value)}
                />
                <span className="cursor-pointer" onClick={handleAddCommentM}>
                  <AddComment />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6">
            <div>
              {comments.map((comment, index) => (
                <p
                  key={index}
                  className="flex items-start mt-2 justify-between"
                >
                  <span className="flex items-center">
                    <span className="flex-shrink-0 ml-2">
                      <PluseIcon /> {/* جلوگیری از کوچک شدن آیکون */}
                    </span>
                    <span className="ml-2">{comment}</span>
                  </span>
                  <span
                    className="cursor-pointer ml-2"
                    onClick={() => handleDeleteComment(index)} // حذف نظر با کلیک
                  >
                    <Delete /> {/* آیکون حذف در انتها */}
                  </span>
                </p>
              ))}
            </div>
            <div>
              {commentsM.map((comment, index) => (
                <p
                  key={index}
                  className="flex items-start mt-2 justify-between"
                >
                  <span className="flex items-center">
                    <span className="flex-shrink-0 ml-2">
                      <PluseIcon /> {/* جلوگیری از کوچک شدن آیکون */}
                    </span>
                    <span className="ml-2">{comment}</span>
                  </span>
                  <span
                    className="cursor-pointer ml-2"
                    onClick={() => handleDeleteCommentM(index)} // حذف نظر با کلیک
                  >
                    <Delete /> {/* آیکون حذف در انتها */}
                  </span>
                </p>
              ))}
            </div>{" "}
          </div>
          <p className="font-medium">توضیحات</p>
          <textarea
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            name=""
            id=""
            className="w-full border outline-none resize-none rounded-md p-4 mt-2"
            rows={3}
          ></textarea>
        </div>
        <div className="flex items-center">
          <input type="checkbox" />
          <p className="mr-3"> انتشار نظر بصورت ناشناس</p>
        </div>
        <button className="bg-aquaBlue w-full text-white rounded-lg py-3 mt-5">ثبت نظر</button>
      </div>
    </div>
  );
};
