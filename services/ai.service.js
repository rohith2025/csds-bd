import axios from "axios";

/**
 * Sends behavioural data to Python AI service
 * and receives risk score + label
 */
export const sendToAI = async (payload) => {
  try {
    const response = await axios.post(
      process.env.AI_SERVICE_URL || "http://localhost:5001/analyze",
      {
        actionType: payload.actionType,
        count: payload.count,
        isLateNight: payload.isLateNight,
        isUnsolicited: payload.isUnsolicited, 
        text: payload.text,
      },
      {
        timeout: 5000,
      }
    );

    return {
      riskScore: response.data.riskScore,
      label: response.data.label,
    };
  } catch (error) {
    console.error("AI Service Error:", error.message);

    // Fallback (important for demo safety)
    return {
      riskScore: 0,
      label: "Normal",
    };
  }
};
