import dotenv from "dotenv";

const loadEnv = () => {
  dotenv.config();

  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI not found in .env");
  }

  if (!process.env.JWT_SECRET) {
    console.warn("JWT_SECRET not found in .env");
  }

  if (!process.env.AI_SERVICE_URL) {
    console.warn("AI_SERVICE_URL not found in .env");
  }
};

export default loadEnv;
