const apiUrl = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${apiUrl}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUserById = (userId: number) => {
  return request(`/users/${userId}`);
};
