// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api/`;

export const request = (url: string) => {
  const data = fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });

  return data;
};

export const getTodos = () => request('todos');

export function getUser(userId: number): Promise<User> {
  return request(`users/${userId}`);
}
