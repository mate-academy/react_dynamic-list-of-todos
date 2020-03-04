import { Todo, User } from './types';


const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

function loadData<T>(url: string): Promise<T> {
  return fetch(url)
    .then(res => res.json());
}

export const loadTodos = loadData<Todo[]>(todosUrl);
export const loadUsers = loadData<User[]>(usersUrl);
