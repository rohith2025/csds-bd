import express from "express";
import cors from "cors";

// Config
import loadEnv from "./config/env.js";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import storyRoutes from "./routes/story.routes.js";
import messageRoutes from "./routes/message.routes.js";
import profileViewRoutes from "./routes/profileView.routes.js";
import activityRoutes from "./routes/activity.routes.js";

// Middlewares
import errorHandler from "./middlewares/error.middleware.js";

// ==========================
// INITIAL SETUP
// ==========================

loadEnv();          // Load .env variables
connectDB();        // Connect MongoDB

const app = express();

// ==========================
// GLOBAL MIDDLEWARES
// ==========================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// ROUTES
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/profile-views", profileViewRoutes);
app.use("/api/activity", activityRoutes);

// ==========================
// HEALTH CHECK
// ==========================

app.get("/", (req, res) => {
  res.json({ message: "🚀 Social Media Backend with AI is running" });
});

// ==========================
// ERROR HANDLER (LAST)
// ==========================

app.use(errorHandler);

// ==========================
// START SERVER
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
