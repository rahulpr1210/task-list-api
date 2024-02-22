const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Session = require("../models/session");
const UserXCredential = require("../models/userxcredential");
const { ERROR_MESSAGES, SUCCESS_MESSAGES, SESSION } = require("../constants");
const { authenticate } = require("../middlewares/auth");
const _ = require("lodash");
const { hash, compare } = require("bcrypt");
const { DateTime } = require("luxon");

router.post("/signup", async (req, res) => {
  try {
    const userWithEmail = await User.findOne({
      email: req.body.email,
    });

    if (userWithEmail) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.USER.USER_ALREADY_EXIST });
    }

    const createUserPayload = _.omit(req.body, ["password"]);
    const hashedPassword = await hash(req.body.password, 10);
    const userToCreate = await User.create(createUserPayload);

    const userCredentialsCreatePayload = {
      userId: userToCreate._id,
      password: hashedPassword,
    };

    await UserXCredential.create(userCredentialsCreatePayload);

    res.status(201).json({
      message: SUCCESS_MESSAGES.USER.USER_CREATED_SUCCESSFULLY,
      data: {
        user: userToCreate,
      },
    });
  } catch (err) {
    console.log('Err', err.data);
    res.status(400).json({
      message: err.message,
    })
    // throw new Error();
    // console.log("Error", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.USER.USER_NOT_FOUND_WITH_EMAIL });
    }
    const userXCredential = await UserXCredential.findOne({
      userId: user._id,
    });
    //compare entered password
    const isCorrectPassword = await compare(password, userXCredential.password);
    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.USER.INVALID_PASSWORD });
    }
    const token = user.generateAuthToken();

    //create user session
    const sessionCreatePayload = {
      userId: user._id,
      token,
      status: SESSION.STATUS.CURRENT,
      loginAt: DateTime.utc(),
      expireAt: DateTime.utc().plus({ hours: 1 }),
    };

    const sessionToCreate = await Session.create(sessionCreatePayload);
    res.status(201).json({
      message: SUCCESS_MESSAGES.USER.USER_LOGIN_SUCCESSFULLY,
      data: {
        user: user,
        session: sessionToCreate,
      },
    });
  } catch (err) {
    console.log("Error", err);
  }
});

router.get("/who-am-i", authenticate, (req, res) => {
  const { loggedInUserData } = req;
  res.status(200).json({
    user: loggedInUserData["user"],
    session: loggedInUserData["session"],
  });
});

router.get("/logout", authenticate, async (req, res) => {
  const {
    loggedInUserData: { session },
  } = req;
  if (session.status === SESSION.STATUS.EXPIRED) {
    res.status(400).json({
      message: "Session already expired.",
    });
  }
  await Session.findByIdAndUpdate(session._id, {
    status: SESSION.STATUS.EXPIRED,
    expiredAt: DateTime.utc(),
  });
  res.status(200).json({
    message: "Logout Successful.",
  });
});

module.exports = router;
