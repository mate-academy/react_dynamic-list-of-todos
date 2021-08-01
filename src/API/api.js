const API_URL = 'https://mate-api.herokuapp.com';

export const getTodos = async() => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    const todos = await response.json();

    return todos.data;
  } catch {
    return 'Something went wrong...';
  }
};

export async function getUserInfo(userId) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const user = await response.json();

    return user.data ? user.data : Error('User does not exist');
  } catch (error) {
    return new Error(error);
  }
}
