const ApiService = {
  requestInit(
    method: RequestInit['method'] = 'GET',
    body?: RequestInit['body'],
    credentials: RequestInit['credentials'] = 'include',
  ): RequestInit {
    const headers = new Headers();

    headers.set('Content-Type', 'application/json');

    return {
      credentials,
      headers,
      method,
      body: body ? body : undefined,
    };
  },
};

export default ApiService;
