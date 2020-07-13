const TODO_URL = 'https://mate.academy/students-api/todos';
const USER_URL = 'https://mate.academy/students-api/users';

export const todosFromServer = async () => ((
  await fetch(TODO_URL)
    .then(response => response.json())).data
);

export const userFromServer = async () => ((
  await fetch(USER_URL)
    .then(response => response.json())).data
);
