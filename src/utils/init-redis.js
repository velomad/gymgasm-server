const redis = require("redis");
const { REDISHOST, REDISPASSWORD, REDISPORT } = process.env;

const client = redis.createClient({
  host: REDISHOST,
  port: REDISPORT,
  password: REDISPASSWORD,
});

client.on("connect", () => {
  console.log("client connected to redis");
});

client.on("ready", () => {
  console.log("client connected to redis and ready to use...");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("client disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
