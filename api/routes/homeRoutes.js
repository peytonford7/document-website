import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("home", { title: "My App", body: "Home" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About", body: "This is a document database." });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    body: "Contact me at peytonford7@gmail.com",
  });
});

export default router;
