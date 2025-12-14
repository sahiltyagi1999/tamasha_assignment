import { Router } from "express";
import { OrderController } from "../controllers/order";

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrdersByUser);    
router.get("/:id", OrderController.getOrder);
router.patch("/:id/status", OrderController.updateStatus);

export default router;
