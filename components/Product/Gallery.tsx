import React, { useState } from "react";
import PopUpGallery from "./PopUpGallert";
import Resize from "../icons/Resize";
import Play from "../icons/Play";

interface ConversionLinks {
  small_85_85?: string;
}

interface ImageData {
  main_link: string;
  conversion_links?: ConversionLinks;
  collection_name?: string;
}

interface GalleryProps {
  data: ImageData[];
  title: string;
}

const Gallery: React.FC<GalleryProps> = ({ data, title }) => {
  const [show, setShow] = useState<boolean>(false);
  const [indexImage, setIndexImage] = useState<number>(0);

  if (!data || data.length === 0) {
    return <p>Loading...</p>;
  }
  const validImages = data.filter((image) => image.main_link);

  if (validImages.length === 0) {
    return <p>No valid images available</p>;
  }

  const mainImage = validImages.find(
    (image) => image.collection_name === "book_front_image"
  );

  const displayImage = mainImage || validImages[0];

  const sideImages = validImages.filter((image) => image);

  return (
    <div className="mt-3">
      <div className="grid grid-cols-[auto_98px] max-md:grid-cols-1 gap-5">
        <div
          className="border  max-md:relative   h-[548px] cursor-pointer w-[548px] max-md:h-[360px] max-md:w-full border-lightGrayBlue rounded-lg flex justify-center overflow-hidden"
          onClick={() => {
            setIndexImage(0);
            setShow(true);
          }}
        >
          <img
            className="object-contain w-full  h-full"
            src={displayImage.main_link}
            alt="Main Image"
            width={548}
            height={548}
          />
          <div className=" left-4 absolute bottom-2  hidden max-md:block">
            <div className=" bg-white w-fit opacity-60 flex items-center  py-2 px-3 rounded-2xl">
              <span className="ml-6"> 
              <Play/>

              </span>
              <Resize/>
            </div>

          </div>
        </div>
        <p className="mt-3 text-base font-bold text-customGray max-md:flex hidden w-full justify-start ">
          {title}
        </p>

        <div className="flex gap-2 flex-col max-md:flex-row max-md:hidden overflow-hidden ">
        {sideImages.slice(0, 6).map((image, index) => (
  <div
    key={index}
    className="h-[85px] w-[85px] border rounded-2xl overflow-hidden relative"
    onClick={() => {
      if (index === 0) {
        setIndexImage(0);
      } else {
        setIndexImage(1);
      }
      setShow(true);
    }}
  >
    <img
      src={image.main_link}
      className={`h-[85px] object-cover cursor-pointer rounded-md w-[85px] ${index === 5 ? "blur-md" : ""}`}
      alt={`Thumbnail ${index + 1}`}
    />
    {index === 5 && (
      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xs">
         + {sideImages.length - 6} 
      </p>
    )}
  </div>
))}



        </div>
      </div>
      {show && (
        <PopUpGallery
          src={validImages}
          setShow={setShow}
          title={title}
          wich={indexImage}
        />
      )}
    </div>
  );
};

export default Gallery;
