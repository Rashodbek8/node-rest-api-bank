const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://www.youtube.com/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Signature",
    "X-Timestamp",
    "X-Sender-Signature"
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: "Too many requests, please try again later"
    },
});

function applySecurity(app){
    app.set("trust proxy", 1)
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(limiter);
    app.use((req, res, next) =>{
        console.log("Client IP:", req.ip);
        next();
    });
}

module.exports = applySecurity;