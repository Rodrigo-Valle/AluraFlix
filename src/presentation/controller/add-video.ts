import { MissinParamError } from "../errors/missing-param";
import { badRequest } from "../helpers/http-helper";
import { httpRequest, httpResponse } from "../interface/http";

export class AddVideoController {
  handle(httpRequest: httpRequest): httpResponse {
    const requiredFields = ["titulo", "descricao", "url"];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissinParamError(field));
      }
    }
    return {
      statusCode: 201,
      body: "Ok"
    };
  }
}
