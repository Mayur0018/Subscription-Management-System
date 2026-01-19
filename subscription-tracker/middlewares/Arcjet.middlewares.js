import aj from "../config/Arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      // Add this later when you implement authentication
      // userId: req.user?.id || req.user?._id?.toString(),  
      
      // For expensive endpoints (e.g. create subscription) → consume more tokens
      // requested: req.path.includes("/create") ? 3 : 1,
    });

    if (decision.isDenied()) {
      console.log("Arcjet denied:", {  // ← helpful for debugging
        id: decision.id,
        reason: decision.reason,
        ruleResults: decision.results,
      });

      if (decision.reason.isRateLimit()) {
        // Optional: add retry-after header (good practice)
        const retryAfter = decision.reason.retryAfter; // seconds
        if (retryAfter) {
          res.set("Retry-After", retryAfter.toString());
        }

        return res.status(429).json({ 
          error: "Too many requests. Please try again later.",
          retryAfter: retryAfter || 60, // fallback
        });
      }
      
      if (decision.reason.isBot()) {
        return res.status(403).json({ 
          error: "Bot detected" 
        });
      }

      return res.status(403).json({ 
        error: "Access denied" 
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet Middleware Error:", error);
    next(); // fail open
  }
};

export default arcjetMiddleware;