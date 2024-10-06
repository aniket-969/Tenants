import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
}); 
 
connectDB() 
  .then(() => {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    server.on("error", (err) => {
      console.error(`Failed to start the server on port ${port}`, err);
    });
  })
  .catch((err) => {
    console.log("Connection failed at port", err);
  });
