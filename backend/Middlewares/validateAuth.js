const jwtd = require("jsonwebtoken");
const User = require("../Schema/userSchema");
// validating auth token
const validateToken = async (req, res, next) => {
  try {
    const token = await req.cookies.Auth_Token;
    if (!token) {
      return res.json({
        type: "Error",
        message: "Invalid Request",
      });
    }
    const vtoken = jwtd.verify(token, process.env.JWTSECRETKEY);
    const isValid = await User.findOne({ _id: vtoken.id });
    if (!isValid) {
      return res.json({
        type: "Error",
        message: "Invalid Request",
      });
    }
    req.userId = isValid._id;
    next();
  } catch (err) {
    return res
      .json({
        type: "Validate",
        message: "Invalid Request",
      })
      .status(404);
  }
};
module.exports = validateToken;
