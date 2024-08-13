import React, { useState } from "react";
import logo from "../assest/logo.png";
import { IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiUrl from "../api/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUserDetails } from "../redux/userSlice";
import ROLE from "../common/Role";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuDisplay, setMenuDisplay] = useState(false);

  const user = useSelector((state) => state?.user?.user);

  const handleLogout = async () => {
    try {
      const res = await fetch(apiUrl.logout.url, {
        method: apiUrl.logout.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="h-17 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="cursor-pointer">
          <Link to={"/"}>
            <img src={logo} alt="logo" width={90} height={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full h-9 px-5 border border-gray-300 rounded-l-full"
          />
          <div className="text-lg min-w-[50px] h-9 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
            <IoIosSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative group">
            {user?._id && (
              <div
                className="cursor-pointer text-3xl relative flex justify-center"
                onClick={() => {
                  setMenuDisplay((prev) => !prev);
                }}
              >
                {user?.profilePhoto ? (
                  <img
                    src={user?.profilePhoto}
                    alt="profile"
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute  bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/adminPanel/uploadProducts"}
                      className="block py-2 px-4 hover:bg-slate-200 whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => {
                        setMenuDisplay((prev) => !prev);
                      }}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          <div className="text-3xl cursor-pointer relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
              <p className="text-xs">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-slate-800"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-slate-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
