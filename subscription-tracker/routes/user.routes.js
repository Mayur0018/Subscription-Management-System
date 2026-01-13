import { Router } from "express";
import { getUsers,getUser } from "../controllers/user.controllers.js";
import authorize from "../middlewares/auth.middlewares.js";
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);

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
