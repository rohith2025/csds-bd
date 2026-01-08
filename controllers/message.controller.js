import Message from "../models/Message.model.js";
import User from "../models/User.model.js";
import { logActivity } from "../services/activity.service.js";

export const sendMessage = async (req, res) => {
  const { receiverId, text } = req.body;

  const receiver = await User.findById(receiverId);

  const isLateNight = (() => {
    const hour = new Date().getHours();
    return hour >= 23 || hour <= 5;
  })();

  const isUnsolicited = !receiver.followers.includes(req.user.id);

  const message = await Message.create({
    sender: req.user.id,
    receiver: receiverId,
    text,
  });

  await logActivity({
    actor: req.user.id,
    target: receiverId,
    actionType: "message",
    isLateNight,
    isUnsolicited,
    text,
  });

  res.status(201).json(message);
};
