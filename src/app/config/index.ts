import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// All environment variables will be exported from here
export default {
  port: process.env.PORT || 3000,
  databaseURI: process.env.DATABASE_URI,
};
