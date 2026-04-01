import { Router } from "express";
import * as models from "../models/index.js";
import * as db from "../utils/database.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("home", { title: "My App", body: "Home" });
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

router.get("/users/:user", async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  if (user) {
    res.render("user", {
      title: "User Details",
      body: `Username: ${username}`,
    });
  } else {
    return res.status(404).send("User not found.");
  }
});
router.get("/user/:user/panel", async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  if (user) {
    const panels = await Panel.find({ username });
    const panelList = panels.map((panel) => panel.content).join(", ");
    res.render("panel", {
      title: `${username}'s Panels`,
      body: `Panel List: ${panelList}`,
    });
  } else {
    return res.status(404).send("User not found.");
  }
});
router.get("/user/:user/panel/:id", async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  if (user) {
    const panelId = req.params.id;
    const panel = await Panel.findOne({ username, id });
    if (panel) {
      res.render("panel", { title: panel.title, body: panel.content });
    } else {
      return res.status(404).send("Panel not found.");
    }
  } else {
    return res.status(404).send("User not found.");
  }
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About", body: "This is a document database." });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    body: "Contact us at peytonford7@gmail.com",
  });
});

router.get("/admin", (req, res) => {
  res.render("admin", { title: "Admin", body: "Admin Panel" });
});

export default router;
