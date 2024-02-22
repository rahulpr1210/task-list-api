const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    listId: {
      type: Types.ObjectId,
      ref: "List",
      required: true,
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

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
