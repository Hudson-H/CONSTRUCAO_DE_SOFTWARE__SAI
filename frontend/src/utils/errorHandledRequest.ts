import { AxiosError } from "axios";

export function handleApiAxiosError(err: unknown, genericErrorMessage: string) {
  if (!(err instanceof AxiosError))
    return err;

  if (err.response && err.response.data) {
    return new Error(err.response.data.message);
  }

  return new Error(genericErrorMessage);
}