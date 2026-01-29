import dotenv from "dotenv";

const loadEnv = () => {
  dotenv.config();
  console.log("Environment variables loaded");
};

export default loadEnv;
