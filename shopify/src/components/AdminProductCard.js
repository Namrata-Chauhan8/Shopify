import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            alt="imgUrl"
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>
        <div>
          <p className="font-bold">{displayINRCurrency(data?.sellingPrice)}</p>
          <div
            className="w-fit ml-auto p-2 hover:bg-blue-100 rounded-full cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <LiaEditSolid />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          data={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
