const API_URL = 'https://mate.academy/students-api/';

export const getTodos = async (complete: string): Promise<Todo[]> => {
  let url = `${API_URL}todos`;

  if (complete !== '') {
    url += `?completed=${complete}`;
  }

  const response = await fetch(url);

  return response.json();
};

export const getUser = async (userId = 0): Promise<User> => {
  let url = `${API_URL}users/`;

  if (userId !== 0) {
    url += `${userId}`;
  }

  const response = await fetch(url);

  return response.json();
};
