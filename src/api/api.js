const TODO_API_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${TODO_API_URL}${url}`, options)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    return res.json();
  })
  .then(data => data.data);

function wait(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const getTodos = async() => {
  await wait(1000);

  return request('/todos');
};

export const getUsers = () => request('/users');

export const getUser = selectedUserId => request(`/users/${selectedUserId}`);

// export const getUserTodo = (selectedUserId) => {
//   return request(`/users/${selectedUserId}/todos`);
// };
