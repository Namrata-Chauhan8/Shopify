const userModal = require("../../modal/User");

async function updateUser(req, res) {
  try {

    const sessionUser = req.userId;

    const { userId, name, email, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const updateUser = await userModal.findByIdAndUpdate(userId, payload);

    const user = await userModal.findById(sessionUser);

    res.json({
      data: updateUser,
      error: false,
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
}

module.exports = updateUser;
