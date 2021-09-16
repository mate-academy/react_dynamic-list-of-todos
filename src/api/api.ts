const BASE_URL = 'https://mate.academy/students-api/';

const getData = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong :(');
      }

      return response.json();
    });
};

export const loadTodos = () => {
  return getData('todos');
};

export const loadUserData = (userId: number):Promise<User> => {
  return getData(`users/${userId}`);
};
