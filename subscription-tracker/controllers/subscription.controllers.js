import Subscription from "../model/subscription.model.js";
import { WorkflowClient } from "../config/Upstash.js";
export const createSubscription = async (req, res, next) => {
    try {
        console.log("Incoming subscription data:", req.body); // 🔹 log the request

        const subscription = await Subscription.create({
        ...req.body,
        user: req.user?._id || "650000000000000000000001", // fallback user
        });
        await WorkflowClient.trigger({url,body,headers,workflowId,retries}{
          url:`${SERVER_URL}`
        })

        res.status(201).json({ success: true, data: subscription }); // fix typo
    } catch (e) {
    res.status(400).json({ success: false, message: e.message });
    next(e);
  }
};
