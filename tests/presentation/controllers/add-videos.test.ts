import { AddVideoController } from "@/presentation/controller/add-video";
import { MissinParamError } from "@/presentation/errors/missing-param";

describe("AddVideoController", () => {
  test("Should return 400 if titulo is not provided ", async () => {
    const sut = new AddVideoController();
    const httpRequest = {
      body: {
        descricao: "any_descricao",
        url: "any_url"
      }
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissinParamError("titulo"));
  });

  test("Should return 400 if descricao is not provided ", async () => {
    const sut = new AddVideoController();
    const httpRequest = {
      body: {
        titulo: "any_titulo",
        url: "any_url"
      }
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissinParamError("descricao"));
  });
  test("Should return 400 if url is not provided ", async () => {
    const sut = new AddVideoController();
    const httpRequest = {
      body: {
        titulo: "any_titulo",
        descricao: "any_descricao"
      }
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissinParamError("url"));
  });
});
