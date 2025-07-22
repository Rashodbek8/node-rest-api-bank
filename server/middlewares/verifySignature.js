const crypto = require("crypto");

module.exports = (req, res, next) => {
    const secret = process.env.WEBHOOK_SECRET;
    const signature = req.headers["x-signature"];

    if(!signature){
        return res.status(403).json({error: "Missing signature"});
    }

    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto 
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");

    if(signature !== expectedSignature){
        return res.status(403).json({error: "Invalid signature"});
    }
    
    next();
};