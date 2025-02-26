import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "access.log");

export const logStream = fs.createWriteStream(logFile, { flags: "a" });
