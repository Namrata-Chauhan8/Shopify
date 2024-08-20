import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import apiUrl from "../api/Api";
import displayINRCurrency from "../helpers/displayCurrency";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl.filterProduct.url, {
        method: apiUrl.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setData(dataResponse?.products);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory, navigate]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    setData((preve) => {
      const sortedData = [...preve];

      if (value === "asc") {
        sortedData.sort((a, b) => a.sellingPrice - b.sellingPrice);
      }

      if (value === "dsc") {
        sortedData.sort((a, b) => b.sellingPrice - a.sellingPrice);
      }

      return sortedData;
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  return (
    <div className="mx-auto p-4">
      <div className="lg:grid grid-cols-[200px,1fr]">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>

          <div className="bg-white p-4 rounded flex flex-wrap justify-center">
            {data.length > 0 &&
              data?.map((data, index) => {
                return (
                  <div
                    className="w-40 m-4 cursor-pointer"
                    onClick={() => navigate(`/product/${data?._id}`)}
                  >
                    <div className="w-32 h-32 flex justify-center items-center">
                      <img
                        src={data?.productImage[0]}
                        alt="imgUrl"
                        className="mx-auto object-fill h-full"
                      />
                    </div>
                    <h1 className="text-ellipsis line-clamp-2">
                      {data?.productName}
                    </h1>
                    <div>
                      <p className="font-bold">
                        {displayINRCurrency(data?.sellingPrice)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
