import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {createServer} from "http"
import {Server} from "socket.io"

const app = express();

const httpServer = createServer(app)

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.set("io", io);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import voteRouter from "./routes/poll.routes.js";
import awardRouter from "./routes/awards.routes.js";
import eventRouter from "./routes/event.routes.js"
import expenseRouter from "./routes/expense.routes.js"
import taskRouter from "./routes/tasks.routes.js"
import maintenanceRouter from "./routes/maintenance.routes.js"
import roomRouter from "./routes/room.routes.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/room",roomRouter );
app.use("/api/v1/poll", voteRouter);
app.use("/api/v1/awards", awardRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/expense",expenseRouter)
app.use("/api/v1/tasks",taskRouter)
app.use("/api/v1/maintenance",maintenanceRouter)

export { app };
