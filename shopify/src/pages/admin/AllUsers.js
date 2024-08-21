import React, { useEffect, useState } from "react";
import apiUrl from "../../api/Api";
import toast from "react-hot-toast";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from "../../components/ChangeUserRole";
import { ADMIN } from "../../constants/Constant";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const res = await fetch(apiUrl.allUsers.url, {
      method: apiUrl.allUsers.method,
      credentials: "include",
    });
    const data = await res.json();

    if (data.success) {
      setAllUsers(data.data);
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const formatDate = (date) => {
    return moment(date).format("ll , LT");
  };

  return (
    <div className="bg-white p-2">
      <table className="w-full border userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, i) => (
            <tr key={i} className="hover:bg-gray-100 cursor-pointer">
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{formatDate(user.createdAt)}</td>
              <td>
                {user._id !== ADMIN && (
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer  hover:bg-green-500"
                    onClick={() => {
                      setUpdateUserDetails({
                        name: user.username,
                        email: user.email,
                        role: user.role,
                        _id: user._id,
                      });
                      setOpenUpdateRole(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunction={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
