export function getHeaders(token) {
  let headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }

  return { ...headers };
}
