export function getTodos(): Promise<Todo[]> {
  return fetch('https://mate.academy/students-api/todos')
    .then(response => response.json());
}

export const getUser = (userId: number): Promise<User> => {
  return fetch(`https://mate.academy/students-api/users/${userId}`)
    .then(response => response.json());
};
