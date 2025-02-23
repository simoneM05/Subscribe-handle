import { createClient } from "redis";

const redisClient = createClient();
redisClient.on("error", (err) => console.log("❌Redis Error:", err)); //check connection at redis

(async () => {
  await redisClient.connect();
  console.log("✅ Connected to Redis");
})();
export default redisClient;
