import { Router } from "express";
import multer from "multer";
import { File } from "../models/index.js";
import * as db from "../utils/database.js";
const router = Router();

const upload = multer({ dest: "uploads/" });

router.get("/upload", (req, res) => {
  res.render("upload", { title: "Upload", body: "Upload File:" });
});
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(500).send("Error uploading file!");
  }
  await db.create(File, {
    username: "anonymous",
    fileName: req.file.originalname,
    contentType: req.file.mimetype,
  });
  res.send("File uploaded!");
});

export default router;