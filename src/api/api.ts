const apiEndpoint = 'https://mate.academy/students-api/todos';

export const users = async () => {
  const response = await fetch(apiEndpoint);

  if (!response.ok) {
    throw new Error('Error: invalid reference');
  }

  return response.json();
};
