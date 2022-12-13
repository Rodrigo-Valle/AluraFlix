import { IAddMovieService } from "@/application/interfaces";
import { MissinParamError } from "@/presentation/errors";
import { badRequest, serverError, created } from "@/presentation/helpers";
import { IController, IHttpRequest, IHttpResponse } from "@/presentation/interfaces";

export class AddMovieController implements IController {
  constructor(private readonly addMovieService: IAddMovieService) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ["title", "description", "url"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissinParamError(field));
        }
      }

      const result = await this.addMovieService.add(httpRequest.body);

      return created(result);
    } catch (error) {
      return serverError();
    }
  }
}
