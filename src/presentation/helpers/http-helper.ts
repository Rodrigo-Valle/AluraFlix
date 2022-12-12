import { httpResponse } from "../interface/http";

export const badRequest = (error: Error): httpResponse => {
  return {
    statusCode: 400,
    body: error
  };
};