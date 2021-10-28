const Api = 'https://mate.academy/students-api';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${Api}/todos`)
    .then(response => response.json())
    .then(todos => todos.sort((todo1: Todo, todo2: Todo) => todo1.userId - todo2.userId));
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${Api}/users/${userId}`)
    .then(response => response.json())
    .catch(() => ({
      id: 0,
    }))
    .then(user => user);
}
