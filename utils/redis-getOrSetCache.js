const redisClient = require("../redis-config");
exports.getOrSetCache = async function (
  key,
  updated_counter,
  current_counter,
  cb
) {
  const exists = await redisClient.EXISTS(key);
  if (exists === 1) {
    const data = await redisClient.get(key);
    if (updated_counter === current_counter) {
      console.log("CACHE HIT");
      return JSON.parse(data);
    } else {
      console.log("STALE DATA CACHE MISS");
      const freshData = await cb();
      redisClient.setEx(key, 60, JSON.stringify(freshData));
      return freshData;
    }
  } else {
    console.log("CACHE MISS");
    const freshData = await cb();
    redisClient.setEx(key, 60, JSON.stringify(freshData));
    return freshData;
  }
};
