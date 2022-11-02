import { Router } from "express";
import { body, param, query } from "express-validator";
import prisma from "./db";
import { handleInputErrors } from "./middleware";
import { comparePasswords, hashPassword } from "./modules/auth";

const router = Router();

// extend the request type to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Product routes
router.get("/product", async (req, res) => {
  const { id } = req.user;

  const products = await prisma.product.findMany({
    where: {
      belongsToId: id,
    },
  });
  res.status(200);

  res.json(products);
});
router.get("/product/:id", () => {});
router.post(
  "/product",
  body("name").exists().isString(),
  handleInputErrors,
  async (req, res) => {
    const {
      body: { name },
      user: { id },
    } = req;
    const product = await prisma.product.create({
      data: {
        belongsToId: id,
        name,
      },
    });
    res.status(200);
    res.json({ product });
  }
);
router.put(
  "/product/:id",
  body(["name", "belongsToId"]).isString(),
  handleInputErrors,
  (req, res) => {
    res.status(200);
    res.json({ message: "Hello from products" });
  }
);
router.patch(
  "/product/:id",
  body("name").isString(),
  param("id").exists().isString(),
  handleInputErrors,
  async (req, res) => {
    const {
      body: { name },
      params: { id },
    } = req;

    try {
      await prisma.product.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      res.status(200);
      res.json({ message: "Product Deleted" });
    } catch (e) {
      return res.status(401);
    }
  }
);
router.delete(
  "/product/:id",
  param("id").exists().isString(),
  handleInputErrors,
  async (req, res) => {
    const {
      params: { id },
      user,
    } = req;
    try {
      await prisma.product.delete({
        where: {
          id,
        },
      });
      res.status(200);
      res.json({ message: "Product Deleted" });
    } catch (e) {
      return res.status(401);
    }
  }
);

// Update routes
router.get("/update", (req, res) => {});
router.get("/update/:id", () => {});
router.post(
  "/update",
  body("updatedAt").toDate(),
  body(["title", "body", "status", "version", "productId"]).isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  handleInputErrors,
  (req, res) => {
    res.status(200);
    res.json({ message: "Hello from products" });
  }
);
router.put(
  "/update/:id",
  body("updatedAt").toDate(),
  body(["title", "body", "status", "version", "productId"]).isString(),
  handleInputErrors,
  (req, res) => {}
);
router.patch(
  "/update/:id",
  body(["title", "body", "status", "version", "productId"]).isString().optional,
  handleInputErrors,
  () => {}
);
router.delete("/update/:id", () => {});

// Update Points routes
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body(["name", "description", "updateId"]).isString(),
  handleInputErrors,
  (req, res) => {}
);
router.put(
  "/updatepoint/:id",
  body(["name", "updateId", "description"]).isString(),
  handleInputErrors,
  (req, res) => {}
);
router.patch("/updatepoint/:id", () => {});
router.delete("/updatepoint/:id", () => {});

router.put(
  "/user",
  body(["password", "currentPassword"])
    .isString()
    .exists()
    .isLength({ min: 8 }),
  handleInputErrors,
  async (req, res) => {
    const {
      body: { password, currentPassword },
      //@ts-ignore
      user: { username },
    } = req;

    const user = await prisma.user.findUnique({ where: { username } });
    const isPasswordValid = await comparePasswords(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      res.status(400);
      res.json({ message: "incorrect password" });
      return;
    }

    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200);
    res.json({ message: "Hello from products" });
  }
);

export default router;
