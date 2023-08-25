import express from "express";
import { getUsers, login, register } from "../controllers/authController.js";
import { tokenValidate } from "../middlewares/tokenValidation.js";

export const auth = express.Router();

auth.post("/login", login);
auth.post("/register", register);
auth.get("/user", tokenValidate, getUsers);
