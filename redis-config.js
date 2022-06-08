const Redis = require("redis");

const redisClient = Redis.createClient({
  host: "redis",
  port: "6379",
  url: "redis://redis",
});

async function start() {
  console.log("redis started");
  await redisClient.connect();
}
start();

module.exports = redisClient;
