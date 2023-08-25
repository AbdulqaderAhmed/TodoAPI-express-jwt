import { constant } from "../../constant.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constant.BAD_REQUEST:
      res.json({ title: "Bad request!", message: err.message });
      break;
    case constant.DUPILICATE:
      res.json({ title: "Dupilicated entry!", message: err.message });
      break;
    case constant.PAGE_NOT_FOUND:
      res.json({ title: "Page not found!", message: err.message });
      break;
    case constant.SERVER_ERROR:
      res.json({ title: "Server error!", message: err.message });
      break;
    case constant.UNAUTORIZED:
      res.json({ title: "Unautorized!", message: err.message });
      break;
    case constant.FORBIDDEN:
      res.json({ title: "Forbidden!", message: err.message });
      break;
    default:
      console.log("no error found!");
      break;
  }
};
