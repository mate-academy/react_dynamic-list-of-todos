import { Todo } from '../Types/Todo';
import { User } from '../Types/User';

export function getTodoList(): Promise<Todo[]> {
  const responsePromise = fetch('https://mate.academy/students-api/todos');

  const dataPromise = responsePromise
    .then((response) => {
      return response.json();
    });

  return dataPromise;
}

export function getUser(userId: number): Promise <User> {
  const responsePromise = fetch(`https://mate.academy/students-api/users/${userId}`);

  const dataPromise = responsePromise
    .then((response) => {
      return response.json();
    });

  return dataPromise;
}
