import mongoose from "mongoose";

const userShcema = mongoose.Schema(
  {
    username: {
      type: "String",
      required: [true, "Username required!"],
    },
    email: {
      type: "String",
      required: [true, "Email required!"],
    },
    phone: {
      type: "String",
      required: [true, "Phone required"],
    },
    password: {
      type: "String",
      required: [true, "Password required"],
    },
    token: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userShcema);
