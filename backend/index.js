import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errormiddlewares.js";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath
import { dirname } from "path"; // Import dirname

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
import routes from "./routes/index.js";

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // Use dirname to get directory name

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://albetrious-task-management-5hs7.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public directory

app.use("/api", routes);
app.use(routeNotFound);
app.use(errorHandler);

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
