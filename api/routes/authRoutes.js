import { Router } from "express";
import { User, Panel } from "../models/index.js"
import { getAll, getById, create, updateById, deleteById } from "../utils/database.js"
const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "My App" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login", message: "Please Login:" });
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
  }
  catch (error) {
    res.status(500).send("Error during login. Please try again.");
  }
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register", message: "Please Register:" });
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
  } 
  catch (error) {
    return res.status(500).send("Error registering user. Please try again.");
  }
});

router.get("/users/:user", async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  if (user) {
    res.render("user", { title: "User Details", message: `Username: ${username}` });
  } else {
    return res.status(404).send("User not found.");
  }
});
router.get("/user/:user/panels", async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  if (user) {
    const panels = await Panel.find({ username });
    const panelList = panels.map(panel => panel.content).join(", ");
    res.render("panels", { title: `${username}'s Panels`, message: `Panel List: ${panelList}` });
  } else {
    return res.status(404).send("User not found.");
  }
});
router.get("/user/:user/panels/:id", async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  if (user) {
    const panelId = req.params.id;
    const panel = await Panel.findOne({ username, id });
    if (panel) {
      res.render("panel", { title: panel.title, message: panel.content });
    } else {
      return res.status(404).send("Panel not found.");
    }
  } else {
    return res.status(404).send("User not found.");
  }
});


router.get("/about", (req, res) => {
  res.render("about", { title: "About", message: "This is a document database." });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", message: "Contact us at peytonford7@gmail.com" });
});

router.get("/admin", (req, res) => {
  res.render("admin", { title: "Admin", message: "Admin Panel" });
});

export default router;