import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionType: {
      type: String,
      enum: ["message", "profile_view", "story_view", "comment"],
      required: true,
    },
    count: {
      type: Number,
      default: 1,
    },
    lastActionAt: {
      type: Date,
      default: Date.now,
    },
    isLateNight: {
      type: Boolean,
      default: false,
    },
    isUnsolicited: {
      type: Boolean,
      default: false,
    },
    riskScore: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      enum: ["Normal", "Suspicious", "Stalking"],
      default: "Normal",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLog", activityLogSchema);
