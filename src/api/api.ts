import { Todo, User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api/';

export const getFromServer = async (option: string): Promise<Todo[] | User> => {
  const promise = await fetch(`${API_URL}/${option}`);

  return promise.json();
};
