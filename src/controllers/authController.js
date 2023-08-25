import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/UserModel.js";

export const register = expressAsyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;
  if (!username || !email || !phone || !password) {
    res.status(400);
    throw new Error("Fileds are required!");
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const availableUsername = await User.findOne({ username });
  const availableEmail = await User.findOne({ email });
  const availablePhone = await User.findOne({ phone });
  const availablePassword = await User.findOne({ password });

  if (availableEmail) {
    res.send(400);
    throw new Error("Email already exists!");
  } else if (availablePassword) {
    res.send(400);
    throw new Error("Password already exists!");
  } else if (availablePhone) {
    res.send(400);
    throw new Error("Phone already exists!");
  } else if (availableUsername) {
    res.send(400);
    throw new Error("Username already exists!");
  } else {
    const user = await User.create({
      username,
      email,
      phone,
      password: hashPassword,
    });

    if (user) {
      res.status(201).json({
        message: "User registerd successfully!",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid!");
    }
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    const userInfo = {
      username: user.username,
      email: user.email,
      id: user.id,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const accessToken = jwt.sign(userInfo, secret, { expiresIn: "15m" });

    user.token = accessToken;

    res.status(201).json({ message: "Logged in!", user });
  } else {
    res.status(403);
    throw new Error("Invalid user credential!");
  }
});

export const getUsers = expressAsyncHandler(async (req, res) => {
  res.json(req.user);
});
