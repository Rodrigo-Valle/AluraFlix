import cors from "cors";
import express, { json } from "express";
import { setupRoutes } from "./router";

const app = express();

app.use(cors());
app.use(json());
app.use((req, res, next) => {
  res.type("json");
  next();
});

setupRoutes(app);

export { app };
