import React, { useEffect, useRef, useState } from "react";
import fetProductsByCategory from "../helpers/fetchProductsByCategory";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HorizontalCartProducts = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const scrollElement = useRef();

  const fetchProduct = async () => {
    const productsByCategory = await fetProductsByCategory(category);
    setData(productsByCategory?.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollBy({
      left: 200,
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollElement.current.scrollBy({
      left: -200,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h1 className="text-2xl font-bold mb-4">{heading}</h1>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none"
        ref={scrollElement}
      >
        {data.length > 4 && (
          <>
            <button
              className="absolute left-0 bg-white shadow-md rounded-full p-1 text-lg hidden md:block"
              onClick={scrollLeft}
            >
              <FaAngleLeft />
            </button>
            <button
              className="absolute right-0 bg-white shadow-md rounded-full p-1 text-lg  hidden md:block"
              onClick={scrollRight}
            >
              <FaAngleRight />
            </button>
          </>
        )}
        {data.map((product, index) => {
          return (
            <Link to={`/product/${product?._id}`} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex">
              <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
                <img
                  src={product.productImage[0]}
                  alt="productImage"
                  className="object-scale-down h-full hover:scale-110 transition-all"
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold md:text-lg text-base text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500 font-semibold">
                  {product?.category}
                </p>
                <div className="flex gap-2 text-sm">
                  <p className="text-slate-400 line-through">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-blue-500 font-medium">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 mt-2 hover:bg-blue-800">
                  Add to Cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCartProducts;
