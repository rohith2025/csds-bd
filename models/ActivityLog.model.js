import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    // Who performed the action
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Who is affected by the action
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Type of interaction
    actionType: {
      type: String,
      enum: ["message", "profile_view", "story_view", "comment"],
      required: true,
    },

    // How many times this action occurred
    count: {
      type: Number,
      default: 1,
    },

    // Last time the action happened
    lastActionAt: {
      type: Date,
      default: Date.now,
    },

    /* =======================
       BEHAVIOURAL FLAGS
       ======================= */

    // Message sent during late-night hours
    isLateNight: {
      type: Boolean,
      default: false,
    },

    // Interaction without follower relationship
    isUnsolicited: {
      type: Boolean,
      default: false,
    },

    /* =======================
       EXPLAINABLE AI METRICS
       ======================= */

    // % of actions occurring late at night
    lateNightPercentage: {
      type: Number,
      default: 0,
    },

    // % of actions that are unsolicited
    unsolicitedPercentage: {
      type: Number,
      default: 0,
    },

    // AI confidence level (0–1)
    confidence: {
      type: Number,
      default: 0,
    },

    // Human-readable reasons returned by AI
    reasons: [
      {
        type: String,
      },
    ],

    /* =======================
       FINAL AI DECISION
       ======================= */

    // Overall risk score (0–100)
    riskScore: {
      type: Number,
      default: 0,
    },

    // Classification label
    label: {
      type: String,
      enum: ["Normal", "Suspicious", "Stalking"],
      default: "Normal",
    },

    // Final boolean verdict
    isCyberStalker: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ActivityLog", activityLogSchema);
