const todosUrl = 'https://mate-api.herokuapp.com/todos';
const userUrl = 'https://mate-api.herokuapp.com/users';

const getData = url => fetch(url)
  .then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error('Somthimg going wrong'));
    }

    return response.json();
  })
  .then(response => response.data)
  .catch((error) => {
    alert.error('Error', error);
  });

export function getTodos() {
  return getData(todosUrl);
}

export function getUser(id) {
  return getData(`${userUrl}/${id}`);
}
