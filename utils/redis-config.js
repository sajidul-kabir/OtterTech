const Redis = require("redis");

const redisClient = Redis.createClient({ legacyMode: true });
async function start() {
  await redisClient.connect();
}
start();
module.exports = redisClient;
