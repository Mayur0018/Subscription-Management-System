import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscritionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/app/v1/users", userRouter);
app.use("/app/v1/subscription", subscritionRouter);

app.get("/", (req, res) => {
  res.send("WelCome To The Subscriton");
});

app.listen(PORT, async () => {
  console.log(`Server Running On :${PORT}`);
  await connectToDatabase();
});

export default app;
