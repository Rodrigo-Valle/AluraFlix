import { Express, Router } from "express";
import movieRoutes from "@/main/routes/movie-routes";

export const setupRoutes = (app: Express): void => {
  const routes = Router();

  routes.use("/api", movieRoutes);

  app.use(routes);
};
