import { Router } from "express";

const router = Router();

// Product routes
router.get("/product", (req, res) => {
	res.status(200);

	res.json({ message: "Hello from products" });
});
router.get("/product/:id", () => {});
router.post("/product", () => {});
router.put("/product/:id", () => {});
router.patch("/product/:id", () => {});
router.delete("/product/:id", () => {});

// Update routes
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post("/update", () => {});
router.put("/update/:id", () => {});
router.patch("/update/:id", () => {});
router.delete("/update/:id", () => {});

// Update Points routes
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.put("/updatepoint/:id", () => {});
router.patch("/updatepoint/:id", () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
