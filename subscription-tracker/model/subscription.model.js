import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },

    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR"],
      default: "USD",
      uppercase: true, // optional - normalize to uppercase
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: [true, "Frequency is required"],
    },

    category: {
      type: String,
      enum: ["sports", "news", "entertainment", "lifestyle", "finance", "other"],
      required: [true, "Category is required"],
      lowercase: true, // normalize input
    },

    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
      // You can add enum later when you know all possible values
      // enum: ["Credit Card", "Debit Card", "UPI", "PayPal", "Other"],
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date(); // current time at validation
        },
        message: "Start date must be in the past or today",
      },
    },

    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          // Allow undefined (auto-calculated)
          if (!value) return true;
          return value >= this.startDate;
        },
        message: "Renewal date must be on or after start date",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Auto-calculate renewalDate + update expired status
subscriptionSchema.pre("save", function () {
  // Recalculate only on new docs or whe frequency/startDate changes
  if (this.isNew || this.isModified("frequency") || this.isModified("startDate")) {
    if (!this.startDate) {
      return next(new Error("Start date is required for renewal calculation"));
    }

    const renewalDate = new Date(this.startDate);

    switch (this.frequency) {
      case "daily":
        renewalDate.setDate(renewalDate.getDate() + 1);
        break;
      case "weekly":
        renewalDate.setDate(renewalDate.getDate() + 7);
        break;
      case "monthly":
        renewalDate.setMonth(renewalDate.getMonth() + 1);
        break;
      case "yearly":
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
        break;
      default:
        return next(new Error("Invalid frequency value"));
    }

    this.renewalDate = renewalDate;
  }

  // Update status if expired (runs every save - safe & simple)
  if (this.renewalDate && this.renewalDate < new Date() && this.status === "active") {
    this.status = "expired";
  }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;