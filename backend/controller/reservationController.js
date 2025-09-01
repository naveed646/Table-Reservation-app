const Reservation = require("../models/Reservation");

// create reservation 
const createReservation = async (req, res) => {
  try {
    const { tableId, name, date, time, day, duration, guests, notes } = req.body;

    // Parse requested start and end time
    const requestedStart = new Date(`${date}T${time}`);
    const requestedEnd = new Date(requestedStart.getTime() + duration * 60000);

    // Find all existing reservations for the table on the same date
    const reservations = await Reservation.find({
      tableId,
      date,
      status: { $in: ["pending", "approved"] },
    });

    // Check for overlap
    const overlap = reservations.find((r) => {
      const existingStart = new Date(`${r.date}T${r.time}`);
      const existingEnd = new Date(existingStart.getTime() + r.duration * 60000);
      return requestedStart < existingEnd && requestedEnd > existingStart;
    });

    if (overlap) {
      return res.status(400).json({
        message: `Table ${tableId} is already reserved at ${overlap.time} for ${overlap.duration} mins. Please select another time.`,
      });
    }

    // Create reservation
    const reservation = await Reservation.create({
      user: req.user._id,
      tableId,
      name,
      date,
      time,
      day,
      duration,
      guests,
      notes,
      status: "pending",
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get logged-in user’s reservations
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reservations (Admin only)
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("user", "name email");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update guests/duration (User)
const updateReservation = async (req, res) => {
  try {
    const { guests, duration } = req.body;
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: "Not found" });

    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (guests) reservation.guests = guests;
    if (duration) reservation.duration = duration;

    await reservation.save();
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel reservation (User)
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Not found" });

    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve/Cancel (Admin)
const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: "Not found" });

    reservation.status = status;
    await reservation.save();

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Free up a reservation (Admin)
const freeUpReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: "Not found" });

    if (reservation.status !== "approved") {
      return res.status(400).json({ message: "Only approved reservations can be completed" });
    }

    reservation.status = "completed";
    await reservation.save();

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservation,
  cancelReservation,
  updateReservationStatus,
  freeUpReservation,
};
