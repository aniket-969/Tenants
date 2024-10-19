import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(express.static(path.resolve("./public")));

app.use(
  cors({ 
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send("Hello world")
})

import userRouter from "./routes/user.routes.js";
import voteRouter from "./routes/poll.routes.js";
import awardRouter from "./routes/awards.routes.js";
import eventRouter from "./routes/event.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import maintenanceRouter from "./routes/maintenance.routes.js";
import roomRouter from "./routes/room.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/poll", voteRouter);
app.use("/api/v1/awards", awardRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/maintenance", maintenanceRouter);

export { app };
