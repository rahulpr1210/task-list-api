const { ERROR_MESSAGES, SESSION } = require("../constants");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Session = require("../models/session");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER.USER_NOT_FOUND);
    }
    const session = await Session.findOne({
      status: SESSION.STATUS.CURRENT,
      token,
    });
    if (!session) {
      throw new Error(ERROR_MESSAGES.SESSION.SESSION_NOT_FOUND);
    }
    req.loggedInUserData = {};
    req.loggedInUserData['user'] = user;
    req.loggedInUserData['session'] = session;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: ERROR_MESSAGES.USER.UNAUTHORIZED });
  }
};

module.exports = {
  authenticate,
};
