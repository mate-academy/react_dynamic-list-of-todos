const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

const fetchWithTimeout = async(url, options) => {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });

  clearTimeout(id);

  return response;
};

export const loadTodos = async() => {
  const response = await fetchWithTimeout(TODOS_URL, {
    timeout: 800,
  });
  const todos = await response.json();
  const todosData = await todos.data;

  return todosData;
};

export const loadUser = async(userId) => {
  const response = await fetchWithTimeout(`${USERS_URL}${userId}`, {
    timeout: 800,
  });
  const user = await response.json();
  const userData = await user.data;

  return userData;
};
