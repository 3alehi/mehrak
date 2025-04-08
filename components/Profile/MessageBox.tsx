import React from "react";
import Copy from "../icons/Copy";
import toast from "react-hot-toast";

const MessageBox: React.FC = () => {
  const handleCopyToClipboard = () => {
    const textToCopy = "Your text here"; // Replace with the text you want to copy
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success("متن با موفقیت کپی شد")
      })
      .catch(() => {
        toast.error("مشکلی در کپی پیش آمد")
      });
  };
  return (
    <div className="w-full rounded-2xl bg-lightBlueGray text-customGray p-6 max-md:p-4">
      <p className="text-lg font-light max-md:text-xs ">
        به پاس اینکه در نظر سنجی ما شرکت کردید یک کد تخفیف 200 هزارتومنی تقدیم
        شما می گردد.
      </p>
      <div className="flex w-fit">
        <p className="bg-lightGrayBlue text-lg px-7 py-3 rounded-lg my-5">Mehra@1401takhfif</p>
        <button className="bg-aquaBlue mr-2 text-lg px-3 rounded-lg my-5" onClick={handleCopyToClipboard}><Copy/></button>

      </div>
      <div className="flex justify-between w-full">
        <p className="font-medium max-md:text-xs	">قابل استفاده تا 28 فروردین 1401</p>
        <p className="font-light max-md:hidden	">28 اسفند 1400</p>
      </div>
    </div>
  );
};

export default MessageBox;
