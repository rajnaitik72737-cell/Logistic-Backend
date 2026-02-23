import Shipment from "../models/Shipment.js";

// CREATE shipment
export const createShipment = async (req, res) => {
  try {
    const { shipmentId, origin, destination } = req.body;

   const shipment = await Shipment.create({
  shipmentId,
  origin,
  destination,
  status: "Pending",
  trackingHistory: [
    {
      status: "Order Created",
      location: origin
    }
  ]
});

    res.status(201).json({
      message: "Shipment created successfully",
      shipment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all shipments
export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TRACK shipment by shipmentId (PUBLIC)
export const trackShipment = async (req, res) => {
  try {
    const { shipmentId } = req.params;

    const shipment = await Shipment.findOne({ shipmentId });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found"
      });
    }

    if (shipment.currentLat && shipment.currentLng) {
      shipment.currentLat += 0.01;
      shipment.currentLng += 0.01;
      await shipment.save();
    }

    res.status(200).json({
      success: true,
      message: "Shipment found",
      shipment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE shipment
export const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.status(200).json({ message: "Shipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET shipment by MongoDB _id
export const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      shipmentId: req.params.id
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(shipment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// UPDATE shipment status
export const updateShipmentStatus = async (req, res) => {
  try {
    const { shipmentId } = req.params;
    const { status, location } = req.body;

    const shipment = await Shipment.findOne({ shipmentId });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    shipment.status = status;

    shipment.trackingHistory.push({
      status,
      location,
    });

    await shipment.save();

    res.status(200).json({
      message: "Shipment status updated successfully",
      shipment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


