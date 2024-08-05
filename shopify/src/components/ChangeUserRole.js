import React, { useState } from "react";
import ROLE from "../common/Role";
import { IoMdClose } from "react-icons/io";
import apiUrl from "../api/Api";
import toast from "react-hot-toast";

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunction = () => {},
}) => {
  const [userRole, setUserRole] = useState(role);
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const response = await fetch(apiUrl.updateUser.url, {
      method: apiUrl.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      callFunction();
      onClose();
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-500 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex">
          <p className="pt-4">Role:</p>
          <select
            className="p-2 border border-gray-300 rounded m-3"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
