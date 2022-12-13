import { Movie } from "@/domain/models";

export interface IAddMovieService {
  add: (addMovieDTO: AddMovieDTO) => Promise<Movie>;
}

export interface AddMovieDTO {
  title: string;
  description: string;
  url: string;
}
