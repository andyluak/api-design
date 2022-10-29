import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/user", createNewUser);
app.post("/signin", signIn)

app.get("/", (req, res) => {
	console.log("Hello from express");
	res.status(200);
	res.json({ message: "Hello" });
});



app.use("/api", protect, router);

export default app;
