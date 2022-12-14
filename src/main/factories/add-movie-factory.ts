import { IController } from "@/presentation/interfaces";
import { AddMovieController } from "@/presentation/controller";
import { AddMovieService } from "@/application/services";
import { MovieRepository } from "@/infra/repositories";
import { PostgresDataSource } from "@/infra/database/pg-datasource";

export const makeAddMovieController = (): IController => {
  const addMovieRepository = new MovieRepository(PostgresDataSource);
  const addMovieService = new AddMovieService(addMovieRepository);
  return new AddMovieController(addMovieService);
};
