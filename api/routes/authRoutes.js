import { Router } from "express";
import * as models from "../models/index.js";
import * as db from "../utils/database.js";
import bcrypt from "bcrypt";
const router = Router();

router.get("/admin", (req, res) => {
  res.render("admin", { title: "Admin", body: "Admin Panel" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login", body: "Please Login:" });
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt: ${username} - ${password}`);

  try {
    const existingUser = await User.findOne({ username, password });
    if (existingUser) {
      return res.send("Login successful!");
    }
    return res.send("Invalid username or password. Please try again.");
  } catch (error) {
    res.status(500).send("Error during login. Please try again.");
  }
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register", body: "Please Register:" });
});
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Registration attempt: ${username} - ${password}`);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send("Username already exists. Please choose another.");
    }
    const user = new User({ username, password });
    await user.save();
    return res.send("Successfully registered!");
  } catch (error) {
    return res.status(500).send("Error registering user. Please try again.");
  }
});

export default router;
