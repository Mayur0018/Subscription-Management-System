import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscritionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middlewares.js";
import arcjetMiddleware from "./middlewares/Arcjet.middlewares.js";
import workflowRouter from "./routes/workflow.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Disable Arcjet in development
if (process.env.NODE_ENV === "production") {
  app.use(arcjetMiddleware);
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscritionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome To The Subscription");
});

app.listen(PORT, async () => {
  console.log(`Server Running On :${PORT}`);
  await connectToDatabase();
});

export default app;
