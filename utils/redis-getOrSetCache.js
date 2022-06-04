const redisClient = require("../redis-config");

exports.getOrSetCache = function (key, updated_counter, current_counter, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) console.error(err);
      if (data != null) {
        if (updated_counter === current_counter) {
          console.log("CACHE HIT");
          return resolve(JSON.parse(data));
        } else {
          console.log("STALE DATA");
        }
      }
      console.log("CACHE MISS");
      const freshData = await cb();
      redisClient.setEx(key, 60, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
};
