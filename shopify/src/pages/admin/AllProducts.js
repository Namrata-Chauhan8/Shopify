import React, { useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import UploadProducts from "../../components/UploadProducts";

const AllProducts = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg px-2 py-3">All Products</h2>
        <button
          className="text-2xl px-2 py-2 hover:bg-slate-100"
          onClick={() => setOpenUploadModal(true)}
        >
          <IoIosCloudUpload />
        </button>
      </div>
      {openUploadModal && (
        <UploadProducts onClose={() => setOpenUploadModal(false)} />
      )}
    </div>
  );
};

export default AllProducts;
