import expressAsyncHandler from "express-async-handler";
import { Todo } from "../models/TodoModel.js";

export const getTodos = expressAsyncHandler(async (req, res) => {
  const todo = await Todo.find({ user_id: req.user.id });
  res.status(200).json(todo);
});

export const getTodo = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo && id != req.params.id) {
    res.status(404);
    throw new Error("Page not found!");
  }
  res.status(200).json(todo);
});

export const createTodo = expressAsyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error("Fileds are required!");
  }

  const avalableTitle = await Todo.findOne({ title });
  const avalableDescrption = await Todo.findOne({ description });

  if (avalableTitle) {
    res.status(409);
    throw new Error("Title already exists!");
  } else if (avalableDescrption) {
    res.status(409);
    throw new Error("Description already exists!");
  } else {
    await Todo.create({
      title,
      description,
      user_id: req.user.id,
    });

    const todos = await Todo.find();
    res.status(201).json({ message: "Succfully created!", todos });
  }
});

export const updateTodo = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const editTodo = await Todo.findByIdAndUpdate(id, req.body);

  if (!editTodo) {
    res.status(404);
    throw new Error("No such a task!");
  }

  if (editTodo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not allowd to updated this post!");
  }

  const todos = await Todo.find();
  res.status(202).json({ message: "Succfully updated!", todos });
});

export const deleteTodo = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const removeTodo = await Todo.findByIdAndDelete(id);

  if (!removeTodo) {
    res.status(404);
    throw new Error("No such a task!");
  }

  if (removeTodo.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not allowd to updated this post!");
  }

  const todos = await Todo.find();
  res.status(202).json({ message: "Succfully deleted!", todos });
});
