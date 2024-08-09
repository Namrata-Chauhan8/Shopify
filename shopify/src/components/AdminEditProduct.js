import React, { useEffect, useState } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { useForm } from "react-hook-form";
import apiUrl from "../api/Api";
import toast from "react-hot-toast";
import uploadImage from "../helpers/uploadImages";
import DisplayImage from "./DisplayImage";

const AdminEditProduct = ({ onClose, data, fetchData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const [productImage, setProductImage] = useState(data?.productImage || []);

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const onFormSubmit = async (e) => {
    e.productImage = productImage;
    try {
      const response = await fetch(apiUrl.editProduct.url, {
        method: apiUrl.editProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(e),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        reset();
        onClose();
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveProductImage = (index) => {
    setProductImage((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setProductImage((prev) => [...prev, uploadImageCloudinary.url]);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-slate-300 bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-1/2 p-6 rounded shadow-md">
          <div className="flex justify-end">
            <button
              id="closeContactForm"
              className="text-gray-700 hover:text-red-500"
              onClick={onClose}
            >
              <IoIosClose
                size="30px"
                className="icon-close hover:animate-spin"
              />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Edit Products</h2>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                {...register("productName", { required: true })}
              />
              {errors.productName && (
                <p className="text-red-500">Product name is required</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="brandName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                {...register("brandName", { required: true })}
              />
              {errors.brandName && (
                <p className="text-red-500">Brand name is required</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                {...register("category", { required: true })}
              >
                <option value="">Select a category</option>
                {productCategory.map((item, index) => (
                  <option value={item.value} key={item.value + index}>
                    {item.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">Select a category</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500">Price is required</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="sellingPrice"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Selling Price
              </label>
              <input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                {...register("sellingPrice", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500">Selling Price is required</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500">Description is required</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="productImage"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Image
              </label>
              <label htmlFor="productImageInput">
                <div className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 cursor-pointer">
                  <div className="text-slate-500 flex gap-2 justify-center h-10 w-full items-center">
                    <span>
                      <FaCloudArrowUp />
                    </span>
                    <p className="text-sm">Upload image</p>
                    <input
                      type="file"
                      id="productImageInput"
                      name="productImage"
                      className="hidden"
                      onChange={handleUploadProductImage}
                    />
                  </div>
                </div>
              </label>
              <div>
                {productImage[0] ? (
                  <div className="flex items-center gap-2 cursor-pointer">
                    {productImage.map((e, index) => {
                      return (
                        <div className="relative group">
                          <img
                            src={e}
                            alt="e"
                            width={80}
                            height={80}
                            className="bg-slate-100 border mt-2 rounded-md"
                            onClick={() => {
                              setOpenFullScreenImage(true);
                              setFullScreenImage(e);
                            }}
                          />
                          <div
                            className="text-white absolute top-[-6px] right-[-8px] font-extrabold bg-red-500 rounded-full hidden group-hover:block"
                            onClick={() => handleRemoveProductImage(index)}
                          >
                            <IoIosClose size="24px" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-red-500">Product image is required</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-2"
                disabled={productImage.length === 0}
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
        {openFullScreenImage && (
          <DisplayImage
            imgUrl={fullScreenImage}
            onClose={() => setOpenFullScreenImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;
