export const request = (url: string) => {
  return fetch(`https://mate.academy/students-api${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}-${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUserInfo = (num: number) => {
  return request(`/users/${num}`);
};
