import { Router } from "express";
import { body, check, validationResult } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

// Product routes
router.get("/product", (req, res) => {
  res.status(200);

  res.json({ message: "Hello from products" });
});
router.get("/product/:id", () => {});
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {
    res.status(200);
    res.json({ message: "Hello from products" });
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
  handleInputErrors,
  (req, res) => {}
);
router.delete("/product/:id", () => {});

// Update routes
router.get("/update", (req, res) => {});
router.get("/update/:id", () => {});
router.post(
  "/update",
  body("updatedAt").toDate(),
  body(["title", "body", "status", "version", "productId"]).isString(),
  handleInputErrors,
  (req, res) => {}
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

export default router;
