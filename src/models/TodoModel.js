import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id required!"],
      ref: "User",
    },
    title: {
      type: "String",
      required: [true, "Title required!"],
    },
    description: {
      type: "String",
      required: [true, "Description required!"],
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
