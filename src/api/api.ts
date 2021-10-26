const API_URL = 'https://mate.academy/students-api/';

const request = (url: string) => {
  const data = fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });

  return data;
};

export const getTodos = () => request('/todos');
export const getUsers = (userId: number) => request(`/users/${userId}`);
