import { Router } from "express";
const router = Router();

router.get("/form", (req, res) => {
  console.log(req.body);
  res.send("Get Form");
});
router.post("/form", (req, res) => {
  console.log(req.body);
  res.send("Post Form");
});

export default router;
