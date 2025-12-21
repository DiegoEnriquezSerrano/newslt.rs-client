export type FetchFn = (
  input: string | URL | Request,
  init?: RequestInit | undefined,
) => Promise<Response>;

export type JsonResponseError = {
  error: string;
};
