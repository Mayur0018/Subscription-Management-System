import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign", (req, res) => {
  res.send({ message: "Sign-Up" });
});
authRouter.post("/sign-in", (req, res) => {
  res.send({ message: "Sign-in" });
});
authRouter.post("/sign-out", (req, res) => {
  res.send({ message: "Sign-out" });
});


export default authRouter