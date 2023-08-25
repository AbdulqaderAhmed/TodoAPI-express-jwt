import express from "express";
import "dotenv/config";
import morgan from "morgan";
import router from "./src/routers/todoRoute.js";
import { connectionDB } from "./config/dbConnection.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { auth } from "./src/routers/userRoute.js";

connectionDB();

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/api/auth", auth);
app.use("/api/todo", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Application started on port: " + PORT);
});
