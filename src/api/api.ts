const url = 'https://mate.academy/students-api';

export async function getTodos() : Promise<Todo[]> {
  return fetch(`${url}/todos`)
    .then(response => response.json())
    .then(todo => todo.sort((todo1: Todo, todo2: Todo) => todo1.userId - todo2.userId));
}

export async function getUser(id: number) : Promise<User> {
  return fetch(`${url}/users/${id}`)
    .then(response => response.json())
    .catch(() => ({
      id: 0,
      name: '',
    }));
}
