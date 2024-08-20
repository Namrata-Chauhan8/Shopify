import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiUrl from "../api/Api";
import toast from "react-hot-toast";
import displayINRCurrency from "../helpers/displayCurrency";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchSearchProducts = async () => {
    try {
      const res = await fetch(apiUrl.searchProduct.url + query.search);

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

  useEffect(() => {
    fetchSearchProducts();
  }, [query.search]);
  return (
    <div className="container mx-auto p-4">
      <p>Search Results: {data.length}</p>
      {data.length === 0 && (
        <p className="text-center text-red-500">No Products Found</p>
      )}
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow-md rounded p-4 my-4 cursor-pointer"
          onClick={() => navigate(`/product/${item._id}`)}
        >
          <div className="flex items-center">
            <img
              src={item.productImage[0]}
              alt={item.productName}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="ml-4">
              <h2 className="text-lg font-bold">{item.productName}</h2>
              <p className="bg-blue-200 text-blue-600 px-2 rounded-full inline-block w-fit capitalize">
                {item.category}
              </p>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-00">{displayINRCurrency(item.price)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchProduct;
