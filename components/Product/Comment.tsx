import React from "react";
import Like from "../icons/Like";

export default function Comment() {
  return (
    <div className="border rounded-2xl py-4 px-3 min-h-[320px] min-w-[469px] flex flex-col justify-between">
      <div>
        {/* بخش عکس و نام کاربر */}
        <div className="flex items-center">
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src="https://s3-alpha-sig.figma.com/img/1814/995e/c3f5ae40bbedd9d65c54716448d3b6bf?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uJ84MZhZUAsfIXRecumSOend82nk0yged3BJMs840u-li2SuS0II1ZewibV8y5E1xYP88RuSfwUZEKF2Qd-H0bhOUyWajClVezjVazueUErRiEnNqKQbVmvBFxAeDVoWqlEPcU~d~jVnz94FJwhma-gPoxXWre08qol7f3766peExUOrNmI5v3yP9LZOGibfVL5F2B0k9Eur8QOKIaR8-RcoZ5s971SUjJgaS8vNbUUk625~2c8m5DOVhc67Gk3iBo5lTYXFlptvWT6EQK5-3tLdedKZ2CEJbgq~qgeh08xVuDSeb4VyYeBJKz9JDxZ7ysWCHcqL~1fxthdYMqYsUg__"
            alt="profile"
          />
          <p className="mr-5 text-customGray font-semibold text-sm">
            لیلا بهروز منش
          </p>
        </div>

        {/* متن کامنت */}
        <p className="mt-4 leading-8 text-customGray font-extralight line-clamp-4">
          در زندگیمان گاهی مجبور به بخشش و گذشت یا حتی ایثار شده یا خواهیم شد.
          آنوقت می‌بینیم که کمی تا قسمتی قصه گره گوار برایمان تکرار می‌شود.
          کافکا رنج‌های چنین انسانی را صادقانه و واقع‌گرایانه اما...
        </p>
      </div>

      {/* بخش تاریخ و لایک */}
      <div className="flex justify-between">
        <p className="text-sm text-customGray font-light">
          ۱۵ اسفند ۱۴۰۰ | 17:20
        </p>
        <p className="flex items-center cursor-pointer">
          <span className="ml-2 text-lg text-customGray font-extralight">20</span>
          <Like />
        </p>
      </div>
    </div>
  );
}
