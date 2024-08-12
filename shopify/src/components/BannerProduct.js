import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1mobile from "../assest/banner/img1_mobile.jpg";
import image2mobile from "../assest/banner/img2_mobile.webp";
import image3mobile from "../assest/banner/img3_mobile.jpg";
import image4mobile from "../assest/banner/img4_mobile.jpg";
import image5mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1mobile,
    image2mobile,
    image3mobile,
    image4mobile,
    image5mobile,
  ];

  const nextImage = () => {
    if (currentImage === desktopImages.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage === 0) {
      setCurrentImage(desktopImages.length - 1);
    } else {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-56  md:h-72 bg-blue-100 w-full relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between text-3xl w-full">
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={prevImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((image, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full transition-all"
                key={image}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={image} alt="imgUrl" className="w-full h-full" />
              </div>
            );
          })}
        </div>

        <div className="flex h-full w-full overflow-hidden md:hidden ">
          {mobileImages.map((image, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full transition-all"
                key={image}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={image}
                  alt="imgUrl"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
