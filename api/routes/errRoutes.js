import { Router } from "express";
const router = Router();

router.get("/err", (req, res) => {
  throw new Error("Something went wrong!");
});
router.get("/asyncerr", async (req, res) => {
  throw new Error("Something went wrong asynchronously!");
});

export default router;
