const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    startsAt: { type: Date, required: true },
    venue: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["draft", "ongoing", "completed"],
      default: "draft",
    },
    isFeatured: { type: Boolean, default: false },
    iconKey: {
      type: String,
      enum: ["palette", "restaurant", "campaign", "calendar_month"],
      default: "calendar_month",
    },
    metrics: {
      totalAttendees: { type: Number, default: 0 },
      ticketsSoldPercent: { type: Number, default: 0 },
      revenue: { type: Number, default: 0 },
    },
    lastAdminAction: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
