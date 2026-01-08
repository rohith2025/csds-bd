import ActivityLog from "../models/ActivityLog.model.js";

export const getMyRiskLogs = async (req, res) => {
  const logs = await ActivityLog.find({ target: req.user.id });
  res.json(logs);
};
