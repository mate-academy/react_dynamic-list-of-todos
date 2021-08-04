const todoUrl = 'https://mate-api.herokuapp.com/todos';
const userUrl = 'https://mate-api.herokuapp.com/users';

export const request = async(url) => {
  const response = await fetch(`${url}`);

  if (!response.ok) {
    throw new Error('Serve is not responding');
  }

  const serverResponse = await response.json();

  return serverResponse.data;
};

export async function getTodos() {
  try {
    const data = await request(todoUrl);

    return data;
  } catch {
    return [];
  }
}

export async function getUserById(userId) {
  try {
    const user = await request(`${userUrl}/${userId}`);

    return user || Error('User does not exist');
  } catch (error) {
    return new Error(error);
  }
}
