import { Router } from "express";
import { ProductController } from "../controllers/product";

const router = Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.list);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
