const express = require("express");
const {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservation,
  cancelReservation,
  updateReservationStatus,
} = require("../controller/reservationController.js");
const { protect, admin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// User routes
router.post("/", protect, createReservation);
router.get("/my", protect, getMyReservations);
router.put("/:id", protect, updateReservation);
router.delete("/:id", protect, cancelReservation);

// Admin routes
router.get("/", protect, admin, getAllReservations);
router.put("/:id/status", protect, admin, updateReservationStatus);

module.exports = router; 
