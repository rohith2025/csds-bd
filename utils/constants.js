// Time window for late-night activity (24-hour format)
export const LATE_NIGHT_WINDOW = {
  start: 23, // 11 PM
  end: 5,    // 5 AM
};

// Risk score thresholds
export const RISK_THRESHOLDS = {
  NORMAL: 0,
  SUSPICIOUS: 40,
  STALKING: 70,
};

// Labels used across the system
export const RISK_LABELS = {
  NORMAL: "Normal",
  SUSPICIOUS: "Suspicious",
  STALKING: "Stalking",
};

// Default AI fallback response
export const DEFAULT_AI_RESPONSE = {
  riskScore: 0,
  label: RISK_LABELS.NORMAL,
  confidence: 0,
  isCyberStalker: false,
  reasons: [],
};
