import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import { tokenValidate } from "../middlewares/tokenValidation.js";

const router = express.Router();

router.use(tokenValidate);
router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

export default router;
