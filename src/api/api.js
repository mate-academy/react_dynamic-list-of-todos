const todoUrl = 'https://mate-api.herokuapp.com/todos';
const userUrl = 'https://mate-api.herokuapp.com/users';

export const getTodos = async() => {
  try {
    const response = await fetch(`${todoUrl}`);

    if (!response.ok) {
      throw new Error('Serve is not responding');
    }

    const todos = await response.json();

    return todos.data;
  } catch {
    return [];
  }
};

export const getUserById = async(userId) => {
  try {
    const response = await fetch(`${userUrl}${userId}`);

    if (!response.ok) {
      throw new Error('Server is not responding');
    }

    const user = await response.json();

    return user.data ? user.data : Error('User doesn\'t exist');
  } catch (error) {
    return new Error(error);
  }
};
