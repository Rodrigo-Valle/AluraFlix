import { AddMovieDTO, IMovieRepository } from "@/domain/interfaces/imovie-repository";
import { Movie } from "@/domain/models";
import { DataSource } from "typeorm";
import { MovieEntity } from "../entities";
export class MovieRepository implements IMovieRepository {
  private readonly movieRepository;
  constructor(datasource: DataSource) {
    this.movieRepository = datasource.getRepository(MovieEntity);
  }

  async add(addMovieDTO: AddMovieDTO): Promise<Movie> {
    const movie = await this.movieRepository.save(addMovieDTO);
    return movie;
  }
}
