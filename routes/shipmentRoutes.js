import express from "express";
console.log("Shipment routes loaded");
import {
  createShipment,
  getShipments,
  deleteShipment,
  trackShipment,
  getShipmentById,
  updateShipmentStatus
} from "../controllers/shipmentController.js";

const router = express.Router();

// CREATE shipment
router.post("/", createShipment);

// GET all shipments
router.get("/", getShipments);

// ✅ TRACK shipment (specific route first)
router.get("/track/:shipmentId", trackShipment);

// ✅ UPDATE shipment status (specific route first)
router.put("/status/:shipmentId", updateShipmentStatus);

// ❗ KEEP THIS LAST (dynamic route)
router.get("/:id", getShipmentById);

// DELETE shipment
router.delete("/:id", deleteShipment);

export default router;