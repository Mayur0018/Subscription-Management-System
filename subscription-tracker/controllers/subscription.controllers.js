import Subscription from "../model/subscription.model.js";
export const createSubscription = async (req, res, next) => {
    try {
        console.log("Incoming subscription data:", req.body); // 🔹 log the request

        const subscription = await Subscription.create({
        ...req.body,
        user: req.user?._id || "650000000000000000000001", // fallback user
        });

        res.status(201).json({ success: true, data: subscription }); // fix typo
    } catch (e) {
    res.status(400).json({ success: false, message: e.message });
    next(e);
  }
};
