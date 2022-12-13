import { IHttpRequest, IHttpResponse } from "@/presentation/interfaces";

export interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>;
}
