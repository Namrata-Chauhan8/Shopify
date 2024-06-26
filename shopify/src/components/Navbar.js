import React from "react";
import logo from "../assest/logo.png";
import { IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <div className="text-3xl cursor-pointer">
            <FaUserCircle />
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
            <Link to={"/login"} className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-slate-800">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
