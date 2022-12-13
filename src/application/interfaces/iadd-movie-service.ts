import { AddMovieDTO } from "@/domain/interfaces";
import { Movie } from "@/domain/models";

export interface IAddMovieService {
  add: (addMovieDTO: AddMovieDTO) => Promise<Movie>;
}
