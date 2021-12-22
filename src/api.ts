export const requestTodos = () => {
  return fetch('https://mate.academy/students-api/todos')
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const requestUsers = (id: number) => {
  return fetch(`https://mate.academy/students-api/users/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
