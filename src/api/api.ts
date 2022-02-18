const BASE_URL = 'https://mate.academy/students-api';

const request = async (endpoint = '') => {
  try {
    const data = await fetch(`${BASE_URL}${endpoint}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`${resp.status} - ${resp.statusText}`);
        }

        return resp.json();
      });

    return data;
  } catch (e) {
    throw new Error('Error has occured during connection');
  }
};

export const getTodos = async (): Promise<Todo[]> => {
  const todos = await request('/todos');

  return todos;
};

export const getUser = async (id: number): Promise<User> => {
  const user: User = await request(`/users/${id}`);

  return user;
};
