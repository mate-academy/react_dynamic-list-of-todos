export const todosURL = 'https://mate.academy/students-api/todos';
export const usersUrl = 'https://mate.academy/students-api/users';

export const getData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  const { data } = await response.json();

  return data;
};
