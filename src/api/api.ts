const API_URL = 'https://mate.academy/students-api/';

const getData = async (urlEnding: string) => {
  const response = await fetch(`${API_URL}/${urlEnding}`);

  return response.json();
};

export const getTodos = (): Promise<Todo[]> => getData('todos');

export const getUser = (userId: number): Promise<User> => getData(`users/${userId}`);
