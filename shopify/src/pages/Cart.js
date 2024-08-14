import React, { useContext, useEffect, useState } from "react";
import apiUrl from "../api/Api";
import toast from "react-hot-toast";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [data, setData] = useState([]);
  const context = useContext(Context);

  const fetchCartProducts = async () => {
    try {
      const res = await fetch(apiUrl.addToCartProductView.url, {
        method: apiUrl.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const increaseQty = async (id, qty) => {
    // updateCartProduct(id, qty + 1);
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      // updateCartProduct(id, qty - 1);
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.productQuantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.productQuantity * curr?.productId?.price,
    0
  );

  useEffect(() => {
    fetchCartProducts();
  }, []);
  return (
    <div className="p-5">
      <div className="container mx-auto">
        <div className="text-center text-lg my-3">
          {data.length === 0 && (
            <p className=" py-5 text-red-500 font-bold text-3xl">
              Cart is Empty
            </p>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
          <div className="w-full max-w-3xl">
            {data.map((product) => (
              <div
                key={product._id}
                className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
              >
                <div className="w-32 h-32 bg-slate-200">
                  <img
                    src={product?.productId?.productImage?.[0]}
                    className="w-full h-full object-scale-down mix-blend-multiply"
                    alt={product?.productId?.productImage}
                  />
                </div>
                <div className="p-2 relative flex flex-wrap flex-col">
                  <div
                    className="absolute right-0 rounded-md p-2 hover:text-white cursor-pointer mr-auto"
                    style={{
                      border: "1px solid rgb(56, 45, 94)",
                      backgroundColor: "rgb(56, 45, 94)",
                      color: "rgb(239,224,226)",
                    }}
                    // onClick={()=> handleDeleteCartProduct(product?._id)}
                  >
                    <AiFillDelete />
                  </div>
                  <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                    {product?.productId?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.productId?.category}
                  </p>
                  <div className="flex items-center justify-between flex-wrap">
                    <p className="text-red-600 font-medium text-md">
                      {displayINRCurrency(product?.productId?.price)}
                    </p>
                    <p className="text-slate-600 font-semibold text-md">
                      {displayINRCurrency(
                        product?.productId?.price * product?.productQuantity
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      className="border border-blue-600 text-blue-600 hover:bg-blue-500 w-6 h-6 flex justify-center items-center rounded"
                      onClick={() =>
                        decreaseQty(product._id, product.productQuantity)
                      }
                    >
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      className="border border-blue-600 text-blue-600 hover:bg-blue-500 hover:bg-blue-500 w-6 h-6 flex justify-center items-center rounded"
                      onClick={() =>
                        increaseQty(product._id, product.productQuantity)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            <div
              className="h-36 bg-white rounded-md"
              style={{
                color: "rgb(56, 45, 94)",
                backgroundColor: "rgb(239,224,226)",
              }}
            >
              <h1 className="px-4 py-1 font-semibold text-lg justify-center items-center text-center">
                Bill Details
              </h1>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-md text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-1 font-medium text-md text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <div className="flex justify-center items-center mt-2">
                <button
                  className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full"
                  style={{ backgroundColor: "rgb(56, 45, 94)" }}
                  //   onClick={Pay}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
