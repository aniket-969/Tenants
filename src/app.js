import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import voteRouter from "./routes/poll.routes.js";
import awardRouter from "./routes/awards.routes.js";
import eventRouter from "./routes/event.routes.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/poll", voteRouter);
app.use("/api/v1/awards", awardRouter);
app.use("/api/v1/event", eventRouter);

export { app };
