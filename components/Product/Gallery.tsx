import React, { useState } from "react";
import Resize from "../icons/Resize";
import Play from "../icons/Play";
import PopUpGallery from "./PopUpGallert";

interface ConversionLinks {
  small_85_85?: string;
  medium_548_548?: string;
  thumbnail_192_192?: string;
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

  const isVideo = (link: string) => {
    return (
      link.endsWith(".mp4") ||
      link.includes("youtube.com") ||
      link.includes("vimeo.com")
    );
  };

  const validImages = data.filter((image) => image.main_link);

  if (validImages.length === 0) {
    return <p>No valid images available</p>;
  }

  const mainImage =
    validImages.find((image) => image.collection_name === "book_front_image") ||
    validImages.find((image) => image.collection_name === "normal_product_main_image") ||
    validImages[0];

  const displayImage = mainImage;

  const mainImageSrc =
    displayImage.conversion_links?.medium_548_548 || displayImage.main_link;

  const sideImages = [...validImages].sort((a, b) => {
    const order = {
      book_front_image: 1,
      book_back_image: 2,
      book_gallery_image: 3,
      normal_product_main_image: 4,
      normal_product_gallery_image: 5,
    };
    const aOrder = order[a.collection_name as keyof typeof order] || 6;
    const bOrder = order[b.collection_name as keyof typeof order] || 6;
    return aOrder - bOrder;
  });

  return (
    <div className="mt-3">
      <div className="grid grid-cols-[auto_98px] max-md:grid-cols-1 gap-5">
        <div
          className="border max-md:relative h-[548px] cursor-pointer w-[548px] max-md:h-[360px] max-md:w-full border-lightGrayBlue rounded-lg flex justify-center overflow-hidden"
          onClick={() => {
            setIndexImage(sideImages.indexOf(displayImage));
            setShow(true);
          }}
        >
          <img
            className="object-contain w-full h-full"
            src={mainImageSrc}
            alt="Main Image"
            width={548}
            height={548}
          />
          <div className="left-4 absolute bottom-2 hidden max-md:block">
            <div className="bg-white w-fit opacity-60 flex items-center py-2 px-3 rounded-2xl">
              <span className="ml-6">
                <Play />
              </span>
              <Resize />
            </div>
          </div>
        </div>

        <p className="mt-3 text-base font-bold text-customGray max-md:flex hidden w-full justify-start">
          {title}
        </p>

        <div className="flex gap-2 flex-col max-md:flex-row max-md:hidden overflow-hidden">
          {sideImages.slice(0, 6).map((image, index) => {
            const sideImageSrc =
              image.conversion_links?.thumbnail_192_192 || image.main_link;
            const isVid = isVideo(image.main_link);

            return (
              <div
                key={index}
                className="h-[85px] w-[85px] border rounded-2xl overflow-hidden relative"
                onClick={() => {
                  setIndexImage(sideImages.indexOf(image));
                  setShow(true);
                }}
              >
                {isVid ? (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded-2xl">
                    <Play />
                  </div>
                ) : (
                  <img
                    src={sideImageSrc}
                    className={`h-[85px] object-cover cursor-pointer rounded-md w-[85px] ${
                      index === 5 && sideImages.length > 6 ? "blur-md" : ""
                    }`}
                    alt={`Thumbnail ${index + 1}`}
                  />
                )}
                {index === 5 && sideImages.length > 6 && (
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xs">
                    + {sideImages.length - 6}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {show && (
        <PopUpGallery
          src={sideImages}
          setShow={setShow}
          title={title}
          wich={indexImage}
        />
      )}
    </div>
  );
};

export default Gallery;
