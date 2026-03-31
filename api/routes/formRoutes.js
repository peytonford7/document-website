import { Router } from "express";
const router = Router();

router.get("/form", (req, res) => {
	console.log(req.body);
});
router.post("/form", (req, res) => {
	console.log(req.body);
});

export default router;
