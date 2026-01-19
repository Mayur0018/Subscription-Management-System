import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../model/subscription.model";

const REMINDERS = [7, 5, 2, 1];
export const sendReminders = serve(async () => {
  const { subscriptionId } = context.requestPyload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status === active) return;
  const renewalsDate = dayjs(subscription.renewalsDate);
  if (renewalsDate.isBefore(dayjs())) {
    console.log(
      `Renwal date has passed for subscription ${subscriptionId}.Stoping workflow`,
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const remiderDate = renewalsDate.subtract(daysBefore, "day");
    if (remiderDate.isAfter(dayjs())) {
        await sleepUnitReminder(context,`Reminder ${daysBefore} days before`,remiderDate)
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUnitReminder = async (context, label, date) => {
  console.log(`Sleeping unit ${label} remider at ${date}`);
  await context.sleepUnit(label, date.toDate());
};

const trigggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);

  });
};
