import { IAddMovieService } from "@/application/interfaces";
import { Movie } from "@/domain/models";
import { AddMovieDTO, IMovieRepository } from "@/domain/interfaces";

export class AddMovieService implements IAddMovieService {
  constructor(private readonly addMovieRepository: IMovieRepository) {}

  async add(addMovieDTO: AddMovieDTO): Promise<Movie> {
    const movie = await this.addMovieRepository.add(addMovieDTO);

    return movie;
  }
}
