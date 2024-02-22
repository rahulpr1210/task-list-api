const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const userXCredentialSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserXCredential = mongoose.model(
  "UserXCredential",
  userXCredentialSchema
);
module.exports = UserXCredential;
