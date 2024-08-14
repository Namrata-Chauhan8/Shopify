import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context/index";
import apiUrl from "../api/Api";
import HorizontalCartProducts from "../components/HorizontalCartProducts";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();

  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    const response = await fetch(apiUrl.productDetails.url, {
      method: apiUrl.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: params?.id,
      }),
    });
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    try {
      await addToCart(e, id);
      fetchUserAddToCart();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 cursor-pointer">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              alt="productImage"
            />

            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
              {data?.productImage?.map((imgURL, index) => {
                return (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                    key={imgURL}
                  >
                    <img
                      src={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="bg-blue-200 text-blue-600 px-2 rounded-full inline-block w-fit">
            {data?.brandName}
          </p>
          <h2 className="text-2xl lg:text-4xl font-medium">
            {data?.productName}
          </h2>
          <p className="capitalize text-slate-400">{data?.category}</p>

          <div className="text-yellow-500 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>

          <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
            <p className=" text-slate-400 line-through">
              {displayINRCurrency(data.sellingPrice)}
            </p>
            <p className="text-blue-600">{displayINRCurrency(data.price)}</p>
          </div>

          <div className="flex items-center gap-3 my-2">
            <button
              className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] text-blue-600 font-medium hover:bg-blue-600 hover:text-white"
              onClick={(e) => handleBuyProduct(e, data?._id)}
            >
              Buy
            </button>
            <button
              className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-blue-600 hover:text-blue-600 hover:bg-white"
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Add To Cart
            </button>
          </div>

          <div>
            <p className="text-slate-600 font-medium my-1">Description : </p>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>

      {data.category && (
        <HorizontalCartProducts
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
