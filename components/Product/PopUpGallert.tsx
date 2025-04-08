import React, { useState } from "react";
import Close from "../icons/Close";
import ArrowRight from "../icons/ArrowRight";
import ArrowLeftt from "../icons/ArrowLeftt";
interface Image {
  main_link: string;
}
interface PopUpGalleryProps {
  setShow: (value: boolean) => void;
  src: Image[];
  title: string;
  wich: number;
}

export default function PopUpGallery({
  setShow,
  src,
  title,
  wich,
}: PopUpGalleryProps) {
  const [imgIndex, setImagIndex] = useState<number>(wich);

  let startX: number = 0;
  let endX: number = 0;

  const handlePrev = () => {
    if (imgIndex < src.length - 1) setImagIndex(imgIndex + 1);
  };

  const handleNext = () => {
    if (imgIndex > 0) setImagIndex(imgIndex - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    endX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      handleNext();
    }
    if (endX - startX > 50) {
      handlePrev();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX !== 0) {
      endX = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (startX - endX > 50) {
      handleNext();
    }
    if (endX - startX > 50) {
      handlePrev();
    }
    startX = 0;
  };
  const isVideo = (link: string) => {
    return (
      link.endsWith(".mp4") ||
      link.includes("youtube.com") ||
      link.includes("vimeo.com")
    );
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] max-md:h-full"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-white rounded-lg w-[854px] max-md:w-full max-md:h-full h-[553px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-800"
          onClick={() => setShow(false)}
        >
          <Close />
        </button>

        <div className="p-4 h-full">
          <div className="border-b w-full flex justify-start items-start mb-4">
            <p className="text-customGray font-normal text-xl">تصاویر رسمی</p>
          </div>

          <div className="grid grid-cols-[46%_auto] max-md:flex max-md:flex-col-reverse gap-4 mt-4 h-[90%]">
            <div className="flex flex-col p-4 h-full">
              <div className="flex w-full items-start mb-4 justify-between text-customGray">
                <h1>{title}</h1>
                <p>{src.length} تصویر</p>
              </div>

              <div className="flex gap-3 flex-wrap">
                {src.map((item: { main_link: string }, index: number) => (
                  <div
                    key={index}
                    className={`border rounded-2xl p-2 ${
                      imgIndex === index && "border-orange-400"
                    }`}
                  >
                    {isVideo(item.main_link) ? (
                      <img
                        onClick={() => setImagIndex(index)}
                        className="w-[80px] h-[80px] rounded-2xl cursor-pointer"
                        // src={item[1].main_link}
                      
                        alt=""
                      />
                    ) : (
                      <img
                        onClick={() => setImagIndex(index)}
                        className="w-[80px] h-[80px] rounded-2xl cursor-pointer"
                        src={item.main_link}
                        alt=""
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="border rounded-2xl p-4 h-full flex flex-col justify-center items-center relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => (startX = 0)}
            >
              <div className="flex justify-between items-center w-full mb-4">
                <button
                  onClick={handlePrev}
                  className="text-gray-500 hover:text-gray-800 absolute left-0 top-1/2 transform -translate-y-1/2"
                >
                  <ArrowLeftt />
                </button>

                {isVideo(src[imgIndex].main_link) ? (
                  <video
                    className="w-full max-h-[400px] object-contain rounded-2xl"
                    controls
                    src={src[imgIndex].main_link}
                  />
                ) : (
                  <img
                    className="w-full max-h-[400px] object-contain rounded-2xl"
                    src={src[imgIndex].main_link}
                    alt=""
                  />
                )}

                <button
                  onClick={handleNext}
                  className="text-gray-500 hover:text-gray-800 absolute right-0 top-1/2 transform -translate-y-1/2"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
