import { Router } from "express";
import authorize from "../middlewares/auth.middlewares.js";
import { createSubscription } from "../controllers/subscription.controllers.js";
const subscritionRouter = Router();

subscritionRouter.get("/", (req, res) => {
  res.send({ title: "GET all subscription" });
});
subscritionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET  subscription Details" });
});
subscritionRouter.post("/", authorize, createSubscription);
subscritionRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE subscription" });
});
subscritionRouter.delete("/:id", (req, res) => {
  res.send({ title: "UPDATE subscription" });
});
subscritionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "GET all user subscription" });
});
subscritionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "CANCEL subscription" });
});
subscritionRouter.put("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET upcoming renewals" });
});
export default subscritionRouter;
