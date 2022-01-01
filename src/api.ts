const BASE_URL = 'https://mate.academy/students-api/';

export const getResponse = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    return await response.json();
  } catch (error) {
    return error;
  }
};
