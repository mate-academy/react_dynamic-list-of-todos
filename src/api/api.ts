const APITODO_URL = 'https://mate.academy/students-api/todos';

const APIUSERS_URL = 'https://mate.academy/students-api/users';

export function getTodos(): Promise<Todo[]> {
  return fetch(APITODO_URL)
    .then((response) => response.json());
}

export function getUsers(id: number): Promise<User> {
  return fetch(`${APIUSERS_URL}/${id}`)
    .then(response => response.json());
}
