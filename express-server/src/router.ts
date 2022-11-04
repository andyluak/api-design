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
    include: {
      updates: true,
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
router.get(
  "/update",
  body("productId").exists().isString(),
  handleInputErrors,
  async (req, res) => {}
);
router.get("/update/:id", param("id").exists().isString(), async (req, res) => {
  const { id } = req.params;

  const updates = await prisma.update.findUnique({
    where: {
      id,
    },
    include: {
      updatePoints: true,
    },
  });

  res.status(200);
  res.json(updates);
});
router.post(
  "/update",
  body(["title", "status", "productId"]).isString(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  handleInputErrors,
  async (req, res) => {
    const { productId, title, status, body, version } = req.body;
    const date = new Date().toISOString();

    const update = await prisma.update.create({
      data: {
        updatedAt: date,
        title,
        body: body ? body : "",
        status,
        version: version ? version : title,
        productId: productId,
      },
    });
    res.status(200);
    res.json(update);
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
router.get("/updatepoint", async (req, res) => {
  const { updateId } = req.body;

  const updatePoints = await prisma.updatePoint.findMany({
    where: {
      updateId,
    },
  });

  res.status(200);
  res.json(updatePoints);
});
router.get(
  "/updatepoint/:id",
  param("id").exists().isString(),
  handleInputErrors,
  async (req, res) => {}
);
router.post(
  "/updatepoint",
  body(["description", "updateId"]).isString(),
  body("type").isIn(["FEATURE", "BUG_FIX", "IMPROVEMENT"]),
  handleInputErrors,
  async (req, res) => {
    const { description, updateId, type } = req.body;
    const date = new Date().toISOString();

    const updatePoint = await prisma.updatePoint.create({
      data: {
        updatedAt: date,
        description,
        type,
        updateId,
      },
    });

    res.status(200);
    res.json(updatePoint);
  }
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
