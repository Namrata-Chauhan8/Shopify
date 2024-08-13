import React, { useEffect, useState } from "react";
import apiUrl from "../api/Api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategoryProduct = async (req,res) => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl.categoryProduct.url);

      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading ? (
          <p className="m-auto">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#2563eb"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </p>
        ) : (
          categories?.map((category) => {
            return (
              <Link
                to={`/product-category/${category?.category}`}
                className="cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-2 bg-white flex items-center justify-center">
                  <img
                    src={category?.productImage[0]}
                    alt="imgUrl"
                    className="object-fill h-full hover:scale-125 transition-all"
                  />
                </div>
                <div>
                <p className="text-center text-sm md:text-base capitalize">
                  {category?.category}
                </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryList;
