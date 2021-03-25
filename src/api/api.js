const BASE__URL = 'https://mate-api.herokuapp.com/';

const request = async(url) => {
  const response = await fetch(`${BASE__URL}${url}`);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
};

export async function getTodos() {
  return (
    request('todos')
      .then(result => result.data)
      .then(data => data.filter(todo => todo.title))
  );
}

export const getUser = async(userId) => {
  const response = await request(`users/${userId}`);

  return response.data;
};
