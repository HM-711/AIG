import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from AIG!!!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(3057, () => {
      console.log("The server is running on port http://localhost:3057");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
