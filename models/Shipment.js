import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      name: String,
      phone: String,
      email: String,
    },

    origin: {
      city: String,
      state: String,
      country: String,
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    destination: {
      city: String,
      state: String,
      country: String,
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    currentLocation: {
      city: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      lastUpdated: Date,
    },

    status: {
      type: String,
      enum: [
        "ORDER_PLACED",
        "PICKED_UP",
        "IN_TRANSIT",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "FAILED_ATTEMPT",
        "CANCELLED",
      ],
      default: "ORDER_PLACED",
    },

    timeline: [
      {
        status: String,
        location: String,
        timestamp: Date,
      },
    ],

    packageDetails: {
      weightKg: Number,
      dimensionsCm: {
        length: Number,
        width: Number,
        height: Number,
      },
      type: String,
    },

    delivery: {
      estimatedDelivery: Date,
      actualDelivery: Date,
      deliveryType: String,
    },
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;