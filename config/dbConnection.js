import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_CONNECTION);
    if (!connect) throw new Error("Database connection faild!");

    console.log(
      "Database connected! host: " +
        connect.connection.host +
        " name: " +
        connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
