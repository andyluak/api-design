import prisma from "../db";
import { hashPassword, createJWT, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const { password, username, email } = req.body;

  if (!password || !username) return res.status(400);
  const hash = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hash,
      },
    });
    const token = createJWT(user);

    return res.json({ token });
  } catch (e) {
    console.log(e);
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    res.status(401);
    return res.send({ message: "Invalid username or password" });
  }
  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    res.status(401);
    return res.send({ message: "Invalid username or password" });
  }

  const token = createJWT(user);
  res.json({ token });
};
