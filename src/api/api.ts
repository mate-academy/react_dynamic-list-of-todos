// eslint-disable-next-line
export const BASE_URL = "https://mate.academy/students-api";

const loadData = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error of loading');
      }

      return response.json();
    });
};

export const loadTodos = () => {
  return loadData('/todos');
};

export const loadUser = (userId: number) => {
  return loadData(`/users/${userId}`);
};
