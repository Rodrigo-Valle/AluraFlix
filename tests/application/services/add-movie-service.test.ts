import { AddMovieService } from "@/application/services";
import { AddMovieDTO, IMovieRepository } from "@/domain/interfaces";
import { Movie } from "@/domain/models";

const repoMovieReturn = {
  id: "any_id",
  title: "any_title",
  description: "any_description",
  url: "any_url"
};

const addMovieDTO = {
  title: "any_title",
  description: "any_description",
  url: "any_url"
};

const throwError = (): never => {
  throw new Error();
};

const makeMovieRepository = (): IMovieRepository => {
  class MovieRepositoryStub implements IMovieRepository {
    async add(addMovieDTO: AddMovieDTO): Promise<Movie> {
      return await Promise.resolve(repoMovieReturn);
    }
  }

  return new MovieRepositoryStub();
};

describe("AddMovieService Tests", () => {
  let sut: AddMovieService;
  let movieRepositoryStub: IMovieRepository;

  beforeAll(() => {
    movieRepositoryStub = makeMovieRepository();
  });

  beforeEach(() => {
    sut = new AddMovieService(movieRepositoryStub);
  });

  test("Should Call MovieRepository with correct values", async () => {
    const addSpy = jest.spyOn(movieRepositoryStub, "add");

    await sut.add(addMovieDTO);

    expect(addSpy).toHaveBeenCalledWith(addMovieDTO);
  });

  test("Should throw if MovieRepository throws", async () => {
    jest.spyOn(movieRepositoryStub, "add").mockImplementationOnce(throwError);

    const promise = sut.add(addMovieDTO);

    await expect(promise).rejects.toThrow();
  });

  test("Should return an movie on success", async () => {
    const result = await sut.add(addMovieDTO);

    expect(result).toEqual(repoMovieReturn);
  });
});
