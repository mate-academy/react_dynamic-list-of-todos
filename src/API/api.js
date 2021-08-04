const API_URL = 'https://mate-api.herokuapp.com';

export const getTodos = async() => {
  try {
    const response = await fetch(`${API_URL}/todos`);

    if (!response.ok) {
      throw new Error('Server is not responding');
    }

    const todos = await response.json();

    return todos.data.filter(todo => todo.title);
  } catch {
    return [];
  }
};

export async function getUserInfo(userId) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error('Server is not responding');
    }

    const user = await response.json();

    return user.data ? user.data : Error('User does not exist');
  } catch (error) {
    return new Error(error);
  }
}
