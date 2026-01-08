import ActivityLog from "../models/ActivityLog.model.js";
import { sendToAI } from "./ai.service.js";
import { RISK_THRESHOLDS } from "../utils/constants.js";

/**
 * Logs user behaviour and triggers AI analysis
 */
export const logActivity = async ({
  actor,
  target,
  actionType,
  isLateNight = false,
  isUnsolicited = false,
  text = "",
}) => {
  // 1️⃣ Find existing activity record
  let activity = await ActivityLog.findOne({
    actor,
    target,
    actionType,
  });

  if (activity) {
    // Update existing activity
    activity.count += 1;
    activity.lastActionAt = new Date();
    activity.isLateNight = activity.isLateNight || isLateNight;
    activity.isUnsolicited = activity.isUnsolicited || isUnsolicited;
  } else {
    // Create new activity
    activity = new ActivityLog({
      actor,
      target,
      actionType,
      count: 1,
      isLateNight,
      isUnsolicited,
    });
  }

  // 2️⃣ Prepare data for AI service
  const aiPayload = {
    actionType,
    count: activity.count,
    isLateNight,
    isUnsolicited,
    text,
  };

  // 3️⃣ Call Python AI service
  const aiResult = await sendToAI(aiPayload);

  // 4️⃣ Update risk score & label
  activity.riskScore = aiResult.riskScore;
  activity.label = aiResult.label;

  await activity.save();

  return activity;
};
