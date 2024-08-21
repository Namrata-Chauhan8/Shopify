import React, { useContext, useEffect, useState } from "react";
import apiUrl from "../api/Api";
import toast from "react-hot-toast";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { AiFillDelete } from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";
import { PUBLISH_KEY } from "../constants/Constant";

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
    try {
      const res = await fetch(apiUrl.updateCart.url, {
        method: apiUrl.updateCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchCartProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const decreaseQty = async (id, qty) => {
    try {
      if (qty >= 2) {
        const res = await fetch(apiUrl.updateCart.url, {
          method: apiUrl.updateCart.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        });

        const data = await res.json();
        if (data.success) {
          fetchCartProducts();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(apiUrl.deleteProduct.url, {
        method: apiUrl.deleteProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCartProducts();
        context.fetchUserAddToCart();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const totalPrice = data.reduce((acc, curr) => {
    return acc + curr.productId.price * curr.quantity;
  }, 0);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(PUBLISH_KEY);
  
      const res = await fetch(apiUrl.checkout.url, {
        method: apiUrl.checkout.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          products: data,
        }),
      });
      const session = await res.json();
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      
    }
  };
  
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
            {data.map((product, index) => (
              <div
                key={product._id + "add to cart loading"}
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
                    className="absolute right-0 rounded-md p-2 hover:text-white cursor-pointer bg-red-500 mr-2"
                    onClick={() => deleteProduct(product?._id)}
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
                        product?.productId?.price * product?.quantity
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      className="border border-blue-600 text-blue-600 hover:bg-blue-500 w-6 h-6 flex justify-center items-center rounded"
                      onClick={() =>
                        decreaseQty(product?._id, product?.quantity)
                      }
                    >
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      className="border border-blue-600 text-blue-600 hover:bg-blue-500 hover:bg-blue-500 w-6 h-6 flex justify-center items-center rounded"
                      onClick={() =>
                        increaseQty(product?._id, product?.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 lg:mt-0 w-full max-w-sm ">
            <div className="h-auto rounded-md bg-white text-black border border-black shadow-md">
              <h1 className="px-4 py-1 font-semibold text-lg justify-center items-center text-center">
                Bill Details
              </h1>
              <table className="w-full h-auto ">
                <thead>
                  <tr className="flex justify-around text-black m-1 border border-slate-400 rounded-lg">
                    <th>Items</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product, index) => (
                    <tr
                      key={product._id}
                      className="flex justify-around text-gray-600 ml-1 mr-1"
                    >
                      <td className="line-clamp-1">
                        {product?.productId?.productName}
                      </td>
                      <td>x {product?.quantity}</td>
                      <td>
                        {displayINRCurrency(
                          product?.productId?.price * product?.quantity
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between border border-slate-400 rounded-lg m-1 p-1">
                <p className="ml-1 mr-1 font-semibold">Total Price </p>
                <p className="ml-1 mr-1 font-semibold text-blue-700">
                  {displayINRCurrency(totalPrice)}
                </p>
              </div>

              <div className="flex justify-center items-center mt-2">
                <button
                  className="p-2 bg-gray-500 text-white rounded-md hover:bg-blue-600 w-full m-2"
                  disabled={data.length === 0}
                  onClick={handlePayment}
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
