import { AddMovieController } from "@/presentation/controller";
import { MissinParamError } from "@/presentation/errors/missing-param";
import { ServerError } from "@/presentation/errors";
import { AddMovieDTO, IAddMovieService } from "@/application/interfaces";
import { Movie } from "@/domain/models";

const httpResponseMock = {
  id: "any_id",
  title: "any_title",
  description: "any_description",
  url: "any_url"
};

const httpRequestMock = {
  body: {
    title: "any_title",
    description: "any_description",
    url: "any_url"
  }
};

const makeAddMovieService = (): IAddMovieService => {
  class AddMovieServiceStub implements IAddMovieService {
    async add(_addMovieDTO: AddMovieDTO): Promise<Movie> {
      return httpResponseMock;
    }
  }
  return new AddMovieServiceStub();
};

describe("AddMovieController", () => {
  let sut: AddMovieController;
  let addMovieService: IAddMovieService;

  beforeAll(() => {
    addMovieService = makeAddMovieService();
  });

  beforeEach(() => {
    sut = new AddMovieController(addMovieService);
  });

  test("Should return 400 if title is not provided", async () => {
    const httpRequest = {
      body: {
        description: "any_description",
        url: "any_url"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissinParamError("title"));
  });

  test("Should return 400 if description is not provided", async () => {
    const httpRequest = {
      body: {
        title: "any_title",
        url: "any_url"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissinParamError("description"));
  });

  test("Should return 400 if url is not provided ", async () => {
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description"
      }
    };

    const result = await sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissinParamError("url"));
  });

  test("Should Call AddMovieService with correct values", async () => {
    const addSpy = jest.spyOn(addMovieService, "add");

    await sut.handle(httpRequestMock);

    expect(addSpy).toHaveBeenCalledWith({
      title: "any_title",
      description: "any_description",
      url: "any_url"
    });
  });

  test("Should return 500 if AddMovieService throws", async () => {
    jest.spyOn(addMovieService, "add").mockRejectedValueOnce(new Error("service error"));

    const result = await sut.handle(httpRequestMock);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(new ServerError());
  });

  test("Should return 201 if success", async () => {
    const result = await sut.handle(httpRequestMock);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(httpResponseMock);
  });
});
