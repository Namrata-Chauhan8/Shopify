const jwt = require("jsonwebtoken");

const AuthToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    // console.log('token: ', token);

    if (!token) {
      return res.json({
        message: "Unauthorized user",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("Error AuthToken: ", err);
      }

      req.userId = decoded?._id;
      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
};

module.exports = AuthToken;
