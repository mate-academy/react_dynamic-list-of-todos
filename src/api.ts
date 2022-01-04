const BASE_URL = 'https://mate.academy/students-api/';

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export const getResponse = async (endpoint: string) => {
  try {
    await wait(1000);
    const response = await fetch(`${BASE_URL}${endpoint}`);

    return await response.json();
  } catch (error) {
    return error;
  }
};
