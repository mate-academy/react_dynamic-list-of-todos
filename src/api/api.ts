const BASE_URL = 'https://mate.academy/students-api';

export const fetchTodos = () => {
  // return fetch(BASE_URL)
  //   .then(response => response.json());

  const result = fetch(`${BASE_URL}/todos`)
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);

        throw error;
      }

      return response.json();
    });

  return result;
};

export const fetchUsers = (selectedUserId: number) => {
  const result = fetch(`${BASE_URL}/users/${selectedUserId}`)
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);

        throw error;
      }

      return response.json();
    });

  return result;
};
