import React, { useEffect, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import UploadProducts from "../../components/UploadProducts";
import apiUrl from "../../api/Api";
import toast from "react-hot-toast";
import AdminProductCard from "../../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const res = await fetch(apiUrl.allProducts.url);
    const data = await res.json();
    if (data.success) {
      setAllProducts(data.data);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

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

      {/*All products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProducts?.map((product,index)=>{
          return (
            <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProducts}/>
          )
        })}
      </div>

      {openUploadModal && (
        <UploadProducts onClose={() => setOpenUploadModal(false)} fetchData={fetchAllProducts}/>
      )}
    </div>
  );
};

export default AllProducts;
