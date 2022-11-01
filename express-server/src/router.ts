import { Router } from "express";
import { body, check, validationResult } from "express-validator";

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
  body("belongsToId").isString(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
    }
  }
);
router.put("/product/:id", body("name").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  }
});
router.patch("/product/:id", body("name").isString(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  }
});
router.delete("/product/:id", () => {});

// Update routes
router.get("/update", (req, res) => {});
router.get("/update/:id", () => {});
router.post(
  "/update",
  body("updatedAt").toDate(),
  body("title", "body").isString(),
  body("body").isString(),
  body("status").isString(),
  body("version").isString(),
  body("productId").isString(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
    }
  }
);
router.put(
  "/update/:id",
  body("updatedAt").toDate(),
  body("title").isString(),
  body("body").isString(),
  body("status").isString(),
  body("version").isString(),
  body("productId").isString(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
    }
  }
);
router.patch("/update/:id", () => {});
router.delete("/update/:id", () => {});

// Update Points routes
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
    }
  }
);
router.put(
  "/updatepoint/:id",
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ errors: errors.array() });
    }
  }
);
router.patch("/updatepoint/:id", () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
