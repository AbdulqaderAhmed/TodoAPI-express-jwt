import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const tokenValidate = expressAsyncHandler(async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader.split(" ")[1];
  let secret = process.env.ACCESS_TOKEN_SECRET;

  if (authHeader) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(403);
        throw new Error("Forbidden request!");
      }

      req.user = decoded;

      next();
    });
  } else {
    req.user = undefined;
    res.status(401);
    throw new Error("User is not authorized!");
  }

  if (!token) {
    res.status(401);
    throw new Error("User is not authorized or token is missing!");
  }
});
