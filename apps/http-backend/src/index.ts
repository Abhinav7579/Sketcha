import express from "express";
import mainRouter from "./route/index"
import cors from "cors"
const app=express();
app.use(cors())
app.use(express.json());
app.use("/api/v1",mainRouter);

app.listen(3001)