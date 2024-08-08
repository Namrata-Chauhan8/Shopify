const userModal = require("../modal/User");

const uploadProductPermission = async (userId) => {
  const user = await userModal.findById(userId);
  if (user?.role !== "ADMIN") {
    return false;
  }

  return false;
};

module.exports = uploadProductPermission;
