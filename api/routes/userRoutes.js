import { Router } from "express";
import * as models from "../models/index.js";
import * as db from "../utils/database.js";
const router = Router();

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

export default router;
