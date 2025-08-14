import express from "express";

import { PORT, MONGO_URI } from "./config/env.js";
import connectDB from "./db/connectdb.js";
import authRouter from "./routes/auth.route.js";
import newsRouter from "./routes/news.route.js"
import usersRouter from "./routes/users.route.js"
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/users", usersRouter);

app.use(errorMiddleware);

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Nigerian Association of Physitherapy Students!");
});

const startServer = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running successfully on http://localhost:${ PORT }...`);
        });
    } catch (error) {
        console.error(error.message);
    };
};

startServer();
