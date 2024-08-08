import React from "react";
import { IoIosClose } from "react-icons/io";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex justify-center items-center">
      <div className="bg-black shadow-lg rounded max-w-5xl mx-auto">
      <div className="flex justify-end">
            <button
              id="closeContactForm"
              className="text-white hover:text-red-500"
              onClick={onClose}
            >
              <IoIosClose
                size="30px"
                className="icon-close hover:animate-spin"
              />
            </button>
          </div>
        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
          <img src={imgUrl} alt="imgUrl" className="h-full w-full " />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
