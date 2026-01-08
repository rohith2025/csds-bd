import ActivityLog from "../models/ActivityLog.model.js";
import { sendToAI } from "./ai.service.js";

/**
 * Aggregates user behaviour, calls AI service,
 * and stores explainable AI outputs.
 */
export const logActivity = async ({
  actor,
  target,
  actionType,
  isLateNight = false,
  isUnsolicited = false,
  text = "",
}) => {
  // 1️⃣ Find existing activity record for this interaction
  let activity = await ActivityLog.findOne({
    actor,
    target,
    actionType,
  });

  if (activity) {
    // Update existing activity
    activity.count += 1;
    activity.lastActionAt = new Date();

    // Preserve true flags once set
    activity.isLateNight = activity.isLateNight || isLateNight;
    activity.isUnsolicited = activity.isUnsolicited || isUnsolicited;
  } else {
    // Create new activity record
    activity = new ActivityLog({
      actor,
      target,
      actionType,
      count: 1,
      isLateNight,
      isUnsolicited,
    });
  }

  // 2️⃣ Prepare payload for Python AI service
  const aiPayload = {
    actionType,
    count: activity.count,
    isLateNight: activity.isLateNight,
    isUnsolicited: activity.isUnsolicited,
    text,
  };

  // 3️⃣ Call AI backend (TensorFlow + NLP)
  const aiResult = await sendToAI(aiPayload);

  // 4️⃣ Store AI decision & explainable metrics
  activity.riskScore = aiResult.riskScore ?? activity.riskScore;
  activity.label = aiResult.label ?? activity.label;

  activity.lateNightPercentage =
    aiResult.lateNightPercentage ?? activity.lateNightPercentage;

  activity.unsolicitedPercentage =
    aiResult.unsolicitedPercentage ?? activity.unsolicitedPercentage;

  activity.confidence = aiResult.confidence ?? activity.confidence;

  activity.reasons = Array.isArray(aiResult.reasons)
    ? aiResult.reasons
    : activity.reasons;

  activity.isCyberStalker =
    aiResult.isCyberStalker ?? activity.isCyberStalker;

  // 5️⃣ Persist updated activity log
  await activity.save();

  return activity;
};
