const API_URL = `https://mate-api.herokuapp.com/`;

const request = url => fetch(`${API_URL}${url}`)
  .then((responce) => {
    if (!responce.ok) {
      throw new Error(`${responce.status} - ${responce.statusText}`);
    }

    return responce.json();
  })
  .then(result => result.data);

export const getTodos = () => request('./todos');
export const getUser = userId => request(`./users/${userId}`);
