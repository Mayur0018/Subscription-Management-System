import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "Get All Users" });
});
userRouter.get("/:id", (req, res) => {
  res.send({ title: "Get Users Details" });
});
userRouter.post("/", (req, res) => {
  res.send({ title: "Create a New User" });
});
userRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE User" });
});
userRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE User" });
});


export default userRouter;