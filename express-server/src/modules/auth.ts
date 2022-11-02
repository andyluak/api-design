import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const createJWT = ({ id, username }) => {
  return jwt.sign({ id, username }, process.env.SECRET);
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    return res.send({ message: "Not authorized" });
  }
  const [, token] = bearer.split(" ");

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = payload;
    console.log(payload);
    return next();
  } catch (e) {
    console.log(e);
    res.status(401);
    return res.send({ message: "Not authorized" });
  }
};

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
