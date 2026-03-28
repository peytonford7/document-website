import express from "express";
import ejs from "ejs";
import 'dotenv/config';
import mongoose from "mongoose";

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "My App", message: "Hello, World!" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login", message: "Please Login:" });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    res.send("Login successful!");
  } else {
    res.send("Invalid username or password.");
  }
  console.log(`Login attempt: ${username} - ${password}`);
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register", message: "Please Register:" });
});
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(`Registration attempt: ${username} - ${password}`);
  res.send("Successfully registered!");
});

app.get("/users", (req, res) => {
  res.render("users", { title: "Users", message: "User List:" });
});
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.render("users", { title: "User Details", message: `User ID: ${userId}` });
});

app.get("/documents", (req, res) => {
  res.render("documents", { title: "Documents", message: "Document List:" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", message: "This is a MongoDB document app." });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", message: "Contact us at peytonford7@gmail.com" });
});

app.get("/admin", (req, res) => {
  res.render("admin", { title: "Admin", message: "Admin Panel" });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
