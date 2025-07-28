const Queue = require("bull");

const webhookQueue = new Queue("webhookQueue", {
    redis:{
        host: "127.0.0.1",
        port: 6379,
    },
});

module.exports = webhookQueue