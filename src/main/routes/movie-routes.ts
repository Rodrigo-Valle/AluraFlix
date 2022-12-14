import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddMovieController } from "../factories/add-movie-factory";

const movieRoutes = Router();

movieRoutes.post("/video", adaptRoute(makeAddMovieController()));

export default movieRoutes;
