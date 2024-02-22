const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    color: {
      type: String,
      default: null,
      trim: true,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);
module.exports = List;
