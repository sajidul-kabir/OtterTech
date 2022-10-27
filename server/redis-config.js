const Redis = require("redis");

// const redisClient = Redis.createClient({
//   host: "redis",
//   port: "6379",
//   url: "redis://redis",
// });

// const redisClient = Redis.createClient({
//   host: "otterTech-redis",
//   port: "6379",
//   url: "",
// });

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL2,
});

async function start() {
  console.log("redis started");
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();
}
start();
module.exports = redisClient;
