import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});

if (process.env.Node_Env === "production") {
    const dirpath = path.resolve();

    app.use(express.static("./FrontEnd/dist"));
    app.get("*",(res,req) => {
        res.sendFile(path.resolve(dirpath, "./FrontEnd/dist", "index.html"));
    })
}