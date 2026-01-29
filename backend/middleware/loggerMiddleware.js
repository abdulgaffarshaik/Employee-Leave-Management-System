import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logs", "server.txt");

const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const time = new Date().toLocaleString();
    const log = `[${time}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${Date.now() - startTime}ms\n`;

    fs.appendFile(logFilePath, log, (err) => {
      if (err) console.error("Failed to write log:", err);
    });
  });

  next();
};

export default loggerMiddleware;
