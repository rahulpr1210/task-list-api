const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { SESSION } = require("../constants");

const sessionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SESSION.STATUS),
      default: SESSION.STATUS.CURRENT,
    },
    loginAt: {
      type: Date,
      default: null,
    },
    expireAt: {
      type: Date,
      default: null,
    },
    expiredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
