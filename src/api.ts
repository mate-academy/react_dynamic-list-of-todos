const API_URL = 'https://mate.academy/students-api';

export const getData = async (path: string, userId?: number | undefined) => {
  let response;

  if (userId) {
    response = await fetch(`${API_URL}/${path}/${userId}`);

    return response.json();
  }

  response = await fetch(`${API_URL}/${path}`);

  return response.json();
};

// export const fetchUser = (userId: number) => {};
