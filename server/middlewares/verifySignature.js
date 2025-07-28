const crypto = require("crypto");

module.exports = (req, res, next) => {
    const secret = process.env.WEBHOOK_SECRET;
    const signature = req.headers["x-sender-signature"];

    if (!signature) {
        console.warn("🚫 Missing signature");
        return res.status(403).json({ error: "Missing signature" });
    }

    const { timestamp } = req.body;

    if (!timestamp) {
        console.warn("🚫 Missing timestamp in body");
        return res.status(403).json({ error: "Missing timestamp" });
    }

    const ts = new Date(timestamp).getTime();
    const now = Date.now();

    if (isNaN(ts)) {
        console.warn("🚫 Invalid timestamp format:", timestamp);
        return res.status(403).json({ error: "Invalid timestamp format" });
    }

    const diffInMs = Math.abs(now - ts);
    const maxDiff = 5 * 60 * 1000;

    if (diffInMs > maxDiff) {
        console.warn(`⏰ Timestamp too old or from future: ${timestamp}`);
        return res.status(403).json({ error: "Request too old or invalid timestamp" });
    }

    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");

    console.log("📦 Payload for HMAC:", payload);
    console.log("🔐 Expected Signature:", expectedSignature);
    console.log("🧾 Received Signature:", signature);
        
    if (signature !== expectedSignature) {
        console.warn("🚫 Invalid signature");
        return res.status(403).json({ error: "Invalid signature" });
    }

    next();
};