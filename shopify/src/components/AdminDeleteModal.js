import React from "react";
import apiUrl from "../api/Api";
import toast from "react-hot-toast";
import { IoIosClose } from "react-icons/io";

const AdminDeleteModal = ({ onClose, data, fetchData }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(apiUrl.deleteAdminProduct.url, {
        method: apiUrl.deleteAdminProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: data,
        }),
      });
      const datares = await response.json();
      if (datares.success) {
        toast.success(datares.message);
        onClose();
        fetchData();
      } else {
        toast.error(datares.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
          <h2 className="text-2xl">
            Are you sure you want to delete this product?
          </h2>
          <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-3 text-xl"
            onClick={() => handleDelete()}
          >
            yes
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 ml-3 rounded mt-3 text-xl"
            onClick={() => onClose()}
          >
            No
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteModal;
