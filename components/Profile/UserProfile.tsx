"use client";
import React from "react";
import { useUserContext } from "@/app/context/UserContext";
import Follow from "../icons/Follow";
import Back from "../icons/Back";
import Share from "../icons/Share";
import { usePathname, useRouter } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import toast from "react-hot-toast";

const UserProfile: React.FC = () => {
  const { name, city, followersCount, followingCount } = useUserContext();
  const pathname = usePathname();
  const rout = useRouter()

  return (
    <>
      {useIsMobile() && pathname === "/profile/me" && (
        <div className="w-full  justify-center flex  bg-lightBlueGray max-md:border-none border border-lightGrayBlue rounded-2xl max-md:px-4 max-md:rounded-none py-4 flex-col items-center">
          <div className="max-md:hidden">
            <div className="hidden max-md:flex  justify-between w-full ">
              <i>
                <Back />
              </i>
              <i>
                <Share />
              </i>
            </div>

            <div className="relative w-36 h-36">
  <img
    src="https://s3-alpha-sig.figma.com/img/1814/995e/c3f5ae40bbedd9d65c54716448d3b6bf?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eG~PBweiIr99xdRKVzA2ymS-DS-no~hTA9dMlVEEmOM03OHGmUE~g26DJTT-mqz1CizcTeVdWd-alto0pvXmtOb~LLd3ofE95DXQqVrZRhN71oWRTPzSxQhEhPU1s32kDqJi7MvVWdpNyUfHrq3SQRXfN0rp1bCGRpF035PTEyfKW0nCB1Q77pGcrTDQeqdbr~rLR8Eu-cckSGepz09N1JZVrIdmpDiUT-xDXR7DJ8AO-zvfYNKvuSqZQEbPicH-EkViZti-N8VFCnS38KBJwXGjs8ylGAmM7GJfGYJebBmvVhN2OZvwijm4Sw3uTRhxlhe40lgnkoFFGCi1GdnUhA__"
    alt="Profile"
    className="w-36 h-36 rounded-full border border-gray-300 object-cover"
  />
  <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border border-gray-300 flex items-center justify-center w-10 h-10">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-1.40546e-08 2.25C-6.44168e-09 1.03125 0.984375 0 2.25 0L6.75 0C7.125 0 7.5 0.375 7.5 0.75C7.5 1.17187 7.125 1.5 6.75 1.5L2.25 1.5C1.82812 1.5 1.5 1.875 1.5 2.25L1.5 6.75C1.5 7.17188 1.125 7.5 0.75 7.5C0.328125 7.5 -4.47989e-08 7.17188 -4.21637e-08 6.75L-1.40546e-08 2.25ZM10.125 4.5L13.8281 4.5C14.625 4.5 15.3281 5.01562 15.5625 5.71875L15.7031 6H16.875C18.2812 6 19.5 7.21875 19.5 8.625L19.5 15.375C19.5 16.8281 18.2812 18 16.875 18L7.125 18C5.67187 18 4.5 16.8281 4.5 15.375L4.5 8.625C4.5 7.21875 5.67187 6 7.125 6H8.25L8.39062 5.71875C8.67187 5.01562 9.32812 4.5 10.125 4.5ZM9.79687 6.28125L9.51562 7.03125C9.375 7.3125 9.09375 7.5 8.8125 7.5H7.125C6.46875 7.5 6 8.01562 6 8.625L6 15.375C6 16.0312 6.46875 16.5 7.125 16.5L16.875 16.5C17.4844 16.5 18 16.0312 18 15.375L18 8.625C18 8.01562 17.4844 7.5 16.875 7.5H15.1875C14.8594 7.5 14.5781 7.3125 14.4844 7.03125L14.1562 6.28125C14.1094 6.14062 13.9687 6 13.8281 6L10.125 6C9.98437 6 9.84375 6.14062 9.79687 6.28125Z"
        fill="#515869"
      />
    </svg>
  </button>
</div>

            <p className="mt-4 text-xl text-darkGray">
              {name == null ? "بدون نام" : name}
            </p>
            <p className="text-sm text-darkGray ">{city}</p>
            <p className="flex items-center mt-2 text-darkGray text-sm">
              <Follow />{" "}
              <span className="mr-2">
                {" "}
                {followersCount == undefined ? 0 : followersCount} دنبال کننده{" "}
              </span>
            </p>

            <p className="flex items-center mt-2 text-darkGray text-sm">
              <Follow />{" "}
              <span className="mr-2">
                {" "}
                {followingCount == undefined ? 0 : followingCount} دنبال شده{" "}
              </span>
            </p>
          </div>
          <div className="hidden max-md:block w-full">
            <div className="flex justify-between ">
              <i onClick={()=>{
                rout.push('/')
                
              }}>
                <Back />
              </i>
              <i
                onClick={() => {
                  const textToCopy = "Your text here";
                  navigator.clipboard
                    .writeText(textToCopy)
                    .then(() => {
                      toast.success("متن با موفقیت کپی شد");
                    })
                    .catch(() => {
                      toast.error("مشکلی در کپی پیش آمد");
                    });
                }}
              >
                <Share />
              </i>
            </div>
            <div className="mt-7 flex items-center w-full">
              <div className="flex w-full items-center ">
                <div className="relative">
                  <svg
                    className="text-9xl"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    w-24="45"
                    h-24="45"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-v-924355f8=""
                  >
                    <path
                      fill="currentColor"
                      d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                    ></path>
                  </svg>
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-1.40546e-08 2.25C-6.44168e-09 1.03125 0.984375 0 2.25 0L6.75 0C7.125 0 7.5 0.375 7.5 0.75C7.5 1.17187 7.125 1.5 6.75 1.5L2.25 1.5C1.82812 1.5 1.5 1.875 1.5 2.25L1.5 6.75C1.5 7.17188 1.125 7.5 0.75 7.5C0.328125 7.5 -4.47989e-08 7.17188 -4.21637e-08 6.75L-1.40546e-08 2.25ZM10.125 4.5L13.8281 4.5C14.625 4.5 15.3281 5.01562 15.5625 5.71875L15.7031 6H16.875C18.2812 6 19.5 7.21875 19.5 8.625L19.5 15.375C19.5 16.8281 18.2812 18 16.875 18L7.125 18C5.67187 18 4.5 16.8281 4.5 15.375L4.5 8.625C4.5 7.21875 5.67187 6 7.125 6H8.25L8.39062 5.71875C8.67187 5.01562 9.32812 4.5 10.125 4.5ZM9.79687 6.28125L9.51562 7.03125C9.375 7.3125 9.09375 7.5 8.8125 7.5H7.125C6.46875 7.5 6 8.01562 6 8.625L6 15.375C6 16.0312 6.46875 16.5 7.125 16.5L16.875 16.5C17.4844 16.5 18 16.0312 18 15.375L18 8.625C18 8.01562 17.4844 7.5 16.875 7.5H15.1875C14.8594 7.5 14.5781 7.3125 14.4844 7.03125L14.1562 6.28125C14.1094 6.14062 13.9687 6 13.8281 6L10.125 6C9.98437 6 9.84375 6.14062 9.79687 6.28125ZM10.5 12C10.5 12.8437 11.1562 13.5 12 13.5C12.7969 13.5 13.5 12.8437 13.5 12C13.5 11.2031 12.7969 10.5 12 10.5C11.1562 10.5 10.5 11.2031 10.5 12ZM15 12C15 13.0781 14.3906 14.0625 13.5 14.625C12.5625 15.1406 11.3906 15.1406 10.5 14.625C9.5625 14.0625 9 13.0781 9 12C9 10.9687 9.5625 9.98437 10.5 9.42187C11.3906 8.90625 12.5625 8.90625 13.5 9.42187C14.3906 9.98437 15 10.9687 15 12ZM21.75 0C22.9688 0 24 1.03125 24 2.25L24 6.75C24 7.17187 23.625 7.5 23.25 7.5C22.8281 7.5 22.5 7.17187 22.5 6.75L22.5 2.25C22.5 1.875 22.125 1.5 21.75 1.5L17.25 1.5C16.8281 1.5 16.5 1.17187 16.5 0.75C16.5 0.375 16.8281 0 17.25 0L21.75 0ZM-1.35861e-07 21.75L-1.07752e-07 17.25C-1.05409e-07 16.875 0.328125 16.5 0.75 16.5C1.125 16.5 1.5 16.875 1.5 17.25L1.5 21.75C1.5 22.1719 1.82812 22.5 2.25 22.5H6.75C7.125 22.5 7.5 22.875 7.5 23.25C7.5 23.6719 7.125 24 6.75 24H2.25C0.984375 24 -1.43766e-07 23.0156 -1.35861e-07 21.75ZM21.75 24H17.25C16.8281 24 16.5 23.6719 16.5 23.25C16.5 22.875 16.8281 22.5 17.25 22.5H21.75C22.125 22.5 22.5 22.1719 22.5 21.75L22.5 17.25C22.5 16.875 22.8281 16.5 23.25 16.5C23.625 16.5 24 16.875 24 17.25L24 21.75C24 23.0156 22.9687 24 21.75 24Z"
                        fill="#515869"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mr-6">
                  <p className="text-darkGray">{name}</p>
                  <p className="text-darkGray">{city}</p>
               <div className="flex items-center">
  <p className="flex items-center mt-2 text-darkGray text-sm">
    <span className="mr-2">
      {followersCount == undefined ? 0 : followersCount} دنبال کننده
    </span>
  </p>
  
  <div className="border-l-2 border-CloudGray h-3 mx-5"></div> {/* خط عمودی وسط */}

  <p className="flex items-center mt-2 text-darkGray text-sm">
    <span className="mr-2">
      {followingCount == undefined ? 0 : followingCount} دنبال شده
    </span>
  </p>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!useIsMobile() && (
        <div className="w-full  justify-center flex  bg-lightBlueGray max-md:border-none border border-lightGrayBlue rounded-2xl max-md:px-4 max-md:rounded-none py-4 flex-col items-center">
          <div className="max-md:hidden">
            <div className="hidden max-md:flex  justify-between w-full ">
              <i>
                <Back />
              </i>
              <i>
                <Share />
              </i>
            </div>

            <div className="relative">
              <svg
                className="text-9xl"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                w-24="45"
                h-24="45"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                data-v-924355f8=""
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                ></path>
              </svg>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-1.40546e-08 2.25C-6.44168e-09 1.03125 0.984375 0 2.25 0L6.75 0C7.125 0 7.5 0.375 7.5 0.75C7.5 1.17187 7.125 1.5 6.75 1.5L2.25 1.5C1.82812 1.5 1.5 1.875 1.5 2.25L1.5 6.75C1.5 7.17188 1.125 7.5 0.75 7.5C0.328125 7.5 -4.47989e-08 7.17188 -4.21637e-08 6.75L-1.40546e-08 2.25ZM10.125 4.5L13.8281 4.5C14.625 4.5 15.3281 5.01562 15.5625 5.71875L15.7031 6H16.875C18.2812 6 19.5 7.21875 19.5 8.625L19.5 15.375C19.5 16.8281 18.2812 18 16.875 18L7.125 18C5.67187 18 4.5 16.8281 4.5 15.375L4.5 8.625C4.5 7.21875 5.67187 6 7.125 6H8.25L8.39062 5.71875C8.67187 5.01562 9.32812 4.5 10.125 4.5ZM9.79687 6.28125L9.51562 7.03125C9.375 7.3125 9.09375 7.5 8.8125 7.5H7.125C6.46875 7.5 6 8.01562 6 8.625L6 15.375C6 16.0312 6.46875 16.5 7.125 16.5L16.875 16.5C17.4844 16.5 18 16.0312 18 15.375L18 8.625C18 8.01562 17.4844 7.5 16.875 7.5H15.1875C14.8594 7.5 14.5781 7.3125 14.4844 7.03125L14.1562 6.28125C14.1094 6.14062 13.9687 6 13.8281 6L10.125 6C9.98437 6 9.84375 6.14062 9.79687 6.28125ZM10.5 12C10.5 12.8437 11.1562 13.5 12 13.5C12.7969 13.5 13.5 12.8437 13.5 12C13.5 11.2031 12.7969 10.5 12 10.5C11.1562 10.5 10.5 11.2031 10.5 12ZM15 12C15 13.0781 14.3906 14.0625 13.5 14.625C12.5625 15.1406 11.3906 15.1406 10.5 14.625C9.5625 14.0625 9 13.0781 9 12C9 10.9687 9.5625 9.98437 10.5 9.42187C11.3906 8.90625 12.5625 8.90625 13.5 9.42187C14.3906 9.98437 15 10.9687 15 12ZM21.75 0C22.9688 0 24 1.03125 24 2.25L24 6.75C24 7.17187 23.625 7.5 23.25 7.5C22.8281 7.5 22.5 7.17187 22.5 6.75L22.5 2.25C22.5 1.875 22.125 1.5 21.75 1.5L17.25 1.5C16.8281 1.5 16.5 1.17187 16.5 0.75C16.5 0.375 16.8281 0 17.25 0L21.75 0ZM-1.35861e-07 21.75L-1.07752e-07 17.25C-1.05409e-07 16.875 0.328125 16.5 0.75 16.5C1.125 16.5 1.5 16.875 1.5 17.25L1.5 21.75C1.5 22.1719 1.82812 22.5 2.25 22.5H6.75C7.125 22.5 7.5 22.875 7.5 23.25C7.5 23.6719 7.125 24 6.75 24H2.25C0.984375 24 -1.43766e-07 23.0156 -1.35861e-07 21.75ZM21.75 24H17.25C16.8281 24 16.5 23.6719 16.5 23.25C16.5 22.875 16.8281 22.5 17.25 22.5H21.75C22.125 22.5 22.5 22.1719 22.5 21.75L22.5 17.25C22.5 16.875 22.8281 16.5 23.25 16.5C23.625 16.5 24 16.875 24 17.25L24 21.75C24 23.0156 22.9687 24 21.75 24Z"
                    fill="#515869"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-4 text-xl text-darkGray font-semibold	">
              {name == null ? "بدون نام" : name}
            </p>
            <div className="flex w-full justify-center flex-col items-center">
              <p className="text-sm text-darkGray font-extralight	">{city}</p>
              <p className="flex items-center mt-2 text-darkGray text-sm">
                <Follow />{" "}
                <span className="mr-2 font-light	">
                  {" "}
                  {followersCount == undefined ? 0 : followersCount} دنبال کننده{" "}
                </span>
              </p>
              <p className="flex items-center mt-2 text-darkGray text-sm">
                <Follow />{" "}
                <span className="mr-2 font-light	">
                  {" "}
                  {followingCount == undefined ? 0 : followingCount} دنبال
                  شده{" "}
                </span>
              </p>
            </div>
          </div>
          <div className="hidden max-md:block w-full">
            <div className="flex justify-between ">
              <i>
                <Back />
              </i>
              <i>
                <Share />
              </i>
            </div>
            <div className="mt-7 flex items-center w-full">
              <div className="flex w-full">
                <div className="relative">
                  <svg
                    className="text-9xl"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    w-24="45"
                    h-24="45"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    data-v-924355f8=""
                  >
                    <path
                      fill="currentColor"
                      d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                    ></path>
                  </svg>
                  <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-1.40546e-08 2.25C-6.44168e-09 1.03125 0.984375 0 2.25 0L6.75 0C7.125 0 7.5 0.375 7.5 0.75C7.5 1.17187 7.125 1.5 6.75 1.5L2.25 1.5C1.82812 1.5 1.5 1.875 1.5 2.25L1.5 6.75C1.5 7.17188 1.125 7.5 0.75 7.5C0.328125 7.5 -4.47989e-08 7.17188 -4.21637e-08 6.75L-1.40546e-08 2.25ZM10.125 4.5L13.8281 4.5C14.625 4.5 15.3281 5.01562 15.5625 5.71875L15.7031 6H16.875C18.2812 6 19.5 7.21875 19.5 8.625L19.5 15.375C19.5 16.8281 18.2812 18 16.875 18L7.125 18C5.67187 18 4.5 16.8281 4.5 15.375L4.5 8.625C4.5 7.21875 5.67187 6 7.125 6H8.25L8.39062 5.71875C8.67187 5.01562 9.32812 4.5 10.125 4.5ZM9.79687 6.28125L9.51562 7.03125C9.375 7.3125 9.09375 7.5 8.8125 7.5H7.125C6.46875 7.5 6 8.01562 6 8.625L6 15.375C6 16.0312 6.46875 16.5 7.125 16.5L16.875 16.5C17.4844 16.5 18 16.0312 18 15.375L18 8.625C18 8.01562 17.4844 7.5 16.875 7.5H15.1875C14.8594 7.5 14.5781 7.3125 14.4844 7.03125L14.1562 6.28125C14.1094 6.14062 13.9687 6 13.8281 6L10.125 6C9.98437 6 9.84375 6.14062 9.79687 6.28125ZM10.5 12C10.5 12.8437 11.1562 13.5 12 13.5C12.7969 13.5 13.5 12.8437 13.5 12C13.5 11.2031 12.7969 10.5 12 10.5C11.1562 10.5 10.5 11.2031 10.5 12ZM15 12C15 13.0781 14.3906 14.0625 13.5 14.625C12.5625 15.1406 11.3906 15.1406 10.5 14.625C9.5625 14.0625 9 13.0781 9 12C9 10.9687 9.5625 9.98437 10.5 9.42187C11.3906 8.90625 12.5625 8.90625 13.5 9.42187C14.3906 9.98437 15 10.9687 15 12ZM21.75 0C22.9688 0 24 1.03125 24 2.25L24 6.75C24 7.17187 23.625 7.5 23.25 7.5C22.8281 7.5 22.5 7.17187 22.5 6.75L22.5 2.25C22.5 1.875 22.125 1.5 21.75 1.5L17.25 1.5C16.8281 1.5 16.5 1.17187 16.5 0.75C16.5 0.375 16.8281 0 17.25 0L21.75 0ZM-1.35861e-07 21.75L-1.07752e-07 17.25C-1.05409e-07 16.875 0.328125 16.5 0.75 16.5C1.125 16.5 1.5 16.875 1.5 17.25L1.5 21.75C1.5 22.1719 1.82812 22.5 2.25 22.5H6.75C7.125 22.5 7.5 22.875 7.5 23.25C7.5 23.6719 7.125 24 6.75 24H2.25C0.984375 24 -1.43766e-07 23.0156 -1.35861e-07 21.75ZM21.75 24H17.25C16.8281 24 16.5 23.6719 16.5 23.25C16.5 22.875 16.8281 22.5 17.25 22.5H21.75C22.125 22.5 22.5 22.1719 22.5 21.75L22.5 17.25C22.5 16.875 22.8281 16.5 23.25 16.5C23.625 16.5 24 16.875 24 17.25L24 21.75C24 23.0156 22.9687 24 21.75 24Z"
                        fill="#515869"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mr-6">
                  <p className="text-darkGray">{name}</p>
                  <p className="text-darkGray">{city}</p>
                  <div className="flex">
                    <p className="flex items-center mt-2 text-darkGray text-sm">
                      <span className="mr-2">
                        {" "}
                        {followersCount == undefined ? 0 : followersCount} دنبال
                        کننده{" "}
                      </span>
                    </p>

                    <p className="flex items-center mt-2 text-darkGray text-sm">
                      <span className="mr-2">
                        {" "}
                        {followingCount == undefined ? 0 : followingCount} دنبال
                        شده{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
